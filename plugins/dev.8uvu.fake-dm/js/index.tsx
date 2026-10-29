// FakeDM — mobile port of Epitav 8uvu's Equicord fakeDM plugin
// (C:\Users\Epitaph\Equicord\src\userplugins\fakeDM — read-only reference).
//
// Injects fake local messages, calls, system messages, reactions and embeds
// into any DM or channel through Discord's own FluxDispatcher, persists them
// across restarts, and can batch-inject a whole fake conversation from a
// simple "[14:30] Name: text" script.
//
const PLUGIN_VERSION = '1.4.0';

// Desktop-only pieces (chat-bar button portal, context-menu edit, CSS) have no
// Revenge equivalent — here everything lives in the plugin's settings page,
// organized into tabs. Clearing fakes dispatches MESSAGE_DELETE with the
// mlDeleted marker, which MessageLogger 1.6.2+ understands (no red rows).
//
// Host contract (proven in MessageLogger): lazy host lookups only, dual
// storage generation (jsonStorage on Next / plugin storage on Classic),
// universal start/stop export shape.

// ---- Settings ---------------------------------------------------------------

const DEFAULT_SETTINGS = {
    jitterSeconds: true, // randomize seconds like the desktop plugin's randomSeconds
    chatButton: false, // chat-bar Fake button — opt-in, because it edits Discord's own chat row
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

// Toast via revenge.discord.actions.ToastActionCreators.open — the pattern
// MessageLogger uses and which renders correctly on Revenge Next. The older
// revenge.ui.showToast({content,type}) path hands an OBJECT to React as a
// child on current builds and crashes the tree ('Objects are not valid as a
// React child'). Never touch revenge.ui here.
function toast(content: string) {
    const text = String(content ?? '');
    try {
        const actions: any = getActions();
        const open = actions?.ToastActionCreators?.open ?? actions?.open;
        if (typeof open === 'function') {
            open({ key: 'fakedm-' + Date.now(), content: text });
            return;
        }
    } catch {}
    try {
        const RN: any = getRN();
        RN?.ToastAndroid?.show?.(text, RN?.ToastAndroid?.SHORT ?? 0);
        return;
    } catch {}
    hostError('no toast channel available');
}

// ---- Settings UI ---------------------------------------------------------------

function hexToInt(hex: string): number | undefined {
    const m = String(hex ?? '').trim().replace('#', '');
    if (!/^[0-9a-fA-F]{6}$/.test(m)) return undefined;
    return parseInt(m, 16);
}

// Discord's own design components give the settings page Discord's native look.
// Resolved lazily (never at eval time) so the host cannot kill us.
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
    const C = isDark
        ? { bg: '#111214', card: '#1a1b1e', text: '#ffffff', sub: '#9ba0a8', input: '#232428', chip: '#2b2d31', blurple: '#5865F2', danger: '#f04747', ok: '#23a55a', amber: '#faa61a' }
        : { bg: '#f2f3f5', card: '#ffffff', text: '#060607', sub: '#5c5e66', input: '#ebedef', chip: '#e3e5e8', blurple: '#5865F2', danger: '#d83c3e', ok: '#248046', amber: '#c28516' };

    function Card(props: any) {
        const kids = Array.isArray(props.children) ? props.children : props.children == null ? [] : [props.children];
        if (D?.TableRowGroup) return el(D.TableRowGroup, { title: props.title }, ...kids);
        return el(View, { style: { backgroundColor: C.card, borderRadius: 12, marginHorizontal: 12, paddingVertical: 6, marginTop: 8 } }, ...kids);
    }
    function Row(props: any) {
        return el(View, { style: { paddingHorizontal: 14, paddingVertical: 8 } }, props.children);
    }
    function Label(props: any) {
        return el(Text, { style: { color: C.sub, fontSize: 12, fontWeight: '700', marginBottom: 4 } }, props.children);
    }
    function Input(props: any) {
        const NativeInput = D?.TextInput ?? D?.TextField ?? null;
        if (NativeInput) {
            return el(NativeInput, {
                placeholderTextColor: C.sub,
                ...props,
                style: [{ color: C.text, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14, marginBottom: 8 }, props.style],
            });
        }
        return el(TextInput, {
            placeholderTextColor: C.sub,
            ...props,
            style: [{ backgroundColor: C.input, color: C.text, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, fontSize: 14, marginBottom: 8 }, props.style],
        });
    }
    function Btn(props: any) {
        return el(Pressable, { onPress: props.onPress, style: [{ backgroundColor: props.danger ? C.danger : props.ok ? C.ok : C.blurple, borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 2 }, props.style] },
            el(Text, { style: { color: '#ffffff', fontWeight: '700', fontSize: 14 } }, props.label));
    }
    function SwitchRow(props: any) {
        if (D?.TableSwitchRow) {
            return el(D.TableSwitchRow, {
                label: props.label,
                subLabel: props.subLabel,
                value: !!props.value,
                onValueChange: props.onValueChange,
            });
        }
        const toggle = Switch
            ? el(Switch, { value: !!props.value, onValueChange: props.onValueChange, trackColor: { false: 'rgba(128,128,128,0.35)', true: C.blurple }, thumbColor: '#ffffff' })
            : el(Text, { style: { color: C.sub }, onPress: () => props.onValueChange(!props.value) }, props.value ? 'On' : 'Off');
        return el(View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 10 } },
            el(Text, { style: { color: C.text, fontSize: 15, flex: 1, paddingRight: 12 } }, props.label),
            toggle);
    }
    function MemberChips(props: any) {
        const kids = props.members.map((u: any) =>
            el(Pressable, {
                key: String(u.id),
                onPress: () => props.value === String(u.id) ? props.onChange('') : props.onChange(String(u.id)),
                style: { backgroundColor: props.value === String(u.id) ? C.blurple : C.chip, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
            }, el(Text, { style: { color: props.value === String(u.id) ? '#ffffff' : C.text, fontSize: 13 } }, userLabel(u))));
        return el(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { marginBottom: 6 } }, ...kids);
    }
    function TypeChips(props: any) {
        const kids = props.options.map((o: any) =>
            el(Pressable, {
                key: String(o.value),
                onPress: () => props.value === o.value ? props.onChange(null) : props.onChange(o.value),
                style: { backgroundColor: props.value === o.value ? C.blurple : C.chip, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
            }, el(Text, { style: { color: props.value === o.value ? '#ffffff' : C.text, fontSize: 13 } }, o.label)));
        return el(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { marginBottom: 6 } }, ...kids);
    }
    // Tap-to-pick a recent message from the open chat — no more copying IDs.
    function MsgPicker(props: any) {
        const msgs = recentMessages(props.channelId);
        if (!msgs.length) {
            return el(Text, { style: { color: C.sub, fontSize: 12 } }, 'Open the chat, then come back here to pick a message.');
        }
        const kids = msgs.map((m: any) =>
            el(Pressable, {
                key: String(m.id),
                onPress: () => props.value === String(m.id) ? props.onChange('') : props.onChange(String(m.id)),
                style: { backgroundColor: props.value === String(m.id) ? C.blurple : C.chip, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8, maxWidth: 240 },
            }, el(Text, { numberOfLines: 1, style: { color: props.value === String(m.id) ? '#ffffff' : C.text, fontSize: 12 } }, String(m.content || '(attachment/embed)') + ' — ' + userLabel(m.author))));
        return el(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { marginBottom: 6 } }, ...kids);
    }

    const TABS = [
        { key: 'quick', label: '★ Quick' },
        { key: 'message', label: 'Message' },
        { key: 'call', label: 'Call' },
        { key: 'system', label: 'System' },
        { key: 'react', label: 'React' },
        { key: 'batch', label: 'Batch' },
        { key: 'fakes', label: 'Fakes' },
    ];

    return function FakeDMSettings(props: any) {
        if (jsonStorageApi == null && props?.api?.jsonStorage) {
            jsonStorageApi = props.api.jsonStorage;
        }
        refreshConfigFromStorage();

        const [tab, setTab] = React.useState('quick');
        // Inline editor for one saved fake (desktop's Edit Fake Message modal).
        const [editingId, setEditingId] = React.useState('');
        const [editText, setEditText] = React.useState('');
        const [editWhen, setEditWhen] = React.useState('');
        // quick tab
        const [qUser, setQUser] = React.useState('');
        const [qUserId, setQUserId] = React.useState('');
        const [qText, setQText] = React.useState('');
        const [qPreset, setQPreset] = React.useState('now');
        const [qReply, setQReply] = React.useState('');
        const [qImage, setQImage] = React.useState('');
        const [qPicking, setQPicking] = React.useState(false);
        // message tab
        const [senderId, setSenderId] = React.useState('');
        const [content, setContent] = React.useState('');
        const [timeText, setTimeText] = React.useState('');
        const [dateText, setDateText] = React.useState('');
        const [replyId, setReplyId] = React.useState('');
        const [imageUrl, setImageUrl] = React.useState('');
        const [embedOn, setEmbedOn] = React.useState(false);
        const [embedTitle, setEmbedTitle] = React.useState('');
        const [embedDesc, setEmbedDesc] = React.useState('');
        const [embedColor, setEmbedColor] = React.useState('#5865F2');
        const [embedImage, setEmbedImage] = React.useState('');
        // call tab
        const [callerId, setCallerId] = React.useState('');
        const [receiverId, setReceiverId] = React.useState('');
        const [missed, setMissed] = React.useState(false);
        const [durationMin, setDurationMin] = React.useState('2');
        // system tab
        const [sysSenderId, setSysSenderId] = React.useState('');
        const [sysType, setSysType] = React.useState(6 as number | null);
        const [sysContent, setSysContent] = React.useState('');
        // react tab
        const [reactMsgId, setReactMsgId] = React.useState('');
        const [reactEmoji, setReactEmoji] = React.useState('');
        const [reactUserId, setReactUserId] = React.useState('');
        // batch tab
        const [batchText, setBatchText] = React.useState('');
        const [batchSenderId, setBatchSenderId] = React.useState('');
        const [batchTime, setBatchTime] = React.useState('');
        const [batchDate, setBatchDate] = React.useState('');
        // fakes tab
        const [fakeTick, setFakeTick] = React.useState(0);
        // chat-bar button
        const [chatBtn, setChatBtn] = React.useState((cfg as any)?.chatButton !== false);
        const [quickTxt, setQuickTxt] = React.useState(String((cfg as any)?.quickText ?? 'hello'));

        const candidates = memberCandidates();
        const me = getUserStore()?.getCurrentUser?.() ?? null;
        const channelId = currentChannelId();
        // Sensible defaults: sender starts as YOU, caller defaults handled per tab.
        const [defaultsInit, setDefaultsInit] = React.useState(0);
        if (!defaultsInit && me?.id) {
            setDefaultsInit(1);
            setSenderId(String(me.id));
            setBatchSenderId(String(me.id));
            setReactUserId(String(me.id));
        }

        function parseWhen(timeText: string, dateText: string): Date {
            const d = new Date();
            const dm = String(dateText ?? '').trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (dm) d.setFullYear(parseInt(dm[1], 10), parseInt(dm[2], 10) - 1, parseInt(dm[3], 10));
            const tm = String(timeText ?? '').trim().match(/^(\d{1,2}):(\d{2})$/);
            if (tm) d.setHours(Math.min(23, parseInt(tm[1], 10)), parseInt(tm[2], 10), 0, 0);
            return d;
        }

        const sendAs = () => el(View, null,
            el(Label, null, 'Send as — tap a person (you is pre-picked)'),
            el(MemberChips, { members: candidates, value: senderId, onChange: setSenderId }),
            el(Input, { placeholder: '...or paste a user ID', value: senderId, onChangeText: (t: string) => setSenderId(t.replace(/[^0-9]/g, '')) }));

        const whenInputs = () => el(View, null,
            el(Label, null, 'Time (HH:MM, optional — default now)'),
            el(Input, { placeholder: '14:30', value: timeText, onChangeText: setTimeText }),
            el(Label, null, 'Date (YYYY-MM-DD, optional)'),
            el(Input, { placeholder: '2026-09-26', value: dateText, onChangeText: setDateText }));

        let body: any = null;
        if (tab === 'quick') {
            const quickUser = qUserId ? memberById(qUserId) : resolveQuickUser(qUser, candidates);
            const PRESETS = [
                { key: 'now', label: 'Now' },
                { key: 'm5', label: '5m ago' },
                { key: 'm30', label: '30m ago' },
                { key: 'm120', label: '2h ago' },
                { key: 'yesterday-evening', label: 'Yesterday 8:34 PM' },
            ];
            body = el(View, null,
                el(Label, null, '1. Who says it? Tap a friend or type their name'),
                el(MemberChips, { members: candidates, value: quickUser ? String(quickUser.id) : '', onChange: (id: string) => { setQUserId(id); setQUser(id ? userLabel(memberById(id)) : ''); } }),
                el(Input, { placeholder: '@username (or leave empty = you)', value: qUser, onChangeText: (t: string) => { setQUser(t); setQUserId(''); } }),
                quickUser ? el(Text, { style: { color: C.ok, fontSize: 12, marginBottom: 6 } }, '✓ ' + userLabel(quickUser)) : el(Text, { style: { color: C.sub, fontSize: 12, marginBottom: 6 } }, 'Empty = sent by you'),
                el(Label, null, '2. What do they say?'),
                el(Input, { placeholder: 'Type the message…', value: qText, onChangeText: setQText, multiline: true, style: { minHeight: 56, textAlignVertical: 'top' } }),
                el(Label, null, '3. When? (optional)'),
                el(TypeChips, { options: PRESETS, value: qPreset, onChange: setQPreset }),
                el(Label, null, 'Reply to one of YOUR messages (optional)'),
                el(MsgPicker, { channelId, value: qReply, onChange: setQReply }),
                el(View, { style: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 } },
                    el(Pressable, {
                        disabled: qPicking,
                        onPress: async () => {
                            setQPicking(true);
                            try {
                                const uri = await pickImageFromGallery();
                                if (uri) { setQImage(uri); toast('Photo attached'); }
                                else toast('Gallery picker not available on this build — use the Message tab for image URLs');
                            } finally {
                                setQPicking(false);
                            }
                        },
                        style: { backgroundColor: C.chip, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginRight: 10 },
                    }, el(Text, { style: { color: C.text, fontSize: 13, fontWeight: '700' } }, qPicking ? 'Opening…' : '📷 Pick photo')),
                    qImage ? el(Text, { numberOfLines: 1, style: { color: C.ok, fontSize: 12, flex: 1 } }, '✓ photo attached') : null),
                qImage ? el(Pressable, { onPress: () => setQImage(''), style: { marginBottom: 8 } }, el(Text, { style: { color: C.danger, fontSize: 12 } }, '✕ Remove photo')) : null,
                el(Btn, {
                    label: 'Inject', onPress: () => {
                        const author = quickUser ?? me;
                        if (!author) return toast('Could not find that user');
                        const when = presetDate(qPreset);
                        const attachments = qImage ? [{ url: qImage, filename: 'image.png', local: true }] : undefined;
                        const id = injectMessage(channelId, author, qText, when, undefined, attachments, qReply ? { messageId: qReply } : undefined, undefined);
                        toast(id ? 'Fake sent ✓' : 'Inject failed');
                        if (id) { setQText(''); setQReply(''); setQImage(''); setQPreset('now'); }
                        setFakeTick((n: number) => n + 1);
                    },
                }));
        } else if (tab === 'message') {
            body = el(View, null,
                sendAs(),
                el(Label, null, 'Message'),
                el(Input, { placeholder: 'Message text…', value: content, onChangeText: setContent, multiline: true, style: { minHeight: 60, textAlignVertical: 'top' } }),
                whenInputs(),
                el(Label, null, 'Reply to — tap a message from the chat'),
                el(MsgPicker, { channelId, value: replyId, onChange: setReplyId }),
                el(Input, { placeholder: '...or paste a message ID', value: replyId, onChangeText: (t: string) => setReplyId(t.replace(/[^0-9]/g, '')) }),
                el(Label, null, 'Image URL (optional attachment)'),
                el(Input, { placeholder: 'https://…/image.png', value: imageUrl, onChangeText: setImageUrl }),
                el(SwitchRow, { label: 'Attach an embed', value: embedOn, onValueChange: setEmbedOn }),
                embedOn ? el(View, null,
                    el(Input, { placeholder: 'Embed title', value: embedTitle, onChangeText: setEmbedTitle }),
                    el(Input, { placeholder: 'Embed description', value: embedDesc, onChangeText: setEmbedDesc, multiline: true }),
                    el(Input, { placeholder: '#5865F2', value: embedColor, onChangeText: setEmbedColor }),
                    el(Input, { placeholder: 'Embed image URL', value: embedImage, onChangeText: setEmbedImage }),
                ) : null,
                el(Btn, {
                    label: 'Inject message', onPress: () => {
                        const author = memberById(senderId || (candidates[0]?.id ?? ''));
                        if (!author) return toast('Pick who sends it first');
                        const embeds: FakeEmbed[] | undefined = embedOn ? [{ title: embedTitle || undefined, description: embedDesc || undefined, color: hexToInt(embedColor), image: embedImage ? { url: embedImage } : undefined }] : undefined;
                        const attachments = imageUrl ? [{ url: imageUrl, filename: imageUrl.split('/').pop() || 'image.png' }] : undefined;
                        const id = injectMessage(channelId, author, content, parseWhen(timeText, dateText), undefined, attachments, replyId ? { messageId: replyId } : undefined, embeds);
                        toast(id ? 'Fake message injected' : 'Inject failed (no dispatcher?)');
                        setFakeTick((n: number) => n + 1);
                    },
                }));
        } else if (tab === 'call') {
            body = el(View, null,
                el(Label, null, 'Caller'),
                el(MemberChips, { members: candidates, value: callerId, onChange: setCallerId }),
                el(Label, null, 'Receiver'),
                el(MemberChips, { members: candidates, value: receiverId, onChange: setReceiverId }),
                el(SwitchRow, { label: 'Missed call', value: missed, onValueChange: setMissed }),
                el(Label, null, 'Duration (minutes, ignored when missed)'),
                el(Input, { placeholder: '2', value: durationMin, onChangeText: (t: string) => setDurationMin(t.replace(/[^0-9]/g, '')) }),
                whenInputs(),
                el(Btn, {
                    label: 'Inject call', onPress: () => {
                        const caller = memberById(callerId || (candidates[0]?.id ?? ''));
                        if (!caller) return toast('Pick a caller first');
                        const other = memberById(receiverId || (candidates.find((u: any) => String(u.id) !== String(caller.id))?.id ?? caller.id));
                        const sec = Math.max(0, parseInt(durationMin || '0', 10) || 0) * 60;
                        const id = injectCall(channelId, caller, other, missed, sec, parseWhen(timeText, dateText));
                        toast(id ? 'Fake call injected' : 'Inject failed');
                        setFakeTick((n: number) => n + 1);
                    },
                }));
        } else if (tab === 'system') {
            body = el(View, null,
                el(Label, null, 'Actor (who did it)'),
                el(MemberChips, { members: candidates, value: sysSenderId, onChange: setSysSenderId }),
                el(Label, null, 'Type'),
                el(TypeChips, { options: SYSTEM_TYPES, value: sysType, onChange: setSysType }),
                el(Label, null, 'Custom text (optional)'),
                el(Input, { placeholder: 'Usually empty', value: sysContent, onChangeText: setSysContent, multiline: true }),
                whenInputs(),
                el(Btn, {
                    label: 'Inject system message', onPress: () => {
                        const author = memberById(sysSenderId || (candidates[0]?.id ?? ''));
                        if (!author) return toast('Pick an actor first');
                        const id = injectSystemMessage(channelId, author, sysType ?? 6, sysContent, parseWhen(timeText, dateText));
                        toast(id ? 'System message injected' : 'Inject failed');
                        setFakeTick((n: number) => n + 1);
                    },
                }));
        } else if (tab === 'react') {
            body = el(View, null,
                el(Label, null, 'Message — tap one from the chat'),
                el(MsgPicker, { channelId, value: reactMsgId, onChange: setReactMsgId }),
                el(Label, null, 'Emoji'),
                el(Input, { placeholder: '😀', value: reactEmoji, onChangeText: setReactEmoji }),
                el(Label, null, 'React as (you is pre-picked)'),
                el(MemberChips, { members: candidates, value: reactUserId, onChange: setReactUserId }),
                el(Btn, {
                    label: 'Inject reaction', onPress: () => {
                        const uid = reactUserId || String(me?.id ?? '');
                        if (!reactMsgId || !reactEmoji) return toast('Pick a message and an emoji first');
                        const ok = injectReaction(channelId, reactMsgId, uid, reactEmoji);
                        toast(ok ? 'Reaction added' : 'Inject failed');
                        setFakeTick((n: number) => n + 1);
                    },
                }));
        } else if (tab === 'batch') {
            const base = parseWhen(batchTime, batchDate);
            const parsed = parseBatchScript(batchText, base);
            const defaultSender = memberById(batchSenderId || (me?.id ?? ''));
            const unresolved = parsed.filter((l) => !resolveBatchAuthor(l.senderName, candidates, defaultSender)).length;
            body = el(View, null,
                el(Label, null, 'Default sender (lines with no name)'),
                el(MemberChips, { members: candidates, value: batchSenderId, onChange: setBatchSenderId }),
                el(Label, null, 'Script — one message per line'),
                el(Input, {
                    placeholder: '[14:30] me: hey\n[14:31] somebody: sup\njust text = default sender, base time',
                    value: batchText, onChangeText: setBatchText, multiline: true, style: { minHeight: 110, textAlignVertical: 'top' },
                }),
                el(Text, { style: { color: parsed.length ? C.ok : C.sub, fontSize: 12, marginBottom: 6 } },
                    parsed.length + ' message(s) ready' + (unresolved ? ' · ' + unresolved + ' unknown name(s)' : '')),
                ...parsed.slice(0, 6).map((l, i) => el(Text, { key: 'batch-' + i, numberOfLines: 1, style: { color: C.sub, fontSize: 11, marginBottom: 1 } },
                    l.time + ' · ' + (l.senderName || userLabel(defaultSender ?? {})) + ': ' + l.content)),
                parsed.length > 6 ? el(Text, { style: { color: C.sub, fontSize: 11, marginBottom: 4 } }, '…and ' + (parsed.length - 6) + ' more') : null,
                el(Label, null, 'Start time (HH:MM, used by lines without one)'),
                el(Input, { placeholder: '14:30', value: batchTime, onChangeText: setBatchTime }),
                el(Label, null, 'Date (YYYY-MM-DD, optional)'),
                el(Input, { placeholder: '2026-09-26', value: batchDate, onChangeText: setBatchDate }),
                el(Btn, {
                    label: 'Inject ' + parsed.length + ' message(s)', onPress: () => {
                        if (!parsed.length) return toast('Nothing parsed — one message per line');
                        if (!channelId) return toast('Open a chat first');
                        const r = injectBatch(channelId, parsed, candidates, defaultSender, base);
                        const names = r.unknown.length ? ' (' + r.unknown.join(', ') + ')' : '';
                        toast(r.injected + ' injected' + (r.skipped ? ' · ' + r.skipped + ' skipped' + names : ''));
                        if (r.injected) setBatchText('');
                        setFakeTick((n2: number) => n2 + 1);
                    },
                }),
                el(Pressable, { onPress: () => setBatchText(''), style: { marginTop: 10 } },
                    el(Text, { style: { color: C.danger, fontSize: 12 } }, 'Clear script')));
        } else {
            // Fakes tab: what this channel remembers, newest first, with a real
            // editor per message (desktop's Edit Fake Message modal).
            void fakeTick;
            const all = readFakes();
            const inChannel = all.filter((f) => f.type !== 'reaction' && f.channelId === channelId);
            const shown = inChannel.length ? inChannel : all;
            body = el(View, null,
                el(Text, { style: { color: C.sub, fontSize: 12, paddingHorizontal: 14, paddingTop: 6 } },
                    inChannel.length ? 'Fakes in this channel: ' + inChannel.length : 'No fakes in this channel — showing all ' + all.length),
                el(Btn, {
                    label: 'Clear all fakes in this channel', danger: true, onPress: () => {
                        const n = clearFakesInChannel(channelId);
                        toast(n + ' fake(s) cleared');
                        setFakeTick((x: number) => x + 1);
                    },
                }),
                ...shown.slice().reverse().slice(0, 60).map((f, i) => {
                    const isMsg = f.type === 'message';
                    const label = isMsg
                        ? ((f as PersistedMessage).systemType ? 'SYSTEM' : 'MESSAGE')
                        : f.type === 'call' ? 'CALL' : 'REACT';
                    const color = isMsg ? C.blurple : f.type === 'call' ? C.ok : C.amber;
                    const authorName = userLabel(memberById(isMsg ? (f as PersistedMessage).authorId : f.type === 'call' ? (f as PersistedCall).callerId : (f as PersistedReaction).userId));
                    const editing = editingId === f.snowflakeId;
                    return el(View, { key: String(f.snowflakeId) + ':' + i, style: { paddingHorizontal: 14, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.input } },
                        el(View, { style: { flexDirection: 'row', justifyContent: 'space-between' } },
                            el(Text, { style: { color, fontSize: 11, fontWeight: '800' } }, label + ' · ' + authorName),
                            el(Text, { style: { color: C.sub, fontSize: 11 } }, new Date(isMsg || f.type === 'call' ? (f as any).timestamp : Date.now()).toLocaleString())),
                        editing
                            ? null
                            : el(Text, { style: { color: C.text, fontSize: 13, marginTop: 2 } },
                                isMsg ? String((f as PersistedMessage).content || '(no text)') : f.type === 'call' ? ((f as PersistedCall).missed ? 'Missed call' : 'Call · ' + Math.round((f as PersistedCall).durationSec / 60) + ' min') : ':' + (f as PersistedReaction).emoji + ':'),
                        isMsg ? (editing
                            ? el(View, { style: { marginTop: 6 } },
                                el(Input, { placeholder: 'New text', value: editText, onChangeText: setEditText, multiline: true, style: { minHeight: 48, textAlignVertical: 'top' } }),
                                el(Input, { placeholder: 'New time (optional, YYYY-MM-DD HH:MM)', value: editWhen, onChangeText: setEditWhen }),
                                el(View, { style: { flexDirection: 'row' } },
                                    el(Pressable, {
                                        onPress: () => {
                                            const res = editFakeMessage(f.channelId, f.snowflakeId, editText, editWhen.trim() || undefined);
                                            toast(res.reason);
                                            if (res.ok) { setEditingId(''); setFakeTick((x: number) => x + 1); }
                                        },
                                        style: { backgroundColor: C.blurple, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
                                    }, el(Text, { style: { color: '#ffffff', fontSize: 12, fontWeight: '700' } }, 'Save')),
                                    el(Pressable, {
                                        onPress: () => setEditingId(''),
                                        style: { backgroundColor: C.chip, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
                                    }, el(Text, { style: { color: C.text, fontSize: 12 } }, 'Cancel'))))
                            : el(View, { style: { flexDirection: 'row', marginTop: 6 } },
                                el(Pressable, {
                                    onPress: () => {
                                        setEditingId(f.snowflakeId);
                                        setEditText(String((f as PersistedMessage).content ?? ''));
                                        setEditWhen('');
                                    },
                                    style: { backgroundColor: C.chip, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8 },
                                }, el(Text, { style: { color: C.text, fontSize: 12 } }, 'Edit')),
                                el(Pressable, {
                                    onPress: () => {
                                        const ok = removeFakeById(f.snowflakeId);
                                        toast(ok ? 'Removed' : 'Remove failed');
                                        setFakeTick((x: number) => x + 1);
                                    },
                                    style: { backgroundColor: C.danger, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
                                }, el(Text, { style: { color: '#ffffff', fontSize: 12 } }, 'Delete'))))
                            : null,
                    );
                }));
        }

        return el(ScrollView, { style: { flex: 1, backgroundColor: C.bg } },
            el(View, { style: { paddingHorizontal: 16, paddingTop: 14 } },
                el(Text, { style: { color: C.text, fontSize: 18, fontWeight: '800' } }, 'FakeDM ' + PLUGIN_VERSION),
                el(Text, { style: { color: C.sub, fontSize: 12, marginTop: 2 } }, 'Injects into: ' + (channelId ? (getChannelStore()?.getChannel?.(channelId)?.name ?? 'DM · ' + channelId.slice(-6)) : 'no channel open — open a DM first')),
                el(Pressable, { onPress: () => { installTries = 0; installChatButton(); toast('Chat button: ' + buttonStatus); } },
                    el(Text, { style: { color: C.blurple, fontSize: 11, marginTop: 2 } }, 'Chat button: ' + buttonStatus + ' · tap to retry'))),
                el(SwitchRow, { label: 'Chat-bar Fake button (off by default, reload chat after)', value: chatBtn, onValueChange: (val: boolean) => { (cfg as any).chatButton = val; setChatBtn(val); savePluginCfg(); toast(val ? 'Fake button on — reload the chat to see it' : 'Fake button off — reload the chat'); } }),
                el(Input, { placeholder: 'Quick Fake text (chat-bar button)', value: quickTxt, onChangeText: (t: string) => { (cfg as any).quickText = t; setQuickTxt(t); savePluginCfg(); } }),
                el(Pressable, { onPress: () => { const r = restoreSaved(); toast(r.restored ? 'Restored ' + r.restored + (r.skipped ? ' · skipped ' + r.skipped : '') : 'Nothing restorable · skipped ' + r.skipped); setFakeTick((x2: number) => x2 + 1); } },
                    el(Text, { style: { color: C.blurple, fontSize: 12, marginTop: 6 } }, 'Show saved fakes again (' + readFakes().length + ')')),
                el(Pressable, { onPress: () => { const n = deleteSavedFakes(); toast(n ? 'Deleted ' + n + ' saved fake' + (n === 1 ? '' : 's') : 'Nothing saved'); setFakeTick((x2: number) => x2 + 1); } },
                    el(Text, { style: { color: C.danger, fontSize: 12, marginTop: 4 } }, 'Delete saved fakes (recovery — kills a crash loop)')),

            el(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { marginTop: 10, paddingHorizontal: 12 } },
                ...TABS.map((t) => el(Pressable, {
                    key: t.key,
                    onPress: () => setTab(t.key),
                    style: { backgroundColor: tab === t.key ? C.blurple : C.chip, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 7, marginRight: 8 },
                }, el(Text, { style: { color: tab === t.key ? '#ffffff' : C.text, fontSize: 13, fontWeight: '700' } }, t.label)))),
            body,
            el(View, { style: { height: 30 } }),
        );
    };
}

