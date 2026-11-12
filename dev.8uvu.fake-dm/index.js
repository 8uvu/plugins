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

// plugins/dev.8uvu.fake-dm/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_finders = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get getModules() { return __g().getModules }, get lookupModule() { return __g().lookupModule }, get lookupModules() { return __g().lookupModules }, get waitForModules() { return __g().waitForModules } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get anyOf() { return __g().anyOf }, get withName() { return __g().withName }, get withProps() { return __g().withProps }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withDependencies() { return __g().withDependencies }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get createFilterGenerator() { return __g().createFilterGenerator }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var SettingsModules = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.modules && valenced.discord.modules.settings) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onSettingsModulesLoaded() { return __g().onSettingsModulesLoaded }, get registerSettingsSection() { return __g().registerSettingsSection }, get registerSettingsItem() { return __g().registerSettingsItem } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var PathFinders = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.utils && valenced.discord.utils.modules && valenced.discord.utils.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get getModuleWithImportedPath() { return __g().getModuleWithImportedPath }, get getModule() { return __g().getModule }, get getModulesWithImportedPath() { return __g().getModulesWithImportedPath }, get findModuleWithImportedPath() { return __g().findModuleWithImportedPath } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var JsxRuntime = __toESM((function () { const __g = () => { try { return (valenced.react && (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime)) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get beforeJSX() { return __g().beforeJSX }, get afterJSX() { return __g().afterJSX }, get insteadJSX() { return __g().insteadJSX } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get useState() { return __g().useState }, get createElement() { return __g().createElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Text() { return __g().Text }, get Pressable() { return __g().Pressable }, get View() { return __g().View }, get Switch() { return __g().Switch }, get TextInput() { return __g().TextInput }, get ScrollView() { return __g().ScrollView }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Appearance() { return __g().Appearance }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsx() { return __g().jsx }, get jsxs() { return __g().jsxs }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var PILL_LABEL = "FakeDM quick fake";
function resolveAfterJSX() {
  var _a, _b, _c;
  const host = (_a = globalThis.valenced) == null ? void 0 : _a.react;
  const candidates = [JsxRuntime, host == null ? void 0 : host.jsxRuntime, host == null ? void 0 : host.ReactJSXRuntime, host];
  for (const candidate of candidates) {
    const fn = (_c = candidate == null ? void 0 : candidate.afterJSX) != null ? _c : (_b = candidate == null ? void 0 : candidate.default) == null ? void 0 : _b.afterJSX;
    if (typeof fn === "function") return { fn, self: candidate };
  }
  return null;
}
var DEFAULTS = {
  jitterSeconds: true,
  chatButton: false,
  quickText: "hello",
  fakes: []
};
var state = {
  cfg: { ...DEFAULTS },
  storage: null,
  cleanups: [],
  installed: false,
  warnTimer: null
};
var ROW_NAMES = ["ChatInputRightActions", "ChatInputActionBar", "ChatInputRightButtons"];
function installPill(cleanup, logger, report) {
  var _a;
  const hook = resolveAfterJSX();
  if (!hook) {
    report == null ? void 0 : report("FakeDM could not find the JSX hook this build uses, so the chat-bar Fake button is unavailable. The FakeDM settings page still works.");
    return;
  }
  const filter = (0, import_filters.anyOf)(...ROW_NAMES.map((name) => (0, import_filters.withName)(name)));
  cleanup(
    (0, import_finders.getModules)(
      filter,
      (row) => {
        var _a2, _b;
        if (state.installed) return;
        if (typeof row !== "function") {
          (_a2 = logger == null ? void 0 : logger.warn) == null ? void 0 : _a2.call(logger, "[FakeDM] the chat action row module was found but is not a component, so the pill was not installed.");
          return;
        }
        state.installed = true;
        if (state.warnTimer) {
          clearTimeout(state.warnTimer);
          state.warnTimer = null;
        }
        cleanup(hook.fn.call(hook.self, row, (el) => addPill(el)));
        (_b = logger == null ? void 0 : logger.log) == null ? void 0 : _b.call(logger, "[FakeDM] chat-bar pill installed on " + (row.name || "the chat action row"));
      },
      { max: 1 }
    )
  );
  if (state.installed) return;
  const [seen] = (0, import_finders.lookupModule)(filter);
  if (seen) return;
  (_a = logger == null ? void 0 : logger.warn) == null ? void 0 : _a.call(logger, "[FakeDM] no chat action row is loaded yet; waiting for one of " + ROW_NAMES.join(", "));
  state.warnTimer = setTimeout(() => {
    state.warnTimer = null;
    if (state.installed) return;
    report == null ? void 0 : report(
      "FakeDM could not find the chat action row, so the Fake button is missing from the chat bar. Open FakeDM in settings to use the same actions."
    );
  }, 8e3);
  cleanup(() => {
    if (state.warnTimer) {
      clearTimeout(state.warnTimer);
      state.warnTimer = null;
    }
  });
}
function dispatcher() {
  const [mod] = (0, import_finders.lookupModule)((0, import_filters.withProps)("dispatch", "subscribe"));
  return mod != null ? mod : null;
}
function persistFakes(list) {
  var _a, _b;
  state.cfg.fakes = list;
  void ((_b = (_a = state.storage) == null ? void 0 : _a.set) == null ? void 0 : _b.call(_a, { fakes: list }));
}
function readFakes() {
  return Array.isArray(state.cfg.fakes) ? state.cfg.fakes : [];
}
var idCounter = 0;
function snowflake(date) {
  const ms = Math.max(0, date.getTime() - 14200704e5);
  return (BigInt(ms) << /* @__PURE__ */ BigInt("22") | BigInt(idCounter++ % 4096)).toString();
}
function author(user) {
  var _a, _b, _c, _d, _e;
  return {
    id: String(user.id),
    username: (_a = user.username) != null ? _a : "unknown",
    discriminator: (_b = user.discriminator) != null ? _b : "0",
    avatar: (_c = user.avatar) != null ? _c : null,
    global_name: (_e = (_d = user.globalName) != null ? _d : user.global_name) != null ? _e : user.username,
    bot: !!user.bot
  };
}
function injectMessage(channelId, user, content, date) {
  var _a;
  const dispatch = (_a = dispatcher()) == null ? void 0 : _a.dispatch;
  if (!dispatch || !(user == null ? void 0 : user.id)) return null;
  const jitter = state.cfg.jitterSeconds ? 1 + Math.floor(Math.random() * 59) : 0;
  const when = new Date(date.getTime() + jitter * 1e3);
  const id = snowflake(when);
  dispatch({
    type: "MESSAGE_CREATE",
    channelId,
    message: {
      attachments: [],
      components: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      author: author(user),
      channel_id: channelId,
      content: String(content != null ? content : ""),
      edited_timestamp: null,
      flags: 0,
      id,
      nonce: id,
      pinned: false,
      timestamp: when.toISOString(),
      tts: false,
      type: 0
    },
    optimistic: false,
    isPushNotification: false
  });
  persistFakes([...readFakes(), { type: "message", channelId, content, timestamp: when.toISOString(), snowflakeId: id }]);
  return id;
}
function injectReaction(channelId, messageId, userId, emoji) {
  var _a;
  const dispatch = (_a = dispatcher()) == null ? void 0 : _a.dispatch;
  if (!dispatch) return false;
  dispatch({
    type: "MESSAGE_REACTION_ADD",
    channelId,
    messageId,
    userId,
    emoji: { name: emoji }
  });
  return true;
}
function injectCall(channelId, caller, other, missed, durationSec, date) {
  var _a, _b;
  const dispatch = (_a = dispatcher()) == null ? void 0 : _a.dispatch;
  if (!dispatch || !(caller == null ? void 0 : caller.id)) return null;
  const id = snowflake(date);
  const participants = missed ? [String(caller.id)] : [String(caller.id), String((_b = other == null ? void 0 : other.id) != null ? _b : caller.id)];
  const ended = missed ? date : new Date(date.getTime() + durationSec * 1e3);
  dispatch({
    type: "MESSAGE_CREATE",
    channelId,
    message: {
      attachments: [],
      components: [],
      embeds: [],
      mentions: [],
      mention_roles: [],
      author: author(caller),
      channel_id: channelId,
      content: "",
      edited_timestamp: null,
      flags: 0,
      id,
      nonce: id,
      pinned: false,
      timestamp: date.toISOString(),
      tts: false,
      type: 3,
      call: { participants, ended_timestamp: ended.toISOString(), duration: missed ? void 0 : durationSec }
    },
    optimistic: false,
    isPushNotification: false
  });
  persistFakes([...readFakes(), { type: "call", channelId, missed, durationSec, timestamp: date.toISOString(), snowflakeId: id }]);
  return id;
}
function clearFakesInChannel(channelId, ids) {
  var _a;
  const dispatch = (_a = dispatcher()) == null ? void 0 : _a.dispatch;
  for (const id of ids) dispatch == null ? void 0 : dispatch({ type: "MESSAGE_DELETE", id, channelId });
  persistFakes(readFakes().filter((f) => !(f.channelId === channelId && ids.has(f.snowflakeId))));
}
function parseBatchScript(text, base) {
  const out = [];
  for (const raw of text.split("\n")) {
    const m = raw.trim().match(/^(?:\[[^\]]*\]\s*)?([^:]+):\s*(.*)$/);
    if (m) out.push({ senderName: m[1].trim(), content: m[2], timestamp: base });
  }
  return out;
}
function currentChannelId() {
  var _a, _b;
  const store = (0, import_finders.lookupModule)((0, import_filters.withProps)("getChannelId"))[0];
  return String((_b = (_a = store == null ? void 0 : store.getChannelId) == null ? void 0 : _a.call(store)) != null ? _b : "");
}
function quickFake(channelOverride) {
  var _a, _b, _c;
  const channelId = typeof channelOverride === "string" && channelOverride ? channelOverride : currentChannelId();
  if (!channelId) return null;
  const me = (_c = (_b = (_a = (0, import_finders.lookupModule)((0, import_filters.withProps)("getCurrentUser"))[0]) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a)) != null ? _c : { id: "" };
  return injectMessage(channelId, me, state.cfg.quickText || "hello", /* @__PURE__ */ new Date());
}
function chatButton() {
  return {
    type: "Pressable",
    props: {
      accessibilityLabel: PILL_LABEL,
      accessibilityRole: "button",
      onPress: quickFake,
      style: { height: 28, paddingHorizontal: 10, borderRadius: 14, backgroundColor: "#5865F2", justifyContent: "center" },
      children: { type: "Text", props: { style: { color: "#ffffff", fontWeight: "700" }, children: "Fake" } }
    }
  };
}
function hasPill(node) {
  var _a, _b;
  if (!node || typeof node !== "object") return false;
  if (((_a = node.props) == null ? void 0 : _a.accessibilityLabel) === PILL_LABEL) return true;
  const kids = (_b = node.props) == null ? void 0 : _b.children;
  return Array.isArray(kids) ? kids.some(hasPill) : hasPill(kids);
}
function holdsInput(node) {
  var _a, _b;
  if (!node || typeof node !== "object") return false;
  if (node.type === "TextInput" || ((_a = node.props) == null ? void 0 : _a.onChangeText)) return true;
  const kids = (_b = node.props) == null ? void 0 : _b.children;
  return Array.isArray(kids) ? kids.some(holdsInput) : holdsInput(kids);
}
function hasActionRow(node) {
  var _a;
  if (!node || typeof node !== "object" || holdsInput(node)) return false;
  const kids = (_a = node.props) == null ? void 0 : _a.children;
  const list = Array.isArray(kids) ? kids : [kids];
  return list.some((k) => {
    var _a2;
    return ((_a2 = k == null ? void 0 : k.props) == null ? void 0 : _a2.accessibilityLabel) !== void 0;
  });
}
var toArray = (kids) => Array.isArray(kids) ? kids : kids == null ? [] : [kids];
function withChild(el, kids) {
  return { ...el, props: { ...el.props, children: kids }, children: kids };
}
function addPill(el) {
  var _a, _b, _c;
  const enabled = (_c = (_b = (_a = state.storage) == null ? void 0 : _a.cache) == null ? void 0 : _b.chatButton) != null ? _c : state.cfg.chatButton;
  if (!enabled || !(el == null ? void 0 : el.props) || hasPill(el)) return el;
  const kids = toArray(el.props.children);
  const i = kids.findIndex((k) => hasActionRow(k));
  if (i >= 0) {
    const row = kids[i];
    const nextKids = kids.slice();
    nextKids[i] = withChild(row, [...toArray(row.props.children), chatButton()]);
    return withChild(el, nextKids);
  }
  if (!kids.length || holdsInput(el)) return el;
  return withChild(el, [...kids, chatButton()]);
}
function SettingsComponent({ api } = {}) {
  var _a, _b, _c, _d, _e;
  const store = (_a = api == null ? void 0 : api.jsonStorage) != null ? _a : state.storage;
  const settings = (_d = (_c = (_b = store == null ? void 0 : store.use) == null ? void 0 : _b.call(store)) != null ? _c : state.cfg) != null ? _d : DEFAULTS;
  const set = (patch) => {
    var _a2, _b2, _c2;
    return (_c2 = (_b2 = (_a2 = store == null ? void 0 : store.set) == null ? void 0 : _a2.call(store, patch)) == null ? void 0 : _b2.catch) == null ? void 0 : _c2.call(_b2, () => {
    });
  };
  const D = (_e = import_design.Design) != null ? _e : {};
  const [channelId, setChannelId] = (0, import_react.useState)("");
  const label = (text) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: text });
  const button = (text, onPress) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityRole: "button", accessibilityLabel: text, onPress, style: { paddingVertical: 8 }, children: label(text) });
  const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 12, gap: 8 }, children: [
    label("FakeDM"),
    D.TableSwitchRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableSwitchRow, { label: "Chat-bar Fake button", value: !!settings.chatButton, onValueChange: (v) => set({ chatButton: v }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Switch, { value: !!settings.chatButton, onValueChange: (v) => set({ chatButton: v }) }),
    label("Quick Fake text (chat-bar button)"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_native.TextInput,
      {
        style: { color: "#ffffff" },
        value: settings.quickText,
        onChangeText: (v) => set({ quickText: v })
      }
    ),
    label("Channel ID"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.TextInput, { style: { color: "#ffffff" }, value: channelId, onChangeText: setChannelId }),
    button("Inject fake message", () => quickFake(channelId)),
    button("Clear fakes in channel", () => clearFakesInChannel(channelId, /* @__PURE__ */ new Set())),
    button("Inject conversation", () => quickFake(channelId))
  ] });
  return D.TableRowGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "FakeDM", children: body }) : body;
}
var ROW_IMPORT_PATH = "modules/chat_input/native/action_buttons/ChatInputRightActions.tsx";
function attachRow(cleanup, row, hook, log) {
  if (!row || typeof row !== "function" && typeof row !== "object") return false;
  state.installed = true;
  if (state.warnTimer) {
    clearTimeout(state.warnTimer);
    state.warnTimer = null;
  }
  cleanup(hook.fn.call(hook.self, row, (el) => addPill(el)));
  log == null ? void 0 : log("[FakeDM] chat-bar pill installed via " + ROW_IMPORT_PATH);
  return true;
}
function installPathPill(cleanup, logger) {
  var _a, _b, _c, _d;
  const finders = PathFinders;
  const hook = resolveAfterJSX();
  if (!hook) return;
  const log = (m) => {
    var _a2;
    return (_a2 = logger == null ? void 0 : logger.log) == null ? void 0 : _a2.call(logger, m);
  };
  try {
    const sync = finders == null ? void 0 : finders.lookupModuleWithImportedPath;
    if (typeof sync === "function") {
      const [mod] = (_a = sync.call(finders, ROW_IMPORT_PATH)) != null ? _a : [];
      if (attachRow(cleanup, (_b = mod == null ? void 0 : mod.default) != null ? _b : mod, hook, log)) return;
    }
    const find = (_c = finders == null ? void 0 : finders.getModuleWithImportedPath) != null ? _c : finders == null ? void 0 : finders.getModule;
    if (typeof find !== "function") return;
    cleanup(
      find.call(finders, ROW_IMPORT_PATH, (mod) => {
        var _a2;
        attachRow(cleanup, (_a2 = mod == null ? void 0 : mod.default) != null ? _a2 : mod, hook, log);
      })
    );
  } catch (error) {
    (_d = logger == null ? void 0 : logger.error) == null ? void 0 : _d.call(logger, "[FakeDM] path-based row lookup failed", error);
  }
}
function installSettingsEntry(cleanup, logger) {
  var _a, _b;
  const settings = SettingsModules;
  const onLoaded = settings == null ? void 0 : settings.onSettingsModulesLoaded;
  const registerSection = settings == null ? void 0 : settings.registerSettingsSection;
  const registerItem = settings == null ? void 0 : settings.registerSettingsItem;
  if (typeof onLoaded !== "function" || typeof registerSection !== "function" || typeof registerItem !== "function") {
    (_a = logger == null ? void 0 : logger.warn) == null ? void 0 : _a.call(logger, "[FakeDM] this build has no settings-module API, so the FakeDM settings page is unavailable.");
    return;
  }
  try {
    const off = onLoaded(() => {
      var _a2, _b2;
      try {
        cleanup(registerSection("FAKEDM", { label: "FakeDM", settings: ["FAKEDM_MAIN"] }));
        cleanup(
          registerItem("FAKEDM_MAIN", {
            type: "route",
            title: () => "FakeDM",
            // A component this plugin owns: looking an icon up in
            // Discord's registry can hand back something that is not
            // a usable component, and that crashes the settings list.
            IconComponent: NoopIcon,
            screen: { route: "FakeDMScreen", getComponent: () => FakeScreen }
          })
        );
        (_a2 = logger == null ? void 0 : logger.log) == null ? void 0 : _a2.call(logger, "[FakeDM] settings entry registered");
      } catch (error) {
        (_b2 = logger == null ? void 0 : logger.error) == null ? void 0 : _b2.call(logger, "[FakeDM] could not register its settings entry", error);
      }
    });
    if (typeof off === "function") cleanup(off);
  } catch (error) {
    (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, "[FakeDM] settings registration failed", error);
  }
}
function NoopIcon() {
  return null;
}
function FakeScreen(props) {
  try {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsComponent, { ...props });
  } catch (error) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", padding: 16 }, children: "FakeDM settings failed to render." });
  }
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  // Nothing here may throw: an exception escaping start is what turns a
  // plugin bug into a client crash, so every step is sealed on its own and
  // a failure is reported to the log instead.
  start({ cleanup, jsonStorage, logger, plugin: plugin2 }) {
    var _a, _b, _c, _d, _e, _f;
    const report = (message) => {
      var _a2, _b2, _c2;
      try {
        (_a2 = plugin2 == null ? void 0 : plugin2.reportError) == null ? void 0 : _a2.call(plugin2, message);
      } catch (error) {
        (_b2 = logger == null ? void 0 : logger.error) == null ? void 0 : _b2.call(logger, "[FakeDM]", error);
      }
      (_c2 = logger == null ? void 0 : logger.warn) == null ? void 0 : _c2.call(logger, "[FakeDM] " + message);
    };
    if ((plugin2 == null ? void 0 : plugin2.startedLate) && typeof plugin2.requireReload === "function") {
      try {
        plugin2.requireReload();
      } catch (error) {
        (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "[FakeDM] could not request a reload", error);
      }
    }
    try {
      state.storage = jsonStorage;
      state.cfg = { ...DEFAULTS, ...(_b = jsonStorage == null ? void 0 : jsonStorage.cache) != null ? _b : {} };
      state.installed = false;
      cleanup(() => {
        state.installed = false;
      });
    } catch (error) {
      (_c = logger == null ? void 0 : logger.error) == null ? void 0 : _c.call(logger, "[FakeDM] storage setup failed", error);
    }
    try {
      installPill(cleanup, logger, report);
    } catch (error) {
      (_d = logger == null ? void 0 : logger.error) == null ? void 0 : _d.call(logger, "[FakeDM] chat-bar pill setup failed", error);
    }
    try {
      installPathPill(cleanup, logger);
    } catch (error) {
      (_e = logger == null ? void 0 : logger.error) == null ? void 0 : _e.call(logger, "[FakeDM] path-based pill setup failed", error);
    }
    try {
      installSettingsEntry(cleanup, logger);
    } catch (error) {
      (_f = logger == null ? void 0 : logger.error) == null ? void 0 : _f.call(logger, "[FakeDM] settings entry setup failed", error);
    }
  },
  SettingsComponent,
  __engine: { injectMessage, injectReaction, injectCall, clearFakesInChannel, parseBatchScript }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()