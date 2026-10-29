// VoiceTime — how long you actually spent in voice, per day and per server.
//
// Discord shows nothing about your own voice time; this counts it from the same
// voice-state events the client already receives: a session starts when your
// channel id appears and stops when it clears. Everything stays on the device.
//
// The counter deliberately ignores every voice state that is not you, and it
// resumes correctly after a reload because the open session is stored too.

const PLUGIN_VERSION = '1.0.2';

interface Day {
    totalSec: number;
    byGuild: Record<string, number>;
}

interface Session {
    startedAt: number;
    guildId: string;
}

interface Settings {
    days: Record<string, Day>;
    session: Session | null;
}

const DEFAULTS: Settings = { days: {}, session: null };
const MAX_DAYS = 90;

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
        RN?.Alert?.alert?.('VoiceTime', message);
    } catch {}
}

function hostError(msg: string, e?: unknown): void {
    try {
        const logger = getValenced()?.logger ?? (typeof revenge !== 'undefined' ? revenge?.logger : null) ?? console;
        (logger?.error ?? logger?.log ?? (() => {})).call(logger, '[VoiceTime] ' + msg, e ?? '');
    } catch {}
}

let cfg: Settings = { ...DEFAULTS };
let jsonStorageApi: any = null;
let myId = '';

function dayKey(at = Date.now()): string {
    const d = new Date(at);
    const p = (n: number) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

function persist(patch: Partial<Settings>): void {
    cfg = { ...cfg, ...patch };
    try { void jsonStorageApi?.set?.(patch); } catch (e) { hostError('could not save', e); }
}

function guildName(guildId: string): string {
    claim: try {
        const g = getStores().GuildStore?.getGuild?.(guildId) ?? null;
        if (g?.name) return String(g.name);
        if (!guildId) return 'Direct call';
    } catch {}
    return guildId ? 'Server ' + guildId.slice(-6) : 'Direct call';
}

export function formatDuration(sec: number): string {
    const s = Math.max(0, Math.round(sec));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return h + 'h ' + m + 'm';
    if (m > 0) return m + 'm ' + (s % 60) + 's';
    return s + 's';
}

// Adds elapsed seconds to today, splitting by the server the call was in.
function credit(seconds: number, guildId: string, at = Date.now()): void {
    if (seconds <= 0) return;
    const key = dayKey(at);
    const days = { ...(cfg.days ?? {}) };
    const day: Day = days[key] ? { totalSec: days[key].totalSec, byGuild: { ...days[key].byGuild } } : { totalSec: 0, byGuild: {} };
    day.totalSec += seconds;
    const gid = guildId || 'dm';
    day.byGuild[gid] = (day.byGuild[gid] ?? 0) + seconds;
    days[key] = day;
    const keys = Object.keys(days).sort();
    while (keys.length > MAX_DAYS) {
        const oldest = keys.shift();
        if (oldest) delete days[oldest];
    }
    persist({ days });
}

// Feeds one voice-state payload. Returns true when the open session changed.
export function voiceState(userId: string, channelId: string | null, guildId: string): boolean {
    if (!myId || String(userId) !== String(myId)) return false;
    const session = cfg.session;
    if (channelId) {
        if (session && session.guildId === (guildId || '')) return false;
        if (session) {
            // Moved straight from one call to another: close the old one first.
            credit((Date.now() - session.startedAt) / 1000, session.guildId);
        }
        persist({ session: { startedAt: Date.now(), guildId: guildId || '' } });
        return true;
    }
    if (!session) return false;
    credit((Date.now() - session.startedAt) / 1000, session.guildId);
    persist({ session: null });
    return true;
}

function handlePayload(payload: any): void {
    try {
        const list = Array.isArray(payload?.voiceStates) ? payload.voiceStates : [payload?.voiceState ?? payload];
        for (const state of list) {
            if (!state) continue;
            const userId = state.userId ?? state.user_id ?? state.user?.id ?? '';
            if (!myId || String(userId) !== String(myId)) continue;
            const channelId = state.channelId ?? state.channel_id ?? null;
            const guildId = state.guildId ?? state.guild_id ?? '';
            voiceState(String(userId), channelId ? String(channelId) : null, String(guildId ?? ''));
        }
    } catch (e) {
        hostError('voice payload failed', e);
    }
}

export const engine = {
    voiceState,
    handlePayload,
    formatDuration,
    today(): Day {
        return (cfg.days ?? {})[dayKey()] ?? { totalSec: 0, byGuild: {} };
    },
    days(): { key: string; totalSec: number }[] {
        return Object.entries(cfg.days ?? {})
            .map(([key, day]) => ({ key, totalSec: day.totalSec }))
            .sort((a, b) => (a.key < b.key ? 1 : -1));
    },
    guildsToday(): { name: string; sec: number }[] {
        const day = engine.today();
        return Object.entries(day.byGuild ?? {})
            .map(([gid, sec]) => ({ name: guildName(gid === 'dm' ? '' : gid), sec }))
            .sort((a, b) => b.sec - a.sec);
    },
    liveSeconds(): number {
        return cfg.session ? (Date.now() - cfg.session.startedAt) / 1000 : 0;
    },
    resetToday(): void {
        const days = { ...(cfg.days ?? {}) };
        delete days[dayKey()];
        persist({ days });
    },
    setMyId(id: string): void {
        myId = String(id ?? '');
    },
    getConfig(): Settings {
        return JSON.parse(JSON.stringify(cfg));
    },
    setConfig(patch: Partial<Settings>): void {
        cfg = { ...cfg, ...patch };
    },
};

let cleanupFns: (() => void)[] = [];

function subscribe(): number {
    const flux: any = getValenced()?.discord?.flux;
    let installed = 0;
    for (const event of ['VOICE_STATE_UPDATE', 'VOICE_STATE_UPDATES']) {
        try {
            if (typeof flux?.onFluxEventDispatched !== 'function') break;
            const off = flux.onFluxEventDispatched(event, (payload: any) => {
                handlePayload(payload);
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
    return installed;
}

async function startNext(api: any): Promise<void> {
    jsonStorageApi = api?.jsonStorage ?? null;
    try { await jsonStorageApi?.get?.(); } catch {}
    try {
        const saved = jsonStorageApi?.use?.() ?? null;
        if (saved && typeof saved === 'object') cfg = { ...DEFAULTS, ...saved };
    } catch (e) {
        hostError('could not load voice time', e);
    }
    try {
        myId = String(getStores().UserStore?.getCurrentUser?.()?.id ?? '');
    } catch {}
    subscribe();
}

function stopNext(): void {
    while (cleanupFns.length) {
        try { cleanupFns.pop()?.(); } catch {}
    }
    // Bank the open session so a stop mid-call never loses time.
    if (cfg.session) {
        credit((Date.now() - cfg.session.startedAt) / 1000, cfg.session.guildId);
        persist({ session: null });
    }
}

function buildSettings(): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Text) return null;
    const el = React.createElement;
    // Hooks must run *inside* the component: calling useState while building the
    // page throws React's invalid-hook-call error and the settings tab renders
    // blank. So hand back a real component and resolve design parts per render.
    return function VoiceTimeSettings() {
    const D = getDesign();
    const [tick, setTick] = React.useState(0);
    const refresh = () => setTick((n: number) => n + 1);
    void tick;

    const today = engine.today();
    const live = engine.liveSeconds();
    const days = engine.days().slice(0, 7);

    if (D?.TableRowGroup && D?.TableRow) {
        return el(RN.ScrollView, { style: { flex: 1 } },
            el(D.TableRowGroup, { title: 'VoiceTime' },
                el(D.TableRow, {
                    label: 'Today: ' + formatDuration(today.totalSec),
                    subLabel: cfg.session ? 'In a call right now · ' + formatDuration(live) : 'Not in a call',
                }),
                el(D.TableRow, { label: 'Reset today', onPress: () => { engine.resetToday(); refresh(); } })),
            el(D.TableRowGroup, { title: 'Where the time went' },
                engine.guildsToday().length === 0
                    ? el(D.TableRow, { label: 'Nothing today yet', subLabel: 'Join a voice channel and this fills in.' })
                    : engine.guildsToday().map((g) => el(D.TableRow, { key: g.name, label: g.name, subLabel: formatDuration(g.sec) }))),
            el(D.TableRowGroup, { title: 'Recent days' },
                days.length === 0
                    ? el(D.TableRow, { label: 'No history yet' })
                    : days.map((d) => el(D.TableRow, { key: d.key, label: d.key, subLabel: formatDuration(d.totalSec) }))),
        );
    }

    return el(RN.ScrollView, { style: { flex: 1, padding: 16 } },
        el(RN.Text, { style: { color: '#ffffff', fontSize: 18, fontWeight: '800' } }, 'VoiceTime ' + PLUGIN_VERSION),
        el(RN.Text, { style: { color: '#ffffff', marginTop: 8 } }, 'Today: ' + formatDuration(today.totalSec)),
        el(RN.Text, { style: { color: '#9ba0a8' } }, cfg.session ? 'In a call right now · ' + formatDuration(live) : 'Not in a call'),
        engine.guildsToday().map((g) => el(RN.View, { key: g.name, style: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 } },
            el(RN.Text, { style: { color: '#ffffff' } }, g.name),
            el(RN.Text, { style: { color: '#9ba0a8' } }, formatDuration(g.sec)))),
        el(RN.Text, { style: { color: '#ffffff', fontWeight: '700', marginTop: 12 } }, 'Recent days'),
        days.map((d) => el(RN.View, { key: d.key, style: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 } },
            el(RN.Text, { style: { color: '#ffffff' } }, d.key),
            el(RN.Text, { style: { color: '#9ba0a8' } }, formatDuration(d.totalSec)))),
        el(RN.Pressable, { accessibilityLabel: 'Reset today', onPress: () => { engine.resetToday(); refresh(); }, style: { marginTop: 12 } },
            el(RN.Text, { style: { color: '#f04747' } }, 'Reset today')),
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
        return React.createElement(RN.Text ?? 'text', { style: { color: '#ffffff', padding: 12 } }, 'VoiceTime settings could not load on this build.');
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
