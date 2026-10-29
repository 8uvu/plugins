// ZeroWidthSanitizer — strips invisible tracking characters out of your own
// messages before Discord ever sends them.
//
// Mobile port of Epitaph's Equicord userplugin (ZeroWidthSanitizer): same
// character set, same three toggles. Equicord hooks MessageEvents' pre-send and
// pre-edit listeners; Valenced has no such API, so this binds the FluxDispatcher
// before the event is dispatched and rewrites the outgoing payload in place.
//
// Only YOUR messages are touched: the author id is compared against the signed-in
// user, and a message without an author is left alone rather than guessed at.
// The invisible characters removed here are the ones web "fingerprinting" links
// carry; ZWNJ/ZWJ and the RTL marks are deliberately kept so Arabic and Persian
// text keeps its shaping.

const PLUGIN_VERSION = '1.0.1';

interface Settings {
    sanitizeOutgoing: boolean;
    sanitizeEdits: boolean;
    showToastOnDetection: boolean;
    verboseLogs: boolean;
}

const DEFAULTS: Settings = {
    sanitizeOutgoing: true,
    sanitizeEdits: true,
    showToastOnDetection: true,
    verboseLogs: false,
};

// ZWSP, word joiner + invisible operators, deprecated format chars, BOM, soft
// hyphen. ZWNJ (U+200C) / ZWJ (U+200D) and LRM/RLM/embedding marks stay.
const INVISIBLE_CHARS = /[\u200B\u2060-\u2064\u206A-\u206F\uFEFF\u00AD]/g;

const MARKER = 'dev.8uvu.zero-width-sanitizer';

function getValenced(): any {
    try { if (typeof valenced !== 'undefined' && valenced) return valenced; } catch { }
    return null;
}

function getReact(): any {
    try { const r = getValenced()?.react?.React; if (r?.createElement) return r; } catch { }
    try { if (typeof revenge !== 'undefined') return revenge?.react?.React ?? null; } catch { }
    try { if (typeof bunny !== 'undefined') return bunny?.React ?? bunny?.metro?.common?.React ?? null; } catch { }
    try { if (typeof vendetta !== 'undefined') return vendetta?.metro?.common?.React ?? null; } catch { }
    return null;
}

function getRN(): any {
    try { const rn = getValenced()?.react?.ReactNative; if (rn?.View && rn?.Text) return rn; } catch { }
    try { if (typeof revenge !== 'undefined') return revenge?.react?.ReactNative ?? null; } catch { }
    try { if (typeof bunny !== 'undefined') return bunny?.ReactNative ?? bunny?.metro?.common?.ReactNative ?? null; } catch { }
    try { if (typeof vendetta !== 'undefined') return vendetta?.metro?.common?.ReactNative ?? null; } catch { }
    return null;
}

function getDesign(): any {
    try {
        const g = getValenced()?.discord?.design;
        const d = g?.Design ?? g;
        if (d?.TableRowGroup) return d;
    } catch { }
    // Revenge-style hosts expose the same components on their own global.
    try {
        const g: any = (typeof revenge !== 'undefined' ? revenge : null)?.discord?.design;
        const d = g?.Design ?? g;
        if (d?.TableRowGroup) return d;
    } catch { }
    return null;
}

function getStores(): any {
    try { const s = getValenced()?.discord?.flux?.Stores; if (s) return s; } catch { }
    try { if (typeof revenge !== 'undefined') return revenge?.discord?.flux?.Stores ?? {}; } catch { }
    return {};
}

// Discord's own toast container has crashed the whole client on this build
// (useToastContainer reading `position` of undefined), and a notification is
// never worth an app crash — so only native surfaces are used here.
function toast(text: string): void {
    const message = String(text ?? '');
    try {
        const RN: any = getRN();
        if (RN?.ToastAndroid?.show) {
            RN.ToastAndroid.show(message, RN.ToastAndroid.SHORT ?? 0);
            return;
        }
        RN?.Alert?.alert?.('Zero Width Sanitizer', message);
    } catch { }
}

