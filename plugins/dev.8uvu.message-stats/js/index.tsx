// Message Stats — how many messages you send and receive, per channel, per
// server and per day. A phone port of Epitav 8uvu's Equicord MessageStats plugin.
//
// Desktop counts sends through `onBeforeMessageSend` and receives through the
// MESSAGE_CREATE flux event; a phone has no before-send hook, so both directions
// are counted from MESSAGE_CREATE — the author is you or it is not. Nothing here
// patches Discord's own components: it subscribes to one event, keeps counters
// on the device and renders its own settings page, so there is no stock UI to
// break.
//
// Writes are debounced: a busy channel would otherwise hit storage once per
// message. The counters are always live in memory, and stop() flushes the rest.

const PLUGIN_VERSION = '1.0.0';

interface Counts {
    sent: number;
    received: number;
}

interface Settings {
    channels: Record<string, Counts>;
    daily: Record<string, Counts>;
    tracking: boolean;
    trackDMs: boolean;
}

const DEFAULTS: Settings = { channels: {}, daily: {}, tracking: true, trackDMs: false };
const MAX_DAYS = 400;
const MAX_CHANNELS = 1000;
const FLUSH_MS = 2000;
const CHART_DAYS = 7;

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

function hostError(msg: string, e?: unknown): void {
    try {
        const logger = getValenced()?.logger ?? (typeof revenge !== 'undefined' ? revenge?.logger : null) ?? console;
        (logger?.error ?? logger?.log ?? (() => {})).call(logger, '[MessageStats] ' + msg, e ?? '');
    } catch {}
}

let cfg: Settings = { ...DEFAULTS };
let jsonStorageApi: any = null;
let myId = '';
let status = 'not started';
let dirty = false;
let flushTimer: any = null;

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

function isDM(guildId: string | null | undefined): boolean {
    return !guildId || guildId === '@me';
}

function channelPath(guildId: string | null | undefined, channelId: string): string {
    return (isDM(guildId) ? 'dm_' : 'guild_' + guildId + '_') + channelId;
}

function persist(patch: Partial<Settings>): void {
    cfg = { ...cfg, ...patch };
    try { void jsonStorageApi?.set?.(patch); } catch (e) { hostError('could not save', e); }
}

function markDirty(): void {
    dirty = true;
    if (flushTimer) return;
    flushTimer = setTimeout(() => { flushTimer = null; flush(); }, FLUSH_MS);
}

// Writes every counter once per burst instead of once per message.
function flush(): void {
    if (!dirty) return;
    dirty = false;
    persist({ channels: cfg.channels, daily: cfg.daily, tracking: cfg.tracking, trackDMs: cfg.trackDMs });
}

function trim(daily: Record<string, Counts>): void {
    const keys = Object.keys(daily).sort();
    while (keys.length > MAX_DAYS) {
        const oldest = keys.shift();
        if (oldest) delete daily[oldest];
    }
}

function trimChannels(channels: Record<string, Counts>): void {
    const keys = Object.keys(channels);
    if (keys.length <= MAX_CHANNELS) return;
    keys.sort((a, b) => (channels[b].sent + channels[b].received) - (channels[a].sent + channels[a].received));
    for (const key of keys.slice(MAX_CHANNELS)) delete channels[key];
}

function bump(map: Record<string, Counts>, key: string, kind: 'sent' | 'received'): void {
    const prev = map[key];
    const next: Counts = { sent: prev?.sent ?? 0, received: prev?.received ?? 0 };
    next[kind] += 1;
    map[key] = next;
}

