// VoiceTime — how long you actually spent in voice, per day, per server and per
// person. A phone port of the desktop voiceStats + voiceStatsLeaderboard +
// voiceStatsHistory trio, folded into one plugin: desktop keeps a shared
// VoiceStats_totals DataStore, the phone has no such store to share, so the
// totals are collected here instead.
//
// Discord shows nothing about your own voice time; this counts it from the same
// voice-state events the client already receives: a session starts when your
// channel id appears and stops when it clears. Whoever shares that channel while
// the session runs is credited too, which is what the leaderboard and the daily
// history are made of. Everything stays on the device.
//
// The counter deliberately ignores voice states outside your own channel, and it
// resumes correctly after a reload because the open session is stored too.

const PLUGIN_VERSION = '1.1.0';

interface Day {
    totalSec: number;
    byGuild: Record<string, number>;
}

interface Session {
    startedAt: number;
    guildId: string;
    channelId: string;
}

interface Person {
    totalSec: number;
    days: Record<string, number>;
}

interface Settings {
    days: Record<string, Day>;
    session: Session | null;
    people: Record<string, Person>;
}

const DEFAULTS: Settings = { days: {}, session: null, people: {} };
const MAX_DAYS = 90;
const MAX_PEOPLE = 100;
const HISTORY_DAYS = 14;
const RECENT_DAYS = 7;

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
// Who is in the same call as you right now. Kept in memory: voice states arrive
// again after a reload, and the open session is what survives one.
let present: Record<string, boolean> = {};

