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

// plugins/dev.8uvu.host-probe/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_design = (valenced.discord.design);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
function probe(api) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const rows = [];
  const push = (key, value) => rows.push({ key, value: value === void 0 ? "undefined" : String(value) });
  const unscoped = (_a = api == null ? void 0 : api.unscoped) != null ? _a : {};
  push("host", "Valenced");
  push("api.cleanup", typeof (api == null ? void 0 : api.cleanup));
  push("api.jsonStorage", typeof ((_b = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _b.get));
  push("api.logger", typeof ((_c = api == null ? void 0 : api.logger) == null ? void 0 : _c.log));
  push("unscoped.react.React", typeof ((_e = (_d = unscoped == null ? void 0 : unscoped.react) == null ? void 0 : _d.React) == null ? void 0 : _e.createElement));
  push("unscoped.react.ReactNative", ((_f = unscoped == null ? void 0 : unscoped.react) == null ? void 0 : _f.ReactNative) ? "present" : "missing");
  push("unscoped.discord.flux", typeof ((_h = (_g = unscoped == null ? void 0 : unscoped.discord) == null ? void 0 : _g.flux) == null ? void 0 : _h.onFluxEventDispatched));
  push("unscoped.discord.design", ((_i = unscoped == null ? void 0 : unscoped.discord) == null ? void 0 : _i.design) ? "present" : "missing");
  push("unscoped.discord.actions", ((_j = unscoped == null ? void 0 : unscoped.discord) == null ? void 0 : _j.actions) ? "present" : "missing");
  push("unscoped.discord.native", ((_k = unscoped == null ? void 0 : unscoped.discord) == null ? void 0 : _k.native) ? "present" : "missing");
  push("unscoped.patcher.before", typeof ((_l = unscoped == null ? void 0 : unscoped.patcher) == null ? void 0 : _l.before));
  push("unscoped.modules.finders", typeof ((_n = (_m = unscoped == null ? void 0 : unscoped.modules) == null ? void 0 : _m.finders) == null ? void 0 : _n.lookupModule));
  push("flux.Stores", ((_p = (_o = unscoped == null ? void 0 : unscoped.discord) == null ? void 0 : _o.flux) == null ? void 0 : _p.Stores) ? Object.keys(unscoped.discord.flux.Stores).length + " store(s)" : "missing");
  return rows;
}
var index_default = plugin({
  jsonStorage: { load: true, default: {} },
  start({ logger }) {
    var _a;
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[HostProbe] started");
  },
  SettingsComponent({ api }) {
    var _a;
    const rows = probe(api);
    const D = (_a = import_design.Design) != null ? _a : {};
    if (D.TableRowGroup && D.TableRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.ScrollView, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "Host Probe", children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: row.key, subLabel: row.value }, row.key)) }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "Host Probe" }),
      rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { paddingVertical: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: row.key }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8" }, children: row.value })
      ] }, row.key))
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()