// ---- Chat-bar button (Valenced) --------------------------------------------------
// Desktop parity: the Equicord version has a chat-bar button. On Valenced the
// official hook is afterJSX on the chat input component (docs:
// @valenced/react/jsx-runtime). Component names shift between Discord builds,
// so try several candidates and degrade to settings-only when none resolve —
// never crash the chat.
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

let buttonStatus = 'not installed yet';

function chatButtonElement(): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Pressable || !RN?.Text) return null;
    const el = React.createElement;
    return el(RN.Pressable, {
        accessibilityLabel: 'FakeDM quick fake',
        onPress: () => quickFake(),
        style: { marginLeft: 6, paddingHorizontal: 8, paddingVertical: 4, justifyContent: 'center', alignItems: 'center' },
    }, el(RN.Text, { style: { color: '#ffffff', fontSize: 13, fontWeight: '700' } }, 'Fake'));
}

// Push the button into the first row-like container of the rendered tree. The
// chat action row is a View whose props.children is the array of buttons; the
// walker prefers a row that already holds something pressable so a nested
// layout container is not mistaken for it.
function insertChatButton(tree: any): any {
    try {
        if (!tree || typeof tree !== 'object') return tree;
        const btn = chatButtonElement();
        if (!btn) return tree;
        const find = getValenced()?.utils?.react?.findInReactFiber;
        const isRow = (n: any) => Array.isArray(n?.props?.children)
            && n.props.children.length > 0
            && n.props.children.length < 10
            && n.props.children.some((k: any) => k && typeof k === 'object');
        let target: any = null;
        try {
            target = find?.(tree, (n: any) => isRow(n) && n.props.children.some((k: any) => k?.props?.onPress || k?.props?.accessibilityLabel));
        } catch {}
        if (!target) {
            try { target = find?.(tree, isRow); } catch {}
        }
        if (!target) return tree;
        const kids = target.props.children;
        if (!Array.isArray(kids) || Object.isFrozen(kids)) return tree;
        if (kids.some((k: any) => k?.props?.accessibilityLabel === 'FakeDM quick fake')) return tree;
        // Every existing child must be a React element; anything else means this
        // is not the action row and editing it could break Discord's render.
        if (!kids.every((k: any) => k && typeof k === 'object' && k.type !== undefined)) return tree;
        if (!Object.isExtensible(kids)) return tree;
        // Push into the row's own children array: React renders props.children,
        // which is this same array, so one push is visible on the next render and
        // a throw here leaves nothing half-written.
        try {
            kids.push(btn);
        } catch {
            return tree;
        }
        return tree;
    } catch (e) {
        hostError('chat button insert failed', e);
        return tree;
    }
}