function dayKey(at = Date.now()): string {
    const d = new Date(at);
    const p = (n: number) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

function dateAgo(n: number): string {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return dayKey(d.getTime());
}

function persist(patch: Partial<Settings>): void {
    cfg = { ...cfg, ...patch };
    try { void jsonStorageApi?.set?.(patch); } catch (e) { hostError('could not save', e); }
}

function guildName(guildId: string): string {
    try {
        const g = getStores().GuildStore?.getGuild?.(guildId) ?? null;
        if (g?.name) return String(g.name);
        if (!guildId) return 'Direct call';
    } catch {}
    return guildId ? 'Server ' + guildId.slice(-6) : 'Direct call';
}

function personName(userId: string): string {
    try {
        const u = getStores().UserStore?.getUser?.(userId) ?? null;
        const name = u?.globalName ?? u?.username ?? '';
        if (name) return String(name);
    } catch {}
    return userId ? 'User ' + String(userId).slice(-4) : 'Unknown';
}

export function formatDuration(sec: number): string {
    const s = Math.max(0, Math.round(sec));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return h + 'h ' + m + 'm';
    if (m > 0) return m + 'm ' + (s % 60) + 's';
    return s + 's';
}

function trimDays(days: Record<string, Day>): void {
    const keys = Object.keys(days).sort();
    while (keys.length > MAX_DAYS) {
        const oldest = keys.shift();
        if (oldest) delete days[oldest];
    }
}

function trimPersonDays(days: Record<string, number>): void {
    const keys = Object.keys(days).sort();
    while (keys.length > MAX_DAYS) {
        const oldest = keys.shift();
        if (oldest) delete days[oldest];
    }
}

function trimPeople(people: Record<string, Person>): void {
    const ids = Object.keys(people);
    if (ids.length <= MAX_PEOPLE) return;
    ids.sort((a, b) => people[b].totalSec - people[a].totalSec);
    for (const id of ids.slice(MAX_PEOPLE)) delete people[id];
}

function recentSeconds(days: Record<string, number>, span = HISTORY_DAYS): number {
    let sum = 0;
    for (let i = 0; i < span; i++) sum += days[dateAgo(i)] ?? 0;
    return sum;
}

// Banks the time since the session last settled. Called on every voice event and
// on stop, so a long call is never one giant jump at the end: the per-person
// totals need the same slices the day totals get. Attributes the slice to the day
// it started on, and moves the session's timestamp forward so the next slice
// begins where this one ended.
function settle(at = Date.now()): number {
    const session = cfg.session;
    if (!session || !session.startedAt) return 0;
    const seconds = (at - session.startedAt) / 1000;
    if (!(seconds > 0)) return 0;

    const key = dayKey(session.startedAt);
    const days = { ...(cfg.days ?? {}) };
    const day: Day = days[key]
        ? { totalSec: days[key].totalSec, byGuild: { ...days[key].byGuild } }
        : { totalSec: 0, byGuild: {} };
    day.totalSec += seconds;
    const gid = session.guildId || 'dm';
    day.byGuild[gid] = (day.byGuild[gid] ?? 0) + seconds;
    days[key] = day;
    trimDays(days);

    const people = { ...(cfg.people ?? {}) };
    for (const uid of Object.keys(present)) {
        if (!uid || String(uid) === String(myId)) continue;
        const prev = people[uid];
        const next: Person = { totalSec: (prev?.totalSec ?? 0) + seconds, days: { ...(prev?.days ?? {}) } };
        next.days[key] = (next.days[key] ?? 0) + seconds;
        trimPersonDays(next.days);
        people[uid] = next;
    }
    trimPeople(people);

    persist({ days, people, session: { ...session, startedAt: at } });
    return seconds;
}

// Feeds one voice-state payload. Returns true when the open session changed.
// `at` exists so the counter can be driven with a known clock.
export function voiceState(userId: string, channelId: string | null, guildId: string, at = Date.now()): boolean {
    if (!myId || String(userId) !== String(myId)) return false;
    const session = cfg.session;
    if (channelId) {
        const next = String(channelId);
        if (session && session.channelId === next) {
            // Same call: bank what has elapsed and keep it open.
            settle(at);
            return false;
        }
        // Moved straight from one call to another: close the old one first, and
        // forget its occupants — the new channel's states arrive next.
        settle(at);
        present = {};
        persist({ session: { startedAt: at, guildId: String(guildId || ''), channelId: next } });
        return true;
    }
    if (!session) return false;
    settle(at);
    present = {};
    persist({ session: null });
    return true;
}

function handlePayload(payload: any, at = Date.now()): void {
    try {
        const list = Array.isArray(payload?.voiceStates) ? payload.voiceStates : [payload?.voiceState ?? payload];
        const states = list.filter(Boolean);
        // Bank first, with the presence that was true for the last slice.
        settle(at);
        const userIdOf = (state: any) => String(state?.userId ?? state?.user_id ?? state?.user?.id ?? '');
        const channelOf = (state: any) => {
            const id = state?.channelId ?? state?.channel_id ?? null;
            return id ? String(id) : null;
        };
        for (const state of states) {
            const userId = userIdOf(state);
            if (!userId || userId !== String(myId)) continue;
            voiceState(userId, channelOf(state), String(state.guildId ?? state.guild_id ?? ''), at);
        }
        // Then update who is with you, against the session that is now open.
        const session = cfg.session;
        for (const state of states) {
            const userId = userIdOf(state);
            if (!userId || userId === String(myId)) continue;
            const channelId = channelOf(state);
            if (session && channelId && channelId === session.channelId) present[userId] = true;
            else delete present[userId];
        }
    } catch (e) {
        hostError('voice payload failed', e);
    }
}

export const engine = {
    voiceState,
    handlePayload,
    settle,
    formatDuration,
    personName,
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
    // Everyone you have shared a call with, biggest total first.
    leaderboard(): { id: string; name: string; totalSec: number; todaySec: number; recentSec: number }[] {
        return Object.entries(cfg.people ?? {})
            .map(([id, person]) => ({
                id,
                name: personName(id),
                totalSec: person.totalSec,
                todaySec: person.days?.[dayKey()] ?? 0,
                recentSec: recentSeconds(person.days ?? {}),
            }))
            .filter((p) => p.totalSec > 0)
            .sort((a, b) => b.totalSec - a.totalSec);
    },
    historyFor(id: string, span = HISTORY_DAYS): { date: string; secs: number }[] {
        const days = cfg.people?.[id]?.days ?? {};
        return Array.from({ length: span }, (_, i) => {
            const date = dateAgo(span - 1 - i);
            return { date, secs: days[date] ?? 0 };
        });
    },
    liveSeconds(): number {
        return cfg.session ? (Date.now() - cfg.session.startedAt) / 1000 : 0;
    },
    liveChannelId(): string {
        return cfg.session?.channelId ?? '';
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
        const saved: any = jsonStorageApi?.use?.() ?? null;
        if (saved && typeof saved === 'object') {
            cfg = {
                days: { ...(saved.days ?? {}) },
                people: { ...(saved.people ?? {}) },
                session: saved.session ?? null,
            };
        }
    } catch (e) {
        hostError('could not load voice time', e);
    }
    try {
        myId = String(getStores().UserStore?.getCurrentUser?.()?.id ?? '');
    } catch {}
    present = {};
    subscribe();
}

function stopNext(): void {
    while (cleanupFns.length) {
        try { cleanupFns.pop()?.(); } catch {}
    }
    // Bank the open session so a stop mid-call never loses time.
    if (cfg.session) {
        settle();
        present = {};
        persist({ session: null });
    }
}

type Tab = 'overview' | 'leaderboard' | 'history';

function buildSettings(): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Text) return null;
    const el = React.createElement;
    const TABS: { key: Tab; label: string }[] = [
        { key: 'overview', label: 'Today' },
        { key: 'leaderboard', label: 'Leaderboard' },
        { key: 'history', label: 'History' },
    ];
    // Hooks must run *inside* the component: calling useState while building the
    // page throws React's invalid-hook-call error and the settings tab renders
    // blank. So hand back a real component and resolve design parts per render.
    return function VoiceTimeSettings() {
        const D = getDesign();
        const [tab, setTabState] = React.useState('overview' as Tab);
        const [who, setWho] = React.useState(null as string | null);
        const [tick, setTick] = React.useState(0);
        const setTab = (next: Tab) => setTabState(next);
        const refresh = () => setTick((n: number) => n + 1);
        void tick;

        const today = engine.today();
        const live = engine.liveSeconds();
        const recent = engine.days().slice(0, RECENT_DAYS);
        const people = engine.leaderboard();
        const selected = who ?? people[0]?.id ?? null;
        const history = selected ? engine.historyFor(selected, HISTORY_DAYS) : [];
        const selectedPerson = people.find((p) => p.id === selected) ?? null;
        const maxDay = Math.max(1, ...history.map((d) => d.secs));

        const row = (key: string, label: string, sub: string, onPress?: () => void) => {
            if (D?.TableRow) return el(D.TableRow, { key, label, subLabel: sub, onPress });
            const kids: any[] = [el(RN.Text, { key: 'l', style: { color: '#ffffff', fontSize: 14 } }, label)];
            if (sub) kids.push(el(RN.Text, { key: 's', style: { color: '#9ba0a8', fontSize: 12, marginTop: 2 } }, sub));
            const style = { paddingVertical: 8, paddingHorizontal: 4 };
            return onPress
                ? el(RN.Pressable, { key, accessibilityLabel: label, onPress, style }, ...kids)
                : el(RN.View, { key, style }, ...kids);
        };
        const heading = (key: string, text: string) =>
            el(RN.Text, {
                key,
                style: { color: '#9ba0a8', fontSize: 11, fontWeight: '700', marginTop: 16, marginBottom: 2, letterSpacing: 0.6 },
            }, text.toUpperCase());
        const chip = (key: string, label: string, active: boolean, onPress: () => void) =>
            el(RN.Pressable, {
                key,
                accessibilityLabel: label,
                onPress,
                style: {
                    backgroundColor: active ? '#5865F2' : '#2b2d31',
                    borderRadius: 16,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    marginRight: 8,
                    marginTop: 8,
                },
            }, el(RN.Text, { style: { color: active ? '#ffffff' : '#dbdee1', fontSize: 12, fontWeight: '700' } }, label));

        let body: any;
        if (tab === 'leaderboard') {
            body = people.length === 0
                ? row('empty', 'No one tracked yet', 'Join a voice channel with people and their time starts counting.')
                : [
                    row('count', people.length + ' tracked', 'Total time you have been in voice together.'),
                    ...people.map((p, i) => row(
                        p.id,
                        (i === 0 ? '1. ' : i === 1 ? '2. ' : i === 2 ? '3. ' : (i + 1) + '. ') + p.name + (p.id === myId ? ' (you)' : ''),
                        'Today ' + formatDuration(p.todaySec) + ' · last ' + HISTORY_DAYS + 'd ' + formatDuration(p.recentSec) + ' · total ' + formatDuration(p.totalSec),
                    )),
                ];
        } else if (tab === 'history') {
            body = people.length === 0
                ? row('empty', 'No history yet', 'Time spent together is recorded per day once you are both in a call.')
                : [
                    el(RN.ScrollView, {
                        key: 'who',
                        horizontal: true,
                        showsHorizontalScrollIndicator: false,
                        style: { marginTop: 8 },
                    }, ...people.slice(0, 12).map((p) => chip(p.id, p.name + (p.id === myId ? ' (you)' : ''), p.id === selected, () => setWho(p.id)))),
                    selectedPerson
                        ? row('summary', selectedPerson.name, 'Last ' + HISTORY_DAYS + 'd ' + formatDuration(selectedPerson.recentSec) + ' · best day ' + formatDuration(Math.max(1, ...history.map((d) => d.secs))) + ' · today ' + formatDuration(selectedPerson.todaySec))
                        : null,
                    el(RN.View, { key: 'chart', style: { flexDirection: 'row', alignItems: 'flex-end', height: 108, marginTop: 10 } },
                        ...history.map((d, i) => el(RN.View, {
                            key: d.date,
                            style: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginHorizontal: 1 },
                        },
                            el(RN.View, {
                                style: {
                                    width: '74%',
                                    height: Math.max(2, Math.round((d.secs / maxDay) * 84)),
                                    borderRadius: 3,
                                    backgroundColor: d.date === dayKey() ? '#5865F2' : (d.secs > 0 ? '#4e5a8a' : '#232428'),
                                },
                            }),
                            i % 3 === 0 ? el(RN.Text, { style: { color: '#9ba0a8', fontSize: 8, marginTop: 2 } }, d.date.slice(8)) : null)),
                    ),
                    heading('recent', 'Last active days'),
                    ...history.filter((d) => d.secs > 0).slice(-7).reverse()
                        .map((d) => row(d.date, d.date, formatDuration(d.secs))),
                ];
        } else {
            body = [
                row('today', 'Today: ' + formatDuration(today.totalSec), cfg.session ? 'In a call right now · ' + formatDuration(live) : 'Not in a call'),
                row('reset', 'Reset today', 'Clears your own time for today only.', () => { engine.resetToday(); refresh(); }),
                heading('guilds', 'Where the time went'),
                engine.guildsToday().length === 0
                    ? row('noguild', 'Nothing today yet', 'Join a voice channel and this fills in.')
                    : engine.guildsToday().map((g) => row(g.name, g.name, formatDuration(g.sec))),
                heading('days', 'Recent days'),
                recent.length === 0
                    ? row('noday', 'No history yet', '')
                    : recent.map((d) => row(d.key, d.key, formatDuration(d.totalSec))),
            ];
        }

        return el(RN.ScrollView, { style: { flex: 1, backgroundColor: '#1e1f22' } },
            el(RN.View, { style: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 30 } },
                el(RN.Text, { style: { color: '#ffffff', fontSize: 18, fontWeight: '800' } }, 'VoiceTime ' + PLUGIN_VERSION),
                el(RN.Text, { style: { color: '#9ba0a8', fontSize: 12, marginTop: 2 } },
                    cfg.session ? 'In a call · ' + formatDuration(live) : 'Not in a call'),
                el(RN.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false },
                    ...TABS.map((t) => chip(t.key, t.label, tab === t.key, () => setTab(t.key)))),
                body,
            ));
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
