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

// plugins/dev.8uvu.typing-watch/js/index.tsx
var index_exports = {};
__export(index_exports, {
  ago: () => ago,
  default: () => index_default,
  remember: () => remember
});
module.exports = __toCommonJS(index_exports);
var import_design = (valenced.discord.design);
var import_flux = (valenced.discord.flux);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DEFAULTS = { enabled: true, recent: [] };
var KEEP = 20;
function ago(at, now) {
  const seconds = Math.max(0, Math.round((now - at) / 1e3));
  if (seconds < 60) return seconds + "s ago";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return minutes + "m ago";
  const hours = Math.round(minutes / 60);
  if (hours < 24) return hours + "h ago";
  return Math.round(hours / 24) + "d ago";
}
function remember(recent, entry) {
  const rest = (Array.isArray(recent) ? recent : []).filter(
    (item) => !((item == null ? void 0 : item.channelId) === entry.channelId && (item == null ? void 0 : item.userId) === entry.userId)
  );
  return [entry, ...rest].slice(0, KEEP);
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    cleanup(
      // A listener, not a gate: the payload goes back untouched so the
      // indicator still shows for everyone.
      (0, import_flux.onFluxEventDispatched)("TYPING_START", (payload) => {
        var _a2, _b, _c, _d;
        const current = (_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS;
        if (current.enabled === false || !payload || typeof payload !== "object") return payload;
        const channelId = payload.channelId == null ? "" : String(payload.channelId);
        const userId = payload.userId == null ? "" : String(payload.userId);
        if (!channelId || !userId) return payload;
        const entry = { channelId, userId, at: Date.now() };
        (_d = (_c = Promise.resolve(jsonStorage.set({ recent: remember((_b = current.recent) != null ? _b : [], entry) }))).catch) == null ? void 0 : _d.call(_c, () => {
        });
        return payload;
      })
    );
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[TypingWatch] started");
  },
  SettingsComponent({ api }) {
    var _a, _b;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => {
      var _a2, _b2;
      return (_b2 = (_a2 = api.jsonStorage.set(patch)).catch) == null ? void 0 : _b2.call(_a2, () => {
      });
    };
    const recent = Array.isArray(settings.recent) ? settings.recent : [];
    const now = Date.now();
    const D = (_b = import_design.Design) != null ? _b : {};
    if (D.TableRowGroup) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "TypingWatch", children: [
          D.TableSwitchRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Remember who types",
              subLabel: "Keeps the last 20 people who started typing.",
              value: settings.enabled !== false,
              onValueChange: (v) => set({ enabled: v })
            }
          ) : null,
          D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "Clear the list", onPress: () => set({ recent: [] }) }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: `Recent (${recent.length})`, children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "Nobody has typed yet." }) : recent.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableRow,
          {
            label: entry.userId + " in " + entry.channelId,
            subLabel: ago(entry.at, now)
          },
          entry.channelId + ":" + entry.userId
        )) })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "TypingWatch" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.Pressable,
        {
          accessibilityLabel: "Remember who types",
          onPress: () => set({ enabled: !(settings.enabled !== false) }),
          style: { paddingVertical: 8 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
            "Remember who types: ",
            settings.enabled !== false ? "on" : "off"
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Clear the list", onPress: () => set({ recent: [] }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Clear the list (",
        recent.length,
        ")"
      ] }) }),
      recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginTop: 8 }, children: "Nobody has typed yet." }) : recent.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: entry.userId + " in " + entry.channelId + " \u2014 " + ago(entry.at, now) }, entry.channelId + ":" + entry.userId))
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()