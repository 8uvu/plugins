(() => { const module = { exports: {} }; const exports = module.exports; var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugins/dev.8uvu.quick-check/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  diagnosis: () => diagnosis
});
module.exports = __toCommonJS(index_exports);
var import_design = (valenced.discord.design);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_react = __toESM((({ default: valenced.react.React, ...valenced.react.React })));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
function line(label, value) {
  return label + ": " + (value === void 0 ? "MISSING" : value === null ? "null" : String(value));
}
function diagnosis(api) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  const lines = [];
  const unscoped = (_a = api == null ? void 0 : api.unscoped) != null ? _a : {};
  lines.push("Host: Valenced");
  lines.push("");
  lines.push(line("React", typeof ((_e = (_c = (_b = unscoped == null ? void 0 : unscoped.react) == null ? void 0 : _b.React) == null ? void 0 : _c.createElement) != null ? _e : (_d = import_react.default) == null ? void 0 : _d.createElement)));
  lines.push(line("ReactNative", ((_f = unscoped == null ? void 0 : unscoped.react) == null ? void 0 : _f.ReactNative) ? "present" : void 0));
  const rnAlert = (_i = (_h = (_g = unscoped == null ? void 0 : unscoped.react) == null ? void 0 : _g.ReactNative) == null ? void 0 : _h.Alert) != null ? _i : import_react_native.Alert;
  lines.push(line("RN.Alert", rnAlert ? typeof rnAlert.alert : void 0));
  lines.push("");
  lines.push(line("flux.onFluxEventDispatched", typeof ((_k = (_j = unscoped == null ? void 0 : unscoped.discord) == null ? void 0 : _j.flux) == null ? void 0 : _k.onFluxEventDispatched)));
  lines.push(line("Design rows", ((_p = (_n = (_m = (_l = unscoped == null ? void 0 : unscoped.discord) == null ? void 0 : _l.design) == null ? void 0 : _m.Design) == null ? void 0 : _n.TableRowGroup) != null ? _p : (_o = import_design.Design) == null ? void 0 : _o.TableRowGroup) ? "present" : void 0));
  lines.push(line("patcher.before", typeof ((_q = unscoped == null ? void 0 : unscoped.patcher) == null ? void 0 : _q.before)));
  lines.push(line("modules.finders", typeof ((_s = (_r = unscoped == null ? void 0 : unscoped.modules) == null ? void 0 : _r.finders) == null ? void 0 : _s.lookupModule)));
  lines.push("");
  lines.push("Send this whole report to the plugin developer if something shows MISSING.");
  return lines.join("\n");
}
var index_default = plugin({
  jsonStorage: { load: true, default: {} },
  start(api) {
    var _a, _b, _c, _d, _e, _f, _g;
    const text = diagnosis(api);
    try {
      const RNAlert = (_d = (_c = (_b = (_a = api == null ? void 0 : api.unscoped) == null ? void 0 : _a.react) == null ? void 0 : _b.ReactNative) == null ? void 0 : _c.Alert) != null ? _d : import_react_native.Alert;
      (_e = RNAlert == null ? void 0 : RNAlert.alert) == null ? void 0 : _e.call(RNAlert, "Quick Check", text);
    } catch {
      try {
        console.log("[QuickCheck]\n" + text);
      } catch {
      }
    }
    (_g = (_f = api == null ? void 0 : api.logger) == null ? void 0 : _f.log) == null ? void 0 : _g.call(_f, "[QuickCheck] started");
  },
  SettingsComponent({ api }) {
    var _a;
    const text = diagnosis(api);
    const D = (_a = import_design.Design) != null ? _a : {};
    if (D.TableRowGroup && D.TableRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.ScrollView, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "Quick Check", children: text.split("\n").map((row, i) => row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: row }, i) : null) }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "Quick Check" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: text })
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()