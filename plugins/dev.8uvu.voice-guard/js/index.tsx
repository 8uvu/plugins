// Voice Guard — mobile port of the Equicord "DontControlMe" userplugin.
//
// Desktop Equicord reacts to `VOICE_STATE_UPDATES` from the Flux dispatcher and
// then repairs two kinds of damage:
//   * a server mute/deafen, which it undoes with PATCH /guilds/<g>/members/@me
//   * a disconnect, which it undoes by selecting the channel you were in again
// That is exactly what is portable to Valenced: the same events arrive on the
// phone, and the same two host calls exist — reached here through the module
// finders instead of webpack. Channel pinning from the desktop plugin needed a
// right-click menu item, which the phone has no equivalent for, so it is not
// part of this port.
//
// Everything is defensive: if the rest client or the voice actions cannot be
// found, the plugin still loads, still shows its settings, and says exactly
// which piece is missing rather than pretending to guard anything.

const PLUGIN_VERSION = '1.0.0';

// Matches the desktop plugin's `debounceTime`. A server mute arrives as an echo
// of our own state; reacting inside the same tick would fight the server, so a
// recovery only runs once things have settled.
const DEBOUNCE_MS = 1500;
const MAX_RECONNECTS = 3;

interface Settings {
    reconnect: boolean;
    autoUndeafen: boolean;
    autoUnmute: boolean;
}

const DEFAULTS: Settings = { reconnect: true, autoUndeafen: true, autoUnmute: true };

// ---- Lazy host accessors (never touch a host global at eval time) -----------

declare const valenced: any;
declare const revenge: any;
declare const bunny: any;
declare const vendetta: any;

function getValenced(): any {
    try { if (typeof valenced !== 'undefined' && valenced) return valenced; } catch {}
    return null;
}

function getReact(): any {
    try { const r = getValenced()?.react?.React; if (r?.createElement) return r; } catch {}
    try { if (typeof revenge !== 'undefined') return revenge?.react?.React ?? null; } catch {}
    try { if (typeof bunny !== 'undefined') return bunny?.React ?? bunny?.metro?.common?.React ?? null; } catch {}
    try { if (typeof vendetta !== 'undefined') return vendetta?.metro?.common?.React ?? null; } catch {}
    return null;
}

function getRN(): any {
    try { const rn = getValenced()?.react?.ReactNative; if (rn?.View && rn?.Text) return rn; } catch {}
    try { if (typeof revenge !== 'undefined') return revenge?.react?.ReactNative ?? null; } catch {}
    try { if (typeof bunny !== 'undefined') return bunny?.ReactNative ?? bunny?.metro?.common?.ReactNative ?? null; } catch {}
    try { if (typeof vendetta !== 'undefined') return vendetta?.metro?.common?.ReactNative ?? null; } catch {}
    return null;
}

function getDesign(): any {
    try {
        const g = getValenced()?.discord?.design;
        const d = g?.Design ?? g;
        if (d?.TableRowGroup) return d;
    } catch {}
    // Revenge-style hosts expose the same components on their own global.
    try {
        const g: any = (typeof revenge !== 'undefined' ? revenge : null)?.discord?.design;
        const d = g?.Design ?? g;
        if (d?.TableRowGroup) return d;
    } catch {}
    return null;
}

function getStores(): any {
    try { const s = getValenced()?.discord?.flux?.Stores; if (s) return s; } catch {}
    try { if (typeof revenge !== 'undefined') return revenge?.discord?.flux?.Stores ?? {}; } catch {}
    return {};
}

function toast(text: string): void {
    try {
        const open = getValenced()?.discord?.actions?.ToastActionCreators?.open;
        if (typeof open === 'function') {
            open({ key: 'voiceguard-' + Date.now(), content: text });
            return;
        }
    } catch {}
    try {
        const RN: any = getRN();
        RN?.ToastAndroid?.show?.(text, RN?.ToastAndroid?.SHORT ?? 0);
    } catch {}
}

