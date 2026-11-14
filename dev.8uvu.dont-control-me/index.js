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

// plugins/dev.8uvu.dont-control-me/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_flux = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Stores() { return __g().Stores }, get onFluxEventDispatched() { return __g().onFluxEventDispatched }, get getStore() { return __g().getStore }, get onAnyFluxEventDispatched() { return __g().onAnyFluxEventDispatched } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_finders = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get lookupModule() { return __g().lookupModule }, get lookupModules() { return __g().lookupModules }, get getModules() { return __g().getModules }, get waitForModules() { return __g().waitForModules } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get withProps() { return __g().withProps }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withName() { return __g().withName }, get withDependencies() { return __g().withDependencies }, get anyOf() { return __g().anyOf }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get createFilterGenerator() { return __g().createFilterGenerator }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native2 = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get ScrollView() { return __g().ScrollView }, get View() { return __g().View }, get Text() { return __g().Text }, get Pressable() { return __g().Pressable }, get Appearance() { return __g().Appearance }, get TextInput() { return __g().TextInput }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();

// plugins/_shared/theme.ts
var import_common = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens }, get Logger() { return __g().Logger }, get Constants() { return __g().Constants } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get ScrollView() { return __g().ScrollView }, get View() { return __g().View }, get Text() { return __g().Text }, get Pressable() { return __g().Pressable }, get Appearance() { return __g().Appearance }, get TextInput() { return __g().TextInput }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
function activeBase() {
  var _a, _b;
  try {
    if (((_b = (_a = import_react_native.Appearance) == null ? void 0 : _a.getColorScheme) == null ? void 0 : _b.call(_a)) === "light") return "light";
  } catch {
  }
  return "dark";
}
function token(name) {
  var _a, _b, _c, _d, _e;
  try {
    const module2 = import_common.Tokens;
    if (!module2) return void 0;
    const definition = (_a = module2 == null ? void 0 : module2.SemanticColor) == null ? void 0 : _a[name];
    const resolve = (_c = (_b = module2 == null ? void 0 : module2.default) == null ? void 0 : _b.internal) == null ? void 0 : _c.resolveSemanticColor;
    if (typeof resolve === "function" && definition) {
      return resolve(activeBase(), definition);
    }
    const colours = (_e = (_d = module2 == null ? void 0 : module2.default) == null ? void 0 : _d.colors) == null ? void 0 : _e[name];
    if (typeof colours === "string") return colours;
    if (typeof definition === "string") return definition;
  } catch {
  }
  return void 0;
}