function hostError(msg: string, e?: unknown): void {
    try {
        const logger = getValenced()?.logger ?? (typeof revenge !== 'undefined' ? revenge?.logger : null) ?? console;
        (logger?.error ?? logger?.log ?? (() => { })).call(logger, '[ZeroWidthSanitizer] ' + msg, e ?? '');
    } catch { }
}

function log(msg: string): void {
    if (!cfg.verboseLogs) return;
    hostError(msg);
}

// ---- Settings state ------------------------------------------------------------

let cfg: Settings = { ...DEFAULTS };
let jsonStorageApi: any = null;

function persist(patch: Partial<Settings>): void {
    cfg = { ...cfg, ...patch };
    try { void jsonStorageApi?.set?.(patch); } catch (e) { hostError('could not save', e); }
}

// ---- Sanitizer ------------------------------------------------------------------

export function sanitize(text: string): { result: string; removed: number } {
    if (typeof text !== 'string' || !text) return { result: typeof text === 'string' ? text : '', removed: 0 };
    INVISIBLE_CHARS.lastIndex = 0;
    const matches = text.match(INVISIBLE_CHARS);
    if (!matches || matches.length === 0) return { result: text, removed: 0 };
    INVISIBLE_CHARS.lastIndex = 0;
    return { result: text.replace(INVISIBLE_CHARS, ''), removed: matches.length };
}

let cleaned = 0;
let cleanedChars = 0;
let lastCleanedAt = 0;
let boundStatus = 'not started';

let cachedUserId = '';

function myUserId(): string {
    if (cachedUserId) return cachedUserId;
    try {
        const user = getStores().UserStore?.getCurrentUser?.();
        if (user?.id) { cachedUserId = String(user.id); return cachedUserId; }
    } catch { }
    // The Stores proxy is the documented path; the finder is the raw one, for
    // builds where the flux namespace is still lazy at this moment.
    try {
        const v = getValenced();
        const f = v?.modules?.finders;
        if (typeof f?.lookupModule === 'function' && typeof f?.filters?.withStoreName === 'function') {
            const found = f.lookupModule(f.filters.withStoreName('UserStore'));
            const store = Array.isArray(found) ? found[0] : found;
            const id = store?.getCurrentUser?.()?.id;
            if (id) { cachedUserId = String(id); return cachedUserId; }
        }
    } catch { }
    return '';
}

// An edit payload often carries no author, so fall back to the message already
// cached in the client — still only our own message, never someone else's.
function authorOf(message: any): string {
    if (message?.author?.id) return String(message.author.id);
    try {
        const cached = getStores().MessageStore?.getMessage?.(message?.channel_id ?? message?.channelId, message?.id);
        if (cached?.author?.id) return String(cached.author.id);
    } catch { }
    return '';
}

// Rewrites one event in place. Returns true when characters were removed.
export function handlePayload(payload: any): boolean {
    const type = payload?.type;
    if (type !== 'MESSAGE_CREATE' && type !== 'MESSAGE_UPDATE') return false;
    if (type === 'MESSAGE_CREATE' && !cfg.sanitizeOutgoing) return false;
    if (type === 'MESSAGE_UPDATE' && !cfg.sanitizeEdits) return false;

    const message = payload?.message;
    if (!message || typeof message.content !== 'string') return false;
    // Already handled on this pass — never sanitize the same payload twice.
    if (message.zwSanitizedBy === MARKER) return false;

    // Only the signed-in user's own messages. A payload without an author id is
    // somebody else's (or a system message): leave it untouched.
    const authorId = authorOf(message);
    const me = myUserId();
    if (!authorId || !me || authorId !== me) return false;

    const { result, removed } = sanitize(message.content);
    if (removed === 0) return false;

    message.content = result;
    try { message.zwSanitizedBy = MARKER; } catch { }

    cleaned++;
    cleanedChars += removed;
    lastCleanedAt = Date.now();
    log('removed ' + removed + ' invisible character(s) from a ' + (type === 'MESSAGE_CREATE' ? 'sent message' : 'message edit'));
    if (cfg.showToastOnDetection) {
        toast('Removed ' + removed + ' hidden character' + (removed === 1 ? '' : 's') + (type === 'MESSAGE_UPDATE' ? ' from your edit' : ''));
    }
    return true;
}