function hostError(msg: string, e?: unknown): void {
    try {
        const logger = getValenced()?.logger ?? (typeof revenge !== 'undefined' ? revenge?.logger : null) ?? console;
        (logger?.error ?? logger?.log ?? (() => {})).call(logger, '[VoiceGuard] ' + msg, e ?? '');
    } catch {}
}

// ---- Host calls -------------------------------------------------------------

// The phone has no webpack: modules are found by property signature, which is
// how Valenced's own plugins look them up too.
function lookupModule(props: string[]): any {
    const finders = getValenced()?.modules?.finders;
    const filters = getValenced()?.modules?.finders?.filters;
    if (typeof finders?.lookupModule !== 'function' || typeof filters?.withProps !== 'function') return null;
    try {
        const found = finders.lookupModule(filters.withProps(...props));
        const mod = Array.isArray(found) ? found[0] : found;
        return mod ?? null;
    } catch {
        return null;
    }
}

let restLabel = 'not looked up yet';
let actionsLabel = 'not looked up yet';

function getRest(): any {
    const rest = lookupModule(['patch', 'get', 'post']);
    restLabel = rest ? 'found (members patch)' : 'not found on this build';
    return rest;
}

function getVoiceActions(): any {
    const actions = lookupModule(['selectVoiceChannel']);
    actionsLabel = actions ? 'found (selectVoiceChannel)' : 'not found on this build';
    return actions;
}

// Discord's rest object wants {url, body}; a bound build may accept the same
// shape. Returns whether the call was handed off, not whether the server
// accepted it (that is asynchronous and only shows up in the counters).
function patchMember(guildId: string, body: Record<string, boolean>): boolean {
    const rest = getRest();
    const patch = rest?.patch ?? rest?.api?.patch;
    if (typeof patch !== 'function' || !guildId) return false;
    try {
        void patch.call(rest, { url: '/guilds/' + guildId + '/members/@me', body });
        return true;
    } catch (e) {
        hostError('member patch failed', e);
        return false;
    }
}

// ---- State ------------------------------------------------------------------

let cfg: Settings = { ...DEFAULTS };
let jsonStorageApi: any = null;
let myId = '';
let lastChannelId: string | null = null;
let lastGuildId = '';
let lastHandledAt = 0;
let lastMoveAt = 0;
let reconnectAttempts = 0;
let watchLabel = 'not started';

const counters = { reconnects: 0, unmutes: 0, undeafens: 0, refusals: 0 };

function persist(patch: Partial<Settings>): void {
    cfg = { ...cfg, ...patch };
    try { void jsonStorageApi?.set?.(patch); } catch (e) { hostError('could not save settings', e); }
}

function recover(guildId: string, undeafen: boolean, unmute: boolean): void {
    const body: Record<string, boolean> = {};
    if (undeafen) body.deaf = false;
    if (unmute) body.mute = false;
    if (!Object.keys(body).length) return;
    if (!patchMember(guildId, body)) {
        counters.refusals++;
        toast('Voice guard: cannot reach the member API on this build');
        return;
    }
    if (undeafen) counters.undeafens++;
    if (unmute) counters.unmutes++;
    const parts = [undeafen ? 'undeafened' : '', unmute ? 'unmuted' : ''].filter(Boolean);
    toast('Voice guard: ' + parts.join(' and ') + ' you');
}

function attemptReconnect(): void {
    if (reconnectAttempts >= MAX_RECONNECTS) return;
    const actions = getVoiceActions();
    if (typeof actions?.selectVoiceChannel !== 'function' || !lastChannelId) {
        counters.refusals++;
        return;
    }
    reconnectAttempts++;
    lastMoveAt = Date.now();
    try {
        actions.selectVoiceChannel(lastChannelId);
        counters.reconnects++;
        toast('Voice guard: reconnected to the channel you were in');
    } catch (e) {
        counters.refusals++;
        hostError('reconnect failed', e);
    }
}

function stateList(payload: any): any[] {
    if (Array.isArray(payload?.voiceStates)) return payload.voiceStates;
    if (Array.isArray(payload)) return payload;
    const single = payload?.voiceState ?? payload;
    return single ? [single] : [];
}

