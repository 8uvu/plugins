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
var import_finders = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get lookupModule() { return __g().lookupModule }, get lookupModules() { return __g().lookupModules }, get getModules() { return __g().getModules }, get waitForModules() { return __g().waitForModules } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get withProps() { return __g().withProps }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withName() { return __g().withName }, get withDependencies() { return __g().withDependencies }, get anyOf() { return __g().anyOf }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get createFilterGenerator() { return __g().createFilterGenerator }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var SettingsModules = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.modules && valenced.discord.modules.settings) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onSettingsModulesLoaded() { return __g().onSettingsModulesLoaded }, get registerSettingsSection() { return __g().registerSettingsSection }, get registerSettingsItem() { return __g().registerSettingsItem } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var PathFinders = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.utils && valenced.discord.utils.modules && valenced.discord.utils.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get getModuleWithImportedPath() { return __g().getModuleWithImportedPath }, get getModule() { return __g().getModule }, get getModulesWithImportedPath() { return __g().getModulesWithImportedPath }, get findModuleWithImportedPath() { return __g().findModuleWithImportedPath } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var import_patcher = (function () { const __g = () => { try { return (valenced.patcher) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get after() { return __g().after }, get before() { return __g().before }, get instead() { return __g().instead } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get createElement() { return __g().createElement }, get isValidElement() { return __g().isValidElement }, get useState() { return __g().useState }, get cloneElement() { return __g().cloneElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Text() { return __g().Text }, get Pressable() { return __g().Pressable }, get View() { return __g().View }, get TextInput() { return __g().TextInput }, get ScrollView() { return __g().ScrollView }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Appearance() { return __g().Appearance }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsx() { return __g().jsx }, get jsxs() { return __g().jsxs }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULTS = {
  text: "hello",
  asThem: true,
  button: true,
  fakes: []
};
var BUTTON_PATH = "modules/chat_input/native/action_buttons/ChatInputActionButton.tsx";
var INPUT_PATH = "modules/chat_input/native/ChatInput.tsx";
var state = {
  cfg: { ...DEFAULTS },
  storage: null,
  actionButton: null
};
var seq = 0;
function find(...props) {
  var _a;
  try {
    return (_a = (0, import_finders.lookupModule)((0, import_filters.withProps)(...props))[0]) != null ? _a : null;
  } catch {
    return null;
  }
}
function flux() {
  return find("dispatch", "subscribe");
}
function me() {
  var _a, _b, _c;
  try {
    return (_c = (_b = (_a = find("getCurrentUser")) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a)) != null ? _c : null;
  } catch {
    return null;
  }
}
function openChat() {
  var _a, _b, _c, _d, _e, _f;
  try {
    const id = String((_c = (_b = (_a = find("getChannelId")) == null ? void 0 : _a.getChannelId) == null ? void 0 : _b.call(_a)) != null ? _c : "");
    if (!id) return null;
    const channel = (_f = (_e = (_d = find("getChannel")) == null ? void 0 : _d.getChannel) == null ? void 0 : _e.call(_d, id)) != null ? _f : null;
    const others = Array.isArray(channel == null ? void 0 : channel.recipients) ? channel.recipients : [];
    const label = typeof (channel == null ? void 0 : channel.name) === "string" && channel.name || others.map((u) => (u == null ? void 0 : u.globalName) || (u == null ? void 0 : u.username) || (u == null ? void 0 : u.id)).filter(Boolean).join(", ") || "this chat";
    return { id, label, others };
  } catch {
    return null;
  }
}
function sender(chat) {
  var _a;
  const mine = me();
  return state.cfg.asThem ? (_a = chat.others[0]) != null ? _a : mine : mine;
}
function snowflake() {
  const ms = BigInt(Math.max(0, Date.now() - 14200704e5));
  return (ms << /* @__PURE__ */ BigInt("22") | BigInt(seq++ % 4096)).toString();
}
function author(user) {
  var _a, _b, _c, _d, _e, _f;
  return {
    id: String((_a = user == null ? void 0 : user.id) != null ? _a : ""),
    username: (_b = user == null ? void 0 : user.username) != null ? _b : "unknown",
    discriminator: (_c = user == null ? void 0 : user.discriminator) != null ? _c : "0",
    avatar: (_d = user == null ? void 0 : user.avatar) != null ? _d : null,
    global_name: (_f = (_e = user == null ? void 0 : user.globalName) != null ? _e : user == null ? void 0 : user.username) != null ? _f : "unknown",
    bot: !!(user == null ? void 0 : user.bot)
  };
}
function saveFakes(list) {
  var _a, _b, _c, _d;
  state.cfg = { ...state.cfg, fakes: list };
  try {
    void ((_d = (_c = (_b = (_a = state.storage) == null ? void 0 : _a.set) == null ? void 0 : _b.call(_a, { fakes: list })) == null ? void 0 : _c.catch) == null ? void 0 : _d.call(_c, () => {
    }));
  } catch {
  }
}
function fakes() {
  const list = state.cfg.fakes;
  return Array.isArray(list) ? list.filter((f) => f && f.channelId && f.id) : [];
}
function fakeMessage(channelId, user, content) {
  var _a;
  const dispatch = (_a = flux()) == null ? void 0 : _a.dispatch;
  if (!dispatch || !channelId || !(user == null ? void 0 : user.id)) return null;
  const id = snowflake();
  const message = {
    attachments: [],
    components: [],
    embeds: [],
    mention_roles: [],
    mentions: [],
    author: author(user),
    channel_id: channelId,
    content: String(content != null ? content : "").slice(0, 2e3),
    edited_timestamp: null,
    flags: 0,
    id,
    nonce: id,
    pinned: false,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    tts: false,
    type: 0
  };
  dispatch({ type: "MESSAGE_CREATE", channelId, message, optimistic: false, isPushNotification: false });
  saveFakes([...fakes(), { channelId, id }]);
  return id;
}
function fakeCall(channelId, caller, other, seconds = 90, missed = false) {
  var _a, _b;
  const dispatch = (_a = flux()) == null ? void 0 : _a.dispatch;
  if (!dispatch || !channelId || !(caller == null ? void 0 : caller.id)) return null;
  const id = snowflake();
  const now = Date.now();
  const participants = missed ? [String(caller.id)] : [String(caller.id), String((_b = other == null ? void 0 : other.id) != null ? _b : "")].filter(Boolean);
  const message = {
    attachments: [],
    components: [],
    embeds: [],
    mention_roles: [],
    mentions: [],
    author: author(caller),
    channel_id: channelId,
    content: "",
    edited_timestamp: null,
    flags: 0,
    id,
    nonce: id,
    pinned: false,
    timestamp: new Date(now).toISOString(),
    tts: false,
    type: 3,
    call: {
      participants,
      ended_timestamp: new Date(now + (missed ? 0 : seconds * 1e3)).toISOString(),
      duration: missed ? void 0 : seconds
    }
  };
  dispatch({ type: "MESSAGE_CREATE", channelId, message, optimistic: false, isPushNotification: false });
  saveFakes([...fakes(), { channelId, id }]);
  return id;
}
function clear(channelId) {
  var _a;
  if (!channelId) return 0;
  const dispatch = (_a = flux()) == null ? void 0 : _a.dispatch;
  const keep = [];
  let removed = 0;
  for (const f of fakes()) {
    if (f.channelId !== channelId) {
      keep.push(f);
      continue;
    }
    try {
      dispatch == null ? void 0 : dispatch({ type: "MESSAGE_DELETE", channelId, id: f.id });
      removed++;
    } catch {
    }
  }
  saveFakes(keep);
  return removed;
}
function fake() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  const user = sender(chat);
  if (!(user == null ? void 0 : user.id)) return "No one to send as yet.";
  return fakeMessage(chat.id, user, state.cfg.text) ? "Sent a fake message." : "Discord is not ready yet.";
}
function fakeCallNow() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  return fakeCall(chat.id, sender(chat), me(), 90) ? "Sent a fake call." : "Discord is not ready yet.";
}
function clearNow() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  const removed = clear(chat.id);
  return removed ? "Removed " + removed + " fake(s)." : "No fakes in this chat.";
}
function FakeIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { fontSize: 16 }, children: "\u{1F3AD}" });
}
function FakeButton() {
  const Button = state.actionButton;
  if (!Button) return null;
  return (0, import_react.createElement)(Button, {
    accessibilityLabel: "FakeDM",
    IconComponent: FakeIcon,
    onPress: () => {
      try {
        fake();
      } catch {
      }
    }
  });
}
var hasExpression = (node) => {
  var _a;
  return (0, import_react.isValidElement)(node) && !!((_a = node.props) == null ? void 0 : _a.onPressExpression);
};
var hasKey = (node) => (0, import_react.isValidElement)(node) && node.key === "fakedm";
function isButtonGroup(node) {
  var _a, _b;
  if (!(0, import_react.isValidElement)(node)) return false;
  const kids = (_a = node.props) == null ? void 0 : _a.children;
  if (hasExpression(kids)) return true;
  if (!(0, import_react.isValidElement)(kids)) return false;
  const inner = (_b = kids.props) == null ? void 0 : _b.children;
  return Array.isArray(inner) ? inner.some(hasExpression) : hasExpression(inner);
}
function addButton(node, button) {
  if (!button || !(0, import_react.isValidElement)(node)) return node;
  const { children } = node.props;
  const list = Array.isArray(children) ? children : [children];
  if (list.some(hasKey)) return node;
  const at = list.findIndex(isButtonGroup);
  if (at !== -1) {
    const next = [...list];
    next.splice(at, 0, button);
    return { ...node, props: { ...node.props, children: next } };
  }
  for (let i = 0; i < list.length; i++) {
    const child = list[i];
    const patched = addButton(child, button);
    if (patched === child) continue;
    const next = [...list];
    next[i] = patched;
    return {
      ...node,
      props: { ...node.props, children: Array.isArray(children) ? next : patched }
    };
  }
  return node;
}
function patchChatInput(cleanup, logger) {
  var _a, _b, _c;
  const finders = PathFinders;
  const get = finders == null ? void 0 : finders.getModuleWithImportedPath;
  if (typeof get !== "function") {
    (_a = logger == null ? void 0 : logger.warn) == null ? void 0 : _a.call(logger, "[FakeDM] this build has no import-path lookup, so no chat button.");
    return;
  }
  try {
    const off = get.call(finders, BUTTON_PATH, (mod) => {
      var _a2, _b2;
      state.actionButton = (_b2 = (_a2 = mod == null ? void 0 : mod.default) != null ? _a2 : mod) != null ? _b2 : null;
    });
    if (typeof off === "function") cleanup(off);
  } catch (error) {
    (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, "[FakeDM] could not find Discord's chat button component", error);
  }
  try {
    const off = get.call(finders, INPUT_PATH, (mod) => {
      var _a2, _b2, _c2;
      const ChatInput = (_a2 = mod == null ? void 0 : mod.default) != null ? _a2 : mod;
      if (!ChatInput || typeof ChatInput.type !== "function") {
        (_b2 = logger == null ? void 0 : logger.warn) == null ? void 0 : _b2.call(logger, "[FakeDM] the chat input has no render function to patch.");
        return;
      }
      try {
        cleanup(
          (0, import_patcher.after)(ChatInput, "type", (...params) => {
            var _a3;
            const rendered = params.find((value) => (0, import_react.isValidElement)(value));
            const result = (_a3 = rendered != null ? rendered : params[1]) != null ? _a3 : params[0];
            if (state.cfg.button === false) return result;
            return addButton(result, (0, import_react.createElement)(FakeButton, { key: "fakedm" }));
          })
        );
      } catch (error) {
        (_c2 = logger == null ? void 0 : logger.error) == null ? void 0 : _c2.call(logger, "[FakeDM] could not patch the chat input", error);
      }
    });
    if (typeof off === "function") cleanup(off);
  } catch (error) {
    (_c = logger == null ? void 0 : logger.error) == null ? void 0 : _c.call(logger, "[FakeDM] could not reach the chat input", error);
  }
}
function SettingsComponent({ api } = {}) {
  var _a, _b, _c;
  const [, bump] = (0, import_react.useState)(0);
  const [status, setStatus] = (0, import_react.useState)("");
  const settings = (_a = state.cfg) != null ? _a : DEFAULTS;
  const store = (_b = api == null ? void 0 : api.jsonStorage) != null ? _b : state.storage;
  const set = (patch) => {
    var _a2, _b2, _c2;
    state.cfg = { ...state.cfg, ...patch };
    try {
      void ((_c2 = (_b2 = (_a2 = store == null ? void 0 : store.set) == null ? void 0 : _a2.call(store, patch)) == null ? void 0 : _b2.catch) == null ? void 0 : _c2.call(_b2, () => {
      }));
    } catch {
    }
    bump((n) => n + 1);
  };
  const run = (fn) => {
    var _a2;
    try {
      setStatus(fn());
    } catch (error) {
      setStatus("Failed: " + ((_a2 = error == null ? void 0 : error.message) != null ? _a2 : "unknown error"));
    }
  };
  let chat = null;
  try {
    chat = openChat();
  } catch {
  }
  const action = (label, onPress) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_native.Pressable,
    {
      accessibilityRole: "button",
      accessibilityLabel: label,
      onPress: () => {
        try {
          onPress();
        } catch {
        }
      },
      style: { paddingVertical: 10 },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#00a8fc", fontWeight: "600" }, children: label })
    }
  );
  const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { gap: 10 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", opacity: 0.7 }, children: chat ? "Chat: " + chat.label : "Open a DM or group DM first, then come back here." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_native.TextInput,
      {
        value: settings.text,
        onChangeText: (value) => set({ text: value }),
        placeholder: "Message text",
        placeholderTextColor: "#888",
        style: { color: "#ffffff", borderWidth: 1, borderColor: "#555", borderRadius: 8, padding: 8 }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_native.Pressable,
      {
        accessibilityRole: "button",
        accessibilityLabel: "Choose sender",
        onPress: () => set({ asThem: !settings.asThem }),
        style: { paddingVertical: 10 },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "600" }, children: [
          "Sender: ",
          settings.asThem ? "the other person" : "you"
        ] })
      }
    ),
    action("Fake message", () => run(fake)),
    action("Fake call", () => run(fakeCallNow)),
    action("Clear fakes in this chat", () => run(clearNow)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_native.Pressable,
      {
        accessibilityRole: "button",
        accessibilityLabel: "Fake button in chat bar",
        onPress: () => {
          set({ button: settings.button === false });
          setStatus("Reload FakeDM to apply.");
        },
        style: { paddingVertical: 10 },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "600" }, children: [
          "Fake button in chat bar: ",
          settings.button === false ? "off" : "on"
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", opacity: 0.7 }, children: status })
  ] });
  const Group = (_c = import_design.Design) == null ? void 0 : _c.TableRowGroup;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { contentContainerStyle: { padding: 16 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontSize: 16, fontWeight: "700" }, children: "FakeDM" }),
    Group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title: "FakeDM", children: content }) : content
  ] });
}
function FakeScreen(props) {
  try {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsComponent, { ...props });
  } catch {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { padding: 16 }, children: "FakeDM could not draw its settings." });
  }
}
function NoopIcon() {
  return null;
}
function installSettingsEntry(cleanup, logger) {
  var _a, _b;
  const settings = SettingsModules;
  const onLoaded = settings == null ? void 0 : settings.onSettingsModulesLoaded;
  const section = settings == null ? void 0 : settings.registerSettingsSection;
  const item = settings == null ? void 0 : settings.registerSettingsItem;
  if (typeof onLoaded !== "function" || typeof section !== "function" || typeof item !== "function") {
    (_a = logger == null ? void 0 : logger.warn) == null ? void 0 : _a.call(logger, "[FakeDM] this build has no settings API.");
    return;
  }
  try {
    const off = onLoaded(() => {
      var _a2;
      try {
        cleanup(section("FAKEDM", { label: "FakeDM", settings: ["FAKEDM_MAIN"] }));
        cleanup(
          item("FAKEDM_MAIN", {
            type: "route",
            title: () => "FakeDM",
            IconComponent: NoopIcon,
            screen: { route: "FakeDMScreen", getComponent: () => FakeScreen }
          })
        );
      } catch (error) {
        (_a2 = logger == null ? void 0 : logger.error) == null ? void 0 : _a2.call(logger, "[FakeDM] could not register its settings entry", error);
      }
    });
    if (typeof off === "function") cleanup(off);
  } catch (error) {
    (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, "[FakeDM] settings registration failed", error);
  }
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  // Nothing in here may throw: an exception escaping start is what turns a
  // plugin bug into a client crash, so each step is sealed on its own.
  start(api) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      state.storage = (_a = api == null ? void 0 : api.jsonStorage) != null ? _a : null;
      const cached = (_c = (_b = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _b.cache) != null ? _c : {};
      state.cfg = { ...DEFAULTS, ...cached };
      if (!Array.isArray(state.cfg.fakes)) state.cfg.fakes = [];
    } catch {
    }
    try {
      patchChatInput(api == null ? void 0 : api.cleanup, api == null ? void 0 : api.logger);
    } catch (error) {
      (_e = (_d = api == null ? void 0 : api.logger) == null ? void 0 : _d.error) == null ? void 0 : _e.call(_d, "[FakeDM] chat bar button skipped", error);
    }
    try {
      installSettingsEntry(api == null ? void 0 : api.cleanup, api == null ? void 0 : api.logger);
    } catch (error) {
      (_g = (_f = api == null ? void 0 : api.logger) == null ? void 0 : _f.error) == null ? void 0 : _g.call(_f, "[FakeDM] settings entry skipped", error);
    }
  },
  SettingsComponent,
  __engine: { fakeMessage, fakeCall, clear, openChat, addButton }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()