// ---- Dispatcher binding ---------------------------------------------------------

// Normalized { addInterceptor(cb) } view of whichever dispatcher this host has.
// Valenced is checked first: its module finder returns Discord's real
// FluxDispatcher, whose interceptors see every event before it is handled.
function getDispatcher(): any {
    try {
        const v = getValenced();
        const finders = v?.modules?.finders;
        const filters = v?.modules?.finders?.filters;
        if (finders && filters && typeof finders.lookupModule === 'function') {
            const found = finders.lookupModule(filters.withProps('dispatch', 'subscribe'));
            const mod = Array.isArray(found) ? found[0] : found;
            if (mod && typeof mod.dispatch === 'function') {
                if (typeof mod.addInterceptor === 'function') {
                    return { addInterceptor: (cb: any) => mod.addInterceptor(cb), kind: 'dispatcher' };
                }
                // No interceptor channel: wrap dispatch itself. The wrapper is
                // put back by the cleanup below.
                // No interceptor channel on this build, so wrap dispatch itself and
                // keep our own list of interceptors; the last removal restores the
                // original function.
                const original = mod.dispatch;
                const interceptors: any[] = [];
                const patched = function (this: any, payload: any) {
                    let next = payload;
                    for (const fn of interceptors.slice()) {
                        try {
                            const out = fn(next);
                            if (out !== undefined) next = out;
                        } catch (e) {
                            hostError('interceptor failed', e);
                        }
                    }
                    return original.call(this, next);
                };
                mod.dispatch = patched;
                return {
                    addInterceptor: (fn: any) => {
                        interceptors.push(fn);
                        return () => {
                            const i = interceptors.indexOf(fn);
                            if (i >= 0) interceptors.splice(i, 1);
                            if (!interceptors.length) { try { mod.dispatch = original; } catch { } }
                        };
                    },
                    kind: 'dispatch patch',
                };
            }
        }
    } catch (e) {
        hostError('valenced dispatcher lookup failed', e);
    }
    try {
        if (typeof revenge !== 'undefined') {
            const f: any = revenge?.discord?.flux;
            if (f && typeof f.onAnyFluxEventDispatched === 'function') {
                return {
                    addInterceptor: (cb: any) => f.onAnyFluxEventDispatched((payload: any) => {
                        const out = cb(payload);
                        return out === undefined ? payload : out;
                    }),
                    kind: 'flux hook',
                };
            }
            if (f?.dispatcher && typeof f.dispatcher.addInterceptor === 'function') {
                return { addInterceptor: (cb: any) => f.dispatcher.addInterceptor(cb), kind: 'flux dispatcher' };
            }
        }
    } catch { }
    try {
        const b: any = typeof bunny !== 'undefined' ? bunny : null;
        if (b?.api?.flux && typeof b.api.flux.intercept === 'function') {
            return { addInterceptor: (cb: any) => b.api.flux.intercept(cb), kind: 'bunny intercept' };
        }
    } catch { }
    try {
        const v: any = typeof vendetta !== 'undefined' ? vendetta : null;
        const fd = v?.metro?.common?.FluxDispatcher ?? v?.common?.FluxDispatcher;
        if (fd && typeof fd.addInterceptor === 'function') {
            return { addInterceptor: (cb: any) => fd.addInterceptor(cb), kind: 'vendetta dispatcher' };
        }
    } catch { }
    return null;
}

