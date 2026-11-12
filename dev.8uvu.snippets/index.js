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
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_finders = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get getModules() { return __g().getModules }, get lookupModule() { return __g().lookupModule }, get lookupModules() { return __g().lookupModules }, get waitForModules() { return __g().waitForModules } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get withProps() { return __g().withProps }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withName() { return __g().withName }, get withDependencies() { return __g().withDependencies }, get anyOf() { return __g().anyOf }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get createFilterGenerator() { return __g().createFilterGenerator }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_patcher = (function () { const __g = () => { try { return (valenced.patcher) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get before() { return __g().before }, get after() { return __g().after }, get instead() { return __g().instead } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get Pressable() { return __g().Pressable }, get ScrollView() { return __g().ScrollView }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Appearance() { return __g().Appearance }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get useState() { return __g().useState }, get createElement() { return __g().createElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsxs() { return __g().jsxs }, get jsx() { return __g().jsx }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
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
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()