// Feeds one VOICE_STATE_UPDATE(S) payload. Exported through __engine so the
// repository's harness can drive it without a device.
function onVoiceStates(payload: any): void {
    try {
        const states = stateList(payload);
        if (!states.length) return;
        const mine = states.find((s: any) => String(s?.userId ?? s?.user_id ?? '') === myId) ?? null;

        if (!mine) {
            // A voice-state update that does not include us only means a drop if
            // our own channel was known: that is the disconnect case.
            if (lastChannelId && cfg.reconnect && Date.now() - lastMoveAt > DEBOUNCE_MS) attemptReconnect();
            return;
        }

        const channelId = mine.channelId ?? mine.channel_id ?? null;
        const guildId = String(mine.guildId ?? mine.guild_id ?? '');
        lastMoveAt = Date.now();
        lastChannelId = channelId ? String(channelId) : null;
        lastGuildId = guildId;
        reconnectAttempts = 0;

        // Not in a call, or a DM/group call: there is no server mute to undo.
        if (!lastChannelId || !guildId) return;

        const undeafen = cfg.autoUndeafen && mine.deaf === true;
        const unmute = cfg.autoUnmute && mine.mute === true;
        if (!undeafen && !unmute) return;
        if (Date.now() - lastHandledAt < DEBOUNCE_MS) return;
        lastHandledAt = Date.now();
        recover(guildId, undeafen, unmute);
    } catch (e) {
        hostError('voice state handling failed', e);
    }
}

let cleanupFns: (() => void)[] = [];

function subscribe(): void {
    const flux: any = getValenced()?.discord?.flux;
    let installed = 0;
    for (const event of ['VOICE_STATE_UPDATE', 'VOICE_STATE_UPDATES']) {
        try {
            if (typeof flux?.onFluxEventDispatched !== 'function') break;
            const off = flux.onFluxEventDispatched(event, (payload: any) => {
                // Voice is not the only thing in the payload; keep the rest of
                // the handler list intact by returning it untouched.
                onVoiceStates(payload);
                return payload;
            });
            if (typeof off === 'function') {
                cleanupFns.push(off);
                installed++;
            }
        } catch (e) {
            hostError('subscribe ' + event + ' failed', e);
        }
    }
    watchLabel = installed
        ? 'watching voice state (' + installed + ' event' + (installed === 1 ? '' : 's') + ')'
        : 'voice state events not available';
}

async function startNext(api: any): Promise<void> {
    jsonStorageApi = api?.jsonStorage ?? null;
    try { await jsonStorageApi?.get?.(); } catch {}
    try {
        const saved = jsonStorageApi?.use?.() ?? null;
        if (saved && typeof saved === 'object') cfg = { ...DEFAULTS, ...saved };
    } catch (e) {
        hostError('could not load settings', e);
    }
    try {
        myId = String(getStores().UserStore?.getCurrentUser?.()?.id ?? '');
    } catch {}
    // Resolve the two calls once so the settings page can report what exists on
    // this build even before anything happens.
    getRest();
    getVoiceActions();
    subscribe();
}

function stopNext(): void {
    while (cleanupFns.length) {
        try { cleanupFns.pop()?.(); } catch {}
    }
    myId = '';
    lastChannelId = null;
    lastGuildId = '';
    lastHandledAt = 0;
    lastMoveAt = 0;
    reconnectAttempts = 0;
    watchLabel = 'stopped';
}

const engine = {
    onVoiceStates,
    getConfig(): Settings { return { ...cfg }; },
    setConfig(patch: Partial<Settings>): void { cfg = { ...cfg, ...patch }; },
    setMyId(id: string): void { myId = String(id ?? ''); },
    getState() {
        return {
            myId,
            lastChannelId,
            lastGuildId,
            counters: { ...counters },
            restLabel,
            actionsLabel,
            watchLabel,
        };
    },
    resetCounters(): void {
        counters.reconnects = 0;
        counters.unmutes = 0;
        counters.undeafens = 0;
        counters.refusals = 0;
    },
};

// ---- Settings page ----------------------------------------------------------

