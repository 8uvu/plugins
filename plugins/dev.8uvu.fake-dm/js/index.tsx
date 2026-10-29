// FakeDM — mobile port of Epitav 8uvu's Equicord fakeDM plugin
// (C:\Users\Epitaph\Equicord\src\userplugins\fakeDM — read-only reference).
//
// Injects fake local messages, calls, system messages, reactions and embeds
// into any DM or channel through Discord's own FluxDispatcher, persists them
// across restarts, and can batch-inject a whole fake conversation from a
// simple "[14:30] Name: text" script.
//
const PLUGIN_VERSION = '2.0.0';

// The chat-bar button is here too, but as a wrapper around Discord's chat row
// rather than a portal: the row is handed back untouched and the Fake pill is a
// sibling, because editing that row is what broke the message box on a phone.
// Context-menu edit and CSS have no Revenge equivalent — everything else lives
// in the plugin's settings page, organized into tabs. Clearing fakes dispatches
// MESSAGE_DELETE with the mlDeleted marker, which MessageLogger 1.6.2+
// understands (no red rows).
//
// Host contract (proven in MessageLogger): lazy host lookups only, dual
// storage generation (jsonStorage on Next / plugin storage on Classic),
// universal start/stop export shape.

// ---- Settings ---------------------------------------------------------------

const DEFAULT_SETTINGS = {
    jitterSeconds: true, // randomize seconds like the desktop plugin's randomSeconds
    chatButton: false, // chat-bar Fake button — opt-in, because it wraps Discord's chat row
    quickText: 'hello', // what one tap of the chat-bar button sends
};

type FakeEmbed = {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    image?: { url: string };
    thumbnail?: { url: string };
    fields?: { name: string; value: string; inline?: boolean }[];
};

type PersistedMessage = {
    type: 'message';
    channelId: string;
    authorId: string;
    content: string;
    attachments?: any[];
    timestamp: string;
    snowflakeId: string;
    replyToId?: string;
    embeds?: FakeEmbed[];
    systemType?: number;
};
type PersistedCall = {
    type: 'call';
    channelId: string;
    callerId: string;
    otherId: string;
    missed: boolean;
    durationSec: number;
    timestamp: string;
    endedTimestamp: string | null;
    snowflakeId: string;
};
type PersistedReaction = {
    type: 'reaction';
    channelId: string;
    messageId: string;
    userId: string;
    emoji: string;
    snowflakeId: string;
};
type PersistedFake = PersistedMessage | PersistedCall | PersistedReaction;

type BatchLine = { time: string; senderName: string; content: string };

// ---- Lazy host accessors (never call these at eval/module time) -------------

declare const revenge: any;
declare const bunny: any;
declare const vendetta: any;
declare const valenced: any;

// Valenced (phone) exposes itself as the `valenced` global / bundle parameter.
// Check it FIRST: on Valenced the revenge/bunny/vendetta globals don't exist,
// so without this every accessor below returns null (no settings page, no
// dispatch, no toast) and the plugin looks dead.
function getValenced(): any {
    try { if (typeof valenced !== 'undefined' && valenced) return valenced; } catch {}
    return null;
}

function getReact(): any {
    try { const r = getValenced()?.react?.React; if (r?.createElement) return r; } catch {}
    try { if (typeof revenge !== 'undefined') { const r = revenge.react; if (r) return r.React || r; } } catch {}
    try { if (typeof bunny !== 'undefined') { const b = bunny; const r = b.React || b.common?.React || b.metro?.common?.React; if (r) return r; } } catch {}
    try { if (typeof vendetta !== 'undefined') { const v = vendetta; const r = v.common?.React || v.metro?.common?.React || v.React; if (r) return r; } } catch {}
    return null;
}

function getRN(): any {
    try { const rn = getValenced()?.react?.ReactNative; if (rn?.View && rn?.Text) return rn; } catch {}
    try { if (typeof revenge !== 'undefined') { const rn = revenge.react?.ReactNative; if (rn) return rn; } } catch {}
    try { if (typeof bunny !== 'undefined') { const b = bunny; const rn = b.ReactNative || b.common?.ReactNative || b.metro?.common?.ReactNative; if (rn) return rn; } } catch {}
    try { if (typeof vendetta !== 'undefined') { const v = vendetta; const rn = v.common?.ReactNative || v.metro?.common?.ReactNative; if (rn) return rn; } } catch {}
    return null;
}

function getMetro(): any {
    try { const n = (typeof revenge !== 'undefined' && revenge?.metro) || null; if (n) return n; } catch {}
    try { const b = typeof bunny !== 'undefined' ? bunny : null; if (b?.metro) return b.metro; } catch {}
    try { const v = typeof vendetta !== 'undefined' ? vendetta : null; if (v?.metro) return v.metro; } catch {}
    return null;
}

// A real FluxDispatcher with .dispatch — found through metro on every host.
function getDispatch(): ((ev: any) => void) | null {
    try {
        const v = getValenced();
        const finders = v?.modules?.finders;
        const filters = v?.modules?.finders?.filters;
        if (finders && filters) {
            const [mod] = finders.lookupModule(filters.withProps('dispatch', 'subscribe'));
            if (mod && typeof mod.dispatch === 'function') return mod.dispatch.bind(mod);
        }
    } catch {}
    try {
        const f = (typeof revenge !== 'undefined' && revenge?.discord?.flux?.dispatcher) || null;
        if (f && typeof f.dispatch === 'function') return f.dispatch.bind(f);
    } catch {}
    try {
        const metro = getMetro();
        const rd = metro?.findByProps?.('dispatch', 'subscribe');
        if (rd && typeof rd.dispatch === 'function') return rd.dispatch.bind(rd);
        const rd2 = metro?.findByProps?.('dispatch', '_dispatcher');
        if (rd2 && typeof rd2.dispatch === 'function') return rd2.dispatch.bind(rd2);
    } catch {}
    try { const v = typeof vendetta !== 'undefined' ? vendetta : null; const fd = v?.metro?.common?.FluxDispatcher || v?.common?.FluxDispatcher; if (fd?.dispatch) return fd.dispatch.bind(fd); } catch {}
    try { const b = typeof bunny !== 'undefined' ? bunny : null; const fd = b?.metro?.common?.FluxDispatcher || b?.common?.FluxDispatcher; if (fd?.dispatch) return fd.dispatch.bind(fd); } catch {}
    return null;
}

function findStore(name: string, props: string[]): any {
    try {
        const s = getValenced()?.discord?.flux?.Stores;
        if (s?.[name]) return s[name];
    } catch {}
    try {
        const s = (typeof revenge !== 'undefined' && revenge?.discord?.flux?.Stores) || null;
        if (s?.[name]) return s[name];
    } catch {}
    try {
        const metro = getMetro();
        if (metro?.findByStoreName) {
            const m = metro.findByStoreName(name);
            if (m) return m;
        }
        if (metro?.findByProps) {
            const m = metro.findByProps(...props);
            if (m) return m;
        }
    } catch {}
    try { const v = typeof vendetta !== 'undefined' ? vendetta : null; if (v?.metro?.common?.[name]) return v.metro.common[name]; } catch {}
    try { const b = typeof bunny !== 'undefined' ? bunny : null; if (b?.metro?.common?.[name]) return b.metro.common[name]; } catch {}
    return null;
}

function getUserStore(): any {
    return findStore('UserStore', ['getCurrentUser']);
}
function getChannelStore(): any {
    return findStore('ChannelStore', ['getChannel']);
}
function getMessageStore(): any {
    return findStore('MessageStore', ['getMessage', 'getMessages']);
}
function getSelectedChannelStore(): any {
    return findStore('SelectedChannelStore', ['getChannelId', 'getSelectedChannelId']);
}
function getGuildMemberStore(): any {
    return findStore('GuildMemberStore', ['getMembers', 'getMember']);
}

function currentChannelId(): string {
    try {
        const s = getSelectedChannelStore();
        return String(s?.getChannelId?.() ?? s?.getSelectedChannelId?.() ?? '');
    } catch {
        return '';
    }
}

function hostError(msg: string, e?: unknown) {
    try {
        const logger = (typeof revenge !== 'undefined' && revenge?.logger) || (typeof bunny !== 'undefined' && bunny?.plugin?.logger) || (typeof vendetta !== 'undefined' && vendetta?.logger) || console;
        (logger?.error ?? logger?.log ?? (() => {})).call(logger, '[FakeDM] ' + msg, e ?? '');
    } catch {}
}

// ---- Storage (settings + fakes) ----------------------------------------------

let jsonStorageApi: any = null;
let storageProxy: any = null;
let storageKind: '' | 'bunny' | 'vendetta' = '';
let cfg: any = { ...DEFAULT_SETTINGS };
let fakesCache: PersistedFake[] = [];

function readFakes(): PersistedFake[] {
    return Array.isArray(fakesCache) ? fakesCache : [];
}

function persistFakes(list: PersistedFake[]) {
    fakesCache = list;
    try {
        if (jsonStorageApi) {
            void jsonStorageApi.set?.({ fakes: list });
            return;
        }
        if (storageProxy) {
            if (storageKind === 'bunny' && storageProxy.data) {
                storageProxy.data = { ...storageProxy.data, fakes: list };
            } else {
                storageProxy.fakes = list;
            }
        }
    } catch (e) {
        hostError('could not persist fakes', e);
    }
}

function savePluginCfg() {
    try { jsonStorageApi?.set?.({ chatButton: (cfg as any).chatButton, quickText: (cfg as any).quickText }); } catch (e) { hostError('could not save settings', e); }
}

function refreshConfigFromStorage() {
    try {
        if (jsonStorageApi) {
            const s = jsonStorageApi.use?.() ?? null;
            if (s && typeof s === 'object') cfg = { ...DEFAULT_SETTINGS, ...s };
            const f = (s as any)?.fakes;
            if (Array.isArray(f)) fakesCache = f;
            return;
        }
        if (storageProxy) {
            const s = storageKind === 'bunny' ? storageProxy?.data?.settings : storageProxy?.settings;
            if (s && typeof s === 'object') cfg = { ...DEFAULT_SETTINGS, ...s };
            const f = storageKind === 'bunny' ? storageProxy?.data?.fakes : storageProxy?.fakes;
            if (Array.isArray(f)) fakesCache = f;
        }
    } catch (e) {
        hostError('could not read settings', e);
    }
}

// ---- Core engine (ported from injection.ts + storage.ts) ---------------------

let _idCounter = 0;
function uniqueSnowflake(date: Date): string {
    try {
        const offset = _idCounter++ % 4096;
        const ms = Math.max(0, date.getTime() - 1420070400000);
        return ((BigInt(ms) << 22n) | BigInt(offset)).toString();
    } catch {
        // BigInt-less Hermes fallback: timestamp + counter is unique enough here.
        return String(date.getTime()) + String(_idCounter++ % 4096).padStart(4, '0');
    }
}