// Counts one payload. Returns true when it was counted.
function handleMessage(payload: any, at = Date.now()): boolean {
    try {
        if (!cfg.tracking) return false;
        const message = payload?.message ?? payload;
        const channelId = String(message?.channelId ?? message?.channel_id ?? payload?.channelId ?? payload?.channel_id ?? '');
        if (!channelId) return false;
        const authorId = String(message?.author?.id ?? message?.authorId ?? payload?.authorId ?? '');
        const guildId = String(
            message?.guildId ?? message?.guild_id ?? payload?.guildId ?? payload?.guild_id
            ?? getStores().ChannelStore?.getChannel?.(channelId)?.guild_id ?? '',
        );
        if (isDM(guildId) && !cfg.trackDMs) return false;
        const kind: 'sent' | 'received' = authorId && String(authorId) === String(myId) ? 'sent' : 'received';
        const channels = { ...(cfg.channels ?? {}) };
        bump(channels, channelPath(guildId, channelId), kind);
        trimChannels(channels);
        const daily = { ...(cfg.daily ?? {}) };
        bump(daily, dayKey(at), kind);
        trim(daily);
        cfg = { ...cfg, channels, daily };
        markDirty();
        return true;
    } catch (e) {
        hostError('could not count a message', e);
        return false;
    }
}

function channelName(channelId: string): string {
    try {
        const ch = getStores().ChannelStore?.getChannel?.(channelId) ?? null;
        const name = ch?.name ?? ch?.recipients?.map?.((u: any) => u?.globalName ?? u?.username).filter(Boolean).join(', ');
        if (name) return String(name);
    } catch {}
    return channelId ? 'Channel ' + channelId.slice(-4) : 'Unknown';
}

function channelStats(channelId: string, guildId?: string | null): Counts {
    if (!channelId) return { sent: 0, received: 0 };
    const gid = guildId ?? String(getStores().ChannelStore?.getChannel?.(channelId)?.guild_id ?? '');
    return { ...(cfg.channels?.[channelPath(gid, channelId)] ?? { sent: 0, received: 0 }) };
}

function serverStats(guildId: string | null | undefined): Counts {
    if (isDM(guildId)) return { sent: 0, received: 0 };
    const prefix = 'guild_' + guildId + '_';
    let sent = 0;
    let received = 0;
    for (const [key, counts] of Object.entries(cfg.channels ?? {})) {
        if (!key.startsWith(prefix)) continue;
        sent += counts.sent;
        received += counts.received;
    }
    return { sent, received };
}

function totalStats(): Counts {
    let sent = 0;
    let received = 0;
    for (const counts of Object.values(cfg.channels ?? {})) {
        sent += counts.sent;
        received += counts.received;
    }
    return { sent, received };
}

function dayStats(key: string): Counts {
    return { ...(cfg.daily?.[key] ?? { sent: 0, received: 0 }) };
}

function weekStats(): Counts {
    const keys = new Set(Array.from({ length: CHART_DAYS }, (_, i) => dateAgo(i)));
    let sent = 0;
    let received = 0;
    for (const [key, counts] of Object.entries(cfg.daily ?? {})) {
        if (!keys.has(key)) continue;
        sent += counts.sent;
        received += counts.received;
    }
    return { sent, received };
}

function dailySeries(span = CHART_DAYS): { date: string; sent: number; received: number; total: number }[] {
    return Array.from({ length: span }, (_, i) => {
        const date = dateAgo(span - 1 - i);
        const counts = dayStats(date);
        return { date, sent: counts.sent, received: counts.received, total: counts.sent + counts.received };
    });
}

function topChannels(guildId: string | null | undefined, limit = 10): { id: string; name: string; total: number; sent: number; received: number }[] {
    const prefix = isDM(guildId) ? 'dm_' : 'guild_' + guildId + '_';
    const rows: { id: string; name: string; total: number; sent: number; received: number }[] = [];
    for (const [key, counts] of Object.entries(cfg.channels ?? {})) {
        if (!key.startsWith(prefix)) continue;
        const id = key.slice(prefix.length);
        rows.push({
            id,
            name: isDM(guildId) ? channelName(id) : '#' + channelName(id),
            total: counts.sent + counts.received,
            sent: counts.sent,
            received: counts.received,
        });
    }
    return rows.sort((a, b) => b.total - a.total).slice(0, limit);
}

function reset(): void {
    cfg = { ...cfg, channels: {}, daily: {} };
    dirty = false;
    if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
    persist({ channels: {}, daily: {} });
}

