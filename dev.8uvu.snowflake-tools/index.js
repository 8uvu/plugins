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

// plugins/dev.8uvu.snowflake-tools/js/index.tsx
var index_exports = {};
__export(index_exports, {
  decode: () => decode,
  default: () => index_default,
  humanAgo: () => humanAgo,
  timestampMarkup: () => timestampMarkup
});
module.exports = __toCommonJS(index_exports);
var import_design = (valenced.discord.design);
var import_react = (({ default: valenced.react.React, ...valenced.react.React }));
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DISCORD_EPOCH = /* @__PURE__ */ BigInt("1420070400000");
function decode(id) {
  const raw = String(id != null ? id : "").trim();
  if (!/^\d{5,25}$/.test(raw)) return null;
  const ms = (BigInt(raw) >> /* @__PURE__ */ BigInt("22")) + DISCORD_EPOCH;
  const createdAt = new Date(Number(ms));
  if (Number.isNaN(createdAt.getTime())) return null;
  return { id: raw, createdAt, ago: humanAgo(Date.now() - createdAt.getTime()) };
}
function humanAgo(deltaMs) {
  if (!Number.isFinite(deltaMs)) return "unknown";
  if (deltaMs < 0) return "in the future";
  const minute = 6e4;
  const hour = 60 * minute;
  const day = 24 * hour;
  const year = 365 * day;
  if (deltaMs < minute) return "just now";
  if (deltaMs < hour) return `${Math.floor(deltaMs / minute)} min ago`;
  if (deltaMs < day) return `${Math.floor(deltaMs / hour)} h ago`;
  if (deltaMs < year) return `${Math.floor(deltaMs / day)} d ago`;
  return `${Math.floor(deltaMs / year)} y ago`;
}
function timestampMarkup(date, style = "f") {
  return `<t:${Math.floor(date.getTime() / 1e3)}:${style}>`;
}
var DEFAULTS = { lastId: "" };
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start() {
  },
  SettingsComponent({ api }) {
    var _a, _b, _c;
    const stored = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const D = (_b = import_design.Design) != null ? _b : {};
    const [input, setInput] = (0, import_react.useState)((_c = stored.lastId) != null ? _c : "");
    const update = (value) => {
      var _a2, _b2;
      setInput(value);
      (_b2 = (_a2 = api.jsonStorage.set({ lastId: value })).catch) == null ? void 0 : _b2.call(_a2, () => {
      });
    };
    const decoded = decode(input);
    const lines = decoded ? [
      ["ID", decoded.id],
      ["Created", decoded.createdAt.toUTCString()],
      ["Local time", decoded.createdAt.toLocaleString()],
      ["Age", decoded.ago],
      ["Inline", timestampMarkup(decoded.createdAt)]
    ] : [];
    const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 12, gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold" }, children: "Snowflake Tools" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8" }, children: "Paste a message, user, channel or server ID." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.TextInput,
        {
          style: { color: "#ffffff" },
          value: input,
          onChangeText: update,
          placeholder: "123456789012345678",
          keyboardType: "number-pad"
        }
      ),
      decoded ? lines.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { gap: 2 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8" }, children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, selectable: true, children: value })
      ] }, label)) : input.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#f23f43" }, children: "That is not a Discord ID." }) : null
    ] });
    return D.TableRowGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "Snowflake Tools", children: body }) : body;
  },
  __tools: { decode, humanAgo, timestampMarkup }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } return __plugin; })()