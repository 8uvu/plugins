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

// plugins/dev.8uvu.platform-spoofer/js/index.tsx
var index_exports = {};
__export(index_exports, {
  PLATFORMS: () => PLATFORMS,
  default: () => index_default,
  mergeIdentifyProps: () => mergeIdentifyProps,
  platformProps: () => platformProps
});
module.exports = __toCommonJS(index_exports);
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_finders = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get getModules() { return __g().getModules }, get lookupModule() { return __g().lookupModule }, get lookupModules() { return __g().lookupModules }, get waitForModules() { return __g().waitForModules } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get withProps() { return __g().withProps }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withName() { return __g().withName }, get withDependencies() { return __g().withDependencies }, get anyOf() { return __g().anyOf }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get createFilterGenerator() { return __g().createFilterGenerator }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_patcher = (function () { const __g = () => { try { return (valenced.patcher) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get before() { return __g().before }, get after() { return __g().after }, get instead() { return __g().instead } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get Pressable() { return __g().Pressable }, get TextInput() { return __g().TextInput }, get Switch() { return __g().Switch }, get ScrollView() { return __g().ScrollView }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Appearance() { return __g().Appearance }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsxs() { return __g().jsxs }, get jsx() { return __g().jsx }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULTS = { enabled: false, platform: "desktop" };
var PLATFORMS = [
  { key: "desktop", label: "Desktop", browser: "Discord Client" },
  { key: "web", label: "Web", browser: "Discord Web" },
  { key: "android", label: "Android", browser: "Discord Android" },
  { key: "ios", label: "iOS", browser: "Discord iOS" },
  { key: "xbox", label: "Xbox", browser: "Discord Embedded" },
  { key: "playstation", label: "PlayStation", browser: "Discord Embedded" },
  { key: "vr", label: "VR", browser: "Discord VR" }
];
function platformProps(key) {
  const found = PLATFORMS.find((p) => p.key === key);
  return found ? { browser: found.browser } : null;
}
function mergeIdentifyProps(original, browser) {
  if (!original || typeof original !== "object") return { properties: { browser }, browser };
  if (original.properties && typeof original.properties === "object") {
    return { ...original, properties: { ...original.properties, browser } };
  }
  return { ...original, properties: { browser }, browser };
}
function watchIdentify(cleanup, browser) {
  try {
    cleanup(
      (0, import_finders.getModules)((0, import_filters.withProps)("_doIdentify"), (mod) => {
        const proto = mod == null ? void 0 : mod.prototype;
        const target = proto && typeof proto._doIdentify === "function" ? proto : mod;
        if (!target || typeof target._doIdentify !== "function") return;
        cleanup(
          (0, import_patcher.before)(target, "_doIdentify", (args) => {
            if (args[0] && typeof args[0] === "object") {
              args[0] = mergeIdentifyProps(args[0], browser);
            }
            return args;
          })
        );
      })
    );
  } catch {
  }
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a, _b;
    const cfg = (_a = jsonStorage.cache) != null ? _a : DEFAULTS;
    if (cfg.enabled) {
      const props = platformProps(cfg.platform);
      if (props) watchIdentify(cleanup, props.browser);
    }
    (_b = logger == null ? void 0 : logger.log) == null ? void 0 : _b.call(logger, "[PlatformSpoofer] started");
  },
  SettingsComponent({ api }) {
    var _a, _b, _c;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => api.jsonStorage.set(patch);
    const D = (_b = import_design.Design) != null ? _b : {};
    const current = (_c = PLATFORMS.find((p) => p.key === settings.platform)) != null ? _c : PLATFORMS[0];
    if (D.TableRowGroup && D.TableSwitchRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "PlatformSpoofer", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Spoof my platform",
            subLabel: "Takes effect after restarting Discord.",
            value: settings.enabled === true,
            onValueChange: (v) => set({ enabled: v })
          }
        ),
        D.TableRadioRow ? PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableRadioRow,
          {
            label: p.label,
            value: p.key,
            checked: current.key === p.key,
            onPress: () => set({ platform: p.key })
          },
          p.key
        )) : null
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "PlatformSpoofer" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 8 }, children: "Takes effect after restarting Discord." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Spoof my platform", onPress: () => set({ enabled: !(settings.enabled === true) }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Spoof my platform: ",
        settings.enabled === true ? "on" : "off"
      ] }) }),
      PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Platform " + p.label, onPress: () => set({ platform: p.key }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        current.key === p.key ? "\u25CF " : "\u25CB ",
        p.label
      ] }) }, p.key))
    ] });
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()