// plugins/dev.8uvu.dont-control-me/js/index.tsx
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsx() { return __g().jsx }, get jsxs() { return __g().jsxs }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULTS = {
  reconnect: true,
  rejoinDelay: 2,
  moveToPinned: true,
  autoUnmute: true,
  autoUndeafen: true,
  pinnedChannelId: null,
  lastChannelId: null
};
var DELAYS = [
  { value: 0, label: "Straight away" },
  { value: 2, label: "2 seconds" },
  { value: 5, label: "5 seconds" },
  { value: 10, label: "10 seconds" }
];
function selfId() {
  var _a, _b, _c, _d;
  try {
    return String((_d = (_c = (_b = (_a = import_flux.Stores.UserStore) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a)) == null ? void 0 : _c.id) != null ? _d : "");
  } catch {
    return "";
  }
}
function currentVoiceChannelId() {
  var _a, _b, _c, _d, _e;
  try {
    const selected = (_a = import_flux.Stores.SelectedChannelStore) != null ? _a : import_flux.Stores.SelectedVoiceChannelStore;
    const id = (_e = (_d = (_b = selected == null ? void 0 : selected.getVoiceChannelId) == null ? void 0 : _b.call(selected)) != null ? _d : (_c = selected == null ? void 0 : selected.getChannelId) == null ? void 0 : _c.call(selected)) != null ? _e : null;
    return id ? String(id) : null;
  } catch {
    return null;
  }
}
function findVoiceActions() {
  try {
    const [mod] = (0, import_finders.lookupModule)((0, import_filters.withProps)("selectVoiceChannel"));
    if (mod && typeof mod.selectVoiceChannel === "function") return mod;
  } catch {
  }
  return null;
}
function findVoiceStateActions() {
  try {
    const [mod] = (0, import_finders.lookupModule)((0, import_filters.withProps)("updateVoiceState"));
    if (mod && typeof mod.updateVoiceState === "function") return mod;
  } catch {
  }
  return null;
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    let warned = false;
    let rejoinTimer = null;
    let lastAction = { channelId: "", at: 0 };
    const guarded = (channelId, fn) => {
      var _a2;
      const now = Date.now();
      if (lastAction.channelId === channelId && now - lastAction.at < 1e3) return;
      lastAction = { channelId, at: now };
      try {
        fn();
      } catch (error) {
        (_a2 = logger == null ? void 0 : logger.error) == null ? void 0 : _a2.call(logger, "[DontControlMe] action failed", error);
      }
    };
    const join = (channelId) => {
      var _a2;
      const voice = findVoiceActions();
      if (!voice) {
        if (!warned) {
          warned = true;
          (_a2 = logger == null ? void 0 : logger.error) == null ? void 0 : _a2.call(logger, "[DontControlMe] no voice actions module; rejoin is idle");
        }
        return;
      }
      guarded(channelId, () => voice.selectVoiceChannel(channelId));
    };
    cleanup(
      (0, import_flux.onFluxEventDispatched)("VOICE_STATE_UPDATE", (payload) => {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
        try {
          const cfg = { ...DEFAULTS, ...(_a2 = jsonStorage.cache) != null ? _a2 : {} };
          const state = (_b = payload == null ? void 0 : payload.voiceState) != null ? _b : payload;
          const states = Array.isArray(payload == null ? void 0 : payload.voiceStates) ? payload.voiceStates : [state];
          const me = selfId();
          for (const vs of states) {
            const userId = String((_e = (_d = (_c = vs == null ? void 0 : vs.userId) != null ? _c : vs == null ? void 0 : vs.user_id) != null ? _d : payload == null ? void 0 : payload.userId) != null ? _e : "");
            if (!me || userId && userId !== me) continue;
            const raw = (_h = (_g = (_f = vs == null ? void 0 : vs.channelId) != null ? _f : vs == null ? void 0 : vs.channel_id) != null ? _g : payload == null ? void 0 : payload.channelId) != null ? _h : null;
            const channelId = raw ? String(raw) : null;
            const pinned = (_i = cfg.pinnedChannelId) != null ? _i : null;
            if (channelId) {
              if (channelId !== cfg.lastChannelId) {
                jsonStorage.set({ lastChannelId: channelId });
              }
              if (pinned && cfg.moveToPinned && channelId !== pinned) join(pinned);
              continue;
            }
            if (!cfg.reconnect) continue;
            const target = pinned != null ? pinned : cfg.lastChannelId;
            if (!target) continue;
            const wait = Math.max(0, Math.min(30, Number(cfg.rejoinDelay) || 0)) * 1e3;
            if (rejoinTimer) clearTimeout(rejoinTimer);
            rejoinTimer = setTimeout(() => {
              rejoinTimer = null;
              if (currentVoiceChannelId()) return;
              join(target);
            }, wait);
            const muted = (_j = vs == null ? void 0 : vs.mute) != null ? _j : payload == null ? void 0 : payload.mute;
            const deafened = (_k = vs == null ? void 0 : vs.deaf) != null ? _k : payload == null ? void 0 : payload.deaf;
            if (muted && cfg.autoUnmute || deafened && cfg.autoUndeafen) {
              const actions = findVoiceStateActions();
              if (actions) {
                guarded(
                  target + ":state",
                  () => actions.updateVoiceState(target, {
                    mute: muted && cfg.autoUnmute ? false : void 0,
                    deaf: deafened && cfg.autoUndeafen ? false : void 0
                  })
                );
              }
            }
          }
        } catch (error) {
          (_l = logger == null ? void 0 : logger.error) == null ? void 0 : _l.call(logger, "[DontControlMe] handler failed", error);
        }
        return payload;
      })
    );
    cleanup(() => {
      if (rejoinTimer) clearTimeout(rejoinTimer);
    });
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[DontControlMe] started");
  },
  SettingsComponent({ api }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const settings = { ...DEFAULTS, ...(_a = api.jsonStorage.use()) != null ? _a : {} };
    const set = (patch) => api.jsonStorage.set(patch);
    const pin = () => {
      const id = currentVoiceChannelId();
      if (id) api.jsonStorage.set({ pinnedChannelId: id });
    };
    const D = (_b = import_design.Design) != null ? _b : {};
    const pinned = (_c = settings.pinnedChannelId) != null ? _c : null;
    const last = (_d = settings.lastChannelId) != null ? _d : null;
    if (D.TableRowGroup && D.TableSwitchRow) {
      const Row = (_e = D.TableRow) != null ? _e : null;
      const Button = (_f = D.Button) != null ? _f : null;
      const RadioGroup = (_g = D.TableRadioGroup) != null ? _g : null;
      const RadioRow = (_h = D.TableRadioRow) != null ? _h : null;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.ScrollView, { style: { paddingHorizontal: 16, paddingTop: 16, gap: 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Don't Control Me", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Rejoin when I get disconnected",
            subLabel: "Discord drops you out of the call; this puts you back.",
            value: settings.reconnect !== false,
            onValueChange: (v) => set({ reconnect: v })
          }
        ),
        RadioGroup && RadioRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          RadioGroup,
          {
            title: "Wait before rejoining",
            value: String((_i = settings.rejoinDelay) != null ? _i : 2),
            onChange: (value) => set({ rejoinDelay: Number(value) }),
            children: DELAYS.map((delay) => {
              var _a2;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                RadioRow,
                {
                  label: delay.label,
                  value: String(delay.value),
                  subLabel: String((_a2 = settings.rejoinDelay) != null ? _a2 : 2) === String(delay.value) ? "Selected" : void 0
                },
                delay.value
              );
            })
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Return to my pinned channel",
            value: settings.moveToPinned !== false,
            onValueChange: (v) => set({ moveToPinned: v })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Undo server mute",
            value: settings.autoUnmute !== false,
            onValueChange: (v) => set({ autoUnmute: v })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Undo server deafen",
            value: settings.autoUndeafen !== false,
            onValueChange: (v) => set({ autoUndeafen: v })
          }
        ),
        Row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Row,
          {
            label: "Rejoin to",
            subLabel: pinned ? pinned + " (pinned)" : last ? last + " (last call)" : "Nothing yet \u2014 join a voice channel once."
          }
        ) : null,
        Row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Pinned channel", subLabel: pinned != null ? pinned : "None \u2014 join a voice channel, then pin it." }) : null,
        Button ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Button,
          {
            text: pinned ? "Unpin channel" : "Pin current channel",
            onPress: () => pinned ? set({ pinnedChannelId: null }) : pin()
          }
        ) : null
      ] }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontWeight: "bold", marginBottom: 8 }, children: "Don't Control Me" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_MUTED"), marginBottom: 8 }, children: [
        "Pinned: ",
        pinned != null ? pinned : "none",
        " \xB7 Last call: ",
        last != null ? last : "none"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_MUTED"), marginBottom: 8 }, children: [
        "Rejoin: ",
        settings.reconnect !== false ? "on" : "off",
        " \xB7 Wait: ",
        (_j = settings.rejoinDelay) != null ? _j : 2,
        "s"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native2.Pressable,
        {
          accessibilityLabel: pinned ? "Unpin channel" : "Pin current channel",
          onPress: () => pinned ? set({ pinnedChannelId: null }) : pin(),
          style: { padding: 12, backgroundColor: token("BACKGROUND_TERTIARY"), borderRadius: 8, marginBottom: 8 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL") }, children: pinned ? "Unpin channel" : "Pin current channel" })
        }
      ),
      ["reconnect", "moveToPinned", "autoUnmute", "autoUndeafen"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native2.Pressable,
        {
          accessibilityLabel: key,
          onPress: () => set({ [key]: !settings[key] }),
          style: { paddingVertical: 10 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL") }, children: [
            key,
            ": ",
            settings[key] !== false ? "on" : "off"
          ] })
        },
        key
      ))
    ] });
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && (typeof __plugin === 'object' || typeof __plugin === 'function')) { try { Object.defineProperty(__plugin, 'default', { value: __plugin, enumerable: false, configurable: true }); } catch (ignored) { try { __plugin.default = __plugin; } catch (ignored2) {} } } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return { default: __plugin }; })()