// Valenced's own chat-button plugins patch the memo component's `type` rather
// than hooking JSX (see the community "Better Chat Buttons" plugin), and the
// chat action row is the memo component named ChatInputRightActions. Find it by
// displayName, then append our button to its rendered row.
//
// Three things can go wrong on a phone, and each one used to be silent:
//   * the module finders live somewhere else on this build  -> finderApi()
//   * the row has not been registered yet when start() runs  -> retry timer
//   * the row is a memo object, not a function               -> patch `.type`
// buttonStatus always says which of those actually happened.
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

// Only the name Valenced's own chat-button plugin targets. Guessing extra names
// meant patching components we had no proof were rows, which risks the client.
const CHAT_ROW_NAMES = ['ChatInputRightActions'];
const MAX_INSTALL_TRIES = 4;
let installTimer: any = null;
let installTries = 0;

function installChatButton() {
    try {
        if (installTimer) { clearTimeout(installTimer); installTimer = null; }
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
            try {
                const off = patcher.after(Comp, key, (_args: any, tree: any) => insertChatButton(tree));
                if (typeof off === 'function') cleanupFns.push(off);
                buttonStatus = 'hooked ' + label + ' (' + key + ')';
                return true;
            } catch (e) {
                buttonStatus = 'patch failed on ' + label;
                hostError('chat button patch failed', e);
                return false;
            }
        };

        const pick = (exports: any): any => {
            const candidates = [exports, exports?.default, exports?.default?.default];
            for (const c of candidates) {
                if (!c) continue;
                if (typeof c === 'function') return c;
                if (typeof c === 'object' && (typeof c.type === 'function' || typeof c.render === 'function')) return c;
            }
            return null;
        };

        let installed = false;
        for (const name of CHAT_ROW_NAMES) {
            const filter = memoFilter(filters, name);
            if (!filter) continue;
            try {
                const off = finders.getModules(filter, (exports: any) => {
                    if (installed) return;
                    if (hook(pick(exports), name)) installed = true;
                });
                if (typeof off === 'function') cleanupFns.push(off);
            } catch {}
        }

        // Builds where the memo name moved: JSX hooking, when the runtime has it.
        if (!installed) {
            try {
                const r = (getValenced()?.react ?? {}) as any;
                const afterJSX = r.jsxRuntime?.afterJSX ?? r.ReactJSXRuntime?.afterJSX ?? null;
                if (typeof afterJSX === 'function') {
                    const byName = ['ChatInput', 'ChannelTextArea', 'MessageInput']
                        .map((n: string) => { try { return filters.withName?.(n) ?? null; } catch { return null; } })
                        .filter(Boolean);
                    if (byName.length) {
                        const filter = byName.length === 1 ? byName[0] : filters.anyOf?.(...byName);
                        if (filter) {
                            const off = finders.getModules(filter, (exports: any) => {
                                if (installed) return;
                                const Comp = pick(exports);
                                const render = typeof Comp === 'function' ? Comp : Comp?.type ?? Comp?.render;
                                if (typeof render !== 'function') return;
                                try {
                                    const unpatch = afterJSX(render, (tree: any) => insertChatButton(tree));
                                    if (typeof unpatch === 'function') cleanupFns.push(unpatch);
                                    buttonStatus = 'hooked via jsx';
                                    installed = true;
                                } catch {}
                            });
                            if (typeof off === 'function') cleanupFns.push(off);
                        }
                    }
                }
            } catch {}
        }

        if (installed) { installTries = 0; return; }
        // The row is often registered a few seconds after start(). Keep asking,
        // cheaply and a bounded number of times, instead of giving up for good.
        if (installTries < MAX_INSTALL_TRIES) {
            installTries++;
            buttonStatus = 'chat row not found (try ' + installTries + '/' + MAX_INSTALL_TRIES + ')';
            installTimer = setTimeout(() => { installTimer = null; installChatButton(); }, 5000);
        } else {
            buttonStatus = 'chat row not found — settings page only';
        }
    } catch (e) {
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
    toast('FakeDM ready — saved fakes are replayed only when you ask');
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
        if (installTimer) { clearTimeout(installTimer); installTimer = null; }
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
