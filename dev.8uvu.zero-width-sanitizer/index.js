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

// plugins/dev.8uvu.zero-width-sanitizer/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  engine: () => engine,
  handlePayload: () => handlePayload,
  sanitize: () => sanitize
});
module.exports = __toCommonJS(index_exports);
var PLUGIN_VERSION = "1.0.1";
var DEFAULTS = {
  sanitizeOutgoing: true,
  sanitizeEdits: true,
  showToastOnDetection: true,
  verboseLogs: false
};
var INVISIBLE_CHARS = /[\u200B\u2060-\u2064\u206A-\u206F\uFEFF\u00AD]/g;
var MARKER = "dev.8uvu.zero-width-sanitizer";
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
  var _a, _b, _c, _d;
  const message = String(text != null ? text : "");
  try {
    const RN = getRN();
    if ((_a = RN == null ? void 0 : RN.ToastAndroid) == null ? void 0 : _a.show) {
      RN.ToastAndroid.show(message, (_b = RN.ToastAndroid.SHORT) != null ? _b : 0);
      return;
    }
    (_d = (_c = RN == null ? void 0 : RN.Alert) == null ? void 0 : _c.alert) == null ? void 0 : _d.call(_c, "Zero Width Sanitizer", message);
  } catch {
  }
}
function hostError(msg, e) {
  var _a, _b, _c, _d, _e;
  try {
    const logger = (_c = (_b = (_a = getValenced()) == null ? void 0 : _a.logger) != null ? _b : typeof revenge !== "undefined" ? revenge == null ? void 0 : revenge.logger : null) != null ? _c : console;
    ((_e = (_d = logger == null ? void 0 : logger.error) != null ? _d : logger == null ? void 0 : logger.log) != null ? _e : (() => {
    })).call(logger, "[ZeroWidthSanitizer] " + msg, e != null ? e : "");
  } catch {
  }
}
function log(msg) {
  if (!cfg.verboseLogs) return;
  hostError(msg);
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
function sanitize(text) {
  if (typeof text !== "string" || !text) return { result: typeof text === "string" ? text : "", removed: 0 };
  INVISIBLE_CHARS.lastIndex = 0;
  const matches = text.match(INVISIBLE_CHARS);
  if (!matches || matches.length === 0) return { result: text, removed: 0 };
  INVISIBLE_CHARS.lastIndex = 0;
  return { result: text.replace(INVISIBLE_CHARS, ""), removed: matches.length };
}
var cleaned = 0;
var cleanedChars = 0;
var lastCleanedAt = 0;
var boundStatus = "not started";
var cachedUserId = "";
function myUserId() {
  var _a, _b, _c, _d, _e, _f;
  if (cachedUserId) return cachedUserId;
  try {
    const user = (_b = (_a = getStores().UserStore) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a);
    if (user == null ? void 0 : user.id) {
      cachedUserId = String(user.id);
      return cachedUserId;
    }
  } catch {
  }
  try {
    const v = getValenced();
    const f = (_c = v == null ? void 0 : v.modules) == null ? void 0 : _c.finders;
    if (typeof (f == null ? void 0 : f.lookupModule) === "function" && typeof ((_d = f == null ? void 0 : f.filters) == null ? void 0 : _d.withStoreName) === "function") {
      const found = f.lookupModule(f.filters.withStoreName("UserStore"));
      const store = Array.isArray(found) ? found[0] : found;
      const id = (_f = (_e = store == null ? void 0 : store.getCurrentUser) == null ? void 0 : _e.call(store)) == null ? void 0 : _f.id;
      if (id) {
        cachedUserId = String(id);
        return cachedUserId;
      }
    }
  } catch {
  }
  return "";
}
function authorOf(message) {
  var _a, _b, _c, _d, _e;
  if ((_a = message == null ? void 0 : message.author) == null ? void 0 : _a.id) return String(message.author.id);
  try {
    const cached = (_d = (_b = getStores().MessageStore) == null ? void 0 : _b.getMessage) == null ? void 0 : _d.call(_b, (_c = message == null ? void 0 : message.channel_id) != null ? _c : message == null ? void 0 : message.channelId, message == null ? void 0 : message.id);
    if ((_e = cached == null ? void 0 : cached.author) == null ? void 0 : _e.id) return String(cached.author.id);
  } catch {
  }
  return "";
}
function handlePayload(payload) {
  const type = payload == null ? void 0 : payload.type;
  if (type !== "MESSAGE_CREATE" && type !== "MESSAGE_UPDATE") return false;
  if (type === "MESSAGE_CREATE" && !cfg.sanitizeOutgoing) return false;
  if (type === "MESSAGE_UPDATE" && !cfg.sanitizeEdits) return false;
  const message = payload == null ? void 0 : payload.message;
  if (!message || typeof message.content !== "string") return false;
  if (message.zwSanitizedBy === MARKER) return false;
  const authorId = authorOf(message);
  const me = myUserId();
  if (!authorId || !me || authorId !== me) return false;
  const { result, removed } = sanitize(message.content);
  if (removed === 0) return false;
  message.content = result;
  try {
    message.zwSanitizedBy = MARKER;
  } catch {
  }
  cleaned++;
  cleanedChars += removed;
  lastCleanedAt = Date.now();
  log("removed " + removed + " invisible character(s) from a " + (type === "MESSAGE_CREATE" ? "sent message" : "message edit"));
  if (cfg.showToastOnDetection) {
    toast("Removed " + removed + " hidden character" + (removed === 1 ? "" : "s") + (type === "MESSAGE_UPDATE" ? " from your edit" : ""));
  }
  return true;
}
function getDispatcher() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    const v = getValenced();
    const finders = (_a = v == null ? void 0 : v.modules) == null ? void 0 : _a.finders;
    const filters = (_c = (_b = v == null ? void 0 : v.modules) == null ? void 0 : _b.finders) == null ? void 0 : _c.filters;
    if (finders && filters && typeof finders.lookupModule === "function") {
      const found = finders.lookupModule(filters.withProps("dispatch", "subscribe"));
      const mod = Array.isArray(found) ? found[0] : found;
      if (mod && typeof mod.dispatch === "function") {
        if (typeof mod.addInterceptor === "function") {
          return { addInterceptor: (cb) => mod.addInterceptor(cb), kind: "dispatcher" };
        }
        const original = mod.dispatch;
        const interceptors = [];
        const patched = function(payload) {
          let next = payload;
          for (const fn of interceptors.slice()) {
            try {
              const out = fn(next);
              if (out !== void 0) next = out;
            } catch (e) {
              hostError("interceptor failed", e);
            }
          }
          return original.call(this, next);
        };
        mod.dispatch = patched;
        return {
          addInterceptor: (fn) => {
            interceptors.push(fn);
            return () => {
              const i = interceptors.indexOf(fn);
              if (i >= 0) interceptors.splice(i, 1);
              if (!interceptors.length) {
                try {
                  mod.dispatch = original;
                } catch {
                }
              }
            };
          },
          kind: "dispatch patch"
        };
      }
    }
  } catch (e) {
    hostError("valenced dispatcher lookup failed", e);
  }
  try {
    if (typeof revenge !== "undefined") {
      const f = (_d = revenge == null ? void 0 : revenge.discord) == null ? void 0 : _d.flux;
      if (f && typeof f.onAnyFluxEventDispatched === "function") {
        return {
          addInterceptor: (cb) => f.onAnyFluxEventDispatched((payload) => {
            const out = cb(payload);
            return out === void 0 ? payload : out;
          }),
          kind: "flux hook"
        };
      }
      if ((f == null ? void 0 : f.dispatcher) && typeof f.dispatcher.addInterceptor === "function") {
        return { addInterceptor: (cb) => f.dispatcher.addInterceptor(cb), kind: "flux dispatcher" };
      }
    }
  } catch {
  }
  try {
    const b = typeof bunny !== "undefined" ? bunny : null;
    if (((_e = b == null ? void 0 : b.api) == null ? void 0 : _e.flux) && typeof b.api.flux.intercept === "function") {
      return { addInterceptor: (cb) => b.api.flux.intercept(cb), kind: "bunny intercept" };
    }
  } catch {
  }
  try {
    const v = typeof vendetta !== "undefined" ? vendetta : null;
    const fd = (_i = (_g = (_f = v == null ? void 0 : v.metro) == null ? void 0 : _f.common) == null ? void 0 : _g.FluxDispatcher) != null ? _i : (_h = v == null ? void 0 : v.common) == null ? void 0 : _h.FluxDispatcher;
    if (fd && typeof fd.addInterceptor === "function") {
      return { addInterceptor: (cb) => fd.addInterceptor(cb), kind: "vendetta dispatcher" };
    }
  } catch {
  }
  return null;
}
var cleanupFns = [];
function bind() {
  const dispatcher = getDispatcher();
  if (!dispatcher) {
    boundStatus = "dispatcher not found";
    hostError("no dispatcher on this build \u2014 plugin idle this session");
    return;
  }
  try {
    const off = dispatcher.addInterceptor((payload) => {
      try {
        handlePayload(payload);
      } catch (e) {
        hostError("payload handling failed", e);
      }
      return payload;
    });
    if (typeof off === "function") cleanupFns.push(off);
    boundStatus = dispatcher.kind;
  } catch (e) {
    boundStatus = "binding failed";
    hostError("could not bind the dispatcher", e);
  }
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
  bind();
}
function stopNext() {
  var _a;
  while (cleanupFns.length) {
    try {
      (_a = cleanupFns.pop()) == null ? void 0 : _a();
    } catch {
    }
  }
  boundStatus = "stopped";
}
var engine = {
  sanitize,
  handlePayload,
  removed() {
    return cleaned;
  },
  removedChars() {
    return cleanedChars;
  },
  status() {
    return boundStatus;
  },
  lastAt() {
    return lastCleanedAt;
  },
  getConfig() {
    return { ...cfg };
  },
  setConfig(patch) {
    cfg = { ...cfg, ...patch };
  }
};
function buildSettings() {
  const React = getReact();
  const RN = getRN();
  if (!(React == null ? void 0 : React.createElement) || !(RN == null ? void 0 : RN.Text)) return null;
  const el = React.createElement;
  return function ZeroWidthSanitizerSettings() {
    const D = getDesign();
    const [tick, setTick] = React.useState(0);
    const refresh = () => setTick((n) => n + 1);
    void tick;
    const toggle = (patch) => {
      persist(patch);
      refresh();
    };
    if ((D == null ? void 0 : D.TableRowGroup) && (D == null ? void 0 : D.TableSwitchRow) && (D == null ? void 0 : D.TableRow)) {
      return el(
        RN.ScrollView,
        { style: { flex: 1 } },
        el(
          D.TableRowGroup,
          { title: "ZeroWidthSanitizer" },
          el(D.TableSwitchRow, {
            label: "Sanitize sent messages",
            subLabel: "Strip invisible characters before Discord sends.",
            value: cfg.sanitizeOutgoing,
            onValueChange: (v) => toggle({ sanitizeOutgoing: v })
          }),
          el(D.TableSwitchRow, {
            label: "Sanitize edits",
            value: cfg.sanitizeEdits,
            onValueChange: (v) => toggle({ sanitizeEdits: v })
          }),
          el(D.TableSwitchRow, {
            label: "Toast when something is removed",
            value: cfg.showToastOnDetection,
            onValueChange: (v) => toggle({ showToastOnDetection: v })
          })
        ),
        el(
          D.TableRowGroup,
          { title: "Status" },
          el(D.TableRow, { label: "Cleaner status", subLabel: "Sanitizer: " + boundStatus }),
          el(D.TableRow, {
            label: "Cleaned this session",
            subLabel: cleaned + " message" + (cleaned === 1 ? "" : "s") + " \xB7 " + cleanedChars + " character" + (cleanedChars === 1 ? "" : "s")
          }),
          el(D.TableRow, {
            label: "Last hit",
            subLabel: lastCleanedAt ? new Date(lastCleanedAt).toLocaleTimeString() : "nothing removed yet"
          }),
          el(D.TableRow, { label: "Reset counter", onPress: () => {
            cleaned = 0;
            cleanedChars = 0;
            lastCleanedAt = 0;
            refresh();
          } })
        )
      );
    }
    return el(
      RN.ScrollView,
      { style: { flex: 1, padding: 16 } },
      el(RN.Text, { style: { color: "#ffffff", fontSize: 18, fontWeight: "800" } }, "ZeroWidthSanitizer " + PLUGIN_VERSION),
      el(RN.Text, { style: { color: "#9ba0a8", marginTop: 2, marginBottom: 8 } }, "Sanitizer: " + boundStatus),
      el(RN.Pressable, {
        accessibilityLabel: "Sanitize sent messages",
        onPress: () => toggle({ sanitizeOutgoing: !cfg.sanitizeOutgoing }),
        style: { paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#ffffff" } }, "Sanitize sent messages: " + (cfg.sanitizeOutgoing ? "on" : "off"))),
      el(RN.Pressable, {
        accessibilityLabel: "Sanitize edits",
        onPress: () => toggle({ sanitizeEdits: !cfg.sanitizeEdits }),
        style: { paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#ffffff" } }, "Sanitize edits: " + (cfg.sanitizeEdits ? "on" : "off"))),
      el(RN.Pressable, {
        accessibilityLabel: "Toast when something is removed",
        onPress: () => toggle({ showToastOnDetection: !cfg.showToastOnDetection }),
        style: { paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#ffffff" } }, "Toast when something is removed: " + (cfg.showToastOnDetection ? "on" : "off"))),
      el(RN.Text, { style: { color: "#ffffff", fontWeight: "700", marginTop: 12 } }, "Cleaned this session"),
      el(RN.Text, { style: { color: "#9ba0a8", marginTop: 4 } }, cleaned + " message" + (cleaned === 1 ? "" : "s") + " \xB7 " + cleanedChars + " character" + (cleanedChars === 1 ? "" : "s")),
      el(RN.Text, { style: { color: "#9ba0a8", marginTop: 2 } }, lastCleanedAt ? "Last hit: " + new Date(lastCleanedAt).toLocaleTimeString() : "Nothing removed yet"),
      el(RN.Pressable, {
        accessibilityLabel: "Reset counter",
        onPress: () => {
          cleaned = 0;
          cleanedChars = 0;
          lastCleanedAt = 0;
          refresh();
        },
        style: { marginTop: 12, paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#5865F2" } }, "Reset counter"))
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
    return React.createElement((_c = RN.Text) != null ? _c : "text", { style: { color: "#ffffff", padding: 12 } }, "ZeroWidthSanitizer settings could not load on this build.");
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
        try { console.error('[dev.8uvu.zero-width-sanitizer] bundle failed to evaluate', error); } catch (ignored) {}
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
                        el(N.Text, { style: { color: '#f04747', fontSize: 16, fontWeight: '700', marginBottom: 8 } }, "ZeroWidthSanitizer" + ' failed to load'),
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