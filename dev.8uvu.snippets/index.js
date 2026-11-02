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

// plugins/dev.8uvu.snippets/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  expand: () => expand
});
module.exports = __toCommonJS(index_exports);
var import_design = (valenced.discord.design);
var import_finders = (valenced.modules.finders);
var import_filters = (valenced.modules.finders.filters);
var import_patcher = (valenced.patcher);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_react = (({ default: valenced.react.React, ...valenced.react.React }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DEFAULTS = { pairs: [], caseSensitive: false };
var text = (value) => typeof value === "string" ? value : "";
var clean = (value) => text(value).trim();
function expand(message, pairs, caseSensitive) {
  const wanted = clean(message);
  if (!wanted || !Array.isArray(pairs)) return message;
  for (const pair of pairs) {
    const trigger = clean(pair == null ? void 0 : pair.trigger);
    const replacement = text(pair == null ? void 0 : pair.replacement);
    if (!trigger || !replacement) continue;
    const hit = caseSensitive ? wanted === trigger : wanted.toLowerCase() === trigger.toLowerCase();
    if (hit) return replacement;
  }
  return message;
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a, _b;
    const settings = () => {
      var _a2;
      return (_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS;
    };
    const rewrite = (args) => {
      var _a2;
      const current = settings();
      for (const arg of args) {
        const content = arg == null ? void 0 : arg.content;
        if (typeof content !== "string") continue;
        const expanded = expand(content, (_a2 = current.pairs) != null ? _a2 : [], current.caseSensitive === true);
        if (expanded !== content) arg.content = expanded;
      }
      return args;
    };
    try {
      cleanup(
        (0, import_finders.getModules)((0, import_filters.withProps)("sendMessage", "editMessage"), (mod) => {
          if (typeof (mod == null ? void 0 : mod.sendMessage) === "function") {
            cleanup((0, import_patcher.before)(mod, "sendMessage", (args) => rewrite(args)));
          }
          if (typeof (mod == null ? void 0 : mod.editMessage) === "function") {
            cleanup((0, import_patcher.before)(mod, "editMessage", (args) => rewrite(args)));
          }
        })
      );
    } catch (error) {
      (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "[Snippets] send path not found; expansion is idle", error);
    }
    (_b = logger == null ? void 0 : logger.log) == null ? void 0 : _b.call(logger, "[Snippets] started");
  },
  SettingsComponent({ api }) {
    var _a, _b, _c;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const [trigger, setTrigger] = (0, import_react.useState)("");
    const [replacement, setReplacement] = (0, import_react.useState)("");
    const D = (_b = import_design.Design) != null ? _b : {};
    const save = (patch) => {
      var _a2, _b2;
      return (_b2 = (_a2 = api.jsonStorage.set(patch)).catch) == null ? void 0 : _b2.call(_a2, () => {
      });
    };
    const pairs = (_c = settings.pairs) != null ? _c : [];
    const add = () => {
      const name = clean(trigger);
      const body2 = text(replacement).trim();
      if (!name || !body2) return;
      const kept = pairs.filter((pair) => clean(pair == null ? void 0 : pair.trigger).toLowerCase() !== name.toLowerCase());
      save({ pairs: [...kept, { trigger: name, replacement: body2 }] });
      setTrigger("");
      setReplacement("");
    };
    const remove = (name) => save({ pairs: pairs.filter((pair) => clean(pair == null ? void 0 : pair.trigger) !== name) });
    const canAdd = clean(trigger).length > 0 && text(replacement).trim().length > 0;
    const field = (label, value, onChange) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { marginVertical: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 2 }, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.TextInput,
        {
          style: { color: "#ffffff", backgroundColor: "#232428", borderRadius: 8, padding: 8 },
          value,
          onChangeText: onChange
        }
      )
    ] });
    const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 16 }, children: [
      field("Trigger", trigger, setTrigger),
      field("Sends instead", replacement, setReplacement),
      D.Button ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.Button, { text: "Add snippet", onPress: add }) : (
        // Discord's Button is missing on some builds, and rendering a
        // component the host does not have throws "element type is
        // invalid" and takes the page down, so the primary button is
        // drawn here in Discord's own style: blurple fill, bold white
        // label, dimmed while the fields are still empty.
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_react_native.Pressable,
          {
            accessibilityLabel: "Add snippet",
            accessibilityRole: "button",
            accessibilityState: { disabled: !canAdd },
            disabled: !canAdd,
            onPress: add,
            android_ripple: { color: "#ffffff33" },
            style: ({ pressed }) => ({
              alignSelf: "flex-start",
              marginTop: 12,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 4,
              backgroundColor: !canAdd ? "#4e5058" : pressed ? "#4752C4" : "#5865F2"
            }),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontSize: 14, fontWeight: "600" }, children: "Add snippet" })
          }
        )
      ),
      pairs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginTop: 12 }, children: "No snippets yet." }) : pairs.map((pair) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { flexDirection: "row", alignItems: "center", marginTop: 10 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", flex: 1 }, children: pair.trigger + " \u2192 " + pair.replacement }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Remove " + pair.trigger, onPress: () => remove(pair.trigger), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ff6b6b" }, children: "Remove" }) })
      ] }, pair.trigger))
    ] });
    if (D.TableRowGroup) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.ScrollView, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Snippets", children: [
        D.TableSwitchRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Match case",
            subLabel: "Off: \u201CBRB\u201D and \u201Cbrb\u201D both expand.",
            value: settings.caseSensitive === true,
            onValueChange: (v) => save({ caseSensitive: v })
          }
        ) : null,
        body
      ] }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.ScrollView, { children: body });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()