let cleanupFns: (() => void)[] = [];

function bind(): void {
    const dispatcher = getDispatcher();
    if (!dispatcher) {
        boundStatus = 'dispatcher not found';
        hostError('no dispatcher on this build — plugin idle this session');
        return;
    }
    try {
        const off = dispatcher.addInterceptor((payload: any) => {
            try {
                handlePayload(payload);
            } catch (e) {
                hostError('payload handling failed', e);
            }
            return payload;
        });
        if (typeof off === 'function') cleanupFns.push(off);
        boundStatus = dispatcher.kind;
    } catch (e) {
        boundStatus = 'binding failed';
        hostError('could not bind the dispatcher', e);
    }
}

async function startNext(api: any): Promise<void> {
    jsonStorageApi = api?.jsonStorage ?? null;
    try { await jsonStorageApi?.get?.(); } catch { }
    try {
        const saved = jsonStorageApi?.use?.() ?? null;
        if (saved && typeof saved === 'object') cfg = { ...DEFAULTS, ...saved };
    } catch (e) {
        hostError('could not load settings', e);
    }
    bind();
}

function stopNext(): void {
    while (cleanupFns.length) {
        try { cleanupFns.pop()?.(); } catch { }
    }
    boundStatus = 'stopped';
}

export const engine = {
    sanitize,
    handlePayload,
    removed(): number { return cleaned; },
    removedChars(): number { return cleanedChars; },
    status(): string { return boundStatus; },
    lastAt(): number { return lastCleanedAt; },
    getConfig(): Settings { return { ...cfg }; },
    setConfig(patch: Partial<Settings>): void { cfg = { ...cfg, ...patch }; },
};

// ---- Settings UI ----------------------------------------------------------------

