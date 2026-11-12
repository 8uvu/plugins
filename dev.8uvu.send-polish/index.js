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

// plugins/dev.8uvu.send-polish/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  escapeMarkdown: () => escapeMarkdown,
  polish: () => polish
});
module.exports = __toCommonJS(index_exports);
var import_design = (valenced.discord.design);
var import_finders = (valenced.modules.finders);
var import_filters = (valenced.modules.finders.filters);
var import_patcher = (valenced.patcher);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DEFAULTS = { trim: true, collapseBlanks: true, escapeMarkdown: false, edits: true };
var INLINE_MARKS = /* @__PURE__ */ new Set(["*", "_", "~", "`", "|"]);
function escapeMarkdown(text) {
  let out = "";
  let atLineStart = true;
  for (const char of text) {
    if (char === "\n") {
      out += char;
      atLineStart = true;
      continue;
    }
    const alreadyEscaped = out.endsWith("\\");
    const isMark = INLINE_MARKS.has(char) || atLineStart && char === ">";
    out += isMark && !alreadyEscaped ? "\\" + char : char;
    atLineStart = false;
  }
  return out;
}
function polish(text, settings) {
  if (typeof text !== "string" || !text) return text;
  let out = text;
  if (settings.escapeMarkdown === true) out = escapeMarkdown(out);
  if (settings.trim !== false) out = out.replace(/[ \t]+$/gm, "").replace(/[ \t\r\n]+$/, "");
  if (settings.collapseBlanks !== false) out = out.replace(/\n{3,}/g, "\n\n");
  return out;
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a, _b;
    const settings = () => {
      var _a2;
      return { ...DEFAULTS, ...(_a2 = jsonStorage.cache) != null ? _a2 : {} };
    };
    const clean = (args, kind) => {
      const current = settings();
      if (kind === "edits" && current.edits === false) return args;
      for (const arg of args) {
        const content = arg == null ? void 0 : arg.content;
        if (typeof content !== "string") continue;
        const next = polish(content, current);
        if (next !== content) arg.content = next;
      }
      return args;
    };
    try {
      cleanup(
        (0, import_finders.getModules)((0, import_filters.withProps)("sendMessage", "editMessage"), (mod) => {
          if (typeof (mod == null ? void 0 : mod.sendMessage) === "function") {
            cleanup((0, import_patcher.before)(mod, "sendMessage", (args) => clean(args, "outgoing")));
          }
          if (typeof (mod == null ? void 0 : mod.editMessage) === "function") {
            cleanup((0, import_patcher.before)(mod, "editMessage", (args) => clean(args, "edits")));
          }
        })
      );
    } catch (error) {
      (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "[SendPolish] send path not found; nothing is being tidied", error);
    }
    (_b = logger == null ? void 0 : logger.log) == null ? void 0 : _b.call(logger, "[SendPolish] started");
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
    const rows = [
      ["trim", "Trim trailing spaces", "Removes the spaces you leave at the end of a line."],
      ["collapseBlanks", "Collapse blank lines", "Three or more newlines become one blank line."],
      ["escapeMarkdown", "Escape markdown", "Sends * _ ~ ` | > literally instead of styling them."],
      ["edits", "Also on edits", "Apply the same clean-up when you edit a message."]
    ];
    if (D.TableRowGroup && D.TableSwitchRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "SendPolish", children: rows.map(([key, label, subLabel]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        D.TableSwitchRow,
        {
          label,
          subLabel,
          value: settings[key] !== false,
          onValueChange: (v) => set({ [key]: v })
        },
        key
      )) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "SendPolish" }),
      rows.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.Pressable,
        {
          accessibilityLabel: label,
          onPress: () => set({ [key]: !(settings[key] !== false) }),
          style: { paddingVertical: 8 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
            label,
            ": ",
            settings[key] !== false ? "on" : "off"
          ] })
        },
        key
      ))
    ] });
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } return __plugin; })()