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

// plugins/dev.8uvu.typing-tally/js/index.tsx
var index_exports = {};
__export(index_exports, {
  dayKey: () => dayKey,
  default: () => index_default,
  tally: () => tally,
  topChannels: () => topChannels
});
module.exports = __toCommonJS(index_exports);
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_flux = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onFluxEventDispatched() { return __g().onFluxEventDispatched }, get Stores() { return __g().Stores }, get getStore() { return __g().getStore }, get onAnyFluxEventDispatched() { return __g().onAnyFluxEventDispatched } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native2 = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get ScrollView() { return __g().ScrollView }, get Pressable() { return __g().Pressable }, get Appearance() { return __g().Appearance }, get TextInput() { return __g().TextInput }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();

// plugins/_shared/theme.ts
var import_common = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens }, get Logger() { return __g().Logger }, get Constants() { return __g().Constants } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get ScrollView() { return __g().ScrollView }, get Pressable() { return __g().Pressable }, get Appearance() { return __g().Appearance }, get TextInput() { return __g().TextInput }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
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

// plugins/dev.8uvu.typing-tally/js/index.tsx
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsx() { return __g().jsx }, get jsxs() { return __g().jsxs }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULTS = { enabled: true, day: "", counts: {} };
var SHOW = 20;
function dayKey(at) {
  const d = new Date(at);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const date = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + date;
}
function tally(current, channelId, at) {
  var _a;
  const today = dayKey(at);
  const base = current.day === today && current.counts ? current.counts : {};
  return { day: today, counts: { ...base, [channelId]: ((_a = base[channelId]) != null ? _a : 0) + 1 } };
}
function topChannels(counts) {
  return Object.entries(counts != null ? counts : {}).sort((a, b) => b[1] - a[1]).slice(0, SHOW);
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    cleanup(
      // A listener only: the payload goes back untouched.
      (0, import_flux.onFluxEventDispatched)("TYPING_START_LOCAL", (payload) => {
        var _a2, _b, _c;
        const current = (_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS;
        if (current.enabled === false || !payload || typeof payload !== "object") return payload;
        const channelId = payload.channelId == null ? "" : String(payload.channelId);
        if (!channelId) return payload;
        (_c = (_b = Promise.resolve(jsonStorage.set(tally(current, channelId, Date.now())))).catch) == null ? void 0 : _c.call(_b, () => {
        });
        return payload;
      })
    );
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[TypingTally] started");
  },
  SettingsComponent({ api }) {
    var _a, _b, _c;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => {
      var _a2, _b2;
      return (_b2 = (_a2 = api.jsonStorage.set(patch)).catch) == null ? void 0 : _b2.call(_a2, () => {
      });
    };
    const today = dayKey(Date.now());
    const counts = settings.day === today ? (_b = settings.counts) != null ? _b : {} : {};
    const top = topChannels(counts);
    const total = top.reduce((sum, [, n]) => sum + n, 0);
    const D = (_c = import_design.Design) != null ? _c : {};
    const row = (key, label, subLabel) => D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label, subLabel }, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { paddingVertical: 6 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL") }, children: label }),
      subLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED") }, children: subLabel }) : null
    ] }, key);
    if (D.TableRowGroup) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.ScrollView, { style: { paddingHorizontal: 16, paddingTop: 16, gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "TypingTally", children: [
          D.TableSwitchRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Count my typing",
              subLabel: "Counts today's typing per channel. Stored on this device only.",
              value: settings.enabled !== false,
              onValueChange: (v) => set({ enabled: v })
            }
          ) : null,
          D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "Reset today", onPress: () => set({ day: today, counts: {} }) }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: `Today: ${total} starts`, children: top.length === 0 ? row("empty", "Nothing counted today.") : top.map(([channel, n]) => row(channel, "Channel " + channel, n + (n === 1 ? " start" : " starts"))) })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontWeight: "bold", marginBottom: 8 }, children: "TypingTally" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native2.Pressable,
        {
          accessibilityLabel: "Count my typing",
          onPress: () => set({ enabled: !(settings.enabled !== false) }),
          style: { paddingVertical: 8 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL") }, children: [
            "Count my typing: ",
            settings.enabled !== false ? "on" : "off"
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Pressable, { accessibilityLabel: "Reset today", onPress: () => set({ day: today, counts: {} }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL") }, children: "Reset today" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), marginTop: 8 }, children: [
        "Today: ",
        total,
        " starts"
      ] }),
      top.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED"), marginTop: 8 }, children: "Nothing counted today." }) : top.map(([channel, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL") }, children: "Channel " + channel + " \u2014 " + n }, channel))
    ] });
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()