(() => {
    try {
        const module = { exports: {} };
        const exports = module.exports;
        var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugins/dev.8uvu.message-bookmarks/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  engine: () => engine,
  parseLink: () => parseLink
});
module.exports = __toCommonJS(index_exports);
var PLUGIN_VERSION = "1.0.1";
var DEFAULTS = { bookmarks: [] };
var MAX_BOOKMARKS = 200;
function getValenced() {
  try {
    if (typeof valenced !== "undefined" && valenced) return valenced;
  } catch {
  }
  return null;
}
function getReact() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  try {
    const r = (_b = (_a = getValenced()) == null ? void 0 : _a.react) == null ? void 0 : _b.React;
    if (r == null ? void 0 : r.createElement) return r;
  } catch {
  }
  try {
    if (typeof revenge !== "undefined") return (_d = (_c = revenge == null ? void 0 : revenge.react) == null ? void 0 : _c.React) != null ? _d : null;
  } catch {
  }
  try {
    if (typeof bunny !== "undefined") return (_h = (_g = bunny == null ? void 0 : bunny.React) != null ? _g : (_f = (_e = bunny == null ? void 0 : bunny.metro) == null ? void 0 : _e.common) == null ? void 0 : _f.React) != null ? _h : null;
  } catch {
  }
  try {
    if (typeof vendetta !== "undefined") return (_k = (_j = (_i = vendetta == null ? void 0 : vendetta.metro) == null ? void 0 : _i.common) == null ? void 0 : _j.React) != null ? _k : null;
  } catch {
  }
  return null;
}
function getRN() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  try {
    const rn = (_b = (_a = getValenced()) == null ? void 0 : _a.react) == null ? void 0 : _b.ReactNative;
    if ((rn == null ? void 0 : rn.View) && (rn == null ? void 0 : rn.Text)) return rn;
  } catch {
  }
  try {
    if (typeof revenge !== "undefined") return (_d = (_c = revenge == null ? void 0 : revenge.react) == null ? void 0 : _c.ReactNative) != null ? _d : null;
  } catch {
  }
  try {
    if (typeof bunny !== "undefined") return (_h = (_g = bunny == null ? void 0 : bunny.ReactNative) != null ? _g : (_f = (_e = bunny == null ? void 0 : bunny.metro) == null ? void 0 : _e.common) == null ? void 0 : _f.ReactNative) != null ? _h : null;
  } catch {
  }
  try {
    if (typeof vendetta !== "undefined") return (_k = (_j = (_i = vendetta == null ? void 0 : vendetta.metro) == null ? void 0 : _i.common) == null ? void 0 : _j.ReactNative) != null ? _k : null;
  } catch {
  }
  return null;
}
function getDesign() {
  var _a, _b, _c, _d, _e, _f;
  try {
    const g = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.design;
    const d = (_c = g == null ? void 0 : g.Design) != null ? _c : g;
    if (d == null ? void 0 : d.TableRowGroup) return d;
  } catch {
  }
  try {
    const g = (_e = (_d = typeof revenge !== "undefined" ? revenge : null) == null ? void 0 : _d.discord) == null ? void 0 : _e.design;
    const d = (_f = g == null ? void 0 : g.Design) != null ? _f : g;
    if (d == null ? void 0 : d.TableRowGroup) return d;
  } catch {
  }
  return null;
}
function getStores() {
  var _a, _b, _c, _d, _e, _f;
  try {
    const s = (_c = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.flux) == null ? void 0 : _c.Stores;
    if (s) return s;
  } catch {
  }
  try {
    if (typeof revenge !== "undefined") return (_f = (_e = (_d = revenge == null ? void 0 : revenge.discord) == null ? void 0 : _d.flux) == null ? void 0 : _e.Stores) != null ? _f : {};
  } catch {
  }
  return {};
}
function toast(text) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  try {
    const open = (_d = (_c = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.actions) == null ? void 0 : _c.ToastActionCreators) == null ? void 0 : _d.open;
    if (typeof open === "function") {
      open({ key: "bookmark-" + Date.now(), content: text });
      return;
    }
  } catch {
  }
  try {
    const RN = getRN();
    (_h = (_e = RN == null ? void 0 : RN.ToastAndroid) == null ? void 0 : _e.show) == null ? void 0 : _h.call(_e, text, (_g = (_f = RN == null ? void 0 : RN.ToastAndroid) == null ? void 0 : _f.SHORT) != null ? _g : 0);
  } catch {
  }
}
function hostError(msg, e) {
  var _a, _b, _c, _d, _e;
  try {
    const logger = (_c = (_b = (_a = getValenced()) == null ? void 0 : _a.logger) != null ? _b : typeof revenge !== "undefined" ? revenge == null ? void 0 : revenge.logger : null) != null ? _c : console;
    ((_e = (_d = logger == null ? void 0 : logger.error) != null ? _d : logger == null ? void 0 : logger.log) != null ? _e : (() => {
    })).call(logger, "[MessageBookmarks] " + msg, e != null ? e : "");
  } catch {
  }
}
var cfg = { ...DEFAULTS };
var jsonStorageApi = null;
function persist(patch) {
  var _a;
  cfg = { ...cfg, ...patch };
  try {
    void ((_a = jsonStorageApi == null ? void 0 : jsonStorageApi.set) == null ? void 0 : _a.call(jsonStorageApi, patch));
  } catch (e) {
    hostError("could not save", e);
  }
}
function parseLink(text) {
  const raw = String(text != null ? text : "").trim();
  if (!raw) return null;
  const parts = raw.split("?")[0].split("/").filter(Boolean);
  const ids = parts.filter((p) => /^\d{5,}$/.test(p));
  if (ids.length < 2) return null;
  return { channelId: ids[ids.length - 2], messageId: ids[ids.length - 1] };
}
function contentOf(channelId, messageId) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  try {
    const store = getStores().MessageStore;
    const msg = (_b = (_a = store == null ? void 0 : store.getMessage) == null ? void 0 : _a.call(store, channelId, messageId)) != null ? _b : null;
    if (!msg) return { content: "", author: "" };
    const user = (_g = (_f = (_e = (_c = getStores().UserStore) == null ? void 0 : _c.getUser) == null ? void 0 : _e.call(_c, (_d = msg.author) == null ? void 0 : _d.id)) != null ? _f : msg.author) != null ? _g : null;
    const author = String((_j = (_i = (_h = user == null ? void 0 : user.globalName) != null ? _h : user == null ? void 0 : user.global_name) != null ? _i : user == null ? void 0 : user.username) != null ? _j : "");
    return { content: String((_k = msg.content) != null ? _k : ""), author };
  } catch {
    return { content: "", author: "" };
  }
}
var engine = {
  parseLink,
  add(text) {
    var _a;
    const parsed = parseLink(text);
    if (!parsed) return null;
    const existing = ((_a = cfg.bookmarks) != null ? _a : []).filter(
      (b) => !(b.channelId === parsed.channelId && b.messageId === parsed.messageId)
    );
    const seen = contentOf(parsed.channelId, parsed.messageId);
    const bookmark = {
      channelId: parsed.channelId,
      messageId: parsed.messageId,
      content: seen.content,
      author: seen.author,
      savedAt: Date.now()
    };
    persist({ bookmarks: [bookmark, ...existing].slice(0, MAX_BOOKMARKS) });
    return bookmark;
  },
  remove(index) {
    var _a;
    const list = [...(_a = cfg.bookmarks) != null ? _a : []];
    if (index < 0 || index >= list.length) return false;
    list.splice(index, 1);
    persist({ bookmarks: list });
    return true;
  },
  clear() {
    persist({ bookmarks: [] });
  },
  entries() {
    var _a;
    return [...(_a = cfg.bookmarks) != null ? _a : []];
  },
  getConfig() {
    var _a;
    return { bookmarks: [...(_a = cfg.bookmarks) != null ? _a : []] };
  },
  setConfig(patch) {
    cfg = { ...cfg, ...patch };
  }
};
async function startNext(api) {
  var _a, _b, _c, _d;
  jsonStorageApi = (_a = api == null ? void 0 : api.jsonStorage) != null ? _a : null;
  try {
    await ((_b = jsonStorageApi == null ? void 0 : jsonStorageApi.get) == null ? void 0 : _b.call(jsonStorageApi));
  } catch {
  }
  try {
    const saved = (_d = (_c = jsonStorageApi == null ? void 0 : jsonStorageApi.use) == null ? void 0 : _c.call(jsonStorageApi)) != null ? _d : null;
    if (saved && typeof saved === "object" && Array.isArray(saved.bookmarks)) {
      cfg = { ...DEFAULTS, ...saved };
    }
  } catch (e) {
    hostError("could not load bookmarks", e);
  }
}
function stopNext() {
}
function buildSettings() {
  const React = getReact();
  const RN = getRN();
  if (!(React == null ? void 0 : React.createElement) || !(RN == null ? void 0 : RN.Text)) return null;
  const el = React.createElement;
  return function MessageBookmarksSettings() {
    var _a, _b;
    const D = getDesign();
    const [draft, setDraft] = React.useState("");
    const [tick, setTick] = React.useState(0);
    const refresh = () => setTick((n) => n + 1);
    void tick;
    const add = () => {
      const saved = engine.add(draft);
      if (saved) {
        setDraft("");
        toast(saved.content ? "Bookmarked" : "Bookmarked (message not cached, text not saved)");
      } else {
        toast("Paste a message link first");
      }
      refresh();
    };
    const entries = engine.entries();
    const label = (b) => b.content ? b.content.slice(0, 90) : "Message " + b.messageId;
    const sub = (b) => (b.author ? b.author + " \xB7 " : "") + new Date(b.savedAt).toLocaleString();
    if ((D == null ? void 0 : D.TableRowGroup) && (D == null ? void 0 : D.TableRow)) {
      const Input = (_b = (_a = D.TextInput) != null ? _a : D.TextField) != null ? _b : null;
      return el(
        RN.ScrollView,
        { style: { flex: 1 } },
        el(
          D.TableRowGroup,
          { title: "Add a bookmark" },
          Input ? el(Input, { label: "Message link", value: draft, onChangeText: setDraft }) : el(RN.TextInput, {
            accessibilityLabel: "Message link",
            value: draft,
            onChangeText: setDraft,
            placeholder: "Paste a message link",
            placeholderTextColor: "#9ba0a8",
            style: { color: "#ffffff", backgroundColor: "#232428", borderRadius: 8, padding: 8, margin: 12 }
          }),
          el(D.TableRow, { label: "Save this message\u2026", onPress: add })
        ),
        el(
          D.TableRowGroup,
          { title: "Bookmarks (" + entries.length + ")" },
          entries.length === 0 ? el(D.TableRow, { label: "Nothing saved yet", subLabel: "Copy a message link from Discord and paste it above." }) : entries.map((b, i) => el(D.TableRow, {
            key: b.channelId + b.messageId,
            label: label(b),
            subLabel: sub(b),
            onPress: () => {
              engine.remove(i);
              refresh();
            }
          })),
          entries.length ? el(D.TableRow, { label: "Clear all bookmarks", onPress: () => {
            engine.clear();
            refresh();
          } }) : null
        )
      );
    }
    return el(
      RN.ScrollView,
      { style: { flex: 1, padding: 16 } },
      el(RN.Text, { style: { color: "#ffffff", fontSize: 18, fontWeight: "800" } }, "MessageBookmarks " + PLUGIN_VERSION),
      el(RN.TextInput, {
        accessibilityLabel: "Message link",
        value: draft,
        onChangeText: setDraft,
        placeholder: "Paste a message link",
        placeholderTextColor: "#9ba0a8",
        style: { color: "#ffffff", backgroundColor: "#232428", borderRadius: 8, padding: 8, marginVertical: 8 }
      }),
      el(
        RN.Pressable,
        { accessibilityLabel: "Save this message", onPress: add, style: { paddingVertical: 8 } },
        el(RN.Text, { style: { color: "#5865F2" } }, "Save this message")
      ),
      el(RN.Text, { style: { color: "#ffffff", fontWeight: "700", marginTop: 12 } }, "Bookmarks (" + entries.length + ")"),
      entries.length === 0 ? el(RN.Text, { style: { color: "#9ba0a8", marginTop: 4 } }, "Nothing saved yet \u2014 copy a message link from Discord and paste it above.") : entries.map((b, i) => el(
        RN.View,
        { key: b.channelId + b.messageId, style: { paddingVertical: 6 } },
        el(RN.Text, { style: { color: "#ffffff" } }, label(b)),
        el(RN.Text, { style: { color: "#9ba0a8", fontSize: 12 } }, sub(b)),
        el(
          RN.Pressable,
          { accessibilityLabel: "Remove bookmark", onPress: () => {
            engine.remove(i);
            refresh();
          } },
          el(RN.Text, { style: { color: "#f04747", fontSize: 12 } }, "Remove")
        )
      )),
      entries.length ? el(
        RN.Pressable,
        { accessibilityLabel: "Clear all bookmarks", onPress: () => {
          engine.clear();
          refresh();
        }, style: { marginTop: 10 } },
        el(RN.Text, { style: { color: "#f04747" } }, "Clear all bookmarks")
      ) : null
    );
  };
}
var __built = null;
var __instance = {
  jsonStorage: { load: true, default: { ...DEFAULTS } },
  start: startNext,
  stop: stopNext,
  SettingsComponent: function(props) {
    var _a, _b, _c;
    const api = (_a = props == null ? void 0 : props.api) != null ? _a : props;
    const React = getReact();
    if (!(React == null ? void 0 : React.createElement)) return null;
    try {
      if (api == null ? void 0 : api.jsonStorage) jsonStorageApi = api.jsonStorage;
      if (!__built) __built = buildSettings();
      if (__built) return React.createElement(__built, { api });
    } catch (e) {
      hostError("settings build failed", e);
    }
    const RN = (_b = getRN()) != null ? _b : {};
    return React.createElement((_c = RN.Text) != null ? _c : "text", { style: { color: "#ffffff", padding: 12 } }, "MessageBookmarks settings could not load on this build.");
  }
};
__instance.__engine = engine;
if (typeof plugin === "function") {
  __instance = plugin(__instance);
}
globalThis.plugin = __instance;
__instance.onLoad = function() {
  var _a;
  return (_a = __instance.start) == null ? void 0 : _a.call(__instance);
};
__instance.onUnload = function() {
  var _a;
  return (_a = __instance.stop) == null ? void 0 : _a.call(__instance);
};
__instance.settings = __instance.SettingsComponent;
var index_default = __instance;
;
        const exported = (module.exports && module.exports.default) || module.exports;
        if (!exported || typeof exported !== 'object') throw new Error('bundle exported ' + typeof exported + ' instead of a plugin object');
        // Valenced evaluates this file and then reads result.default
        // (bundle/lib/plugins/src/_internal/script.ts). Returning the bare plugin
        // therefore gives it undefined and it fails with
        // "Plugin options must be an object" — the plugin never starts and has no
        // settings page. Older loaders want the plugin itself, so expose BOTH:
        // the object is the plugin and its own .default points back at it.
        if (!exported.default) {
            try { exported.default = exported; } catch (ignored) {}
        }
        return exported;
    } catch (error) {
        const message = String((error && (error.stack || error.message)) || error);
        try { console.error('[dev.8uvu.message-bookmarks] bundle failed to evaluate', error); } catch (ignored) {}
        const fallback = {
            jsonStorage: { load: true, default: {} },
            start() {},
            stop() {},
            SettingsComponent() {
                try {
                    const R = valenced.react.React;
                    const N = valenced.react.ReactNative;
                    if (!R || !N || typeof R.createElement !== 'function') return null;
                    const el = R.createElement;
                    return el(N.ScrollView, { style: { padding: 16 } },
                        el(N.Text, { style: { color: '#f04747', fontSize: 16, fontWeight: '700', marginBottom: 8 } }, "MessageBookmarks" + ' failed to load'),
                        el(N.Text, { style: { color: '#9ba0a8', fontSize: 12, marginBottom: 8 } }, 'Copy this text to the plugin author — it is the exact error:'),
                        el(N.Text, { style: { color: '#ffffff', fontSize: 11 } }, message));
                } catch (uiError) {
                    return null;
                }
            },
        };
        try { fallback.default = fallback; } catch (ignored) {}
        return fallback;
    }
})()