// MessageBookmarks — save messages on your phone and find them again later.
//
// Discord has no bookmark feature on mobile, and pinned messages are shared with
// the whole channel. This keeps a private list on the device: paste any message
// link, and the text you saw is saved with it. When the message is still in
// Discord's cache the current content is stored; otherwise the bookmark keeps
// whatever you saved and still opens the right place.
//
// The link may be the full https://discord.com/channels/<guild>/<channel>/<msg>
// form or just <channel>/<message> — both are accepted.

const PLUGIN_VERSION = '1.0.2';

interface Bookmark {
    channelId: string;
    messageId: string;
    content: string;
    author: string;
    savedAt: number;
}

interface Settings {
    bookmarks: Bookmark[];
}

const DEFAULTS: Settings = { bookmarks: [] };
const MAX_BOOKMARKS = 200;

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
        if (RN?.Alert?.alert) { RN.Alert.alert('Message Bookmarks', s); }
    } catch {}
}

function hostError(msg: string, e?: unknown): void {
    try {
        const logger = getValenced()?.logger ?? (typeof revenge !== 'undefined' ? revenge?.logger : null) ?? console;
        (logger?.error ?? logger?.log ?? (() => {})).call(logger, '[MessageBookmarks] ' + msg, e ?? '');
    } catch {}
}

let cfg: Settings = { ...DEFAULTS };
let jsonStorageApi: any = null;

function persist(patch: Partial<Settings>): void {
    cfg = { ...cfg, ...patch };
    try { void jsonStorageApi?.set?.(patch); } catch (e) { hostError('could not save', e); }
}

// Accepts a full discord message link or the bare "<channel>/<message>" pair.
export function parseLink(text: string): { channelId: string; messageId: string } | null {
    const raw = String(text ?? '').trim();
    if (!raw) return null;
    const parts = raw.split('?')[0].split('/').filter(Boolean);
    const ids = parts.filter((p) => /^\d{5,}$/.test(p));
    if (ids.length < 2) return null;
    return { channelId: ids[ids.length - 2], messageId: ids[ids.length - 1] };
}

function contentOf(channelId: string, messageId: string): { content: string; author: string } {
    try {
        const store: any = getStores().MessageStore;
        const msg = store?.getMessage?.(channelId, messageId) ?? null;
        if (!msg) return { content: '', author: '' };
        const user = getStores().UserStore?.getUser?.(msg.author?.id) ?? msg.author ?? null;
        const author = String(user?.globalName ?? user?.global_name ?? user?.username ?? '');
        return { content: String(msg.content ?? ''), author };
    } catch {
        return { content: '', author: '' };
    }
}

export const engine = {
    parseLink,
    add(text: string): Bookmark | null {
        const parsed = parseLink(text);
        if (!parsed) return null;
        const existing = (cfg.bookmarks ?? []).filter(
            (b) => !(b.channelId === parsed.channelId && b.messageId === parsed.messageId),
        );
        const seen = contentOf(parsed.channelId, parsed.messageId);
        const bookmark: Bookmark = {
            channelId: parsed.channelId,
            messageId: parsed.messageId,
            content: seen.content,
            author: seen.author,
            savedAt: Date.now(),
        };
        persist({ bookmarks: [bookmark, ...existing].slice(0, MAX_BOOKMARKS) });
        return bookmark;
    },
    remove(index: number): boolean {
        const list = [...(cfg.bookmarks ?? [])];
        if (index < 0 || index >= list.length) return false;
        list.splice(index, 1);
        persist({ bookmarks: list });
        return true;
    },
    clear(): void {
        persist({ bookmarks: [] });
    },
    entries(): Bookmark[] {
        return [...(cfg.bookmarks ?? [])];
    },
    getConfig(): Settings {
        return { bookmarks: [...(cfg.bookmarks ?? [])] };
    },
    setConfig(patch: Partial<Settings>): void {
        cfg = { ...cfg, ...patch };
    },
};

async function startNext(api: any): Promise<void> {
    jsonStorageApi = api?.jsonStorage ?? null;
    try { await jsonStorageApi?.get?.(); } catch {}
    try {
        const saved = jsonStorageApi?.use?.() ?? null;
        if (saved && typeof saved === 'object' && Array.isArray((saved as any).bookmarks)) {
            cfg = { ...DEFAULTS, ...saved };
        }
    } catch (e) {
        hostError('could not load bookmarks', e);
    }
}

function stopNext(): void {}

