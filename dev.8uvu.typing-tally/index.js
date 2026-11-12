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
var import_design = (valenced.discord.design);
var import_flux = (valenced.discord.flux);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
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
    const row = (key, label, subLabel) => D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label, subLabel }, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { paddingVertical: 6 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: label }),
      subLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8" }, children: subLabel }) : null
    ] }, key);
    if (D.TableRowGroup) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { children: [
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "TypingTally" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.Pressable,
        {
          accessibilityLabel: "Count my typing",
          onPress: () => set({ enabled: !(settings.enabled !== false) }),
          style: { paddingVertical: 8 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
            "Count my typing: ",
            settings.enabled !== false ? "on" : "off"
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Reset today", onPress: () => set({ day: today, counts: {} }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: "Reset today" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff", marginTop: 8 }, children: [
        "Today: ",
        total,
        " starts"
      ] }),
      top.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginTop: 8 }, children: "Nothing counted today." }) : top.map(([channel, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: "Channel " + channel + " \u2014 " + n }, channel))
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()