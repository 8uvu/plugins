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
var PathFinders = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.utils && valenced.discord.utils.modules && valenced.discord.utils.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get lookupModuleWithImportedPath() { return __g().lookupModuleWithImportedPath }, get getModuleWithImportedPath() { return __g().getModuleWithImportedPath }, get getModule() { return __g().getModule }, get getModulesWithImportedPath() { return __g().getModulesWithImportedPath }, get findModuleWithImportedPath() { return __g().findModuleWithImportedPath } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var Metro = __toESM((function () { const __g = () => { try { return (valenced.modules && valenced.modules.metro) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onModuleInitialized() { return __g().onModuleInitialized }, get onAnyModuleInitialized() { return __g().onAnyModuleInitialized }, get onModuleFirstRequired() { return __g().onModuleFirstRequired }, get onAnyModuleFirstRequired() { return __g().onAnyModuleFirstRequired } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var import_patcher = (function () { const __g = () => { try { return (valenced.patcher) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get after() { return __g().after }, get before() { return __g().before }, get instead() { return __g().instead } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get createElement() { return __g().createElement }, get isValidElement() { return __g().isValidElement }, get useState() { return __g().useState }, get cloneElement() { return __g().cloneElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Text() { return __g().Text }, get View() { return __g().View }, get Pressable() { return __g().Pressable }, get TextInput() { return __g().TextInput }, get ScrollView() { return __g().ScrollView }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Appearance() { return __g().Appearance }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsx() { return __g().jsx }, get jsxs() { return __g().jsxs }, get Fragment() { return __g().Fragment }, get jsxDEV() { return __g().jsxDEV } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULTS = {
  text: "hello",
  // Who the next fake is from. Empty means "the other person in this chat".
  senderId: "",
  batch: "",
  asThem: true,
  // A picture on the fake message: any URL Discord can load.
  imageUrl: "",
  // Reply to a message that is already in the chat.
  replyId: "",
  // A link embed under the message.
  embedTitle: "",
  embedDesc: "",
  embedImage: "",
  // Call settings.
  callSeconds: "90",
  callMissed: false,
  // System message settings.
  systemType: 7,
  systemText: "",
  // Reaction settings.
  reactId: "",
  reactEmoji: "\u{1F44D}",
  // The chat bar button. Installs that have never touched the switch get it
  // switched on once (see barDefault below), so the plugin shows up in the
  // composer without anyone hunting for a setting; after that the user wins.
  button: false,
  // Marks that the one-time switch-on has happened.
  barDefault: 0,
  // Also off until asked for: adding a row to Discord's own settings list is
  // what made opening normal Settings crash on 352.6, so the plugin page in
  // the Valenced plugin list is the entry that is always used.
  section: false,
  fakes: []
};
var BUTTON_PATH = "modules/chat_input/native/action_buttons/ChatInputActionButton.tsx";
var INPUT_PATH = "modules/chat_input/native/ChatInput.tsx";
var SYSTEM_TYPES = [
  { value: 1, label: "Added someone" },
  { value: 2, label: "Removed someone" },
  { value: 4, label: "Changed the chat name" },
  { value: 5, label: "Changed the chat icon" },
  { value: 6, label: "Pinned a message" },
  { value: 7, label: "New member joined" },
  { value: 8, label: "Server boosted" }
];
var state = {
  cfg: { ...DEFAULTS },
  storage: null,
  actionButton: null,
  button: null,
  patched: false
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
function resolvePerson(chat, name) {
  const wanted = String(name != null ? name : "").trim().toLowerCase();
  if (!wanted) return null;
  const mine = me();
  if (wanted === "me" || wanted === "you" || mine && wanted === String(mine.id).toLowerCase()) return mine;
  for (const user of chat.others) {
    if (!user) continue;
    const names = [user.id, user.username, user.globalName].filter(Boolean).map((v) => String(v).toLowerCase());
    if (names.includes(wanted)) return user;
  }
  return null;
}
function sender(chat) {
  var _a;
  const mine = me();
  if (state.cfg.senderId) {
    const picked = resolvePerson(chat, state.cfg.senderId);
    if (picked) return picked;
  }
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
function remember(channelId, id) {
  saveFakes([...fakes(), { channelId, id }]);
}
function fakeMessage(channelId, user, content, when, extras = {}) {
  var _a, _b, _c, _d, _e;
  const dispatch = (_a = flux()) == null ? void 0 : _a.dispatch;
  if (!dispatch || !channelId || !(user == null ? void 0 : user.id)) return null;
  const id = snowflake();
  const url = String((_b = extras.imageUrl) != null ? _b : "").trim();
  const attachments = url ? [
    {
      id: "1",
      filename: "image.png",
      size: 0,
      url,
      proxy_url: url,
      width: 800,
      height: 600,
      content_type: "image/png"
    }
  ] : [];
  const message = {
    attachments,
    components: [],
    embeds: Array.isArray(extras.embeds) ? extras.embeds : [],
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
    timestamp: new Date(when != null ? when : Date.now()).toISOString(),
    tts: false,
    type: (_c = extras.systemType) != null ? _c : 0
  };
  if (extras.replyToId) {
    message.message_reference = { channel_id: channelId, message_id: String(extras.replyToId) };
    message.referenced_message = {
      id: String(extras.replyToId),
      channel_id: channelId,
      content: String((_d = extras.replyToContent) != null ? _d : ""),
      author: author((_e = extras.replyToAuthor) != null ? _e : user),
      type: 0
    };
  }
  dispatch({ type: "MESSAGE_CREATE", channelId, message, optimistic: false, isPushNotification: false });
  remember(channelId, id);
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
  remember(channelId, id);
  return id;
}
function fakeSystem(channelId, user, type, content) {
  return fakeMessage(channelId, user, content, void 0, { systemType: Number(type) || 7 });
}
function fakeReaction(channelId, messageId, userId, emoji) {
  var _a;
  const dispatch = (_a = flux()) == null ? void 0 : _a.dispatch;
  const target = String(messageId != null ? messageId : "").trim();
  const who = String(userId != null ? userId : "").trim();
  const name = String(emoji != null ? emoji : "").trim();
  if (!dispatch || !channelId || !target || !who || !name) return false;
  dispatch({
    type: "MESSAGE_REACTION_ADD",
    channelId,
    messageId: target,
    userId: who,
    emoji: { name, id: null, animated: false }
  });
  return true;
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
function embedFromConfig() {
  const { embedTitle, embedDesc, embedImage } = state.cfg;
  if (!embedTitle && !embedDesc && !embedImage) return [];
  const embed = {};
  if (embedTitle) embed.title = embedTitle;
  if (embedDesc) embed.description = embedDesc;
  if (embedImage) {
    embed.image = { url: embedImage, proxy_url: embedImage };
  }
  return [embed];
}
function fake() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  const user = sender(chat);
  if (!(user == null ? void 0 : user.id)) return "No one to send as yet.";
  return fakeMessage(chat.id, user, state.cfg.text) ? "Sent a fake message." : "Discord is not ready yet.";
}
function fakeFromPanel() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  const user = sender(chat);
  if (!(user == null ? void 0 : user.id)) return "No one to send as yet.";
  const id = fakeMessage(chat.id, user, state.cfg.text, void 0, {
    imageUrl: state.cfg.imageUrl,
    embeds: embedFromConfig(),
    replyToId: state.cfg.replyId,
    replyToContent: "a message in this chat",
    replyToAuthor: user
  });
  return id ? "Sent as " + (user.globalName || user.username || "them") + "." : "Discord is not ready yet.";
}
function fakeCallNow() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  const seconds = Math.max(0, Math.round(Number(state.cfg.callSeconds) || 0));
  const missed = !!state.cfg.callMissed;
  return fakeCall(chat.id, sender(chat), me(), missed ? 0 : seconds, missed) ? missed ? "Sent a missed call." : "Sent a fake call." : "Discord is not ready yet.";
}
function fakeMissedNow() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  return fakeCall(chat.id, sender(chat), me(), 0, true) ? "Sent a missed call." : "Discord is not ready yet.";
}
function fakeSystemNow() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  const user = sender(chat);
  if (!(user == null ? void 0 : user.id)) return "No one to send as yet.";
  const id = fakeSystem(chat.id, user, Number(state.cfg.systemType), state.cfg.systemText);
  return id ? "Sent a system message." : "Discord is not ready yet.";
}
function fakeReactionNow() {
  var _a, _b, _c;
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  if (!String((_a = state.cfg.reactId) != null ? _a : "").trim()) return "Paste the id of a message first.";
  const ok = fakeReaction(chat.id, state.cfg.reactId, String((_c = (_b = sender(chat)) == null ? void 0 : _b.id) != null ? _c : ""), state.cfg.reactEmoji);
  return ok ? "Added a fake reaction." : "Discord is not ready yet.";
}
function parseBatch(text) {
  const out = [];
  for (const raw of String(text != null ? text : "").split("\n")) {
    let line = raw.trim();
    if (!line) continue;
    let time;
    const clock = line.match(/^\[(\d{1,2}):(\d{2})\]\s*/);
    if (clock) {
      const when = /* @__PURE__ */ new Date();
      when.setHours(Math.min(23, Number(clock[1])), Math.min(59, Number(clock[2])), 0, 0);
      time = when.getTime();
      line = line.slice(clock[0].length).trim();
    }
    if (!line) continue;
    const match = line.match(/^([^:]{1,40}):\s*(.+)$/);
    if (match) out.push({ name: match[1].trim(), content: match[2], time });
    else out.push({ name: "", content: line, time });
  }
  return out;
}
function fakeBatch() {
  var _a, _b;
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  const lines = parseBatch(state.cfg.batch);
  if (!lines.length) return "Nothing to send: put one message per line.";
  const fallback = sender(chat);
  let sent = 0;
  let clock = Date.now();
  for (const line of lines) {
    const who = (_a = resolvePerson(chat, line.name)) != null ? _a : fallback;
    if (!(who == null ? void 0 : who.id)) continue;
    const when = (_b = line.time) != null ? _b : clock;
    if (fakeMessage(chat.id, who, line.content, when)) sent++;
    clock = when + 3e4 + Math.floor(Math.random() * 9e4);
  }
  return sent ? "Sent " + sent + " fake message(s)." : "Nothing sent: no sender available.";
}
function clearNow() {
  const chat = openChat();
  if (!chat) return "Open a chat first.";
  const removed = clear(chat.id);
  return removed ? "Removed " + removed + " fake(s)." : "No fakes in this chat.";
}
function FakeIcon() {
  try {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { fontSize: 16 }, children: "\u{1F3AD}" });
  } catch {
    return null;
  }
}
function buildButton() {
  if (!state.actionButton || typeof import_react.createElement !== "function") return null;
  try {
    return (0, import_react.createElement)(state.actionButton, {
      accessibilityLabel: "FakeDM",
      IconComponent: FakeIcon,
      onPress: () => {
        try {
          fake();
        } catch {
        }
      }
    });
  } catch {
    return null;
  }
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
  let last = -1;
  list.forEach((child, index) => {
    if (hasExpression(child)) last = index;
  });
  if (last !== -1) {
    const next = [...list];
    next.splice(last + 1, 0, button);
    return { ...node, props: { ...node.props, children: next } };
  }
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
function tryAttach(cleanup, logger) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  if (state.patched) return true;
  const finders = PathFinders;
  if (!state.actionButton) {
    try {
      const [mod] = (_b = (_a = finders == null ? void 0 : finders.lookupModuleWithImportedPath) == null ? void 0 : _a.call(finders, BUTTON_PATH)) != null ? _b : [];
      state.actionButton = (_d = (_c = mod == null ? void 0 : mod.default) != null ? _c : mod) != null ? _d : null;
      if (state.actionButton) state.button = buildButton();
    } catch {
    }
  }
  let ChatInput = null;
  try {
    const [mod] = (_f = (_e = finders == null ? void 0 : finders.lookupModuleWithImportedPath) == null ? void 0 : _e.call(finders, INPUT_PATH)) != null ? _f : [];
    ChatInput = (_h = (_g = mod == null ? void 0 : mod.default) != null ? _g : mod) != null ? _h : null;
  } catch {
  }
  if (!ChatInput || typeof ChatInput.type !== "function") return false;
  try {
    cleanup(
      (0, import_patcher.after)(ChatInput, "type", (...params) => {
        var _a2, _b2, _c2;
        let result = (_a2 = params[1]) != null ? _a2 : params[0];
        try {
          const rendered = params.find((value) => {
            var _a3;
            return (_a3 = import_react.isValidElement) == null ? void 0 : _a3(value);
          });
          if (rendered) result = rendered;
          if (state.cfg.button === false) return result;
          const button = (_b2 = state.button) != null ? _b2 : state.button = buildButton();
          if (!button) return result;
          return addButton(result, button);
        } catch (error) {
          (_c2 = logger == null ? void 0 : logger.warn) == null ? void 0 : _c2.call(logger, "[FakeDM] chat button skipped this render", error);
          return result;
        }
      })
    );
    state.patched = true;
    (_i = logger == null ? void 0 : logger.log) == null ? void 0 : _i.call(logger, "[FakeDM] chat button installed; open a chat to see it.");
    return true;
  } catch (error) {
    (_j = logger == null ? void 0 : logger.error) == null ? void 0 : _j.call(logger, "[FakeDM] could not patch the chat input", error);
    return false;
  }
}
function patchChatInput(cleanup, logger) {
  var _a, _b, _c;
  if (state.cfg.button === false) {
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[FakeDM] chat bar button is off; the chat input is left alone.");
    return;
  }
  if (tryAttach(cleanup, logger)) return;
  const watch = (_b = Metro == null ? void 0 : Metro.onAnyModuleInitialized) != null ? _b : Metro == null ? void 0 : Metro.onAnyModuleFirstRequired;
  if (typeof watch === "function") {
    try {
      let tries = 0;
      const off = watch(() => {
        if (state.patched) {
          try {
            off == null ? void 0 : off();
          } catch {
          }
          return;
        }
        if (++tries > 500) {
          try {
            off == null ? void 0 : off();
          } catch {
          }
          return;
        }
        tryAttach(cleanup, logger);
      });
      if (typeof off === "function") cleanup(off);
      return;
    } catch (error) {
      (_c = logger == null ? void 0 : logger.warn) == null ? void 0 : _c.call(logger, "[FakeDM] module watch unavailable", error);
    }
  }
  let left = 40;
  const timer = setInterval(() => {
    if (state.patched || --left <= 0) {
      clearInterval(timer);
      return;
    }
    tryAttach(cleanup, logger);
  }, 1500);
  cleanup(() => clearInterval(timer));
}
var white = "#ffffff";
var muted = "#b5bac1";
var blue = "#5865F2";
function Panel({ api } = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const [, bump] = (0, import_react.useState)(0);
  const [status, setStatus] = (0, import_react.useState)("");
  const settings = (_a = state.cfg) != null ? _a : DEFAULTS;
  const store = (_b = api == null ? void 0 : api.jsonStorage) != null ? _b : state.storage;
  const D = (_c = import_design.Design) != null ? _c : {};
  const Row = D.TableRow;
  const Group = D.TableRowGroup;
  const SwitchRow = D.TableSwitchRow;
  const Radio = D.FormRadio;
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
  const mine = (() => {
    try {
      return me();
    } catch {
      return null;
    }
  })();
  const people = [];
  for (const user of (_d = chat == null ? void 0 : chat.others) != null ? _d : []) {
    if (user == null ? void 0 : user.id) people.push({ id: String(user.id), name: user.globalName || user.username || String(user.id) });
  }
  if (mine == null ? void 0 : mine.id) people.push({ id: String(mine.id), name: "You" });
  const fallback = settings.asThem ? (_e = people[0]) == null ? void 0 : _e.id : String((_h = (_g = mine == null ? void 0 : mine.id) != null ? _g : (_f = people[0]) == null ? void 0 : _f.id) != null ? _h : "");
  const chosen = settings.senderId || fallback || "";
  const senderName = (_j = (_i = people.find((p) => p.id === chosen)) == null ? void 0 : _i.name) != null ? _j : "nobody";
  const on = settings.button !== false;
  const heading = (title) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_native.Text,
    {
      style: {
        color: muted,
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 0.4,
        marginTop: 18,
        marginBottom: 8,
        textTransform: "uppercase"
      },
      children: title
    }
  );
  const hint = (text) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: muted, fontSize: 12, marginBottom: 6 }, children: text });
  const card = (children) => Group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { children }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.View, { style: { backgroundColor: "#1e1f22", borderRadius: 12, padding: 12, gap: 8 }, children });
  const row = (label, subLabel, onPress, trailing) => Row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label, subLabel, onPress, trailing }, label) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_native.Pressable,
    {
      accessibilityRole: "button",
      accessibilityLabel: label,
      onPress: () => {
        try {
          onPress == null ? void 0 : onPress();
        } catch {
        }
      },
      style: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#2b2d31" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: white, fontWeight: "600" }, children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: muted, fontSize: 12 }, children: subLabel })
      ]
    },
    label
  );
  const button = (label, onPress, primary = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      style: {
        backgroundColor: primary ? blue : "#2b2d31",
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 6
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: white, fontWeight: "700" }, children: label })
    }
  );
  const field = (key, placeholder, multiline = false, extra = {}) => {
    var _a2;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_native.TextInput,
      {
        value: String((_a2 = settings[key]) != null ? _a2 : ""),
        onChangeText: (value) => set({ [key]: value }),
        placeholder,
        placeholderTextColor: "#888",
        multiline,
        style: {
          color: white,
          backgroundColor: "#2b2d31",
          borderRadius: 8,
          padding: 8,
          minHeight: multiline ? 90 : 0,
          textAlignVertical: multiline ? "top" : "center",
          ...extra
        }
      }
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { contentContainerStyle: { padding: 16, paddingBottom: 64 }, children: [
    heading("Chat"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.View, { style: { backgroundColor: "#1e1f22", borderRadius: 12, padding: 12 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: white }, children: chat ? chat.label : "Open a DM or group DM first, then come back here." }) }),
    heading("Send as"),
    card(
      people.length ? people.map(
        (person) => row(
          person.name,
          chosen === person.id ? "Sending as them" : "Tap to send as them",
          () => set({ senderId: person.id }),
          Radio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { selected: chosen === person.id }) : void 0
        )
      ) : row("Nobody here yet", "Open a chat first")
    ),
    heading("Message"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { backgroundColor: "#1e1f22", borderRadius: 12, padding: 12, gap: 8 }, children: [
      field("text", "Message text", true),
      field("imageUrl", "Image URL (optional)"),
      field("replyId", "Reply to message ID (optional)"),
      hint("Embed (optional)"),
      field("embedTitle", "Embed title"),
      field("embedDesc", "Embed description", true),
      field("embedImage", "Embed image URL"),
      button("Send as " + senderName, () => run(fakeFromPanel), true)
    ] }),
    heading("Call"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { backgroundColor: "#1e1f22", borderRadius: 12, padding: 12, gap: 8 }, children: [
      field("callSeconds", "Duration in seconds", false, { keyboardType: "number-pad" }),
      button("Send fake call", () => run(fakeCallNow)),
      button("Send missed call", () => run(fakeMissedNow))
    ] }),
    heading("Batch"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { backgroundColor: "#1e1f22", borderRadius: 12, padding: 12, gap: 8 }, children: [
      hint('One message per line. "Name: text" picks who says it, and a leading [14:30] sets the time.'),
      field("batch", "[14:30] Alice: hey\n[14:31] Bob: hi there\nsure", true),
      button("Send batch", () => run(fakeBatch))
    ] }),
    heading("System message"),
    card(
      SYSTEM_TYPES.map(
        (type) => row(
          type.label,
          Number(settings.systemType) === type.value ? "Selected" : "Tap to pick this one",
          () => set({ systemType: type.value }),
          Radio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { selected: Number(settings.systemType) === type.value }) : void 0
        )
      )
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { backgroundColor: "#1e1f22", borderRadius: 12, padding: 12, gap: 8, marginTop: 8 }, children: [
      field("systemText", "Extra text, e.g. the new chat name"),
      button("Send system message", () => run(fakeSystemNow))
    ] }),
    heading("Reaction"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { backgroundColor: "#1e1f22", borderRadius: 12, padding: 12, gap: 8 }, children: [
      hint("Paste the id of a message in this chat (long-press it \u2192 Copy ID)."),
      field("reactId", "Message ID"),
      field("reactEmoji", "Emoji"),
      button("Add reaction", () => run(fakeReactionNow))
    ] }),
    heading("Quick actions"),
    card(
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        row("Fake call", "A call in this chat", () => run(fakeCallNow)),
        row("Missed call", "A call nobody picked up", () => run(fakeMissedNow)),
        row("Clear fakes", "Remove every fake in this chat", () => run(clearNow))
      ] })
    ),
    heading("Chat bar"),
    card(
      SwitchRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        SwitchRow,
        {
          label: "Fake button in chat bar",
          subLabel: "Tap it to send your message. Now: " + (on ? state.actionButton ? "on" : "on (not found yet)" : "off"),
          value: on,
          onValueChange: (value) => {
            set({ button: value });
            setStatus("Reload FakeDM to apply.");
          }
        }
      ) : row(
        "Fake button in chat bar",
        on ? "On \u2014 tap to switch off" : "Off \u2014 tap to switch on",
        () => {
          set({ button: !on });
          setStatus("Reload FakeDM to apply.");
        }
      )
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: muted, marginTop: 12 }, children: status })
  ] });
}
function SettingsComponent(props = {}) {
  try {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { ...props });
  } catch {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { padding: 16 }, children: "FakeDM could not draw its settings." });
  }
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    state.button = null;
    state.patched = false;
    try {
      state.storage = (_a = api == null ? void 0 : api.jsonStorage) != null ? _a : null;
      const cached = (_c = (_b = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _b.cache) != null ? _c : {};
      state.cfg = { ...DEFAULTS, ...cached };
      if (!Array.isArray(state.cfg.fakes)) state.cfg.fakes = [];
      if ((cached == null ? void 0 : cached.barDefault) !== 1 && (cached == null ? void 0 : cached.button) === void 0) {
        state.cfg = { ...state.cfg, button: true, barDefault: 1 };
        void ((_g = (_f = (_e = (_d = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _d.set) == null ? void 0 : _e.call(_d, { button: true, barDefault: 1 })) == null ? void 0 : _f.catch) == null ? void 0 : _g.call(_f, () => {
        }));
      }
    } catch {
    }
    try {
      patchChatInput(api == null ? void 0 : api.cleanup, api == null ? void 0 : api.logger);
    } catch (error) {
      (_i = (_h = api == null ? void 0 : api.logger) == null ? void 0 : _h.error) == null ? void 0 : _i.call(_h, "[FakeDM] chat bar button skipped", error);
    }
    if (state.cfg.section === true) {
      try {
        installSettingsEntry(api == null ? void 0 : api.cleanup, api == null ? void 0 : api.logger);
      } catch (error) {
        (_k = (_j = api == null ? void 0 : api.logger) == null ? void 0 : _j.error) == null ? void 0 : _k.call(_j, "[FakeDM] settings entry skipped", error);
      }
    }
  },
  SettingsComponent,
  __engine: {
    fakeMessage,
    fakeCall,
    fakeSystem,
    fakeReaction,
    clear,
    openChat,
    addButton,
    fakeBatch,
    parseBatch,
    sender,
    resolvePerson
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()