function currentChannelId(): string {
    try {
        const s = getStores().SelectedChannelStore;
        return String(s?.getChannelId?.() ?? s?.getSelectedChannelId?.() ?? '');
    } catch {
        return '';
    }
}

function currentGuildId(channelId: string): string {
    try {
        const s = getStores().SelectedGuildStore;
        const id = s?.getGuildId?.();
        if (id) return String(id);
    } catch {}
    try {
        return String(getStores().ChannelStore?.getChannel?.(channelId)?.guild_id ?? '');
    } catch {
        return '';
    }
}

function formatNumber(n: number): string {
    return Math.max(0, Math.round(n)).toLocaleString();
}

export const engine = {
    handleMessage,
    flush,
    channelStats,
    serverStats,
    totalStats,
    today: () => dayStats(dayKey()),
    week: weekStats,
    dailySeries,
    topChannels,
    channelName,
    reset,
    status: () => status,
    setTracking(on: boolean): void {
        cfg = { ...cfg, tracking: on };
        persist({ tracking: on });
    },
    setTrackDMs(on: boolean): void {
        cfg = { ...cfg, trackDMs: on };
        persist({ trackDMs: on });
    },
    getConfig(): Settings {
        return JSON.parse(JSON.stringify(cfg));
    },
    setMyId(id: string): void {
        myId = String(id ?? '');
    },
};

let cleanupFns: (() => void)[] = [];

function subscribe(): void {
    const flux: any = getValenced()?.discord?.flux;
    let installed = 0;
    try {
        if (typeof flux?.onFluxEventDispatched === 'function') {
            const off = flux.onFluxEventDispatched('MESSAGE_CREATE', (payload: any) => {
                handleMessage(payload);
                return payload;
            });
            if (typeof off === 'function') {
                cleanupFns.push(off);
                installed++;
            }
        }
    } catch (e) {
        hostError('could not subscribe to MESSAGE_CREATE', e);
    }
    status = installed ? 'counting' : 'no MESSAGE_CREATE event on this build';
}

