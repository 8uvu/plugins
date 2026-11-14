(() => { const module = { exports: {} }; const exports = module.exports; var __defProp = Object.defineProperty;
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

// plugins/dev.8uvu.clean-urls/js/index.tsx
var index_exports = {};
__export(index_exports, {
  cleanText: () => cleanText,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_flux = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onFluxEventDispatched() { return __g().onFluxEventDispatched }, get Stores() { return __g().Stores }, get getStore() { return __g().getStore }, get onAnyFluxEventDispatched() { return __g().onAnyFluxEventDispatched } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native2 = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get ScrollView() { return __g().ScrollView }, get Appearance() { return __g().Appearance }, get Pressable() { return __g().Pressable }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();

// plugins/_shared/theme.ts
var import_common = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens }, get Logger() { return __g().Logger }, get Constants() { return __g().Constants } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get ScrollView() { return __g().ScrollView }, get Appearance() { return __g().Appearance }, get Pressable() { return __g().Pressable }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
function activeBase() {
  var _a, _b;
  try {
    if (((_b = (_a = import_react_native.Appearance) == null ? void 0 : _a.getColorScheme) == null ? void 0 : _b.call(_a)) === "light") return "light";
  } catch {
  }
  return "dark";
}
function token(name) {
  var _a, _b, _c, _d, _e;
  try {
    const module2 = import_common.Tokens;
    if (!module2) return void 0;
    const definition = (_a = module2 == null ? void 0 : module2.SemanticColor) == null ? void 0 : _a[name];
    const resolve = (_c = (_b = module2 == null ? void 0 : module2.default) == null ? void 0 : _b.internal) == null ? void 0 : _c.resolveSemanticColor;
    if (typeof resolve === "function" && definition) {
      return resolve(activeBase(), definition);
    }
    const colours = (_e = (_d = module2 == null ? void 0 : module2.default) == null ? void 0 : _d.colors) == null ? void 0 : _e[name];
    if (typeof colours === "string") return colours;
    if (typeof definition === "string") return definition;
  } catch {
  }
  return void 0;
}
var settingsScroll = { paddingHorizontal: 16, paddingTop: 16, gap: 16 };

// plugins/dev.8uvu.clean-urls/js/index.tsx
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get useState() { return __g().useState }, get createElement() { return __g().createElement }, get cloneElement() { return __g().cloneElement }, get isValidElement() { return __g().isValidElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsxs() { return __g().jsxs }, get jsx() { return __g().jsx }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULTS = { enabled: true, extra: "" };
var TRACKING = /* @__PURE__ */ new Set([
  "fbclid",
  "gclid",
  "gclsrc",
  "dclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "twclid",
  "ttclid",
  "yclid",
  "igshid",
  "igsh",
  "si",
  "mkt_tok",
  "mc_eid",
  "mc_cid",
  "_hsenc",
  "_hsmi",
  "vero_conv",
  "vero_id",
  "spm",
  "scm",
  "tt_from",
  "trk_contact",
  "trk_msg",
  "trk_module",
  "trk_sid",
  "rb_clickid",
  "oly_anon_id",
  "oly_enc_id",
  "wickedid",
  "trk"
]);
var PREFIXES = ["utm_", "fb_", "ga_", "mc_", "matomo_", "pk_", "mtm_"];
function splitList(raw) {
  return new Set(raw.split(/[\s,]+/).map((s) => s.trim().toLowerCase()).filter(Boolean));
}
function isTracked(key, extra) {
  if (TRACKING.has(key) || extra.has(key)) return true;
  return PREFIXES.some((p) => key.startsWith(p));
}
function cleanUrl(url, extra) {
  const schemeEnd = url.indexOf("://");
  const hostStart = schemeEnd === -1 ? url.startsWith("//") ? 2 : 0 : schemeEnd + 3;
  const afterHost = url.indexOf("/", hostStart);
  const authority = afterHost === -1 ? url : url.slice(0, afterHost);
  const rest = afterHost === -1 ? "" : url.slice(afterHost);
  const queryStart = rest.indexOf("?");
  if (queryStart === -1) return url;
  const hashStart = rest.indexOf("#");
  const path = rest.slice(0, queryStart);
  const queryEnd = hashStart === -1 ? rest.length : hashStart;
  const hashPart = hashStart === -1 ? "" : rest.slice(hashStart);
  const keep = [];
  for (const pair of rest.slice(queryStart + 1, queryEnd).split("&")) {
    if (!pair) continue;
    const eq = pair.indexOf("=");
    const rawKey = eq === -1 ? pair : pair.slice(0, eq);
    let key = rawKey;
    try {
      key = decodeURIComponent(rawKey);
    } catch {
    }
    if (!isTracked(key.toLowerCase(), extra)) keep.push(pair);
  }
  return authority + path + (keep.length ? "?" + keep.join("&") : "") + hashPart;
}
var URL_RE = /https?:\/\/[^\s<>"')\]]+/g;
function cleanText(text, extraRaw) {
  if (!text || typeof text !== "string" || !text.includes("?")) return text;
  const extra = splitList(extraRaw);
  return text.replace(URL_RE, (m) => {
    const trimmed = m.match(/[.,;:!?]+$/);
    const body = trimmed ? m.slice(0, m.length - trimmed[0].length) : m;
    return cleanUrl(body, extra) + (trimmed ? trimmed[0] : "");
  });
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    const scrub = (payload) => {
      var _a2, _b, _c;
      try {
        const cfg = (_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS;
        if (cfg.enabled === false) return payload;
        const message = payload == null ? void 0 : payload.message;
        if (message && typeof message.content === "string") {
          const out = cleanText(message.content, String((_b = cfg.extra) != null ? _b : ""));
          if (out !== message.content) message.content = out;
        }
      } catch (error) {
        (_c = logger == null ? void 0 : logger.error) == null ? void 0 : _c.call(logger, "[CleanURLs] scrub failed", error);
      }
      return payload;
    };
    cleanup((0, import_flux.onFluxEventDispatched)("MESSAGE_CREATE", scrub));
    cleanup((0, import_flux.onFluxEventDispatched)("MESSAGE_UPDATE", scrub));
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[CleanURLs] started");
  },
  SettingsComponent({ api }) {
    var _a, _b, _c;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => api.jsonStorage.set(patch);
    const D = (_b = import_design.Design) != null ? _b : {};
    const [extra, setExtra] = (0, import_react.useState)((_c = settings.extra) != null ? _c : "");
    const updateExtra = (t) => {
      setExtra(t);
      set({ extra: t });
    };
    if (D.TableRowGroup && D.TableSwitchRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Clean URLs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Strip tracking parameters",
            subLabel: "Removes utm_*, fbclid, gclid and friends from links.",
            value: settings.enabled !== false,
            onValueChange: (v) => set({ enabled: v })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { marginVertical: 4 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED"), marginBottom: 2 }, children: "Extra parameters (comma-separated)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react_native2.TextInput,
            {
              style: { color: token("TEXT_NORMAL"), backgroundColor: token("BACKGROUND_TERTIARY"), borderRadius: 8, padding: 8 },
              value: extra,
              onChangeText: updateExtra
            }
          )
        ] })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.ScrollView, { style: settingsScroll, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontWeight: "bold" }, children: "Clean URLs" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED") }, children: "Removes tracking parameters from links." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL") }, children: [
        "Enabled: ",
        settings.enabled !== false ? "on" : "off"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED") }, children: "Extra parameters (comma-separated):" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native2.TextInput,
        {
          style: { color: token("TEXT_NORMAL"), backgroundColor: token("BACKGROUND_TERTIARY"), borderRadius: 8, padding: 8 },
          value: extra,
          onChangeText: updateExtra
        }
      )
    ] });
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && (typeof __plugin === 'object' || typeof __plugin === 'function')) { try { Object.defineProperty(__plugin, 'default', { value: __plugin, enumerable: false, configurable: true }); } catch (ignored) { try { __plugin.default = __plugin; } catch (ignored2) {} } } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return { default: __plugin }; })()