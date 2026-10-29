// UserChangeAlerts — tells you when someone changes their username or avatar.
//
// Discord quietly reshuffles names and profile pictures; this watches the
// profile fields it already receives and toasts the moment one changes. It only
// reports changes it actually saw happen while running: the first sighting of a
// user just records their current name, so opening the app never dumps a wall of
// alerts for people who renamed weeks ago.
//
// Host rules (same as the rest of this repository): no host access at eval time,
// `valenced` first and the older loaders as fallbacks, settings that always
// render, and every subscription removed on stop().

const PLUGIN_VERSION = '1.0.2';

interface Settings {
    enabled: boolean;
    avatars: boolean;
    friendsOnly: boolean;
    history: Change[];
}

interface Change {
    userId: string;
    from: string;
    to: string;
    at: number;
}

const DEFAULTS: Settings = { enabled: true, avatars: true, friendsOnly: false, history: [] };
const MAX_HISTORY = 50;

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
    // Native surfaces only. Discord's toast container crashed the whole client on
    // this build (useToastContainer: "Cannot read property 'position' of
    // undefined"), so this never opens a Discord toast.
    const s = String(text ?? '');
    try {
        const RN: any = getRN();
        if (RN?.ToastAndroid?.show) { RN.ToastAndroid.show(s, RN.ToastAndroid.SHORT ?? 0); return; }
        if (RN?.Alert?.alert) { RN.Alert.alert('User Change Alerts', s); }
    } catch {}
}

function hostError(msg: string, e?: unknown): void {
    try {
        const logger = getValenced()?.logger ?? (typeof revenge !== 'undefined' ? revenge?.logger : null) ?? console;
        (logger?.error ?? logger?.log ?? (() => {})).call(logger, '[UserChangeAlerts] ' + msg, e ?? '');
    } catch {}
}

function nameOf(user: any): string {
    if (!user) return 'Someone';
    return String(user.globalName ?? user.global_name ?? user.username ?? user.id ?? 'Someone');
}

// ---- Tracked snapshots ---------------------------------------------------------

// userId -> the profile fields we last agreed with. A user is only compared
// against this, never against Discord's own store, because by the time an event
// arrives the store already holds the NEW value.
const seen = new Map<string, { name: string; avatar: string | null }>();

let cfg: Settings = { ...DEFAULTS };
let jsonStorageApi: any = null;

function remember(userId: string, user: any): void {
    if (!userId) return;
    seen.set(userId, { name: nameOf(user), avatar: user?.avatar ?? null });
}

function isFriend(userId: string): boolean {
    try {
        const rs: any = getStores().RelationshipStore;
        const rel = rs?.getRelationships?.() ?? rs?.relationships ?? null;
        if (!rel) return false;
        const value = rel instanceof Map ? rel.get(userId) : rel[userId];
        return value === 1 || value === '1' || value === true;
    } catch {
        return false;
    }
}

function persist(patch: Partial<Settings>): void {
    cfg = { ...cfg, ...patch };
    try { void jsonStorageApi?.set?.(patch); } catch (e) { hostError('could not save', e); }
}

function note(change: Change): void {
    const history = [change, ...(cfg.history ?? [])].slice(0, MAX_HISTORY);
    persist({ history });
}

// Compares one profile payload with what we last saw. Returns the change, or
// null when this is a first sighting or nothing actually moved.
export function compare(userId: string, user: any): Change | null {
    const id = String(userId ?? user?.id ?? '');
    if (!id || !user) return null;
    const before = seen.get(id);
    const now = { name: nameOf(user), avatar: user?.avatar ?? null };
    if (!before) {
        seen.set(id, now);
        return null;
    }
    if (before.name === now.name && before.avatar === now.avatar) return null;
    seen.set(id, now);
    const label = before.name === now.name ? 'profile picture' : before.name + ' → ' + now.name;
    return {
        userId: id,
        from: before.avatar === now.avatar ? before.name : before.name + ' (picture)',
        to: label,
        at: Date.now(),
    };
}

function announce(change: Change, user: any): void {
    if (!cfg.enabled) return;
    if (cfg.friendsOnly && !isFriend(change.userId)) return;
    const isAvatarOnly = change.from.includes('(picture)');
    if (isAvatarOnly && !cfg.avatars) return;
    toast(nameOf(user) + (isAvatarOnly ? ' changed their profile picture' : ' is now ' + nameOf(user)));
    note(change);
}

function handlePayload(payload: any): void {
    try {
        const list = Array.isArray(payload?.updates) ? payload.updates
            : Array.isArray(payload?.presences) ? payload.presences
            : [payload];
        for (const item of list) {
            const user = item?.user ?? item?.presence?.user ?? null;
            const userId = user?.id ?? item?.userId ?? item?.user_id;
            if (!user || !userId) continue;
            const change = compare(String(userId), user);
            if (change) announce(change, user);
        }
    } catch (e) {
        hostError('payload handling failed', e);
    }
}

export const engine = {
    compare,
    handlePayload,
    reset(): void {
        seen.clear();
    },
    entries(): Change[] {
        return [...(cfg.history ?? [])];
    },
    count(): number {
        return seen.size;
    },
    getConfig(): Settings {
        return { ...cfg };
    },
    setConfig(patch: Partial<Settings>): void {
        cfg = { ...cfg, ...patch };
    },
};

let cleanupFns: (() => void)[] = [];