function randomSeconds(date: Date): Date {
    if (!cfg.jitterSeconds) return new Date(Math.floor(date.getTime() / 1000) * 1000);
    const sec = 1 + Math.floor(Math.random() * 59);
    return new Date(date.getTime() + sec * 1000);
}

function avatarUrl(user: any): string {
    if (!user) return '';
    if (user.avatar) return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=64`;
    try {
        const idx = user.discriminator && user.discriminator !== '0'
            ? parseInt(user.discriminator) % 5
            : Number(BigInt(user.id) >> 22n) % 6;
        return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
    } catch {
        return 'https://cdn.discordapp.com/embed/avatars/0.png';
    }
}

function buildAuthor(user: any) {
    return {
        id: String(user.id),
        username: user.username ?? 'unknown',
        discriminator: user.discriminator ?? '0',
        avatar: user.avatar ?? null,
        public_flags: user.publicFlags ?? user.public_flags ?? 0,
        flags: user.flags ?? 0,
        banner: user.banner ?? null,
        accent_color: null,
        global_name: user.globalName ?? user.global_name ?? user.username,
        bot: !!user.bot,
    };
}

function toDiscordEmbed(embed: FakeEmbed): any {
    const d: any = {};
    if (embed.title) d.title = embed.title;
    if (embed.description) d.description = embed.description;
    if (embed.url) d.url = embed.url;
    if (embed.color !== undefined) d.color = embed.color;
    if (embed.image?.url) d.image = { url: embed.image.url, proxy_url: embed.image.url };
    if (embed.thumbnail?.url) d.thumbnail = { url: embed.thumbnail.url, proxy_url: embed.thumbnail.url };
    if (embed.fields?.length) d.fields = embed.fields.map((f) => ({ name: f.name, value: f.value, inline: !!f.inline }));
    return d;
}

let _attachIdCounter = 0;

function injectMessage(
    channelId: string,
    author: any,
    content: string,
    date: Date,
    persistedId?: string,
    attachments?: any[],
    replyTo?: { messageId: string },
    embeds?: FakeEmbed[],
): string | null {
    const dispatch = getDispatch();
    if (!dispatch || !author?.id) return null;
    const actualDate = persistedId ? date : randomSeconds(date);
    const id = persistedId ?? uniqueSnowflake(actualDate);
    const attach = (attachments ?? []).map((a, i) => ({
        id: a.id ?? String(++_attachIdCounter),
        filename: a.filename ?? 'image.png',
        size: a.size ?? 0,
        url: a.url,
        proxy_url: a.proxy_url ?? a.url,
        width: a.width ?? 0,
        height: a.height ?? 0,
        content_type: a.content_type ?? 'image/png',
    }));

    const message: any = {
        attachments: attach, components: [], embeds: [], mention_roles: [], mentions: [],
        author: buildAuthor(author),
        channel_id: channelId,
        content: String(content ?? ''),
        edited_timestamp: null,
        flags: 0,
        id,
        mention_everyone: false,
        nonce: id,
        pinned: false,
        timestamp: actualDate.toISOString(),
        tts: false,
        type: 0,
    };
    if (replyTo?.messageId) {
        message.message_reference = { channel_id: channelId, message_id: replyTo.messageId };
    }
    if (embeds && embeds.length > 0) {
        message.embeds = embeds.map(toDiscordEmbed);
    }

    try {
        dispatch({ type: 'MESSAGE_CREATE', channelId, message, optimistic: false, isPushNotification: false });
    } catch (e) {
        hostError('injectMessage dispatch failed', e);
        return null;
    }
    if (!persistedId) {
        const list = readFakes().slice();
        list.push({
            type: 'message', channelId, authorId: String(author.id), content: String(content ?? ''),
            attachments: attach, timestamp: actualDate.toISOString(), snowflakeId: id,
            replyToId: replyTo?.messageId, embeds,
        });
        persistFakes(list);
    }
    return id;
}

function injectCall(
    channelId: string,
    caller: any,
    other: any,
    missed: boolean,
    durationSec: number,
    date: Date,
    persistedId?: string,
    persistedEndedTs?: string | null,
): string | null {
    const dispatch = getDispatch();
    if (!dispatch || !caller?.id) return null;
    const actualDate = persistedId ? date : randomSeconds(date);
    const id = persistedId ?? uniqueSnowflake(actualDate);
    const participants = missed ? [String(caller.id)] : [String(caller.id), String(other?.id ?? caller.id)];
    const endedDate = missed
        ? actualDate
        : (persistedEndedTs ? new Date(persistedEndedTs) : new Date(actualDate.getTime() + durationSec * 1000));

    try {
        dispatch({
            type: 'MESSAGE_CREATE',
            channelId,
            message: {
                attachments: [], components: [], embeds: [], mention_roles: [], mentions: [],
                author: buildAuthor(caller),
                channel_id: channelId,
                content: '',
                edited_timestamp: null,
                flags: 0,
                id,
                mention_everyone: false,
                nonce: id,
                pinned: false,
                timestamp: actualDate.toISOString(),
                tts: false,
                type: 3,
                call: {
                    participants,
                    ended_timestamp: endedDate.toISOString(),
                    duration: missed ? undefined : durationSec,
                },
            },
            optimistic: false,
            isPushNotification: false,
        });
    } catch (e) {
        hostError('injectCall dispatch failed', e);
        return null;
    }
    if (!persistedId) {
        const list = readFakes().slice();
        list.push({
            type: 'call', channelId, callerId: String(caller.id), otherId: String(other?.id ?? ''),
            missed, durationSec, timestamp: actualDate.toISOString(), endedTimestamp: endedDate.toISOString(), snowflakeId: id,
        });
        persistFakes(list);
    }
    return id;
}

export const SYSTEM_TYPES: { value: number; label: string }[] = [
    { value: 1, label: 'User joined' },
    { value: 2, label: 'User left' },
    { value: 4, label: 'Name change' },
    { value: 5, label: 'Icon change' },
    { value: 6, label: 'Pinned a message' },
    { value: 7, label: 'Joined server' },
];

function injectSystemMessage(
    channelId: string,
    author: any,
    systemType: number,
    content: string,
    date: Date,
): string | null {
    const dispatch = getDispatch();
    if (!dispatch || !author?.id) return null;
    const actualDate = randomSeconds(date);
    const id = uniqueSnowflake(actualDate);
    try {
        dispatch({
            type: 'MESSAGE_CREATE',
            channelId,
            message: {
                attachments: [], components: [], embeds: [], mention_roles: [], mentions: [],
                author: buildAuthor(author),
                channel_id: channelId,
                content: String(content ?? ''),
                edited_timestamp: null,
                flags: 0,
                id,
                mention_everyone: false,
                nonce: id,
                pinned: false,
                timestamp: actualDate.toISOString(),
                tts: false,
                type: systemType,
            },
            optimistic: false,
            isPushNotification: false,
        });
    } catch (e) {
        hostError('injectSystemMessage dispatch failed', e);
        return null;
    }
    const list = readFakes().slice();
    list.push({
        type: 'message', channelId, authorId: String(author.id), content: String(content ?? ''),
        timestamp: actualDate.toISOString(), snowflakeId: id, systemType,
    });
    persistFakes(list);
    return id;
}

function injectReaction(channelId: string, messageId: string, userId: string, emoji: string): boolean {
    const dispatch = getDispatch();
    if (!dispatch || !channelId || !messageId || !emoji) return false;
    try {
        dispatch({
            type: 'MESSAGE_REACTION_ADD',
            channelId,
            messageId,
            userId,
            emoji: { name: emoji, id: null, animated: false },
        });
    } catch (e) {
        hostError('injectReaction dispatch failed', e);
        return false;
    }
    const list = readFakes().slice();
    list.push({ type: 'reaction', channelId, messageId, userId, emoji, snowflakeId: uniqueSnowflake(new Date()) });
    persistFakes(list);
    return true;
}

// Desktop parity (injection.ts editFakeMessage): dispatch MESSAGE_UPDATE with the
// FULL cached record merged in. A partial message makes Discord's renderer read
// fields that are not there, which is exactly how an "edit" can crash the client —
// so if the message is not in cache this refuses instead of guessing.
function editFakeMessage(channelId: string, messageId: string, newContent: string, newTimestamp?: string): { ok: boolean; reason: string } {
    const dispatch = getDispatch();
    if (!dispatch) return { ok: false, reason: 'No dispatcher on this build' };
    const text = String(newContent ?? '');
    const cached = getMessageStore()?.getMessage?.(channelId, messageId);
    if (!cached) return { ok: false, reason: 'Open that chat once so the message is cached, then edit' };
    let ts: string | null = null;
    if (newTimestamp) {
        const parsed = new Date(newTimestamp);
        if (!Number.isFinite(parsed.getTime())) return { ok: false, reason: 'Time not understood — use YYYY-MM-DD HH:MM' };
        ts = parsed.toISOString();
    }
    const updated: any = { ...cached, content: text, edited_timestamp: ts ?? new Date().toISOString() };
    if (ts) updated.timestamp = ts;
    try {
        dispatch({ type: 'MESSAGE_UPDATE', channelId, message: updated });
    } catch (e) {
        hostError('editFakeMessage dispatch failed', e);
        return { ok: false, reason: 'Discord refused the update' };
    }
    const list = readFakes();
    for (const f of list) {
        if (f.type === 'message' && f.snowflakeId === messageId) {
            f.content = text;
            if (ts) f.timestamp = ts;
            break;
        }
    }
    persistFakes(list);
    return { ok: true, reason: 'Edited' };
}

function clearFakesInChannel(channelId: string, ids?: Set<string>): number {
    const dispatch = getDispatch();
    const list = readFakes();
    const target = ids ?? new Set(list.filter((f) => f.type !== 'reaction' && f.channelId === channelId).map((f) => (f as any).snowflakeId));
    let n = 0;
    for (const f of list) {
        if (f.type === 'reaction') continue;
        if (f.channelId !== channelId || !target.has((f as any).snowflakeId)) continue;
        if (dispatch) {
            try {
                dispatch({ type: 'MESSAGE_DELETE', channelId, id: (f as any).snowflakeId, mlDeleted: true });
            } catch {}
        }
        n++;
    }
    persistFakes(list.filter((f) => !(f.type !== 'reaction' && f.channelId === channelId && target.has((f as any).snowflakeId))));
    return n;
}

function removeFakeById(id: string): boolean {
    const f = readFakes().find((x) => (x as any).snowflakeId === id);
    if (!f || f.type === 'reaction') return false;
    return clearFakesInChannel(f.channelId, new Set([(f as any).snowflakeId])) > 0;
}

// ---- Restoring saved fakes (manual, validated) --------------------------------

let restoredThisSession = false;

function messageInCache(channelId: string, messageId: string): boolean {
    try {
        return !!getMessageStore()?.getMessage?.(channelId, messageId);
    } catch {
        return false;
    }
}

// Restoring dispatches MESSAGE_CREATE into Discord's own store, which is the
// riskiest thing this plugin does: one saved fake whose channel is gone, whose
// reply target no longer exists or whose payload this build cannot render can
// take the whole client down. Desktop replays them on every CONNECTION_OPEN;
// here nothing is replayed automatically, and even the manual path refuses any
// entry it cannot prove is safe to show.
function validFake(f: any): boolean {
    if (!f || typeof f !== 'object') return false;
    if (typeof f.channelId !== 'string' || !/^\d+$/.test(f.channelId)) return false;
    if (typeof f.snowflakeId !== 'string' || !/^\d+$/.test(f.snowflakeId)) return false;
    if (!Number.isFinite(Date.parse(String(f.timestamp ?? '')))) return false;
    if (f.type === 'message') {
        if (typeof f.content !== 'string') return false;
        if (typeof f.authorId !== 'string' || !/^\d+$/.test(f.authorId)) return false;
        // A reply needs its target still in cache; otherwise the reply row asks
        // the client for a message that no longer exists.
        if (f.replyToId && !messageInCache(f.channelId, f.replyToId)) return false;
    } else if (f.type === 'call') {
        if (typeof f.callerId !== 'string' || !/^\d+$/.test(f.callerId)) return false;
    } else {
        return false;
    }
    try {
        if (!getChannelStore()?.getChannel?.(f.channelId)) return false;
    } catch {
        return false;
    }
    return true;
}

function restoreSaved(): { restored: number; skipped: number } {
    const store = getUserStore();
    let restored = 0;
    let skipped = 0;
    for (const f of readFakes()) {
        if (!validFake(f) || restored >= 60) { skipped++; continue; }
        try {
            if (f.type === 'message') {
                if (messageInCache(f.channelId, f.snowflakeId)) continue;
                const author = store?.getUser?.(f.authorId);
                if (!author) { skipped++; continue; }
                if (!injectMessage(f.channelId, author, f.content, new Date(f.timestamp), f.snowflakeId, f.attachments, f.replyToId ? { messageId: f.replyToId } : undefined, f.embeds)) skipped++;
                else restored++;
            } else if (f.type === 'call') {
                if (messageInCache(f.channelId, f.snowflakeId)) continue;
                const caller = store?.getUser?.(f.callerId);
                const other = store?.getUser?.(f.otherId);
                if (!caller) { skipped++; continue; }
                injectCall(f.channelId, caller, other ?? caller, f.missed, f.durationSec, new Date(f.timestamp), f.snowflakeId, f.endedTimestamp);
                restored++;
            }
        } catch (e) {
            skipped++;
            hostError('restore skipped an entry', e);
        }
    }
    return { restored, skipped };
}

// Recovery path: drop every saved fake without dispatching anything. This is the
// way out of a crash loop that a saved fake caused.
function deleteSavedFakes(): number {
    const n = readFakes().length;
    persistFakes([]);
    return n;
}

// ---- Batch injection (desktop injectBatch + parse) ----------------------------

// Desktop FakeDM accepts one message per line and only needs the "[HH:MM]"
// prefix; anything else is a plain line, sent by the default sender at the base
// time. The previous parser demanded a time and threw away every line without
// one, which is why batch scripts appeared to do nothing.
//
// Accepted, in this order:
//   [14:30] Name: text   time + sender
//   [14:30] text         time, default sender
//   Name: text           base time, sender
//   text                 base time, default sender
function parseBatchScript(text: string, base?: Date): BatchLine[] {
    const lines: BatchLine[] = [];
    const at = base ?? new Date();
    const baseTime = String(at.getHours()).padStart(2, '0') + ':' + String(at.getMinutes()).padStart(2, '0');
    for (const raw of String(text ?? '').split('\n')) {
        const line = raw.trim();
        if (!line) continue;
        const timed = line.match(/^\[(\d{1,2}):(\d{2})\]\s*(?:([^:]+?)\s*:\s*)?(.+)$/);
        if (timed) {
            lines.push({
                time: String(Math.min(23, parseInt(timed[1], 10))).padStart(2, '0') + ':' + timed[2],
                senderName: (timed[3] ?? '').trim(),
                content: timed[4].trim(),
            });
            continue;
        }
        // "Name: text" — but never a URL, which would read as somebody speaking.
        const named = line.match(/^([^:/\n]{1,40}?)\s*:\s*(.+)$/);
        if (named && !/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(line)) {
            lines.push({ time: baseTime, senderName: named[1].trim(), content: named[2].trim() });
            continue;
        }
        lines.push({ time: baseTime, senderName: '', content: line });
    }
    return lines;
}

function resolveBatchAuthor(name: string, candidates: any[], me: any): any | null {
    if (!name) return me;
    const lower = name.toLowerCase();
    if (lower === 'me') return me;
    for (const u of candidates) {
        const uname = String(u.globalName ?? u.global_name ?? u.username ?? '').toLowerCase();
        if (uname === lower || String(u.username ?? '').toLowerCase() === lower) return u;
    }
    // Manual entry: numeric name treated as a user ID.
    if (/^\d{5,}$/.test(name)) {
        const byId = getUserStore()?.getUser?.(name);
        if (byId) return byId;
    }
    return null;
}

// Desktop injectBatch: one message per parsed line, the time-of-day comes from
// the line and the date from the tab. A name that resolves to nobody is skipped
// by desktop too — the difference is that this reports how many were skipped, so
// a script cannot look like it worked when half of it went nowhere.
function injectBatch(channelId: string, lines: BatchLine[], candidates: any[], me: any, baseDate: Date): { injected: number; skipped: number; unknown: string[] } {
    let injected = 0;
    let skipped = 0;
    const unknown: string[] = [];
    for (const line of lines) {
        const author = resolveBatchAuthor(line.senderName, candidates, me);
        if (!author) {
            skipped++;
            if (line.senderName && unknown.indexOf(line.senderName) === -1) unknown.push(line.senderName);
            continue;
        }
        const [h, m] = line.time.split(':').map(Number);
        const msgDate = new Date(baseDate);
        msgDate.setHours(Number.isFinite(h) ? h : 0, Number.isFinite(m) ? m : 0, 0, 0);
        if (injectMessage(channelId, author, line.content, msgDate)) injected++;
        else skipped++;
    }
    return { injected, skipped, unknown };
}

// ---- Member candidates for pickers --------------------------------------------

function memberCandidates(): any[] {
    const out: any[] = [];
    const me = getUserStore()?.getCurrentUser?.();
    if (me) out.push(me);
    try {
        const chId = currentChannelId();
        const ch = getChannelStore()?.getChannel?.(chId);
        const ids: string[] = ch?.recipients ?? ch?.rawRecipients?.map((r: any) => r.id) ?? [];
        for (const id of ids) {
            const u = getUserStore()?.getUser?.(id);
            if (u) out.push(u);
        }
        const guildId = ch?.guild_id ?? ch?.guildId;
        if (guildId) {
            const members = getGuildMemberStore()?.getMembers?.(guildId) ?? [];
            for (const m of members.slice(0, 40)) {
                const u = getUserStore()?.getUser?.(m.userId ?? m?.user?.id);
                if (u && !out.some((x) => String(x.id) === String(u.id))) out.push(u);
            }
        }
    } catch {}
    return out.slice(0, 45);
}

function userLabel(u: any): string {
    if (!u) return 'Unknown';
    return String(u.globalName ?? u.global_name ?? u.username ?? u.id);
}

function memberById(id: string): any {
    if (!id) return null;
    return getUserStore()?.getUser?.(id) ?? { id, username: 'ID ' + id };
}

// Recent messages in the open channel — for tap-to-pick instead of copying
// message IDs by hand. Handles both array and cache-object MessageStore shapes.
function recentMessages(channelId: string): any[] {
    try {
        let list = getMessageStore()?.getMessages?.(channelId);
        if (Array.isArray(list)) return list.filter((m: any) => m?.id).slice(-12).reverse();
        const arr = Array.from(list?._map?.values?.() ?? []);
        if (arr.length) return (arr as any[]).filter((m: any) => m?.id).slice(-12).reverse();
    } catch {}
    return [];
}

// Gallery picker: Discord's RN runtime ships native media-picker modules.
// Try the known surfaces in order; resolve with a local file/content URI or
// null when unavailable (caller degrades to URL input + toast).
async function pickImageFromGallery(): Promise<string | null> {
    const metro = getMetro();
    try {
        const p = metro?.findByProps?.('openMediaPicker');
        if (typeof p?.openMediaPicker === 'function') {
            const res: any = await new Promise((resolve) => {
                try {
                    p.openMediaPicker({ type: 'image', multiple: false, onMediaSelected: (r: any) => resolve(r), onCanceled: () => resolve(null), onCancel: () => resolve(null) });
                } catch (e) { resolve(null); }
            });
            const uri = res?.uri ?? res?.[0]?.uri ?? res?.assets?.[0]?.uri ?? (typeof res === 'string' ? res : null);
            if (uri) return String(uri);
        }
    } catch {}
    try {
        const p = metro?.findByProps?.('launchImageLibrary');
        if (typeof p?.launchImageLibrary === 'function') {
            const res: any = await new Promise((resolve) => {
                try {
                    p.launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (r: any) => resolve(r));
                } catch { resolve(null); }
            });
            const uri = res?.assets?.[0]?.uri ?? res?.uri ?? null;
            if (uri) return String(uri);
        }
    } catch {}
    return null;
}

// Quick-tab friend search: match candidates by username/global name substring,
// or accept a raw user ID.
function resolveQuickUser(text: string, candidates: any[]): any | null {
    const q = String(text ?? '').trim();
    if (!q) return null;
    if (/^\d{5,}$/.test(q)) return getUserStore()?.getUser?.(q) ?? null;
    const lower = q.toLowerCase().replace(/^@/, '');
    for (const u of candidates) {
        const names = [u.username, u.globalName, u.global_name].filter(Boolean).map((s: string) => String(s).toLowerCase());
        if (names.some((n: string) => n === lower)) return u;
    }
    for (const u of candidates) {
        const names = [u.username, u.globalName, u.global_name].filter(Boolean).map((s: string) => String(s).toLowerCase());
        if (names.some((n: string) => n.includes(lower))) return u;
    }
    return null;
}

// Time presets for the quick tab.
function presetDate(key: string): Date {
    const now = Date.now();
    if (key === 'now') return new Date(now);
    const m = key.match(/^m(\d+)$/); // minutes ago
    if (m) return new Date(now - parseInt(m[1], 10) * 60000);
    if (key === 'yesterday-evening') {
        const d = new Date(now - 86400000);
        d.setHours(20, 34, 0, 0);
        return d;
    }
    return new Date(now);
}

// ---- Toast --------------------------------------------------------------------

function getActions(): any {
    try {
        const a = getValenced()?.discord?.actions;
        if (a) return a;
    } catch {}
    try {
        if (typeof revenge !== 'undefined') {
            const a: any = revenge.discord?.actions;
            if (a) return a;
        }
    } catch {}
    try {
        if (typeof bunny !== 'undefined') {
            const b: any = bunny;
            const a = b.metro?.common?.toasts || b.api?.actions?.ToastActionCreators;
            if (a) return a;
        }
    } catch {}
    return null;
}

// Native notifications only.
//
// Discord's toast container crashed the whole client on this build:
//   TypeError: Cannot read property 'position' of undefined
//     at useToastContainer -> ToastContainer -> ManaToastSurface
// when it was handed a toast from a plugin. A confirmation message is never worth
// taking the app down, so this never touches ToastActionCreators or any other
// Discord toast path: Android gets its own native toast, everything else gets a
// plain native dialog, and if neither exists the caller simply gets no popup.
function toast(content: string) {
    const text = String(content ?? '');
    try {
        const RN: any = getRN();
        if (RN?.ToastAndroid?.show) {
            RN.ToastAndroid.show(text, RN.ToastAndroid.SHORT ?? 0);
            return;
        }
    } catch {}
    try {
        const RN: any = getRN();
        if (RN?.Alert?.alert) {
            RN.Alert.alert('FakeDM', text);
            return;
        }
    } catch {}
    hostError('no notification channel available: ' + text);
}

// ---- Settings UI (2.0 — rebuilt from scratch) ----------------------------------
// Every screen below is ours and ours alone: plain React Native primitives,
// dressed up and tinted (and Discord's own design components used whenever the
// host offers them). Not one line here touches a stock component, so the UI can
// degrade a render at worst — it can never take the client down with it.
//
//   * one design language: flat canvas, elevated cards, accent pills
//   * six screens: Compose · Batch · Call & System · React · Saved · Setup
//   * destructive actions are two-tap confirms inside their own chip
//   * the engine underneath is unchanged — injection, batch, edit, restore and
//     the single-anchor chat-bar pill are the code the phone already lived with

function hexToInt(hex: string): number | undefined {
    const m = String(hex ?? '').trim().replace('#', '');
    if (!/^[0-9a-fA-F]{6}$/.test(m)) return undefined;
    return parseInt(m, 16);
}

// Discord's own design components give the settings page a native look when the
// host offers them. Resolved lazily (never at eval time) so the host cannot kill us.
function resolveDesign(): any {
    try {
        const g = getValenced()?.discord?.design;
        const d = g?.Design ?? g;
        if (d && (d.TableRowGroup || d.TableSwitchRow || d.TableRow)) return d;
    } catch {}
    try {
        const g: any = (globalThis as any).revenge?.discord?.design;
        const d = g?.Design ?? g;
        if (d && (d.TableRowGroup || d.TableSwitchRow || d.TableRow)) return d;
    } catch {}
    try {
        const b: any = (globalThis as any).bunny?.ui;
        if (b?.FormTableRowGroup) return b;
    } catch {}
    return null;
}

function buildSettingsComponent() {
    const React = getReact();
    const RN = getRN();
    if (!React || !RN) return null;
    const el = React.createElement;
    const D = resolveDesign();
    const { View = 'view', Text = 'text', TextInput = 'input', Pressable = View, ScrollView = View, Switch = null } = RN;

    const isDark = (() => {
        try {
            const tm = findStore('ThemeManager', ['theme', 'resolvedTheme']) ?? getMetro()?.findByProps?.('theme', 'setTheme');
            const t = tm?.theme ?? tm?.resolvedTheme ?? tm?.currentTheme;
            if (t) return String(t).toLowerCase().includes('dark');
        } catch {}
        return true;
    })();

    const C = isDark ? {
        // Dark: flat near-black canvas, raised cards, one accent.
        bg: '#0c0d10', card: '#17181a', cardAlt: '#1e2023', line: '#282a30',
        text: '#f2f3f5', sub: '#8f95a3', input: '#232529', chip: '#27292f',
        accent: '#5865F2', accentSoft: 'rgba(88,101,242,0.16)',
        danger: '#f04747', ok: '#23a55a', amber: '#faa61a',
    } : {
        bg: '#eceef2', card: '#ffffff', cardAlt: '#f6f7f9', line: '#dcdee4',
        text: '#060607', sub: '#5c5e66', input: '#e7e9ee', chip: '#e3e5e9',
        accent: '#5865F2', accentSoft: 'rgba(88,101,242,0.12)',
        danger: '#d83c3e', ok: '#248046', amber: '#c28516',
    };

    // ---- primitives (plain builders; Confirm is the only hooked component) ----

    function Card(props: any): any {
        const title = props?.title ?? '';
        return el(View, { style: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.line, marginHorizontal: 14, marginTop: 10, overflow: 'hidden' } },
            title ? el(View, { style: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 11, paddingBottom: 1 } },
                props.dot ? el(View, { style: { width: 7, height: 7, borderRadius: 4, backgroundColor: props.dot, marginRight: 7 } }) : null,
                el(Text, { style: { color: C.text, fontSize: 14, fontWeight: '800', flex: 1 } }, title),
                props.meta ? el(Text, { style: { color: C.sub, fontSize: 11 } }, String(props.meta)) : null)
                : null,
            el(View, { style: { paddingHorizontal: 14, paddingVertical: 10 } }, props.children));
    }

    function Lbl(props: any): any {
        return el(View, { style: { marginTop: props.first ? 0 : 10, marginBottom: 3 } },
            el(Text, { style: { color: C.sub, fontSize: 11, fontWeight: '800', letterSpacing: 0.4 } }, String(props.text ?? '').toUpperCase()),
            props.hint ? el(Text, { style: { color: C.sub, fontSize: 11, marginTop: 1 } }, props.hint) : null);
    }

    function Input(props: any): any {
        const NativeInput = D?.TextInput ?? D?.TextField ?? null;
        const base: any = {
            placeholderTextColor: C.sub, ...props,
            style: [{ color: C.text, backgroundColor: C.input, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9, fontSize: 14, marginBottom: 4 }, props.style],
        };
        if (NativeInput) return el(NativeInput, base);
        return el(TextInput, base);
    }

    function BigBtn(props: any): any {
        return el(Pressable, {
            accessibilityLabel: props.label,
            onPress: props.onPress,
            disabled: !!props.disabled,
            style: {
                backgroundColor: props.danger ? C.danger : props.ok ? C.ok : C.accent,
                borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginTop: 6,
                opacity: props.disabled ? 0.5 : 1,
            },
        }, el(Text, { style: { color: '#ffffff', fontWeight: '800', fontSize: 15 } }, props.label));
    }

    function MiniBtn(props: any): any {
        return el(Pressable, {
            accessibilityLabel: props.label,
            onPress: props.onPress,
            style: {
                backgroundColor: props.active ? C.accent : props.danger ? 'rgba(240,71,71,0.14)' : C.chip,
                borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, marginTop: 4,
            },
        }, el(Text, { style: { color: props.active ? '#ffffff' : props.danger ? C.danger : C.text, fontSize: 12, fontWeight: '700' } }, props.label));
    }

    // Two-tap confirm. State lives in the screen (armedConfirm) because this is a
    // plain builder called inline — a tracking-state-of-its-own hook component
    // here would leak into whatever screen happens to render it and break when
    // the tab switches. Each Confirm passes a unique id.
    function Confirm(props: any): any {
        const armed = props.armed === true;
        return el(Pressable, {
            accessibilityLabel: String(props.label),
            onPress: () => { if (armed) { props.setArmed?.(''); props.onConfirm?.(); } else props.setArmed?.(props.id); },
            style: {
                backgroundColor: armed ? C.danger : 'rgba(240,71,71,0.14)',
                borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, marginTop: 6, borderWidth: 1, borderColor: armed ? C.danger : C.line,
            },
        }, el(Text, { style: { color: armed ? '#ffffff' : C.danger, fontSize: 13, fontWeight: '700' } }, armed ? 'Tap again to confirm — ' + String(props.label) : String(props.label)));
    }

    function ChipRow(props: any): any {
        const items = Array.isArray(props?.items) ? props.items : [];
        if (!items.length) return null;
        return el(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false },
            ...items.map((item: any) => el(Pressable, {
                key: String(item.key),
                accessibilityLabel: String(item.label),
                onPress: () => props.onChange?.(props.value === item.key ? '' : item.key),
                style: { backgroundColor: props.value === item.key ? C.accent : C.chip, borderRadius: 16, paddingHorizontal: 13, paddingVertical: 7, marginRight: 8, marginBottom: 4 },
            }, el(Text, { style: { color: props.value === item.key ? '#ffffff' : C.text, fontSize: 12, fontWeight: '700' } }, String(item.label)))));
    }

    function SwitchRow(props: any): any {
        if (D?.TableSwitchRow) {
            return el(D.TableSwitchRow, { label: props.label, subLabel: props.subLabel, value: !!props.value, onValueChange: props.onValueChange });
        }
        const toggle = Switch
            ? el(Switch, { value: !!props.value, onValueChange: props.onValueChange, trackColor: { false: 'rgba(128,128,128,0.35)', true: C.accent }, thumbColor: '#ffffff' })
            : el(Text, { onPress: () => props.onValueChange(!props.value), style: { color: C.accent, fontWeight: '800' } }, props.value ? 'On' : 'Off');
        return el(View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 } },
            el(View, { style: { flex: 1, paddingRight: 12 } },
                el(Text, { style: { color: C.text, fontSize: 15 } }, props.label),
                props.subLabel ? el(Text, { style: { color: C.sub, fontSize: 12, marginTop: 1 } }, props.subLabel) : null),
            toggle);
    }

    function MemberChips(props: any): any {
        const kids = (props.members ?? []).map((u: any) => {
            const active = props.value === String(u.id);
            return el(Pressable, {
                key: String(u.id),
                accessibilityLabel: userLabel(u),
                onPress: () => props.onChange?.(active ? '' : String(u.id)),
                style: { backgroundColor: active ? C.accent : C.chip, borderRadius: 16, paddingHorizontal: 13, paddingVertical: 7, marginRight: 8, marginBottom: 4 },
            }, el(Text, { style: { color: active ? '#ffffff' : C.text, fontSize: 13 } }, userLabel(u)));
        });
        return el(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false }, ...kids);
    }

    // Tap-to-pick a recent message from the open chat — no copying IDs by hand.
    function MsgPicker(props: any): any {
        const msgs = recentMessages(props.channelId);
        if (!msgs.length) {
            return el(Text, { style: { color: C.sub, fontSize: 12 } }, 'Open the chat, then come back here to pick a message.');
        }
        const kids = msgs.map((m: any) => {
            const active = props.value === String(m.id);
            return el(Pressable, {
                key: String(m.id),
                onPress: () => props.onChange?.(active ? '' : String(m.id)),
                style: { backgroundColor: active ? C.accent : C.chip, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8, maxWidth: 250 },
            }, el(Text, { numberOfLines: 1, style: { color: active ? '#ffffff' : C.text, fontSize: 12 } }, String(m.content || '(attachment/embed)') + ' — ' + userLabel(m.author)));
        });
        return el(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false }, ...kids);
    }

    // One saved fake presented as a mail card: kind dot, author, stamp, actions.
    function FakeCard(props: any): any {
        const f = props.fake;
        const isMsg = f.type === 'message';
        const kind = isMsg ? ((f as PersistedMessage).systemType ? 'SYSTEM' : 'MESSAGE')
            : f.type === 'call' ? 'CALL' : 'REACT';
        const color = isMsg ? C.accent : f.type === 'call' ? C.ok : C.amber;
        const authorName = userLabel(memberById(
            isMsg ? (f as PersistedMessage).authorId
                : f.type === 'call' ? (f as PersistedCall).callerId
                    : (f as PersistedReaction).userId));
        const summary = isMsg
            ? String((f as PersistedMessage).content || '(no text)')
            : f.type === 'call' ? ((f as PersistedCall).missed ? 'Missed call' : 'Call · ' + Math.round((f as PersistedCall).durationSec / 60) + ' min')
                : ':' + (f as PersistedReaction).emoji + ':';
        const when = (isMsg || f.type === 'call') ? new Date((f as any).timestamp).toLocaleString() : 'just now';
        return el(View, { key: props.k ?? String(f.snowflakeId), style: { backgroundColor: C.cardAlt, borderRadius: 12, borderWidth: 1, borderColor: C.line, paddingHorizontal: 12, paddingVertical: 10, marginTop: 8 } },
            el(View, { style: { flexDirection: 'row', alignItems: 'center' } },
                el(View, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: color, marginRight: 7 } }),
                el(Text, { style: { color, fontSize: 10, fontWeight: '800', letterSpacing: 0.5, flex: 1 } }, kind + ' · ' + authorName),
                el(Text, { style: { color: C.sub, fontSize: 10 } }, when),
                props.onEdit ? el(MiniBtn, { label: 'Edit', onPress: props.onEdit }) : null,
                el(MiniBtn, { label: 'Delete', danger: true, onPress: props.onDelete })),
            props.editing ? null : el(Text, { style: { color: C.text, fontSize: 14, marginTop: 4, lineHeight: 19 } }, summary),
            props.children ?? null);
    }

    const TAB_DEFS = [
        { key: 'compose', label: 'Compose' },
        { key: 'batch', label: 'Batch' },
        { key: 'callsys', label: 'Call & System' },
        { key: 'react', label: 'React' },
        { key: 'saved', label: 'Saved' },
        { key: 'setup', label: 'Setup' },
    ];

    return function FakeDMSettings(props: any) {
        if (jsonStorageApi == null && props?.api?.jsonStorage) {
            jsonStorageApi = props.api.jsonStorage;
        }
        refreshConfigFromStorage();

        const [tab, setTab] = React.useState('compose');
        const [armedConfirm, setArmedConfirm] = React.useState('');
        const [fakeTick, setFakeTick] = React.useState(0);

        // compose
        const [senderId, setSenderId] = React.useState('');
        const [content, setContent] = React.useState('');
        const [timeText, setTimeText] = React.useState('');
        const [dateText, setDateText] = React.useState('');
        const [preset, setPreset] = React.useState('now');
        const [replyId, setReplyId] = React.useState('');
        const [imageUrl, setImageUrl] = React.useState('');
        const [galleryImage, setGalleryImage] = React.useState('');
        const [picking, setPicking] = React.useState(false);
        const [embedOn, setEmbedOn] = React.useState(false);
        const [embedTitle, setEmbedTitle] = React.useState('');
        const [embedDesc, setEmbedDesc] = React.useState('');
        const [embeddingColor, setEmbeddingColor] = React.useState('#5865F2');
        const [embedImage, setEmbedImage] = React.useState('');
        // batch
        const [batchText, setBatchText] = React.useState('');
        const [batchSenderId, setBatchSenderId] = React.useState('');
        const [batchTime, setBatchTime] = React.useState('');
        const [batchDate, setBatchDate] = React.useState('');
        // call & system
        const [callerId, setCallerId] = React.useState('');
        const [receiverId, setReceiverId] = React.useState('');
        const [missed, setMissed] = React.useState(false);
        const [durationMin, setDurationMin] = React.useState('2');
        const [sysSenderId, setSysSenderId] = React.useState('');
        const [sysType, setSysType] = React.useState(6 as number | null);
        const [sysContent, setSysContent] = React.useState('');
        // react tab
        const [reactMsgId, setReactMsgId] = React.useState('');
        const [reactEmoji, setReactEmoji] = React.useState('');
        const [reactUserId, setReactUserId] = React.useState('');
        // saved tab: inline editor for one fake (desktop's Edit Fake Message)
        const [editingId, setEditingId] = React.useState('');
        const [editText, setEditText] = React.useState('');
        const [editWhen, setEditWhen] = React.useState('');
        // setup
        const [chatBtn, setChatBtn] = React.useState((cfg as any)?.chatButton !== false);
        const [quickTxt, setQuickTxt] = React.useState(String((cfg as any)?.quickText ?? 'hello'));

        const candidates = memberCandidates();
        const me = getUserStore()?.getCurrentUser?.() ?? null;
        const channelId = currentChannelId();
        // Sensible defaults: sender starts as YOU.
        const [defaultsInit, setDefaultsInit] = React.useState(0);
        if (!defaultsInit && me?.id) {
            setDefaultsInit(1);
            setSenderId(String(me.id));
            setBatchSenderId(String(me.id));
            setReactUserId(String(me.id));
        }

        function parseWhen(t: string, d: string): Date {
            const date = new Date();
            const dm = String(d ?? '').trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (dm) date.setFullYear(parseInt(dm[1], 10), parseInt(dm[2], 10) - 1, parseInt(dm[3], 10));
            const tm = String(t ?? '').trim().match(/^(\d{1,2}):(\d{2})$/);
            if (tm) date.setHours(Math.min(23, parseInt(tm[1], 10)), parseInt(tm[2], 10), 0, 0);
            return date;
        }

        const manualWhen = String(timeText).trim() !== '' || String(dateText).trim() !== '';
        const PRESETS = [
            { key: 'now', label: 'Now' },
            { key: 'm5', label: '5m ago' },
            { key: 'm30', label: '30m ago' },
            { key: 'm120', label: '2h ago' },
            { key: 'yesterday-evening', label: 'Yesterday 8:34 PM' },
        ];

        // ---- screen builders (each returns a plain View tree) -------------------

        function composeScreen(): any {
            const photoSource = galleryImage || String(imageUrl).trim();
            const author = memberById(senderId || (candidates[0]?.id ?? ''));
            return el(View, null,
                Card({ title: 'Who says it', dot: C.accent, meta: author ? userLabel(author) : 'you', children: [
                    Lbl({ text: 'Tap a person — you is pre-picked', first: true }),
                    MemberChips({ members: candidates, value: senderId, onChange: setSenderId }),
                    Input({ placeholder: '...or paste a user ID', value: senderId, onChangeText: (t: string) => setSenderId(t.replace(/[^0-9]/g, '')) }),
                ] }),
                Card({ title: 'The message', dot: C.accent, children: [
                    Input({ placeholder: 'Type the message…', value: content, onChangeText: setContent, multiline: true, style: { minHeight: 64, textAlignVertical: 'top', marginTop: 2 } }),
                ] }),
                Card({ title: 'When', dot: C.accent, meta: manualWhen ? 'manual' : 'preset', children: [
                    Lbl({ text: 'Preset — used while the fields below are empty', first: true }),
                    ChipRow({ items: PRESETS, value: preset, onChange: setPreset }),
                    Lbl({ text: 'Time (HH:MM) and date (YYYY-MM-DD) override the preset' }),
                    Input({ placeholder: '14:30', value: timeText, onChangeText: setTimeText }),
                    Input({ placeholder: '2026-10-29', value: dateText, onChangeText: setDateText }),
                ] }),
                Card({ title: 'Reply & photo', dot: C.accent, children: [
                    Lbl({ text: 'Reply to a message from this chat', first: true }),
                    MsgPicker({ channelId, value: replyId, onChange: setReplyId }),
                    Input({ placeholder: '...or paste a message ID', value: replyId, onChangeText: (t: string) => setReplyId(t.replace(/[^0-9]/g, '')) }),
                    Lbl({ text: 'Photo — gallery pick or URL' }),
                    el(View, { style: { flexDirection: 'row', alignItems: 'center' } },
                        el(Pressable, {
                            accessibilityLabel: 'Pick photo from gallery',
                            disabled: picking,
                            onPress: async () => {
                                setPicking(true);
                                try {
                                    const uri = await pickImageFromGallery();
                                    if (uri) { setGalleryImage(uri); toast('Photo attached'); }
                                    else toast('Gallery picker not available on this build — use the URL field below');
                                } finally {
                                    setPicking(false);
                                }
                            },
                            style: { backgroundColor: C.chip, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginRight: 10, marginTop: 4 },
                        }, el(Text, { style: { color: C.text, fontSize: 13, fontWeight: '700' } }, picking ? 'Opening…' : '📷 Gallery')),
                        galleryImage ? el(MiniBtn, { label: 'Remove photo', danger: true, onPress: () => setGalleryImage('') }) : null),
                    galleryImage ? el(Text, { numberOfLines: 1, style: { color: C.ok, fontSize: 12, marginTop: 2 } }, '✓ gallery photo attached') : null,
                    Input({ placeholder: 'https://…/image.png', value: imageUrl, onChangeText: setImageUrl, style: { marginTop: 6 } }),
                    Lbl({ text: 'Embed (optional)' }),
                    SwitchRow({ label: 'Attach an embed', value: embedOn, onValueChange: setEmbedOn }),
                    embedOn ? el(View, null,
                        Input({ placeholder: 'Embed title', value: embedTitle, onChangeText: setEmbedTitle }),
                        Input({ placeholder: 'Embed description', value: embedDesc, onChangeText: setEmbedDesc, multiline: true }),
                        Input({ placeholder: '#5865F2', value: embeddingColor, onChangeText: setEmbeddingColor }),
                        Input({ placeholder: 'Embed image URL', value: embedImage, onChangeText: setEmbedImage })) : null,
                ] }),
                el(View, { style: { marginHorizontal: 14 } }, BigBtn({
                    label: 'Fake send',
                    onPress: () => {
                        if (!author) return toast('Pick who sends it first');
                        if (!String(content).trim()) return toast('Write the message text first');
                        const when = manualWhen ? parseWhen(timeText, dateText) : presetDate(preset);
                        const embeds: FakeEmbed[] | undefined = embedOn
                            ? [{ title: embedTitle || undefined, description: embedDesc || undefined, color: hexToInt(embeddingColor), image: embedImage ? { url: embedImage } : undefined }]
                            : undefined;
                        const attachments = photoSource
                            ? [{ url: photoSource, filename: photoSource.split('/').pop() || 'image.png', ...(galleryImage ? { local: true } : {}) }]
                            : undefined;
                        const id = injectMessage(channelId, author, content, when, undefined, attachments, replyId ? { messageId: replyId } : undefined, embeds);
                        toast(id ? 'Fake sent ✓' : 'Inject failed (no dispatcher?)');
                        if (id) { setContent(''); setReplyId(''); setGalleryImage(''); setImageUrl(''); }
                        setFakeTick((n: number) => n + 1);
                    },
                })));
        }

        function batchScreen(): any {
            const base = parseWhen(batchTime, batchDate);
            const parsed = parseBatchScript(batchText, base);
            const defaultSender = memberById(batchSenderId || (me?.id ?? ''));
            const unresolvedCount = parsed.filter((l) => !resolveBatchAuthor(l.senderName, candidates, defaultSender)).length;
            return el(View, null,
                Card({ title: 'Default sender', dot: C.accent, meta: batchSenderId ? userLabel(memberById(batchSenderId)) : 'you', children: [
                    Lbl({ text: 'Lines with no name speak as this person', first: true }),
                    MemberChips({ members: candidates, value: batchSenderId, onChange: setBatchSenderId }),
                    Input({ placeholder: '...or paste a user ID', value: batchSenderId, onChangeText: (t: string) => setBatchSenderId(t.replace(/[^0-9]/g, '')) }),
                ] }),
                Card({ title: 'Script', dot: C.accent, meta: parsed.length ? String(parsed.length) + ' ready' : 'empty', children: [
                    Lbl({ text: 'One per line — [HH:MM] and name both optional', first: true }),
                    Input({
                        placeholder: '[14:30] me: hey\n[14:31] somebody: sup\njust text = default sender, base time',
                        value: batchText, onChangeText: setBatchText, multiline: true, style: { minHeight: 120, textAlignVertical: 'top' },
                    }),
                    parsed.length ? el(View, { style: { backgroundColor: C.cardAlt, borderRadius: 10, borderWidth: 1, borderColor: C.line, padding: 10, marginTop: 4 } },
                        el(Text, { style: { color: unresolvedCount ? C.amber : C.ok, fontSize: 12, fontWeight: '800', marginBottom: 2 } },
                            parsed.length + ' message(s) ready' + (unresolvedCount ? ' · ' + unresolvedCount + ' unknown name(s)' : ' ✓')),
                        ...parsed.slice(0, 8).map((l, i) => el(Text, { key: 'bp-' + i, numberOfLines: 1, style: { color: C.sub, fontSize: 11, marginTop: 1 } },
                            l.time + ' · ' + (l.senderName || userLabel(defaultSender ?? {})) + ': ' + l.content)),
                        parsed.length > 8 ? el(Text, { style: { color: C.sub, fontSize: 11, marginTop: 2 } }, '…and ' + (parsed.length - 8) + ' more') : null) : null,
                    Lbl({ text: 'Base time (HH:MM)' }),
                    Input({ placeholder: '14:30', value: batchTime, onChangeText: setBatchTime }),
                    Lbl({ text: 'Base date (YYYY-MM-DD)' }),
                    Input({ placeholder: '2026-10-29', value: batchDate, onChangeText: setBatchDate }),
                ] }),
                el(View, { style: { marginHorizontal: 14 } }, BigBtn({
                    label: 'Inject ' + parsed.length + ' message(s)',
                    disabled: !parsed.length,
                    onPress: () => {
                        if (!channelId) return toast('Open a chat first');
                        const r = injectBatch(channelId, parsed, candidates, defaultSender, base);
                        const names = r.unknown.length ? ' (' + r.unknown.join(', ') + ')' : '';
                        toast(r.injected + ' injected' + (r.skipped ? ' · ' + r.skipped + ' skipped' + names : ''));
                        if (r.injected) setBatchText('');
                        setFakeTick((n: number) => n + 1);
                    },
                }))
                , el(View, { style: { marginHorizontal: 14 } }, MiniBtn({ label: 'Clear script', danger: true, onPress: () => setBatchText('') })));
        }

        function callCard(): any {
            return Card({ title: 'Fake call', dot: C.ok, children: [
                Lbl({ text: 'Caller', first: true }),
                MemberChips({ members: candidates, value: callerId, onChange: setCallerId }),
                Lbl({ text: 'Receiver' }),
                MemberChips({ members: candidates, value: receiverId, onChange: setReceiverId }),
                SwitchRow({ label: 'Missed call', value: missed, onValueChange: setMissed }),
                Lbl({ text: 'Duration in minutes (ignored when missed)' }),
                Input({ placeholder: '2', value: durationMin, onChangeText: (t: string) => setDurationMin(t.replace(/[^0-9]/g, '')) }),
                Lbl({ text: 'Time (HH:MM) · date (YYYY-MM-DD)' }),
                Input({ placeholder: '14:30', value: timeText, onChangeText: setTimeText }),
                Input({ placeholder: '2026-10-29', value: dateText, onChangeText: setDateText }),
                BigBtn({
                    label: 'Inject call',
                    onPress: () => {
                        const caller = memberById(callerId || (candidates[0]?.id ?? ''));
                        if (!caller) return toast('Pick a caller first');
                        const other = memberById(receiverId || (candidates.find((u: any) => String(u.id) !== String(caller.id))?.id ?? caller.id));
                        const sec = Math.max(0, parseInt(durationMin || '0', 10) || 0) * 60;
                        const id = injectCall(channelId, caller, other, missed, sec, parseWhen(timeText, dateText));
                        toast(id ? 'Fake call injected' : 'Inject failed');
                        setFakeTick((n: number) => n + 1);
                    },
                }),
            ] });
        }

        function sysCard(): any {
            return Card({ title: 'System event', dot: C.amber, children: [
                Lbl({ text: 'Actor (who did it)', first: true }),
                MemberChips({ members: candidates, value: sysSenderId, onChange: setSysSenderId }),
                Lbl({ text: 'Event type' }),
                ChipRow({
                    items: SYSTEM_TYPES.map((t: any) => ({ key: t.value, label: t.label })),
                    value: sysType,
                    onChange: setSysType,
                }),
                Lbl({ text: 'Custom text (optional)' }),
                Input({ placeholder: 'Usually empty', value: sysContent, onChangeText: setSysContent, multiline: true }),
                BigBtn({
                    label: 'Inject system message',
                    onPress: () => {
                        const author = memberById(sysSenderId || (candidates[0]?.id ?? ''));
                        if (!author) return toast('Pick an actor first');
                        const id = injectSystemMessage(channelId, author, sysType ?? 6, sysContent, parseWhen(timeText, dateText));
                        toast(id ? 'System message injected' : 'Inject failed');
                        setFakeTick((n: number) => n + 1);
                    },
                }),
            ] });
        }

        function reactScreen(): any {
            return el(View, null,
                Card({ title: 'Reaction', dot: C.amber, children: [
                    Lbl({ text: 'Message — tap one from the chat', first: true }),
                    MsgPicker({ channelId, value: reactMsgId, onChange: setReactMsgId }),
                    Lbl({ text: 'Emoji' }),
                    Input({ placeholder: '😀', value: reactEmoji, onChangeText: setReactEmoji }),
                    Lbl({ text: 'React as (you is pre-picked)' }),
                    MemberChips({ members: candidates, value: reactUserId, onChange: setReactUserId }),
                    BigBtn({
                        label: 'Inject reaction',
                        onPress: () => {
                            if (!reactMsgId || !reactEmoji) return toast('Pick a message and an emoji first');
                            const uid = reactUserId || String(me?.id ?? '');
                            const ok = injectReaction(channelId, reactMsgId, uid, reactEmoji);
                            toast(ok ? 'Reaction added' : 'Inject failed');
                            setFakeTick((n: number) => n + 1);
                        },
                    }),
                ] }));
        }

        function savedScreen(): any {
            void fakeTick;
            const all = readFakes();
            const inChannel = all.filter((f) => f.type !== 'reaction' && f.channelId === channelId);
            const shown = (inChannel.length ? inChannel : all).slice().reverse().slice(0, 60);
            return el(View, null,
                Card({ title: 'This channel', dot: C.accent, meta: inChannel.length + ' fake(s)', children: [
                    inChannel.length
                        ? el(Text, { style: { color: C.sub, fontSize: 12 } }, 'What this channel remembers, newest first.')
                        : el(Text, { style: { color: C.sub, fontSize: 12 } }, 'No fakes in this channel — showing all ' + all.length + '.'),
                    Confirm({ id: 'clearchannel', label: 'Clear fakes in this channel', armed: armedConfirm === 'clearchannel', setArmed: setArmedConfirm, onConfirm: () => {
                        const n = clearFakesInChannel(channelId);
                        toast(n + ' fake(s) cleared in this channel');
                        setFakeTick((x: number) => x + 1);
                    } }),
                ] }),
                ...shown.map((f, i) => FakeCard({
                    k: String(f.snowflakeId) + ':' + i,
                    fake: f,
                    editing: editingId === f.snowflakeId,
                    onEdit: isMsg(f) ? () => {
                        setEditingId(String(f.snowflakeId));
                        setEditText(String((f as PersistedMessage).content ?? ''));
                        setEditWhen('');
                    } : undefined,
                    onDelete: () => {
                        const ok = removeFakeById(f.snowflakeId);
                        toast(ok ? 'Removed' : 'Remove failed');
                        setFakeTick((x: number) => x + 1);
                    },
                    children: editingId === f.snowflakeId && isMsg(f) ? el(View, { style: { marginTop: 6 } },
                        Input({ placeholder: 'New text', value: editText, onChangeText: setEditText, multiline: true, style: { minHeight: 48, textAlignVertical: 'top' } }),
                        Input({ placeholder: 'New time (optional, YYYY-MM-DD HH:MM)', value: editWhen, onChangeText: setEditWhen }),
                        el(View, { style: { flexDirection: 'row' } },
                            MiniBtn({ label: 'Save', onPress: () => {
                                const res = editFakeMessage(f.channelId, f.snowflakeId, editText, editWhen.trim() || undefined);
                                toast(res.reason);
                                if (res.ok) { setEditingId(''); setFakeTick((x: number) => x + 1); }
                            } }),
                            MiniBtn({ label: 'Cancel', onPress: () => setEditingId('') }))) : null,
                })),
                Card({ title: 'Recovery', children: [
                    BigBtn({
                        label: 'Show saved fakes again (' + all.length + ')',
                        ok: true,
                        onPress: () => {
                            const r = restoreSaved();
                            toast(r.restored ? 'Restored ' + r.restored + (r.skipped ? ' · skipped ' + r.skipped : '') : 'Nothing restorable · skipped ' + r.skipped);
                            setFakeTick((x: number) => x + 1);
                        },
                    }),
                    Confirm({ id: 'deletesaved', label: 'Delete saved fakes (recovery — kills a crash loop)', armed: armedConfirm === 'deletesaved', setArmed: setArmedConfirm, onConfirm: () => {
                        const n = deleteSavedFakes();
                        toast(n ? 'Deleted ' + n + ' saved fake' + (n === 1 ? '' : 's') : 'Nothing saved');
                        setFakeTick((x: number) => x + 1);
                    } }),
                ] }));
        }

        function isMsg(f: PersistedFake): boolean { return f.type === 'message'; }

        function setupScreen(): any {
            return el(View, null,
                Card({ title: 'Chat bar', dot: C.accent, children: [
                    SwitchRow({
                        label: 'Chat-bar Fake button',
                        subLabel: 'Puts a Fake pill beside the chat buttons',
                        value: chatBtn,
                        onValueChange: (val: boolean) => {
                            setChatBtn(val);
                            setChatButton(val);
                            toast(val ? 'Fake button on' : 'Fake button off');
                        },
                    }),
                    Lbl({ text: 'Quick Fake text (chat-bar button)' }),
                    Input({ placeholder: 'hello', value: quickTxt, onChangeText: (t: string) => { (cfg as any).quickText = t; setQuickTxt(t); savePluginCfg(); } }),
                    el(Text, { style: { color: C.sub, fontSize: 11, marginTop: 2 } }, 'Chat button: ' + buttonStatus),
                ] }),
                Card({ title: 'About', children: [
                    el(Text, { style: { color: C.text, fontSize: 13 } }, 'FakeDM ' + PLUGIN_VERSION + ' — by Cenotaph (ported from the Equicord plugin).'),
                    el(Text, { style: { color: C.sub, fontSize: 12, marginTop: 4, lineHeight: 18 } },
                        'Fake messages, calls, events and reactions are injected as real client events — nothing here patches Discord\'s own screens, so nothing here can crash them.'),
                ] }));
        }

        const body = tab === 'compose' ? composeScreen()
            : tab === 'batch' ? batchScreen()
            : tab === 'callsys' ? el(View, null, callCard(), sysCard())
            : tab === 'react' ? reactScreen()
            : tab === 'saved' ? savedScreen()
            : setupScreen();

        const channel = channelId ? getChannelStore()?.getChannel?.(channelId) ?? null : null;
        const targetText = channelId
            ? ((channel?.guild_id ? '#' : 'DM · ') + (channel?.name ?? channelId.slice(-6)))
            : 'no channel open — open a chat first';

        return el(ScrollView, { style: { flex: 1, backgroundColor: C.bg } },
            el(View, { style: { paddingHorizontal: 14, paddingTop: 16, paddingBottom: 2 } },
                el(View, { style: { flexDirection: 'row', alignItems: 'center' } },
                    el(View, { style: { width: 40, height: 40, borderRadius: 12, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', marginRight: 10 } },
                        el(Text, { style: { color: '#ffffff', fontSize: 18, fontWeight: '900' } }, 'F')),
                    el(View, { style: { flex: 1 } },
                        el(Text, { style: { color: C.text, fontSize: 18, fontWeight: '900' } }, 'FakeDM ' + PLUGIN_VERSION),
                        el(Text, { style: { color: C.sub, fontSize: 11, marginTop: 1 } }, 'Injects into: ' + targetText))),
                el(View, { style: { marginTop: 10, flexDirection: 'row', flexWrap: 'wrap' } },
                    TAB_DEFS.map((t) => MiniBtn({ key: t.key, label: t.label, active: tab === t.key, onPress: () => setTab(t.key) }))),
                el(Pressable, {
                    accessibilityLabel: 'Retry chat button install',
                    onPress: () => { installTries = 0; anchorCursor = 0; uninstallChatButton(); installChatButton(); },
                    style: { marginTop: 6, backgroundColor: C.chip, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, alignSelf: 'flex-start' },
                }, el(Text, { style: { color: C.sub, fontSize: 11 } }, 'Chat button: ' + buttonStatus + ' · tap to retry')),
            ),
            body,
            el(View, { style: { height: 44 } }));
    };
}

function quickFake() {
    try {
        const channelId = currentChannelId();
        if (!channelId) { toast('Open a chat first, then tap Fake'); return; }
        const me = getUserStore()?.getCurrentUser?.() ?? null;
        const text = String((cfg as any)?.quickText ?? 'hello') || 'hello';
        const id = injectMessage(channelId, me ?? { id: '' }, text, new Date());
        if (!id) toast('Could not inject — dispatcher not found on this build');
    } catch (e) { hostError('quick fake failed', e); }
}

const PILL_LABEL = 'FakeDM quick fake';
const MAX_RENDER_FAULTS = 3;

let buttonStatus = 'not installed yet';
// True only while a wrapper patch is installed. The hook checks it before doing
// anything, so after an uninstall a stale render returns Discord's own tree.
let buttonActive = false;
let renderFaults = 0;
// "Hooked" is not enough: on the phone the status line said hooked while the pill
// never appeared, because the hooked component was never rendered. Each patch
// tracks how many renders it actually wrapped and the status line shows that
// number, so "hooked ... · never rendered" and "wrapped N" are distinguishable.
//
// One patch at a time: 1.5.1 stacked wrappers on every chat-input candidate at
// once and one of them sat around the text box, which remounted it per
// keystroke. Only ONE row is ever wrapped — the one a hook currently points at.
interface RowPatch { label: string; key: string; wraps: number; off: () => void }
let rowPatches: RowPatch[] = [];
let fallbackTimer: any = null;
let anchorCursor = 0;

function chatButtonElement(): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Pressable || !RN?.Text) return null;
    const el = React.createElement;
    // A filled pill with its own background, contrast, height and hit area: if it
    // renders at all it is visible, unlike a bare label in a dense icon row.
    return el(RN.Pressable, {
        accessibilityLabel: PILL_LABEL,
        accessibilityRole: 'button',
        onPress: () => quickFake(),
        style: {
            flexShrink: 0,
            marginLeft: 6,
            marginRight: 2,
            minWidth: 44,
            height: 28,
            paddingHorizontal: 10,
            borderRadius: 14,
            backgroundColor: '#5865F2',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }, el(RN.Text, { style: { color: '#ffffff', fontSize: 12, fontWeight: '700' } }, 'Fake'));
}

// Wrap, never inject: the pill goes FIRST (a patched-on child at the row's end
// can fall outside an overflow-clipping parent on Android), the row element goes
// in untouched as the second child.
const WRAP_MARKER = 'fakedm-row';

// A patch whose component sits INSIDE another patched component would wrap the
// same tree twice and show two pills. A cheap bounded scan of the tree catches
// the case where the tree handed over is already one of our wrappers.
function alreadyWrapped(tree: any, depth = 0): boolean {
    if (!tree || typeof tree !== 'object' || depth > 3) return false;
    if (tree.props?.testID === WRAP_MARKER) return true;
    const kids = tree.children ?? tree.props?.children;
    if (Array.isArray(kids)) {
        for (const kid of kids) { if (alreadyWrapped(kid, depth + 1)) return true; }
    } else if (alreadyWrapped(kids, depth + 1)) return true;
    return false;
}

function wrapChatRow(label: string, tree: any): any {
    if (!buttonActive) return tree;
    if (!tree || typeof tree !== 'object' || tree.type === undefined) return tree;
    if (alreadyWrapped(tree)) return tree;
    try {
        const React = getReact();
        const RN = getRN();
        const el = React?.createElement;
        const pill = chatButtonElement();
        if (!el || !RN?.View || !pill) {
            renderFault('wrapper unavailable (react-native view or pill missing)');
            return tree;
        }
        for (const p of rowPatches) if (p.label === label) p.wraps += 1;
        refreshButtonStatus();
        return el(RN.View, { testID: WRAP_MARKER, style: { flexDirection: 'row', alignItems: 'center', overflow: 'visible' } }, pill, tree);
    } catch (e) {
        renderFault(e);
        return tree;
    }
}

// A wrapper that cannot build is a feature that should stop, not a client that
// should degrade render after render. After MAX_RENDER_FAULTS the patch is taken
// out and the status line says why.
function renderFault(detail?: unknown) {
    if (!buttonActive) return;
    renderFaults++;
    hostError('chat button render fault ' + renderFaults + '/' + MAX_RENDER_FAULTS, detail);
    if (renderFaults < MAX_RENDER_FAULTS) return;
    uninstallChatButton();
    buttonStatus = 'auto-disabled after ' + renderFaults + ' render faults';
}

// One hook can be true and still useless on this phone — the memo exists but
// never finishes a render, so the status line can tell "hooked and rendering"
// from "hooked but never shown".
function refreshButtonStatus(): void {
    if (!rowPatches.length) return;
    const parts = rowPatches.map((p) => p.label + ' (' + p.key + (p.wraps ? ' · wrapped ' + p.wraps : ' · never rendered') + ')');
    buttonStatus = 'hooked: ' + parts.join(', ');
}

// Called 15 s after a hook was installed. If that single anchor never wrapped a
// render, it is taken back out and the NEXT anchor on the list is tried — so a
// silent hook moves on instead of stacking a second wrapper next to the first
// (stacking them remounts the message box per keystroke).
function checkFallback(): void {
    fallbackTimer = null;
    if (!buttonActive) return;
    const current = rowPatches[0];
    if (!current || current.wraps > 0) return;
    if (anchorCursor >= CHAT_ANCHORS.length - 1) return; // last candidate stays
    try { current.off?.(); } catch {}
    rowPatches = [];
    anchorCursor += 1;
    buttonStatus = 'that chat row never rendered — trying the next one';
    hostError('chat button: silent anchor, moving on', current.label);
    installChatButton();
}
function finderApi(): { finders: any; filters: any; patcher: any } | null {
    const v = getValenced();
    if (!v) return null;
    const holders: any[] = [v];
    try { holders.push(v.discord); } catch {}
    try { holders.push(v.unscoped); } catch {}
    for (const holder of holders) {
        try {
            const finders = holder?.modules?.finders ?? holder?.finders;
            const filters = finders?.filters;
            const patcher = holder?.patcher ?? v?.patcher;
            if (finders && filters && patcher && typeof patcher.after === 'function') {
                return { finders, filters, patcher };
            }
        } catch {}
    }
    return null;
}

function memoFilter(filters: any, name: string): any {
    try {
        return filters.createFilterGenerator(
            ([n]: any, _id: any, exports: any) => {
                const t = exports?.type;
                if (t && typeof t === 'function' && (t.displayName === n || t.name === n)) return true;
                const r = exports?.render;
                if (r && typeof r === 'function' && (r.displayName === n || r.name === n)) return true;
                return exports?.displayName === n || exports?.name === n;
            },
            ([n]: any) => 'cenotaph.fakedm.memo(' + n + ')',
        )(name);
    } catch {
        return null;
    }
}

// Only names whose job is the chat action row. Patching a guessed container was
// how the pill ended up somewhere it could squeeze the text input; the wrapper is
// harmless, but a wrong anchor would still be a button in the wrong place.
const CHAT_ANCHORS = ['ChatInputRightActions', 'ChatInputActions'];
// Names the build actually exposes, filled in only when the hook misses. This
// turns "no button" into something the user can paste back.
let chatRowNames: string[] = [];
const MAX_INSTALL_TRIES = 4;
let installTimer: any = null;
let installTries = 0;

// Only the patches that belong to the chat button, so the switch can undo them
// without disturbing the storage subscription or anything else registered.
let buttonCleanups: (() => void)[] = [];

function uninstallChatButton() {
    buttonActive = false;
    if (installTimer) { clearTimeout(installTimer); installTimer = null; }
    if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = null; }
    installTries = 0;
    renderFaults = 0;
    anchorCursor = 0;
    while (buttonCleanups.length) {
        try { buttonCleanups.pop()?.(); } catch {}
    }
    rowPatches = [];
    buttonStatus = 'off in settings';
}

function setChatButton(on: boolean) {
    try {
        (cfg as any).chatButton = on;
        savePluginCfg();
        if (on) installChatButton();
        else uninstallChatButton();
    } catch (e) {
        hostError('could not switch the chat button', e);
    }
    return buttonStatus;
}

function scanChatRows() {
    const host = finderApi();
    if (!host) return;
    const { finders, filters } = host;
    try {
        const nameOf = (exports: any): string | null => {
            const candidates = [
                exports?.type?.displayName, exports?.type?.name,
                exports?.render?.displayName, exports?.render?.name,
                exports?.displayName, exports?.name,
            ];
            for (const n of candidates) {
                if (typeof n === 'string' && n.indexOf('ChatInput') === 0) return n;
            }
            return null;
        };
        const generator = filters.createFilterGenerator(
            (_args: any, _id: any, exports: any) => nameOf(exports) !== null,
            (_args: any) => 'cenotaph.fakedm.chatscan',
        );
        const off = finders.getModules(generator([]), (exports: any) => {
            const name = nameOf(exports);
            if (name && chatRowNames.indexOf(name) === -1 && chatRowNames.length < 8) chatRowNames.push(name);
        });
        if (typeof off === 'function') buttonCleanups.push(off);
    } catch {}
}

function installChatButton() {
    try {
        if (installTimer) { clearTimeout(installTimer); installTimer = null; }
        // Re-installing must not stack a second wrapper on the same row.
        buttonActive = false;
        while (buttonCleanups.length) { try { buttonCleanups.pop()?.(); } catch {} }
        renderFaults = 0;
        if ((cfg as any)?.chatButton === false) { buttonStatus = 'off in settings'; return; }
        const host = finderApi();
        if (!host) { buttonStatus = 'host lacks finders/patcher'; return; }
        const { finders, filters, patcher } = host;
        if (typeof finders.getModules !== 'function') {
            buttonStatus = 'host has no getModules';
            return;
        }

        const hook = (Comp: any, label: string): boolean => {
            if (!Comp) return false;
            // The chat row is a memo: an object whose `type` (sometimes `render`)
            // is the render function. It is deliberately not a function itself, so
            // a `typeof === 'function'` guard skipped every real chat row.
            const key = typeof Comp === 'function' ? null
                : typeof Comp.type === 'function' ? 'type'
                : typeof Comp.render === 'function' ? 'render'
                : null;
            if (!key) return false;
            if (rowPatches.some((p) => p.label === label)) return false;
            try {
                const off = patcher.after(Comp, key, (_args: any, tree: any) => wrapChatRow(label, tree));
                if (typeof off !== 'function') return false;
                buttonActive = true;
                rowPatches.push({ label, key: String(key), wraps: 0, off });
                buttonCleanups.push(off);
                // The modules are handed over asynchronously (often a moment after
                // start() or after a retry was scheduled), so the success
                // bookkeeping lives HERE, not in the synchronous install loop
                // that fired the request.
            installTries = 0;
            if (installTimer) { clearTimeout(installTimer); installTimer = null; }
            refreshButtonStatus();
            if (!fallbackTimer) {
                fallbackTimer = setTimeout(checkFallback, 15000);
                try { fallbackTimer.unref?.(); } catch {}
            }
            return true;
            } catch (e) {
                buttonStatus = 'patch failed on ' + label;
                hostError('chat button patch failed', e);
                return false;
            }
        };

        const pick = (exports: any): any => {
            const ways = [exports, exports?.default, exports?.default?.default];
            for (const c of ways) {
                if (!c) continue;
                if (typeof c === 'function') return c;
                if (typeof c === 'object' && (typeof c.type === 'function' || typeof c.render === 'function')) return c;
            }
            return null;
        };

        // Hook ONE chat row, never two: a second wrapper in the input's ancestor
        // chain is what remounts the message box on every keystroke. Try each
        // anchor in order; a silent hook hands the baton to the next at 15 s.
        try { scanChatRows(); } catch {}
        for (const name of CHAT_ANCHORS.slice(anchorCursor)) {
            if (rowPatches.length) break;
            const filter = memoFilter(filters, name);
            if (!filter) continue;
            try {
                const off = finders.getModules(filter, (exports: any) => {
                    if (rowPatches.length) return; // single patch, ever
                    hook(pick(exports), name);
                });
                if (typeof off === 'function') buttonCleanups.push(off);
            } catch {}
        }

        // The row is often registered a few seconds after start(). Keep asking,
        // cheaply and a bounded number of times, instead of giving up for good.
        // If a patch arrived through the asynchronous handover in between, the
        // button is really installed: reactivate and stop asking.
        if (rowPatches.length) {
            buttonActive = true;
            installTries = 0;
            refreshButtonStatus();
            if (!fallbackTimer) {
                fallbackTimer = setTimeout(checkFallback, 15000);
                try { fallbackTimer.unref?.(); } catch {}
            }
            return;
        }
        if (installTries < MAX_INSTALL_TRIES) {
            installTries++;
            buttonStatus = 'chat row not found (try ' + installTries + '/' + MAX_INSTALL_TRIES + ')';
            installTimer = setTimeout(() => { installTimer = null; installChatButton(); }, 5000);
        } else {
            buttonStatus = 'chat row not found — settings page only';
        }
    } catch (e) {
        buttonActive = false;
        buttonStatus = 'install failed';
        hostError('chat button install failed', e);
    }
}


// ---- Start / stop ---------------------------------------------------------------

let cleanupFns: (() => void)[] = [];

async function startNext(api: any) {
    jsonStorageApi = api?.jsonStorage ?? null;
    try {
        await jsonStorageApi?.get?.();
    } catch (e) {
        hostError('jsonStorage unavailable', e);
    }
    refreshConfigFromStorage();
    if (jsonStorageApi?.subscribe) {
        const off = jsonStorageApi.subscribe(() => { try { refreshConfigFromStorage(); } catch {} });
        if (typeof off === 'function') cleanupFns.push(off);
    }
    // Nothing is restored or dispatched here on purpose: the client must be able
    // to boot with this plugin enabled even if the saved fakes are unusable.
    installChatButton();
    // Deliberately silent on boot: nothing to report, and a popup during startup
    // is the least useful moment for one.
}

async function startClassic() {
    const b: any = typeof bunny !== 'undefined' ? bunny : {};
    const v: any = typeof vendetta !== 'undefined' ? vendetta : null;
    try {
        if (b.plugin?.createStorage) {
            const store = b.plugin.createStorage();
            const promise = store?.[Symbol.for('bunny.storage.promise')];
            if (promise && typeof promise.then === 'function') await promise.catch(() => {});
            storageProxy = store;
            storageKind = 'bunny';
        } else if (v?.plugin?.storage) {
            storageProxy = v.plugin.storage;
            storageKind = 'vendetta';
        }
    } catch (e) {
        hostError('plugin storage unavailable', e);
    }
    refreshConfigFromStorage();
    // Same rule as the Valenced path: booting the client never dispatches a saved
    // fake, so an unusable entry cannot make the app crash on every launch.
}

let __instance: any = {
    jsonStorage: {
        load: true,
        default: { ...DEFAULT_SETTINGS, fakes: [] },
    },
    async start(api: any) {
        try {
            if (api && typeof api === 'object' && (api.cleanup || api.jsonStorage)) {
                if (api.cleanup && typeof api.cleanup === 'function') api.cleanup(() => {});
                await startNext(api);
            } else {
                await startClassic();
            }
        } catch (e) {
            hostError('start failed', e);
        }
    },
    stop() {
        uninstallChatButton();
        installTries = 0;
        while (cleanupFns.length) {
            try { cleanupFns.pop()?.(); } catch {}
        }
        restoredThisSession = false;
        fakesCache = [];
        jsonStorageApi = null;
        storageProxy = null;
        storageKind = '';
    },
    SettingsComponent: null as any,
};

// SettingsComponent must resolve the host LAZILY — building it at eval time
// touches revenge.* and risks the eval-time-crash class of bugs.
let __builtSettings: any = null;
function settingsComponentLazy(props: any) {
    if (!__builtSettings) {
        try {
            __builtSettings = buildSettingsComponent();
        } catch (e) {
            hostError('settings component build failed', e);
        }
    }
    if (!__builtSettings) {
        const React = getReact();
        const RN = getRN();
        const el = React?.createElement;
        if (el && RN) return el(RN.View ?? 'view', null, el(RN.Text ?? 'text', null, 'FakeDM: UI unavailable on this host'));
        return null;
    }
    return __builtSettings(props);
}
__instance.SettingsComponent = settingsComponentLazy;

// Engine handle: used by the verifier to drive the real code paths, and
// handy for power users debugging from logs. Not part of the UI.
__instance.__engine = {
    injectMessage,
    injectCall,
    injectSystemMessage,
    injectReaction,
    injectBatch,
    parseBatchScript,
    editFakeMessage,
    clearFakesInChannel,
    removeFakeById,
    doRestore: restoreSaved,
    deleteSavedFakes,
    restoreSaved,
    validFake,
    memberCandidates,
    getFakes: readFakes,
    chatButtonStatus: () => buttonStatus,
    forceFallback: checkFallback,
    setChatButton,
};

if (typeof plugin === 'function') {
    __instance = plugin(__instance);
}
globalThis.plugin = __instance;

__instance.onLoad = function () {
    return __instance.start?.();
};
__instance.onUnload = function () {
    return __instance.stop?.();
};
__instance.settings = __instance.SettingsComponent;

export default __instance;
