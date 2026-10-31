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

// plugins/dev.8uvu.typing-guard/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_design = (valenced.discord.design);
var import_finders = (valenced.modules.finders);
var import_filters = (valenced.modules.finders.filters);
var import_patcher = (valenced.patcher);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DEFAULTS = { hide: true };
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a, _b, _c;
    const hidden = () => {
      var _a2;
      return ((_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS).hide !== false;
    };
    let patched = 0;
    try {
      cleanup(
        (0, import_finders.getModules)((0, import_filters.withProps)("sendTyping"), (mod) => {
          if (!mod || typeof mod.sendTyping !== "function") return;
          patched++;
          cleanup(
            (0, import_patcher.instead)(mod, "sendTyping", (args, original) => {
              if (!hidden()) return original(...args);
              return Promise.resolve();
            })
          );
        })
      );
    } catch (error) {
      (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "[TypingGuard] typing sender not found", error);
    }
    if (!patched) (_b = logger == null ? void 0 : logger.warn) == null ? void 0 : _b.call(logger, "[TypingGuard] this build exposes no typing sender; the indicator stays visible");
    (_c = logger == null ? void 0 : logger.log) == null ? void 0 : _c.call(logger, "[TypingGuard] started");
  },
  SettingsComponent({ api }) {
    var _a, _b;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => {
      var _a2, _b2;
      return (_b2 = (_a2 = api.jsonStorage.set(patch)).catch) == null ? void 0 : _b2.call(_a2, () => {
      });
    };
    const D = (_b = import_design.Design) != null ? _b : {};
    if (D.TableRowGroup) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "TypingGuard", children: D.TableSwitchRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        D.TableSwitchRow,
        {
          label: "Never show typing",
          subLabel: "Nobody sees \u201Ctyping\u2026\u201D from you.",
          value: settings.hide !== false,
          onValueChange: (v) => set({ hide: v })
        }
      ) : null });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "TypingGuard" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Never show typing: ",
        settings.hide !== false ? "on" : "off"
      ] })
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()