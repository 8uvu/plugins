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
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get withProps() { return __g().withProps }, get withName() { return __g().withName }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withDependencies() { return __g().withDependencies }, get anyOf() { return __g().anyOf }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get createFilterGenerator() { return __g().createFilterGenerator }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_flux = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Stores() { return __g().Stores }, get getStore() { return __g().getStore }, get onFluxEventDispatched() { return __g().onFluxEventDispatched }, get onAnyFluxEventDispatched() { return __g().onAnyFluxEventDispatched } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_flux2 = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common && valenced.discord.common.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Dispatcher() { return __g().Dispatcher } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var SettingsModules = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.modules && valenced.discord.modules.settings) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onSettingsModulesLoaded() { return __g().onSettingsModulesLoaded }, get registerSettingsSection() { return __g().registerSettingsSection }, get registerSettingsItem() { return __g().registerSettingsItem } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var PathFinders = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.utils && valenced.discord.utils.modules && valenced.discord.utils.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get lookupModuleWithImportedPath() { return __g().lookupModuleWithImportedPath }, get getModuleWithImportedPath() { return __g().getModuleWithImportedPath }, get getModule() { return __g().getModule }, get getModulesWithImportedPath() { return __g().getModulesWithImportedPath }, get findModuleWithImportedPath() { return __g().findModuleWithImportedPath } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var Metro = __toESM((function () { const __g = () => { try { return (valenced.modules && valenced.modules.metro) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onModuleInitialized() { return __g().onModuleInitialized }, get onAnyModuleInitialized() { return __g().onAnyModuleInitialized }, get onModuleFirstRequired() { return __g().onModuleFirstRequired }, get onAnyModuleFirstRequired() { return __g().onAnyModuleFirstRequired } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var import_patcher = (function () { const __g = () => { try { return (valenced.patcher) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get after() { return __g().after }, get before() { return __g().before }, get instead() { return __g().instead } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get createElement() { return __g().createElement }, get isValidElement() { return __g().isValidElement }, get useState() { return __g().useState }, get cloneElement() { return __g().cloneElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Image() { return __g().Image }, get Pressable() { return __g().Pressable }, get View() { return __g().View }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get ScrollView() { return __g().ScrollView }, get Switch() { return __g().Switch }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Appearance() { return __g().Appearance }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
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
  // Call settings: who rang whom, and how long it lasted.
  callSeconds: "90",
  callMissed: false,
  callerId: "",
  receiverId: "",
  // System message settings.
  systemType: 7,
  systemText: "",
  // Reaction settings.
  reactId: "",
  reactEmoji: "\u{1F44D}",
  // When the fake happened, counted back from now in minutes (0 = now).
  minutesAgo: "0",
  // Only needed when Discord cannot report the open chat by itself.
  chatId: "",
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
var VERSION = "4.6.0";
var ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACUklEQVR4nO3cS3IbMQwE0EEq97/yZJFF/hVZ5gecfm/v4hhogrJE67oAAAAAAAAAAAAAAAAAAAAAgL7qauy+7/t6iKpqWet2D/Wkpp8QhhYPktD0rmHYunhy47sE4cu1ieb3qMeWAGh+n7osHTsa3+9IWDYBNL9nvZYEQPP71m16ADS/d/22/RVAD1MDYPf3r+O0AGj+GfWcEgDNn2NGXb0GCDc8AHb/XKPrawKEE4BwQwNg/K8xss4mQDgBCDcsAMb/WqPqbQKEE4BwX6+H3p6ZcSTVonVWqqPvs71wbWrEc9WidXZcGzv2CHj1l/9skWrROrscGwCCA/DR3fbu7qxF6+x0ZAAIDkD33VyHTYHjAsBYAhBOAMIJQLjjAvDuO24f/bl70Tq7HRcAxjoyAF13833Y7j82AIxzbABe3W2f3ZX3onV2Ofrj4PT7ADXgXcdHBCBVJd8HYAwBCCcA4QQgnACEE4BwAhBOAMINC8Bpd+FOV4PqbQKEE4BwQwPgGFhjZJ1NgHACEG54ABwDc42urwkQbkoATIE5ZtR12gQQgjPqOfUIEIL+dfQaINz0AJgCveu3ZAIIQd+6LTsChKBnvbZ8hOt/CPpslC0vAk2DPnXZ9leAEPSoR4tbPMlHQm2+SdUiAGlhqEbX59o8yNPDUI2a/rOWD9UlTNW0aSPFvBWc8L2/74gJAH8XFYCnf/f/O6ICwJ8EIFxcAP433ito/EcGgF8JQLjIAPxrzFfY+I8NAD/EBuD33V6Buz86AHwnAGS7H/SR8ztMAAAAAMjxDYaH2MbJO/xzAAAAAElFTkSuQmCC";
var SYSTEM_TYPES = [
  { value: 1, label: "Added someone" },
  { value: 2, label: "Removed someone" },
  { value: 4, label: "Changed the chat name" },
  { value: 5, label: "Changed the chat icon" },
  { value: 6, label: "Pinned a message" },
  { value: 7, label: "New member joined" },
  { value: 8, label: "Server boosted" }
];
var CATEGORIES = [
  { key: "message", label: "Message" },
  { key: "call", label: "Call" },
  { key: "batch", label: "Batch" },
  { key: "system", label: "System" },
  { key: "reaction", label: "Reaction" },
  { key: "diag", label: "Diagnostics" }
];
var state = {
  cfg: { ...DEFAULTS },
  storage: null,
  actionButton: null,
  button: null,
  buttonKind: "",
  patched: false,
  cat: "message",
  lastChannelId: "",
  watchingInput: false,
  diag: { chat: "", button: "", input: "", inputName: "", channel: false, recipients: 0 }
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
  try {
    if (import_flux2.Dispatcher && typeof import_flux2.Dispatcher.dispatch === "function") return import_flux2.Dispatcher;
  } catch {
  }
  return find("dispatch", "subscribe");
}
function storeOf(name) {
  var _a, _b;
  try {
    const store = (_a = import_flux.Stores) == null ? void 0 : _a[name];
    if (store) return store;
  } catch {
  }
  try {
    let found = null;
    (_b = import_flux.getStore) == null ? void 0 : _b(name, (store) => {
      found = store;
    });
    if (found) return found;
  } catch {
  }
  return null;
}
function me() {
  var _a, _b, _c;
  try {
    const store = storeOf("UserStore");
    if (store == null ? void 0 : store.getCurrentUser) return store.getCurrentUser();
  } catch {
  }
  try {
    return (_c = (_b = (_a = find("getCurrentUser")) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a)) != null ? _c : null;
  } catch {
    return null;
  }
}
function currentChannelId() {
  const probes = [
    () => {
      var _a, _b;
      return (_b = (_a = storeOf("SelectedChannelStore")) == null ? void 0 : _a.getChannelId) == null ? void 0 : _b.call(_a);
    },
    () => {
      var _a, _b;
      return (_b = (_a = storeOf("SelectedChannelStore")) == null ? void 0 : _a.getSelectedChannelId) == null ? void 0 : _b.call(_a);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("getChannelId")) == null ? void 0 : _a.getChannelId) == null ? void 0 : _b.call(_a);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("getSelectedChannelId")) == null ? void 0 : _a.getSelectedChannelId) == null ? void 0 : _b.call(_a);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("getLastSelectedChannelId")) == null ? void 0 : _a.getLastSelectedChannelId) == null ? void 0 : _b.call(_a);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("getChannelId", "getSelectedChannelId")) == null ? void 0 : _a.getChannelId) == null ? void 0 : _b.call(_a);
    }
  ];
  for (const probe of probes) {
    try {
      const value = probe();
      if (value) return String(value);
    } catch {
    }
  }
  return "";
}
function channelById(id) {
  const probes = [
    () => {
      var _a, _b;
      return (_b = (_a = storeOf("ChannelStore")) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, id);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("getChannel")) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, id);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("getChannel", "hasChannel")) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, id);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("getChannel", "getDMFromUserId")) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, id);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("getChannel", "getChannels")) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, id);
    },
    () => {
      var _a, _b;
      return (_b = (_a = find("hasChannel", "getChannel")) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, id);
    }
  ];
  for (const probe of probes) {
    try {
      const value = probe();
      if (value) return value;
    } catch {
    }
  }
  return null;
}
function userById(id) {
  var _a, _b, _c, _d;
  try {
    const store = storeOf("UserStore");
    const user = (_a = store == null ? void 0 : store.getUser) == null ? void 0 : _a.call(store, id);
    if (user) return user;
  } catch {
  }
  try {
    return (_d = (_c = (_b = find("getUser")) == null ? void 0 : _b.getUser) == null ? void 0 : _c.call(_b, id)) != null ? _d : null;
  } catch {
    return null;
  }
}
function normalisePeople(list) {
  var _a, _b, _c;
  const out = [];
  for (const entry of list != null ? list : []) {
    if (!entry) continue;
    if (typeof entry === "string") {
      out.push((_a = userById(entry)) != null ? _a : { id: entry, username: entry });
    } else if (entry.id || entry.userId) {
      const id = String((_b = entry.id) != null ? _b : entry.userId);
      out.push(entry.username ? entry : (_c = userById(id)) != null ? _c : entry);
    }
  }
  return out;
}
function guildMembers(channel) {
  var _a, _b, _c, _d, _e, _f;
  const guildId = (_a = channel == null ? void 0 : channel.guild_id) != null ? _a : channel == null ? void 0 : channel.guildId;
  if (!guildId) return [];
  try {
    const store = (_d = (_c = (_b = storeOf("GuildMemberStore")) != null ? _b : find("getMembers", "getMember")) != null ? _c : find("getMembers")) != null ? _d : find("getMember");
    const map = (_f = (_e = store == null ? void 0 : store.getMembers) == null ? void 0 : _e.call(store, guildId)) != null ? _f : {};
    const list = Object.values(map != null ? map : {}).map((m) => {
      var _a2, _b2;
      return (_b2 = m == null ? void 0 : m.user) != null ? _b2 : userById(String((_a2 = m == null ? void 0 : m.userId) != null ? _a2 : ""));
    });
    return list.filter((u) => u == null ? void 0 : u.id).slice(0, 100);
  } catch {
    return [];
  }
}
function openChat() {
  var _a, _b;
  try {
    const selected = currentChannelId();
    if (selected) state.lastChannelId = selected;
    const manual = String((_b = (_a = state.cfg) == null ? void 0 : _a.chatId) != null ? _b : "").trim();
    const id = selected || state.lastChannelId || manual;
    state.diag.chat = selected ? "selected" : state.lastChannelId ? "last tapped" : manual ? "typed" : "";
    if (!id) return null;
    const channel = channelById(id);
    const raw = Array.isArray(channel == null ? void 0 : channel.recipients) ? channel.recipients : Array.isArray(channel == null ? void 0 : channel.rawRecipients) ? channel.rawRecipients : [];
    const others = normalisePeople(raw);
    const members = guildMembers(channel);
    state.diag.channel = !!channel;
    state.diag.recipients = others.length;
    const label = typeof (channel == null ? void 0 : channel.name) === "string" && channel.name || others.map((u) => (u == null ? void 0 : u.globalName) || (u == null ? void 0 : u.username) || (u == null ? void 0 : u.id)).filter(Boolean).join(", ") || "chat " + id;
    return { id, label, others, members };
  } catch {
    return null;
  }
}
function resolvePerson(chat, name) {
  var _a;
  const wanted = String(name != null ? name : "").trim().toLowerCase();
  if (!wanted) return null;
  const mine = me();
  if (wanted === "me" || wanted === "you" || mine && wanted === String(mine.id).toLowerCase()) return mine;
  for (const user of [...chat.others, ...(_a = chat.members) != null ? _a : []]) {
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
function fakeMessage(channelId, user, content, when2, extras = {}) {
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
    timestamp: new Date(when2 != null ? when2 : Date.now()).toISOString(),
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
function fakeCall(channelId, caller, other, seconds = 90, missed = false, at) {
  var _a, _b;
  const dispatch = (_a = flux()) == null ? void 0 : _a.dispatch;
  if (!dispatch || !channelId || !(caller == null ? void 0 : caller.id)) return null;
  const id = snowflake();
  const now = at != null ? at : Date.now();
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
function fakeSystem(channelId, user, type, content, at) {
  return fakeMessage(channelId, user, content, at, { systemType: Number(type) || 7 });
}
function when() {
  const minutes = Number(state.cfg.minutesAgo);
  if (!Number.isFinite(minutes) || minutes <= 0) return Date.now();
  return Date.now() - Math.round(minutes) * 6e4;
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
  if (!chat) return "No chat found yet.";
  const user = sender(chat);
  if (!(user == null ? void 0 : user.id)) return "No one to send as yet.";
  return fakeMessage(chat.id, user, state.cfg.text) ? "Sent a fake message." : "Discord is not ready yet.";
}
function fakeFromPanel() {
  const chat = openChat();
  if (!chat) return 'No chat found yet: open a DM, then tap "Find my chat".';
  const user = sender(chat);
  if (!(user == null ? void 0 : user.id)) return "No one to send as yet.";
  const id = fakeMessage(chat.id, user, state.cfg.text, when(), {
    imageUrl: state.cfg.imageUrl,
    embeds: embedFromConfig(),
    replyToId: state.cfg.replyId,
    replyToContent: "a message in this chat",
    replyToAuthor: user
  });
  return id ? "Sent as " + (user.globalName || user.username || "them") + "." : "Discord is not ready yet.";
}
function callPeople(chat) {
  var _a, _b;
  const mine = me();
  const caller = (_a = resolvePerson(chat, state.cfg.callerId)) != null ? _a : sender(chat);
  const receiver = (_b = resolvePerson(chat, state.cfg.receiverId)) != null ? _b : mine;
  return { caller, receiver };
}
function fakeCallNow() {
  const chat = openChat();
  if (!chat) return 'No chat found yet: open a DM, then tap "Find my chat".';
  const { caller, receiver } = callPeople(chat);
  if (!(caller == null ? void 0 : caller.id)) return "No one to send as yet.";
  const seconds = Math.max(0, Math.round(Number(state.cfg.callSeconds) || 0));
  const missed = !!state.cfg.callMissed;
  return fakeCall(chat.id, caller, receiver, missed ? 0 : seconds, missed, when()) ? missed ? "Sent a missed call." : "Sent a fake call." : "Discord is not ready yet.";
}
function fakeMissedNow() {
  const chat = openChat();
  if (!chat) return 'No chat found yet: open a DM, then tap "Find my chat".';
  const { caller } = callPeople(chat);
  if (!(caller == null ? void 0 : caller.id)) return "No one to send as yet.";
  return fakeCall(chat.id, caller, me(), 0, true, when()) ? "Sent a missed call." : "Discord is not ready yet.";
}
function fakeSystemNow() {
  const chat = openChat();
  if (!chat) return 'No chat found yet: open a DM, then tap "Find my chat".';
  const user = sender(chat);
  if (!(user == null ? void 0 : user.id)) return "No one to send as yet.";
  const id = fakeSystem(chat.id, user, Number(state.cfg.systemType), state.cfg.systemText, when());
  return id ? "Sent a system message." : "Discord is not ready yet.";
}
function fakeReactionNow() {
  var _a, _b, _c;
  const chat = openChat();
  if (!chat) return 'No chat found yet: open a DM, then tap "Find my chat".';
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
      const when2 = /* @__PURE__ */ new Date();
      when2.setHours(Math.min(23, Number(clock[1])), Math.min(59, Number(clock[2])), 0, 0);
      time = when2.getTime();
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
  if (!chat) return 'No chat found yet: open a DM, then tap "Find my chat".';
  const lines = parseBatch(state.cfg.batch);
  if (!lines.length) return "Nothing to send: put one message per line.";
  const fallback = sender(chat);
  let sent = 0;
  let clock = when();
  for (const line of lines) {
    const who = (_a = resolvePerson(chat, line.name)) != null ? _a : fallback;
    if (!(who == null ? void 0 : who.id)) continue;
    const when2 = (_b = line.time) != null ? _b : clock;
    if (fakeMessage(chat.id, who, line.content, when2)) sent++;
    clock = when2 + 3e4 + Math.floor(Math.random() * 9e4);
  }
  return sent ? "Sent " + sent + " fake message(s)." : "Nothing sent: no sender available.";
}
function clearNow() {
  const chat = openChat();
  if (!chat) return 'No chat found yet: open a DM, then tap "Find my chat".';
  const removed = clear(chat.id);
  return removed ? "Removed " + removed + " fake(s)." : "No fakes in this chat.";
}
function FakeIcon({ style } = {}) {
  try {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Image, { source: { uri: ICON }, style: [{ width: 24, height: 24 }, style] });
  } catch {
    return null;
  }
}
function buildButton() {
  if (typeof import_react.createElement !== "function") return null;
  const press = () => {
    try {
      fake();
    } catch {
    }
  };
  try {
    if (state.actionButton) {
      state.buttonKind = "discord";
      return (0, import_react.createElement)(state.actionButton, {
        accessibilityLabel: "FakeDM",
        IconComponent: FakeIcon,
        onPress: press
      });
    }
    state.buttonKind = "plain";
    return (0, import_react.createElement)(
      import_react_native.Pressable,
      { accessibilityLabel: "FakeDM", accessibilityRole: "button", onPress: press, style: { paddingHorizontal: 10, paddingVertical: 6 } },
      (0, import_react.createElement)(FakeIcon, {})
    );
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
  const at = list.findIndex(isButtonGroup);
  if (at !== -1) {
    const next = [...list];
    next.splice(at, 0, button);
    return { ...node, props: { ...node.props, children: next } };
  }
  let last = -1;
  list.forEach((child, index) => {
    if (hasExpression(child)) last = index;
  });
  if (last !== -1) {
    const next = [...list];
    next.splice(last + 1, 0, button);
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
function moduleFromPath(path) {
  var _a, _b, _c, _d;
  try {
    const finders = PathFinders;
    const [mod] = (_b = (_a = finders == null ? void 0 : finders.lookupModuleWithImportedPath) == null ? void 0 : _a.call(finders, path)) != null ? _b : [];
    return (_d = (_c = mod == null ? void 0 : mod.default) != null ? _c : mod) != null ? _d : null;
  } catch {
    return null;
  }
}
function moduleByName(name) {
  var _a, _b, _c;
  try {
    const [mod] = (_a = (0, import_finders.lookupModule)((0, import_filters.withName)(name))) != null ? _a : [];
    return (_c = (_b = mod == null ? void 0 : mod.default) != null ? _b : mod) != null ? _c : null;
  } catch {
    return null;
  }
}
function onModule(path, callback, cleanup) {
  try {
    const finder = PathFinders == null ? void 0 : PathFinders.getModuleWithImportedPath;
    if (typeof finder !== "function") return false;
    const off = finder(path, (mod) => {
      try {
        callback(mod);
      } catch {
      }
    });
    if (typeof off === "function") cleanup(off);
    return true;
  } catch {
    return false;
  }
}
function installPatch(ChatInput, cleanup, logger) {
  var _a, _b;
  if (state.patched) return true;
  if (!ChatInput || typeof ChatInput.type !== "function") return false;
  try {
    cleanup(
      (0, import_patcher.after)(ChatInput, "type", (...params) => {
        var _a2, _b2, _c;
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
          (_c = logger == null ? void 0 : logger.warn) == null ? void 0 : _c.call(logger, "[FakeDM] chat button skipped this render", error);
          return result;
        }
      })
    );
    state.patched = true;
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[FakeDM] chat button installed; open a chat to see it.");
    return true;
  } catch (error) {
    (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, "[FakeDM] could not patch the chat input", error);
    return false;
  }
}
function tryAttach(cleanup, logger) {
  var _a, _b;
  if (state.patched) return true;
  if (!state.actionButton) {
    state.actionButton = moduleFromPath(BUTTON_PATH);
    state.diag.button = state.actionButton ? "path" : "";
    if (!state.actionButton) {
      onModule(
        BUTTON_PATH,
        (mod) => {
          var _a2;
          const found = (_a2 = mod == null ? void 0 : mod.default) != null ? _a2 : mod;
          if (!found || state.actionButton) return;
          state.actionButton = found;
          state.diag.button = "callback";
          if (!state.button || state.buttonKind !== "discord") state.button = buildButton();
        },
        cleanup
      );
    }
    if (!state.actionButton) {
      state.actionButton = moduleByName("ChatInputActionButton");
      state.diag.button = state.actionButton ? "name" : "";
    }
  }
  if (!state.button || state.actionButton && state.buttonKind !== "discord") state.button = buildButton();
  let ChatInput = moduleFromPath(INPUT_PATH);
  state.diag.input = ChatInput ? "path" : "";
  state.diag.inputName = ChatInput ? String((_b = (_a = ChatInput == null ? void 0 : ChatInput.displayName) != null ? _a : ChatInput == null ? void 0 : ChatInput.name) != null ? _b : "anonymous") : "";
  if (!ChatInput) {
    ChatInput = moduleByName("ChatInput");
    state.diag.input = ChatInput ? "name" : "";
  }
  if (ChatInput) return installPatch(ChatInput, cleanup, logger);
  if (!state.watchingInput) {
    state.watchingInput = true;
    onModule(
      INPUT_PATH,
      (mod) => {
        var _a2, _b2, _c;
        const found = (_a2 = mod == null ? void 0 : mod.default) != null ? _a2 : mod;
        if (!found) return;
        state.diag.input = "callback";
        state.diag.inputName = String((_c = (_b2 = found == null ? void 0 : found.displayName) != null ? _b2 : found == null ? void 0 : found.name) != null ? _c : "anonymous");
        installPatch(found, cleanup, logger);
      },
      cleanup
    );
  }
  return state.patched;
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
var PALETTE = {
  text: "#ffffff",
  muted: "#b5bac1",
  accent: "#5865F2",
  card: "#1e1f22",
  input: "#2b2d31"
};
var WHEN_CHOICES = [
  { label: "Now", minutes: "0" },
  { label: "5 minutes ago", minutes: "5" },
  { label: "1 hour ago", minutes: "60" },
  { label: "3 hours ago", minutes: "180" },
  { label: "Yesterday", minutes: "1440" }
];
function Panel({ api } = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const [, bump] = (0, import_react.useState)(0);
  const [status, setStatus] = (0, import_react.useState)("");
  const settings = (_a = state.cfg) != null ? _a : DEFAULTS;
  const store = (_b = api == null ? void 0 : api.jsonStorage) != null ? _b : state.storage;
  const D = (_c = import_design.Design) != null ? _c : {};
  const Group = D.TableRowGroup;
  const Row = D.TableRow;
  const SwitchRow = D.TableSwitchRow;
  const RadioGroup = D.TableRadioGroup;
  const RadioRow = D.TableRadioRow;
  const DText = D.Text;
  const StackView = (_d = D.Stack) != null ? _d : import_react_native.View;
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
  const seen = /* @__PURE__ */ new Set();
  for (const user of [...(_e = chat == null ? void 0 : chat.others) != null ? _e : [], ...(_f = chat == null ? void 0 : chat.members) != null ? _f : []]) {
    if (!(user == null ? void 0 : user.id) || seen.has(String(user.id))) continue;
    if ((mine == null ? void 0 : mine.id) && String(user.id) === String(mine.id)) continue;
    seen.add(String(user.id));
    people.push({ id: String(user.id), name: user.globalName || user.username || String(user.id) });
  }
  if (mine == null ? void 0 : mine.id) people.push({ id: String(mine.id), name: "You" });
  const chosen = String(settings.senderId || (settings.asThem ? (_g = people[0]) == null ? void 0 : _g.id : mine == null ? void 0 : mine.id) || ((_h = people[0]) == null ? void 0 : _h.id) || "");
  const senderName = (_j = (_i = people.find((p) => p.id === chosen)) == null ? void 0 : _i.name) != null ? _j : "nobody";
  const on = settings.button !== false;
  const cat = state.cat;
  const callerId = String(settings.callerId || chosen || "");
  const receiverId = String(settings.receiverId || (mine == null ? void 0 : mine.id) || "");
  const nameOf = (id) => {
    var _a2, _b2;
    return (_b2 = (_a2 = people.find((p) => p.id === id)) == null ? void 0 : _a2.name) != null ? _b2 : "nobody";
  };
  const section = (title, children) => Group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.View, { style: { gap: 10, padding: 16 }, children }) }, title) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { backgroundColor: PALETTE.card, borderRadius: 12, padding: 12, gap: 10 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: PALETTE.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.4 }, children: title }),
    children
  ] }, title);
  const info = (label, subLabel) => Row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label, subLabel }, label) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { paddingVertical: 6 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: PALETTE.text, fontWeight: "600" }, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: PALETTE.muted, fontSize: 12 }, children: subLabel })
  ] }, label);
  const hint = (text) => DText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DText, { variant: "text-xs/medium", children: text }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: PALETTE.muted, fontSize: 12 }, children: text });
  const action = (label, subLabel, onPress) => Row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label, subLabel, arrow: true, onPress }, label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_native.Pressable,
    {
      accessibilityRole: "button",
      accessibilityLabel: label,
      onPress,
      style: { backgroundColor: PALETTE.input, borderRadius: 10, paddingVertical: 12, alignItems: "center" },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: PALETTE.text, fontWeight: "700" }, children: label })
    },
    label
  );
  const field = (key, placeholder, options = {}) => {
    var _a2;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_native.TextInput,
      {
        value: String((_a2 = settings[key]) != null ? _a2 : ""),
        onChangeText: (value) => set({ [key]: value }),
        placeholder,
        placeholderTextColor: PALETTE.muted,
        multiline: !!options.multiline,
        keyboardType: options.numeric ? "number-pad" : "default",
        style: {
          color: PALETTE.text,
          backgroundColor: PALETTE.input,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
          minHeight: options.multiline ? 96 : 0,
          textAlignVertical: options.multiline ? "top" : "center"
        }
      },
      key
    );
  };
  const pick = (title, value, entries, onPick) => RadioGroup && RadioRow && entries.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, { title, value, onChange: onPick, children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioRow, { label: entry.label, subLabel: entry.subLabel, value: entry.value }, entry.value)) }, title) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { backgroundColor: PALETTE.card, borderRadius: 12, padding: 12, gap: 2 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: PALETTE.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.4 }, children: title }),
    entries.length ? entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_react_native.Pressable,
      {
        accessibilityRole: "button",
        accessibilityLabel: entry.label,
        onPress: () => onPick(entry.value),
        style: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 9 },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: PALETTE.text, flex: 1 }, children: entry.label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: value === entry.value ? PALETTE.accent : PALETTE.muted }, children: value === entry.value ? "\u2713" : "" })
        ]
      },
      entry.value
    )) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: PALETTE.muted, paddingVertical: 9 }, children: "Nobody here yet" })
  ] }, title);
  const personEntries = (selected, idle, picked) => people.map((person) => ({
    value: person.id,
    label: person.name,
    subLabel: selected === person.id ? picked != null ? picked : "Selected" : idle
  }));
  const findChat = () => {
    var _a2;
    const manual = String((_a2 = settings.chatId) != null ? _a2 : "").trim();
    if (manual) {
      const found = channelById(manual);
      return found ? "Using " + (found.name || "chat " + manual) + "." : "No chat with that id \u2014 check the id and try again.";
    }
    const id = currentChannelId();
    return id ? "Found chat " + id + "." : "Discord reported no open chat. Paste its id below.";
  };
  const whenBlock = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    pick(
      "When",
      String(settings.minutesAgo),
      WHEN_CHOICES.map((choice) => ({
        value: choice.minutes,
        label: choice.label,
        subLabel: String(settings.minutesAgo) === choice.minutes ? "Selected" : void 0
      })),
      (minutes) => set({ minutesAgo: minutes })
    ),
    section("Another time", field("minutesAgo", "Minutes ago (0 = now)", { numeric: true }))
  ] });
  const messagePage = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    pick("Send as", chosen, personEntries(chosen, "Tap to send as them", "Sending as them"), (id) => set({ senderId: id })),
    section("Message", field("text", "Message", { multiline: true })),
    section(
      "Extras",
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        field("imageUrl", "Image URL (optional)"),
        field("replyId", "Reply to message ID (optional)"),
        field("embedTitle", "Embed title (optional)"),
        field("embedDesc", "Embed description (optional)", { multiline: true }),
        field("embedImage", "Embed image URL (optional)")
      ] })
    ),
    section("Send", action("Send as " + senderName, "Posts into the chat you have open, as them", () => run(fakeFromPanel))),
    whenBlock()
  ] });
  const callPage = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    pick("Caller", callerId, personEntries(callerId, "Tap to pick the caller"), (id) => set({ callerId: id })),
    pick("Receiver", receiverId, personEntries(receiverId, "Tap to pick who receives it"), (id) => set({ receiverId: id })),
    section(
      "Call details",
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        hint("A call from " + nameOf(callerId) + " to " + nameOf(receiverId) + "."),
        field("callSeconds", "Duration in seconds", { numeric: true })
      ] })
    ),
    section(
      "Send",
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        action("Send fake call", "Rings in the chat you have open", () => run(fakeCallNow)),
        action("Send missed call", "A call they did not pick up", () => run(fakeMissedNow))
      ] })
    ),
    whenBlock()
  ] });
  const batchPage = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    section(
      "Batch",
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        hint('One message per line. "Name: text" picks who says it, and a leading [14:30] sets the time.'),
        field("batch", "[14:30] Alice: hey\n[14:31] Bob: hi there\nsure", { multiline: true })
      ] })
    ),
    section("Send", action("Send batch", "Every line lands in order", () => run(fakeBatch)))
  ] });
  const systemPage = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    pick("Who it is from", chosen, personEntries(chosen, "Tap to send as them", "Sending as them"), (id) => set({ senderId: id })),
    pick(
      "System message",
      String(settings.systemType),
      SYSTEM_TYPES.map((type) => ({
        value: String(type.value),
        label: type.label,
        subLabel: Number(settings.systemType) === type.value ? "Selected" : void 0
      })),
      (value) => set({ systemType: Number(value) })
    ),
    section("Extra text", field("systemText", "Extra text, e.g. the new chat name")),
    section("Send", action("Send system message", "Shows up the way Discord writes it", () => run(fakeSystemNow))),
    whenBlock()
  ] });
  const reactionPage = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    pick("Who reacts", chosen, personEntries(chosen, "Tap to react as them", "Reacting as them"), (id) => set({ senderId: id })),
    section(
      "Reaction",
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        hint("Paste the id of a message in this chat (long-press it \u2192 Copy ID)."),
        field("reactId", "Message ID"),
        field("reactEmoji", "Emoji")
      ] })
    ),
    section("Send", action("Add reaction", "Adds it to that message", () => run(fakeReactionNow)))
  ] });
  const diagPage = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: section(
    "Diagnostics",
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      info("Installed version", VERSION),
      info("Chat found", chat ? "yes" : "no"),
      info("Chat id", (chat == null ? void 0 : chat.id) || "none"),
      info("Chat name", (chat == null ? void 0 : chat.label) || "none"),
      info(
        "Found through",
        state.diag.chat === "selected" ? "the chat you have open" : state.diag.chat === "last tapped" ? "the last chat you tapped" : state.diag.chat === "typed" ? "the id you typed" : "nothing yet"
      ),
      info("People it can see", String(people.length)),
      info("Chat record found", state.diag.channel ? "yes" : "no"),
      info("Recipients in that record", String(state.diag.recipients)),
      info(
        "Chat bar button module",
        state.actionButton ? "found (" + (state.diag.button || "?") + ")" : "not found"
      ),
      info("Chat input module", state.diag.input ? "found (" + state.diag.input + ")" : "not found"),
      info("Chat input name", state.diag.inputName || "none"),
      info(
        "Chat bar button",
        state.patched ? state.actionButton ? "installed (Discord button)" : "installed (plain)" : "not installed"
      ),
      info("Discord dispatcher", flux() ? "found" : "not found"),
      info("Channel store", storeOf("ChannelStore") ? "found" : "not found"),
      info("User store", storeOf("UserStore") ? "found" : "not found"),
      info("Signed in as", mine ? mine.username || String(mine.id) : "unknown")
    ] })
  ) });
  const pages = {
    message: messagePage,
    call: callPage,
    batch: batchPage,
    system: systemPage,
    reaction: reactionPage,
    diag: diagPage
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.ScrollView, { contentContainerStyle: { padding: 16, paddingBottom: 80 }, keyboardShouldPersistTaps: "handled", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StackView, { ...D.Stack ? { spacing: 24 } : { style: { gap: 24 } }, children: [
    section(
      "Chat",
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        info(
          chat ? chat.label : "No chat found yet",
          chat ? "Follows the chat you open \xB7 id " + chat.id : "Tap a DM or a channel in the list, then come back here"
        ),
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
        ) : action("Fake button in chat bar", on ? "On \u2014 tap to switch off" : "Off \u2014 tap to switch on", () => {
          set({ button: !on });
          setStatus("Reload FakeDM to apply.");
        }),
        field("chatId", "Channel id (only if the chat is not found)"),
        action("Find my chat", "Checks which chat is open", () => run(findChat))
      ] })
    ),
    status ? hint(status) : null,
    pick(
      "What to send",
      cat,
      CATEGORIES.map((entry) => ({ value: entry.key, label: entry.label })),
      (key) => {
        state.cat = key;
        bump((n) => n + 1);
      }
    ),
    (_k = pages[cat]) != null ? _k : messagePage,
    section("Clean up", action("Clear fakes", "Removes every fake in this chat", () => run(clearNow)))
  ] }) });
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
            IconComponent: FakeIcon,
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    state.button = null;
    state.buttonKind = "";
    state.watchingInput = false;
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
      const dispatcher = flux();
      if (typeof (dispatcher == null ? void 0 : dispatcher.subscribe) === "function") {
        const off = dispatcher.subscribe("CHANNEL_SELECT", (event) => {
          var _a2;
          const id = (_a2 = event == null ? void 0 : event.channelId) != null ? _a2 : event == null ? void 0 : event.channel_id;
          if (id) state.lastChannelId = String(id);
        });
        if (typeof off === "function") (_h = api == null ? void 0 : api.cleanup) == null ? void 0 : _h.call(api, off);
      }
    } catch (error) {
      (_j = (_i = api == null ? void 0 : api.logger) == null ? void 0 : _i.warn) == null ? void 0 : _j.call(_i, "[FakeDM] could not watch chat selection", error);
    }
    try {
      patchChatInput(api == null ? void 0 : api.cleanup, api == null ? void 0 : api.logger);
    } catch (error) {
      (_l = (_k = api == null ? void 0 : api.logger) == null ? void 0 : _k.error) == null ? void 0 : _l.call(_k, "[FakeDM] chat bar button skipped", error);
    }
    if (state.cfg.section === true) {
      try {
        installSettingsEntry(api == null ? void 0 : api.cleanup, api == null ? void 0 : api.logger);
      } catch (error) {
        (_n = (_m = api == null ? void 0 : api.logger) == null ? void 0 : _m.error) == null ? void 0 : _n.call(_m, "[FakeDM] settings entry skipped", error);
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