async function startNext(api: any): Promise<void> {
    jsonStorageApi = api?.jsonStorage ?? null;
    try { await jsonStorageApi?.get?.(); } catch {}
    let saved: any = null;
    try { saved = jsonStorageApi?.use?.() ?? null; } catch {}
    if (saved && typeof saved === 'object') {
        cfg = {
            channels: { ...(saved.channels ?? {}) },
            daily: { ...(saved.daily ?? {}) },
            tracking: saved.tracking !== false,
            trackDMs: saved.trackDMs === true,
        };
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
    if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
    flush();
    status = 'stopped';
}

type Tab = 'channel' | 'server' | 'total' | 'daily';

function buildSettings(): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Text) return null;
    const el = React.createElement;
    const TABS: { key: Tab; label: string }[] = [
        { key: 'channel', label: 'Channel' },
        { key: 'server', label: 'Server' },
        { key: 'total', label: 'Total' },
        { key: 'daily', label: 'Daily' },
    ];
    return function MessageStatsSettings() {
        const D = getDesign();
        const [tab, setTabState] = React.useState('channel' as Tab);
        const [confirmReset, setConfirmReset] = React.useState(false);
        const [tick, setTick] = React.useState(0);
        const setTab = (next: Tab) => setTabState(next);
        const refresh = () => setTick((n: number) => n + 1);
        void tick;

        const channelId = currentChannelId();
        const guildId = channelId ? currentGuildId(channelId) : '';
        const inDM = isDM(guildId);
        const channel = channelStats(channelId, guildId);
        const server = serverStats(guildId);
        const total = totalStats();
        const today = engine.today();
        const week = weekStats();
        const series = dailySeries();
        const maxDay = Math.max(1, ...series.map((d) => d.total));

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

        const counts = (key: string, label: string, c: Counts) =>
            row(key, label, 'Sent ' + formatNumber(c.sent) + ' · received ' + formatNumber(c.received) + ' · total ' + formatNumber(c.sent + c.received));

        let body: any;
        if (tab === 'server') {
            body = inDM || !guildId
                ? row('nodm', 'Not in a server channel', 'Open a server channel to see that server\'s totals.')
                : [
                    counts('server', 'This server', server),
                    heading('top', 'Busiest channels'),
                    ...(topChannels(guildId).length
                        ? topChannels(guildId).map((c) => row(c.id, c.name, formatNumber(c.total) + ' messages'))
                        : [row('none', 'Nothing counted here yet', 'Send or receive a message and it appears.')]),
                ];
        } else if (tab === 'total') {
            body = [
                counts('total', 'Everything counted', total),
                counts('today', 'Today', today),
                counts('week', 'Last ' + CHART_DAYS + ' days', week),
            ];
        } else if (tab === 'daily') {
            body = [
                counts('week', 'Last ' + CHART_DAYS + ' days', week),
                el(RN.View, { key: 'chart', style: { flexDirection: 'row', alignItems: 'flex-end', height: 108, marginTop: 10 } },
                    ...series.map((d, i) => el(RN.View, {
                        key: d.date,
                        style: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginHorizontal: 1 },
                    },
                        el(RN.Text, { style: { color: '#9ba0a8', fontSize: 9, marginBottom: 2 } }, d.total ? String(d.total) : ''),
                        el(RN.View, {
                            style: {
                                width: '74%',
                                height: Math.max(2, Math.round((d.total / maxDay) * 76)),
                                borderRadius: 3,
                                backgroundColor: d.date === dayKey() ? '#5865F2' : (d.total > 0 ? '#4e5a8a' : '#232428'),
                            },
                        }),
                        el(RN.Text, { style: { color: '#9ba0a8', fontSize: 8, marginTop: 2 } }, d.date.slice(8)))),
                ),
                heading('days', 'Per day'),
                ...series.slice().reverse().map((d) => row(d.date, d.date, 'Sent ' + formatNumber(d.sent) + ' · received ' + formatNumber(d.received) + ' · total ' + formatNumber(d.total))),
            ];
        } else {
            body = [
                counts('channel', channelId ? channelName(channelId) : 'No channel open', channel),
                counts('today', 'Today', today),
                row('tracking', 'Track messages: ' + (cfg.tracking ? 'On' : 'Off'), 'Tap to switch counting on or off.', () => {
                    engine.setTracking(!cfg.tracking); refresh();
                }),
                row('dms', 'Track DMs: ' + (cfg.trackDMs ? 'On' : 'Off'), 'Direct messages are skipped while this is off.', () => {
                    engine.setTrackDMs(!cfg.trackDMs); refresh();
                }),
            ];
        }

        return el(RN.ScrollView, { style: { flex: 1, backgroundColor: '#1e1f22' } },
            el(RN.View, { style: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 30 } },
                el(RN.Text, { style: { color: '#ffffff', fontSize: 18, fontWeight: '800' } }, 'Message Stats ' + PLUGIN_VERSION),
                el(RN.Text, { style: { color: '#9ba0a8', fontSize: 12, marginTop: 2 } },
                    status === 'counting' ? 'Counting messages' : status),
                el(RN.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false },
                    ...TABS.map((t) => chip(t.key, t.label, tab === t.key, () => setTab(t.key)))),
                body,
                el(RN.Pressable, {
                    key: 'reset',
                    accessibilityLabel: confirmReset ? 'Tap again to clear' : 'Reset stats',
                    onPress: () => {
                        if (!confirmReset) { setConfirmReset(true); return; }
                        engine.reset();
                        setConfirmReset(false);
                        refresh();
                    },
                    style: { marginTop: 18, paddingVertical: 8 },
                }, el(RN.Text, { style: { color: '#f04747', fontSize: 13 } },
                    confirmReset ? 'Tap again to clear every count' : 'Reset stats')),
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
        return React.createElement(RN.Text ?? 'text', { style: { color: '#ffffff', padding: 12 } }, 'Message Stats settings could not load on this build.');
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