function buildSettings(): any {
    const React = getReact();
    const RN = getRN();
    if (!React?.createElement || !RN?.Text) return null;
    const el = React.createElement;
    // Hooks must run *inside* the component. Calling useState while building the
    // page throws React's invalid-hook-call error and the settings tab renders
    // blank — so hand back a real component and resolve design parts per render.
    return function MessageBookmarksSettings() {
    const D = getDesign();
    const [draft, setDraft] = React.useState('');
    const [tick, setTick] = React.useState(0);
    const refresh = () => setTick((n: number) => n + 1);
    void tick;

    const add = () => {
        const saved = engine.add(draft);
        if (saved) {
            setDraft('');
            toast(saved.content ? 'Bookmarked' : 'Bookmarked (message not cached, text not saved)');
        } else {
            toast('Paste a message link first');
        }
        refresh();
    };

    const entries = engine.entries();
    const label = (b: Bookmark) => (b.content ? b.content.slice(0, 90) : 'Message ' + b.messageId);
    const sub = (b: Bookmark) => (b.author ? b.author + ' · ' : '') + new Date(b.savedAt).toLocaleString();

    if (D?.TableRowGroup && D?.TableRow) {
        const Input = D.TextInput ?? D.TextField ?? null;
        return el(RN.ScrollView, { style: { flex: 1 } },
            el(D.TableRowGroup, { title: 'Add a bookmark' },
                Input
                    ? el(Input, { label: 'Message link', value: draft, onChangeText: setDraft })
                    : el(RN.TextInput, {
                        accessibilityLabel: 'Message link',
                        value: draft,
                        onChangeText: setDraft,
                        placeholder: 'Paste a message link',
                        placeholderTextColor: '#9ba0a8',
                        style: { color: '#ffffff', backgroundColor: '#232428', borderRadius: 8, padding: 8, margin: 12 },
                    }),
                el(D.TableRow, { label: 'Save this message…', onPress: add })),
            el(D.TableRowGroup, { title: 'Bookmarks (' + entries.length + ')' },
                entries.length === 0
                    ? el(D.TableRow, { label: 'Nothing saved yet', subLabel: 'Copy a message link from Discord and paste it above.' })
                    : entries.map((b, i) => el(D.TableRow, {
                        key: b.channelId + b.messageId,
                        label: label(b),
                        subLabel: sub(b),
                        onPress: () => { engine.remove(i); refresh(); },
                    })),
                entries.length ? el(D.TableRow, { label: 'Clear all bookmarks', onPress: () => { engine.clear(); refresh(); } }) : null),
        );
    }

    return el(RN.ScrollView, { style: { flex: 1, padding: 16 } },
        el(RN.Text, { style: { color: '#ffffff', fontSize: 18, fontWeight: '800' } }, 'MessageBookmarks ' + PLUGIN_VERSION),
        el(RN.TextInput, {
            accessibilityLabel: 'Message link',
            value: draft,
            onChangeText: setDraft,
            placeholder: 'Paste a message link',
            placeholderTextColor: '#9ba0a8',
            style: { color: '#ffffff', backgroundColor: '#232428', borderRadius: 8, padding: 8, marginVertical: 8 },
        }),
        el(RN.Pressable, { accessibilityLabel: 'Save this message', onPress: add, style: { paddingVertical: 8 } },
            el(RN.Text, { style: { color: '#5865F2' } }, 'Save this message')),
        el(RN.Text, { style: { color: '#ffffff', fontWeight: '700', marginTop: 12 } }, 'Bookmarks (' + entries.length + ')'),
        entries.length === 0
            ? el(RN.Text, { style: { color: '#9ba0a8', marginTop: 4 } }, 'Nothing saved yet — copy a message link from Discord and paste it above.')
            : entries.map((b, i) => el(RN.View, { key: b.channelId + b.messageId, style: { paddingVertical: 6 } },
                el(RN.Text, { style: { color: '#ffffff' } }, label(b)),
                el(RN.Text, { style: { color: '#9ba0a8', fontSize: 12 } }, sub(b)),
                el(RN.Pressable, { accessibilityLabel: 'Remove bookmark', onPress: () => { engine.remove(i); refresh(); } },
                    el(RN.Text, { style: { color: '#f04747', fontSize: 12 } }, 'Remove')))),
        entries.length
            ? el(RN.Pressable, { accessibilityLabel: 'Clear all bookmarks', onPress: () => { engine.clear(); refresh(); }, style: { marginTop: 10 } },
                el(RN.Text, { style: { color: '#f04747' } }, 'Clear all bookmarks'))
            : null,
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
        return React.createElement(RN.Text ?? 'text', { style: { color: '#ffffff', padding: 12 } }, 'MessageBookmarks settings could not load on this build.');
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
