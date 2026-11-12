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
var import_design = (valenced.discord.design);
var import_finders = (valenced.modules.finders);
var import_filters = (valenced.modules.finders.filters);
var import_patcher = (valenced.patcher);
var import_react_native = ((function () { return { ...((valenced.react && valenced.react.ReactNative) || {}) }; })());
var import_jsx_runtime = ((function () { const rt = () => (valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime)) || {}; return { get jsx() { return rt().jsx }, get jsxs() { return rt().jsxs }, get Fragment() { return rt().Fragment } }; })());
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
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } return __plugin; })()