function buildSettings(): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Text) return null;
    const el = React.createElement;

    // Hooks must run *inside* the component: calling useState while building the
    // page throws React's invalid-hook-call error and the settings tab renders
    // blank. So hand back a real component and resolve design parts per render.
    return function ZeroWidthSanitizerSettings() {
        const D = getDesign();
        const [tick, setTick] = React.useState(0);
        const refresh = () => setTick((n: number) => n + 1);
        void tick;

        const toggle = (patch: Partial<Settings>) => {
            persist(patch);
            refresh();
        };

        if (D?.TableRowGroup && D?.TableSwitchRow && D?.TableRow) {
            return el(RN.ScrollView, { style: { flex: 1 } },
                el(D.TableRowGroup, { title: 'ZeroWidthSanitizer' },
                    el(D.TableSwitchRow, {
                        label: 'Sanitize sent messages',
                        subLabel: 'Strip invisible characters before Discord sends.',
                        value: cfg.sanitizeOutgoing,
                        onValueChange: (v: boolean) => toggle({ sanitizeOutgoing: v }),
                    }),
                    el(D.TableSwitchRow, {
                        label: 'Sanitize edits',
                        value: cfg.sanitizeEdits,
                        onValueChange: (v: boolean) => toggle({ sanitizeEdits: v }),
                    }),
                    el(D.TableSwitchRow, {
                        label: 'Toast when something is removed',
                        value: cfg.showToastOnDetection,
                        onValueChange: (v: boolean) => toggle({ showToastOnDetection: v }),
                    })),
                el(D.TableRowGroup, { title: 'Status' },
                    el(D.TableRow, { label: 'Cleaner status', subLabel: 'Sanitizer: ' + boundStatus }),
                    el(D.TableRow, {
                        label: 'Cleaned this session',
                        subLabel: cleaned + ' message' + (cleaned === 1 ? '' : 's') + ' · ' + cleanedChars + ' character' + (cleanedChars === 1 ? '' : 's'),
                    }),
                    el(D.TableRow, {
                        label: 'Last hit',
                        subLabel: lastCleanedAt ? new Date(lastCleanedAt).toLocaleTimeString() : 'nothing removed yet',
                    }),
                    el(D.TableRow, { label: 'Reset counter', onPress: () => { cleaned = 0; cleanedChars = 0; lastCleanedAt = 0; refresh(); } })),
            );
        }

        return el(RN.ScrollView, { style: { flex: 1, padding: 16 } },
            el(RN.Text, { style: { color: '#ffffff', fontSize: 18, fontWeight: '800' } }, 'ZeroWidthSanitizer ' + PLUGIN_VERSION),
            el(RN.Text, { style: { color: '#9ba0a8', marginTop: 2, marginBottom: 8 } }, 'Sanitizer: ' + boundStatus),
            el(RN.Pressable, {
                accessibilityLabel: 'Sanitize sent messages',
                onPress: () => toggle({ sanitizeOutgoing: !cfg.sanitizeOutgoing }),
                style: { paddingVertical: 8 },
            }, el(RN.Text, { style: { color: '#ffffff' } }, 'Sanitize sent messages: ' + (cfg.sanitizeOutgoing ? 'on' : 'off'))),
            el(RN.Pressable, {
                accessibilityLabel: 'Sanitize edits',
                onPress: () => toggle({ sanitizeEdits: !cfg.sanitizeEdits }),
                style: { paddingVertical: 8 },
            }, el(RN.Text, { style: { color: '#ffffff' } }, 'Sanitize edits: ' + (cfg.sanitizeEdits ? 'on' : 'off'))),
            el(RN.Pressable, {
                accessibilityLabel: 'Toast when something is removed',
                onPress: () => toggle({ showToastOnDetection: !cfg.showToastOnDetection }),
                style: { paddingVertical: 8 },
            }, el(RN.Text, { style: { color: '#ffffff' } }, 'Toast when something is removed: ' + (cfg.showToastOnDetection ? 'on' : 'off'))),
            el(RN.Text, { style: { color: '#ffffff', fontWeight: '700', marginTop: 12 } }, 'Cleaned this session'),
            el(RN.Text, { style: { color: '#9ba0a8', marginTop: 4 } }, cleaned + ' message' + (cleaned === 1 ? '' : 's') + ' · ' + cleanedChars + ' character' + (cleanedChars === 1 ? '' : 's')),
            el(RN.Text, { style: { color: '#9ba0a8', marginTop: 2 } }, lastCleanedAt ? 'Last hit: ' + new Date(lastCleanedAt).toLocaleTimeString() : 'Nothing removed yet'),
            el(RN.Pressable, {
                accessibilityLabel: 'Reset counter',
                onPress: () => { cleaned = 0; cleanedChars = 0; lastCleanedAt = 0; refresh(); },
                style: { marginTop: 12, paddingVertical: 8 },
            }, el(RN.Text, { style: { color: '#5865F2' } }, 'Reset counter')),
        );
    };
}

let __built: any = null;

let __instance: any = {
    jsonStorage: { load: true, default: { ...DEFAULTS } },
    start: startNext,
    stop: stopNext,
    SettingsComponent: function (props: any) {
        const api = props?.api ?? props;
        const React = getReact();
        if (!React?.createElement) return null;
        try {
            if (api?.jsonStorage) jsonStorageApi = api.jsonStorage;
            if (!__built) __built = buildSettings();
            if (__built) return React.createElement(__built, { api });
        } catch (e) {
            hostError('settings build failed', e);
        }
        const RN: any = getRN() ?? {};
        return React.createElement(RN.Text ?? 'text', { style: { color: '#ffffff', padding: 12 } }, 'ZeroWidthSanitizer settings could not load on this build.');
    },
};

__instance.__engine = engine;

if (typeof plugin === 'function') {
    __instance = plugin(__instance);
}
globalThis.plugin = __instance;

__instance.onLoad = function () { return __instance.start?.(); };
__instance.onUnload = function () { return __instance.stop?.(); };
__instance.settings = __instance.SettingsComponent;

export default __instance;