function subscribe(): number {
    const flux: any = getValenced()?.discord?.flux;
    let installed = 0;
    for (const event of ['PRESENCE_UPDATE', 'PRESENCE_UPDATES', 'USER_UPDATE']) {
        try {
            if (typeof flux?.onFluxEventDispatched === 'function') {
                const off = flux.onFluxEventDispatched(event, (payload: any) => {
                    // USER_UPDATE carries a bare user object, not a presence.
                    if (event === 'USER_UPDATE') {
                        const user = payload?.user ?? payload;
                        const change = compare(String(user?.id ?? ''), user);
                        if (change) announce(change, user);
                        return payload;
                    }
                    handlePayload(payload);
                    return payload;
                });
                if (typeof off === 'function') {
                    cleanupFns.push(off);
                    installed++;
                }
            }
        } catch (e) {
            hostError('subscribe ' + event + ' failed', e);
        }
    }
    return installed;
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
    subscribe();
}

function stopNext(): void {
    while (cleanupFns.length) {
        try { cleanupFns.pop()?.(); } catch {}
    }
    seen.clear();
}

function buildSettings(api: any): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Text) return null;
    const el = React.createElement;
    // Hooks must run *inside* the component: calling useState while building the
    // page throws React's invalid-hook-call error and the settings tab renders
    // blank. So hand back a real component and resolve design parts per render.
    return function UserChangeAlertsSettings() {
    const D = getDesign();
    const [tick, setTick] = React.useState(0);
    const refresh = () => setTick((n: number) => n + 1);
    void tick;
    const toggle = (patch: Partial<Settings>) => {
        persist(patch);
        refresh();
    };
    const fmt = (at: number) => new Date(at).toLocaleString();

    if (D?.TableRowGroup && D?.TableSwitchRow && D?.TableRow) {
        const entries = engine.entries();
        return el(RN.ScrollView, { style: { flex: 1 } },
            el(D.TableRowGroup, { title: 'UserChangeAlerts' },
                el(D.TableSwitchRow, {
                    label: 'Alert on name changes',
                    subLabel: 'Toast when a username or display name changes.',
                    value: cfg.enabled,
                    onValueChange: (v: boolean) => toggle({ enabled: v }),
                }),
                el(D.TableSwitchRow, {
                    label: 'Include profile pictures',
                    subLabel: 'Also alert when an avatar changes.',
                    value: cfg.avatars,
                    onValueChange: (v: boolean) => toggle({ avatars: v }),
                }),
                el(D.TableSwitchRow, {
                    label: 'Friends only',
                    value: cfg.friendsOnly,
                    onValueChange: (v: boolean) => toggle({ friendsOnly: v }),
                })),
            el(D.TableRowGroup, { title: 'Recent changes (' + entries.length + ')' },
                entries.length === 0
                    ? el(D.TableRow, { label: 'Nothing yet', subLabel: 'Changes appear here once someone you have seen renames or changes picture.' })
                    : entries.map((c) => el(D.TableRow, { key: c.userId + c.at, label: c.to, subLabel: fmt(c.at) })),
                el(D.TableRow, {
                    label: 'Clear history',
                    onPress: () => { persist({ history: [] }); refresh(); },
                })),
        );
    }

    const entries = engine.entries();
    return el(RN.ScrollView, { style: { flex: 1, padding: 16 } },
        el(RN.Text, { style: { color: '#ffffff', fontSize: 18, fontWeight: '800' } }, 'UserChangeAlerts ' + PLUGIN_VERSION),
        el(RN.Pressable, {
            accessibilityLabel: 'Alert on name changes',
            onPress: () => toggle({ enabled: !cfg.enabled }),
            style: { paddingVertical: 8 },
        }, el(RN.Text, { style: { color: '#ffffff' } }, 'Alert on name changes: ' + (cfg.enabled ? 'on' : 'off'))),
        el(RN.Pressable, {
            accessibilityLabel: 'Include profile pictures',
            onPress: () => toggle({ avatars: !cfg.avatars }),
            style: { paddingVertical: 8 },
        }, el(RN.Text, { style: { color: '#ffffff' } }, 'Include profile pictures: ' + (cfg.avatars ? 'on' : 'off'))),
        el(RN.Pressable, {
            accessibilityLabel: 'Friends only',
            onPress: () => toggle({ friendsOnly: !cfg.friendsOnly }),
            style: { paddingVertical: 8 },
        }, el(RN.Text, { style: { color: '#ffffff' } }, 'Friends only: ' + (cfg.friendsOnly ? 'on' : 'off'))),
        el(RN.Text, { style: { color: '#ffffff', fontWeight: '700', marginTop: 12 } }, 'Recent changes (' + entries.length + ')'),
        entries.length === 0
            ? el(RN.Text, { style: { color: '#9ba0a8', marginTop: 4 } }, 'Nothing yet — changes appear here once someone you have seen renames or changes picture.')
            : entries.map((c) => el(RN.View, { key: c.userId + c.at, style: { paddingVertical: 4 } },
                el(RN.Text, { style: { color: '#ffffff' } }, c.to),
                el(RN.Text, { style: { color: '#9ba0a8' } }, fmt(c.at)))),
        el(RN.Pressable, {
            accessibilityLabel: 'Clear history',
            onPress: () => { persist({ history: [] }); refresh(); },
            style: { marginTop: 12, paddingVertical: 8 },
        }, el(RN.Text, { style: { color: '#5865F2' } }, 'Clear history')),
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
            if (!__built) __built = buildSettings(api);
            if (__built) return React.createElement(__built, { api });
        } catch (e) {
            hostError('settings build failed', e);
        }
        const RN: any = getRN() ?? {};
        return React.createElement(RN.Text ?? 'text', { style: { color: '#ffffff', padding: 12 } }, 'UserChangeAlerts settings could not load on this build.');
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
