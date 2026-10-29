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

// plugins/dev.8uvu.user-change-alerts/js/index.tsx
var index_exports = {};
__export(index_exports, {
  compare: () => compare,
  default: () => index_default,
  engine: () => engine
});
module.exports = __toCommonJS(index_exports);
var PLUGIN_VERSION = "1.0.1";
var DEFAULTS = { enabled: true, avatars: true, friendsOnly: false, history: [] };
var MAX_HISTORY = 50;
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
      open({ key: "uchange-" + Date.now(), content: text });
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
    })).call(logger, "[UserChangeAlerts] " + msg, e != null ? e : "");
  } catch {
  }
}
function nameOf(user) {
  var _a, _b, _c, _d;
  if (!user) return "Someone";
  return String((_d = (_c = (_b = (_a = user.globalName) != null ? _a : user.global_name) != null ? _b : user.username) != null ? _c : user.id) != null ? _d : "Someone");
}
var seen = /* @__PURE__ */ new Map();
var cfg = { ...DEFAULTS };
var jsonStorageApi = null;
function isFriend(userId) {
  var _a, _b, _c;
  try {
    const rs = getStores().RelationshipStore;
    const rel = (_c = (_b = (_a = rs == null ? void 0 : rs.getRelationships) == null ? void 0 : _a.call(rs)) != null ? _b : rs == null ? void 0 : rs.relationships) != null ? _c : null;
    if (!rel) return false;
    const value = rel instanceof Map ? rel.get(userId) : rel[userId];
    return value === 1 || value === "1" || value === true;
  } catch {
    return false;
  }
}
function persist(patch) {
  var _a;
  cfg = { ...cfg, ...patch };
  try {
    void ((_a = jsonStorageApi == null ? void 0 : jsonStorageApi.set) == null ? void 0 : _a.call(jsonStorageApi, patch));
  } catch (e) {
    hostError("could not save", e);
  }
}
function note(change) {
  var _a;
  const history = [change, ...(_a = cfg.history) != null ? _a : []].slice(0, MAX_HISTORY);
  persist({ history });
}
function compare(userId, user) {
  var _a, _b;
  const id = String((_a = userId != null ? userId : user == null ? void 0 : user.id) != null ? _a : "");
  if (!id || !user) return null;
  const before = seen.get(id);
  const now = { name: nameOf(user), avatar: (_b = user == null ? void 0 : user.avatar) != null ? _b : null };
  if (!before) {
    seen.set(id, now);
    return null;
  }
  if (before.name === now.name && before.avatar === now.avatar) return null;
  seen.set(id, now);
  const label = before.name === now.name ? "profile picture" : before.name + " \u2192 " + now.name;
  return {
    userId: id,
    from: before.avatar === now.avatar ? before.name : before.name + " (picture)",
    to: label,
    at: Date.now()
  };
}
function announce(change, user) {
  if (!cfg.enabled) return;
  if (cfg.friendsOnly && !isFriend(change.userId)) return;
  const isAvatarOnly = change.from.includes("(picture)");
  if (isAvatarOnly && !cfg.avatars) return;
  toast(nameOf(user) + (isAvatarOnly ? " changed their profile picture" : " is now " + nameOf(user)));
  note(change);
}
function handlePayload(payload) {
  var _a, _b, _c, _d, _e;
  try {
    const list = Array.isArray(payload == null ? void 0 : payload.updates) ? payload.updates : Array.isArray(payload == null ? void 0 : payload.presences) ? payload.presences : [payload];
    for (const item of list) {
      const user = (_c = (_b = item == null ? void 0 : item.user) != null ? _b : (_a = item == null ? void 0 : item.presence) == null ? void 0 : _a.user) != null ? _c : null;
      const userId = (_e = (_d = user == null ? void 0 : user.id) != null ? _d : item == null ? void 0 : item.userId) != null ? _e : item == null ? void 0 : item.user_id;
      if (!user || !userId) continue;
      const change = compare(String(userId), user);
      if (change) announce(change, user);
    }
  } catch (e) {
    hostError("payload handling failed", e);
  }
}
var engine = {
  compare,
  handlePayload,
  reset() {
    seen.clear();
  },
  entries() {
    var _a;
    return [...(_a = cfg.history) != null ? _a : []];
  },
  count() {
    return seen.size;
  },
  getConfig() {
    return { ...cfg };
  },
  setConfig(patch) {
    cfg = { ...cfg, ...patch };
  }
};
var cleanupFns = [];
function subscribe() {
  var _a, _b;
  const flux = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.flux;
  let installed = 0;
  for (const event of ["PRESENCE_UPDATE", "PRESENCE_UPDATES", "USER_UPDATE"]) {
    try {
      if (typeof (flux == null ? void 0 : flux.onFluxEventDispatched) === "function") {
        const off = flux.onFluxEventDispatched(event, (payload) => {
          var _a2, _b2;
          if (event === "USER_UPDATE") {
            const user = (_a2 = payload == null ? void 0 : payload.user) != null ? _a2 : payload;
            const change = compare(String((_b2 = user == null ? void 0 : user.id) != null ? _b2 : ""), user);
            if (change) announce(change, user);
            return payload;
          }
          handlePayload(payload);
          return payload;
        });
        if (typeof off === "function") {
          cleanupFns.push(off);
          installed++;
        }
      }
    } catch (e) {
      hostError("subscribe " + event + " failed", e);
    }
  }
  return installed;
}
async function startNext(api) {
  var _a, _b, _c, _d;
  jsonStorageApi = (_a = api == null ? void 0 : api.jsonStorage) != null ? _a : null;
  try {
    await ((_b = jsonStorageApi == null ? void 0 : jsonStorageApi.get) == null ? void 0 : _b.call(jsonStorageApi));
  } catch {
  }
  try {
    const saved = (_d = (_c = jsonStorageApi == null ? void 0 : jsonStorageApi.use) == null ? void 0 : _c.call(jsonStorageApi)) != null ? _d : null;
    if (saved && typeof saved === "object") cfg = { ...DEFAULTS, ...saved };
  } catch (e) {
    hostError("could not load settings", e);
  }
  subscribe();
}
function stopNext() {
  var _a;
  while (cleanupFns.length) {
    try {
      (_a = cleanupFns.pop()) == null ? void 0 : _a();
    } catch {
    }
  }
  seen.clear();
}
function buildSettings(api) {
  const React = getReact();
  const RN = getRN();
  if (!(React == null ? void 0 : React.createElement) || !(RN == null ? void 0 : RN.Text)) return null;
  const el = React.createElement;
  return function UserChangeAlertsSettings() {
    const D = getDesign();
    const [tick, setTick] = React.useState(0);
    const refresh = () => setTick((n) => n + 1);
    void tick;
    const toggle = (patch) => {
      persist(patch);
      refresh();
    };
    const fmt = (at) => new Date(at).toLocaleString();
    if ((D == null ? void 0 : D.TableRowGroup) && (D == null ? void 0 : D.TableSwitchRow) && (D == null ? void 0 : D.TableRow)) {
      const entries2 = engine.entries();
      return el(
        RN.ScrollView,
        { style: { flex: 1 } },
        el(
          D.TableRowGroup,
          { title: "UserChangeAlerts" },
          el(D.TableSwitchRow, {
            label: "Alert on name changes",
            subLabel: "Toast when a username or display name changes.",
            value: cfg.enabled,
            onValueChange: (v) => toggle({ enabled: v })
          }),
          el(D.TableSwitchRow, {
            label: "Include profile pictures",
            subLabel: "Also alert when an avatar changes.",
            value: cfg.avatars,
            onValueChange: (v) => toggle({ avatars: v })
          }),
          el(D.TableSwitchRow, {
            label: "Friends only",
            value: cfg.friendsOnly,
            onValueChange: (v) => toggle({ friendsOnly: v })
          })
        ),
        el(
          D.TableRowGroup,
          { title: "Recent changes (" + entries2.length + ")" },
          entries2.length === 0 ? el(D.TableRow, { label: "Nothing yet", subLabel: "Changes appear here once someone you have seen renames or changes picture." }) : entries2.map((c) => el(D.TableRow, { key: c.userId + c.at, label: c.to, subLabel: fmt(c.at) })),
          el(D.TableRow, {
            label: "Clear history",
            onPress: () => {
              persist({ history: [] });
              refresh();
            }
          })
        )
      );
    }
    const entries = engine.entries();
    return el(
      RN.ScrollView,
      { style: { flex: 1, padding: 16 } },
      el(RN.Text, { style: { color: "#ffffff", fontSize: 18, fontWeight: "800" } }, "UserChangeAlerts " + PLUGIN_VERSION),
      el(RN.Pressable, {
        accessibilityLabel: "Alert on name changes",
        onPress: () => toggle({ enabled: !cfg.enabled }),
        style: { paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#ffffff" } }, "Alert on name changes: " + (cfg.enabled ? "on" : "off"))),
      el(RN.Pressable, {
        accessibilityLabel: "Include profile pictures",
        onPress: () => toggle({ avatars: !cfg.avatars }),
        style: { paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#ffffff" } }, "Include profile pictures: " + (cfg.avatars ? "on" : "off"))),
      el(RN.Pressable, {
        accessibilityLabel: "Friends only",
        onPress: () => toggle({ friendsOnly: !cfg.friendsOnly }),
        style: { paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#ffffff" } }, "Friends only: " + (cfg.friendsOnly ? "on" : "off"))),
      el(RN.Text, { style: { color: "#ffffff", fontWeight: "700", marginTop: 12 } }, "Recent changes (" + entries.length + ")"),
      entries.length === 0 ? el(RN.Text, { style: { color: "#9ba0a8", marginTop: 4 } }, "Nothing yet \u2014 changes appear here once someone you have seen renames or changes picture.") : entries.map((c) => el(
        RN.View,
        { key: c.userId + c.at, style: { paddingVertical: 4 } },
        el(RN.Text, { style: { color: "#ffffff" } }, c.to),
        el(RN.Text, { style: { color: "#9ba0a8" } }, fmt(c.at))
      )),
      el(RN.Pressable, {
        accessibilityLabel: "Clear history",
        onPress: () => {
          persist({ history: [] });
          refresh();
        },
        style: { marginTop: 12, paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#5865F2" } }, "Clear history"))
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
      if (!__built) __built = buildSettings(api);
      if (__built) return React.createElement(__built, { api });
    } catch (e) {
      hostError("settings build failed", e);
    }
    const RN = (_b = getRN()) != null ? _b : {};
    return React.createElement((_c = RN.Text) != null ? _c : "text", { style: { color: "#ffffff", padding: 12 } }, "UserChangeAlerts settings could not load on this build.");
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
        try { console.error('[dev.8uvu.user-change-alerts] bundle failed to evaluate', error); } catch (ignored) {}
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
                        el(N.Text, { style: { color: '#f04747', fontSize: 16, fontWeight: '700', marginBottom: 8 } }, "UserChangeAlerts" + ' failed to load'),
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