function buildSettings(): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Text) return null;
    const el = React.createElement;
    // Hooks must run *inside* the component: calling useState while building the
    // page throws React's invalid-hook-call error and the settings tab renders
    // blank. So hand back a real component and resolve design parts per render.
    return function VoiceGuardSettings() {
        const D = getDesign();
        const [tick, setTick] = React.useState(0);
        const refresh = () => setTick((n: number) => n + 1);
        void tick;

        const toggle = (patch: Partial<Settings>) => {
            persist(patch);
            refresh();
        };
        const status = 'Voice guard: ' + watchLabel;
        const calls = 'Member API: ' + restLabel;
        const voice = 'Channel actions: ' + actionsLabel;
        const tally = counters.undeafens + ' undeafened · ' + counters.unmutes + ' unmuted · '
            + counters.reconnects + ' reconnected · ' + counters.refusals + ' could not act';

        if (D?.TableRowGroup && D?.TableSwitchRow && D?.TableRow) {
            return el(RN.ScrollView, { style: { flex: 1 } },
                el(D.TableRowGroup, { title: 'Voice Guard' },
                    el(D.TableSwitchRow, {
                        label: 'Undo server deafen',
                        subLabel: 'Server-deafened you? This turns it back off.',
                        value: cfg.autoUndeafen,
                        onValueChange: (v: boolean) => toggle({ autoUndeafen: v }),
                    }),
                    el(D.TableSwitchRow, {
                        label: 'Undo server mute',
                        subLabel: 'Only works where you are allowed to change your own mute.',
                        value: cfg.autoUnmute,
                        onValueChange: (v: boolean) => toggle({ autoUnmute: v }),
                    }),
                    el(D.TableSwitchRow, {
                        label: 'Reconnect when dropped',
                        subLabel: 'Rejoins the channel you were in, up to ' + MAX_RECONNECTS + ' times.',
                        value: cfg.reconnect,
                        onValueChange: (v: boolean) => toggle({ reconnect: v }),
                    })),
                el(D.TableRowGroup, { title: 'This session' },
                    el(D.TableRow, { label: status }),
                    el(D.TableRow, { label: calls }),
                    el(D.TableRow, { label: voice }),
                    el(D.TableRow, { label: tally }),
                    el(D.TableRow, { label: 'Reset counters', onPress: () => { engine.resetCounters(); refresh(); } })),
            );
        }

        const row = (label: string, value: boolean, patch: Partial<Settings>) => el(RN.Pressable, {
            accessibilityLabel: label,
            onPress: () => toggle(patch),
            style: { paddingVertical: 8 },
        }, el(RN.Text, { style: { color: '#ffffff' } }, label + ': ' + (value ? 'on' : 'off')));

        return el(RN.ScrollView, { style: { flex: 1, padding: 16 } },
            el(RN.Text, { style: { color: '#ffffff', fontSize: 18, fontWeight: '800' } }, 'Voice Guard ' + PLUGIN_VERSION),
            row('Undo server deafen', cfg.autoUndeafen, { autoUndeafen: !cfg.autoUndeafen }),
            row('Undo server mute', cfg.autoUnmute, { autoUnmute: !cfg.autoUnmute }),
            row('Reconnect when dropped', cfg.reconnect, { reconnect: !cfg.reconnect }),
            el(RN.Text, { style: { color: '#ffffff', fontWeight: '700', marginTop: 12 } }, status),
            el(RN.Text, { style: { color: '#9ba0a8', marginTop: 4 } }, calls),
            el(RN.Text, { style: { color: '#9ba0a8' } }, voice),
            el(RN.Text, { style: { color: '#9ba0a8' } }, tally),
            el(RN.Pressable, {
                accessibilityLabel: 'Reset counters',
                onPress: () => { engine.resetCounters(); refresh(); },
                style: { marginTop: 12, paddingVertical: 8 },
            }, el(RN.Text, { style: { color: '#5865F2' } }, 'Reset counters')),
        );
    };
}

// ---- Universal plugin instance ---------------------------------------------

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
        return React.createElement(RN.Text ?? 'text', { style: { color: '#ffffff', padding: 12 } }, 'Voice Guard settings could not load on this build.');
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
