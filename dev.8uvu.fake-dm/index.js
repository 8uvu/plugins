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
var import_finders = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get lookupModule() { return __g().lookupModule }, get getModules() { return __g().getModules }, get lookupModules() { return __g().lookupModules }, get waitForModules() { return __g().waitForModules } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get withProps() { return __g().withProps }, get createFilterGenerator() { return __g().createFilterGenerator }, get withName() { return __g().withName }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withDependencies() { return __g().withDependencies }, get anyOf() { return __g().anyOf }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_actions = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.actions) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get ToastActionCreators() { return __g().ToastActionCreators }, get AlertActionCreators() { return __g().AlertActionCreators }, get ActionSheetActionCreators() { return __g().ActionSheetActionCreators } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_flux = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Stores() { return __g().Stores }, get getStore() { return __g().getStore }, get onFluxEventDispatched() { return __g().onFluxEventDispatched }, get onAnyFluxEventDispatched() { return __g().onAnyFluxEventDispatched } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_flux2 = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common && valenced.discord.common.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Dispatcher() { return __g().Dispatcher } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var ImportTracker = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.common && valenced.discord.common.importTracker) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get mImportedPaths() { return __g().mImportedPaths }, get sImportedPath() { return __g().sImportedPath } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var SettingsModules = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.modules && valenced.discord.modules.settings) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onSettingsModulesLoaded() { return __g().onSettingsModulesLoaded }, get registerSettingsSection() { return __g().registerSettingsSection }, get registerSettingsItem() { return __g().registerSettingsItem } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var PathFinders = __toESM((function () { const __g = () => { try { return (valenced.discord && valenced.discord.utils && valenced.discord.utils.modules && valenced.discord.utils.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get lookupModuleWithImportedPath() { return __g().lookupModuleWithImportedPath }, get getModuleWithImportedPath() { return __g().getModuleWithImportedPath }, get getModule() { return __g().getModule }, get getModulesWithImportedPath() { return __g().getModulesWithImportedPath }, get findModuleWithImportedPath() { return __g().findModuleWithImportedPath } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var Metro = __toESM((function () { const __g = () => { try { return (valenced.modules && valenced.modules.metro) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get onModuleInitialized() { return __g().onModuleInitialized }, get onAnyModuleInitialized() { return __g().onAnyModuleInitialized }, get onModuleFirstRequired() { return __g().onModuleFirstRequired }, get onAnyModuleFirstRequired() { return __g().onAnyModuleFirstRequired } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })());
var import_patcher = (function () { const __g = () => { try { return (valenced.patcher) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get after() { return __g().after }, get before() { return __g().before }, get instead() { return __g().instead } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get useState() { return __g().useState }, get createElement() { return __g().createElement }, get isValidElement() { return __g().isValidElement }, get cloneElement() { return __g().cloneElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native2 = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Image() { return __g().Image }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get View() { return __g().View }, get Pressable() { return __g().Pressable }, get ScrollView() { return __g().ScrollView }, get Appearance() { return __g().Appearance }, get Switch() { return __g().Switch }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();

// plugins/_shared/theme.ts
var import_common = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens }, get Logger() { return __g().Logger }, get Constants() { return __g().Constants } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Image() { return __g().Image }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get View() { return __g().View }, get Pressable() { return __g().Pressable }, get ScrollView() { return __g().ScrollView }, get Appearance() { return __g().Appearance }, get Switch() { return __g().Switch }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
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

// plugins/dev.8uvu.fake-dm/js/index.tsx
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
var VERSION = "6.0.0";
var ICON = "data:image/png;base64,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";
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
  watchingByNameInput: false,
  finders: null,
  apiKeys: "",
  discordKeys: "",
  diag: { chat: "", button: "", input: "", inputName: "", channel: false, recipients: 0, buttonPath: "", inputPath: "" }
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
function FakeIcon({ style, size } = {}) {
  try {
    const side = typeof size === "number" && size > 0 ? size : 24;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Image, { source: { uri: ICON }, style: [{ width: side, height: side }, style] });
  } catch {
    return null;
  }
}
function toast(text) {
  if (!text) return;
  try {
    const actions = import_actions.ToastActionCreators;
    if (!(actions == null ? void 0 : actions.open)) return;
    try {
      actions.open("fakedm", { text, variant: "default" });
    } catch {
      actions.open({ key: "fakedm", content: text });
    }
  } catch {
  }
}
function saveCfg(patch) {
  var _a, _b, _c, _d, _e;
  state.cfg = { ...DEFAULTS, ...(_a = state.cfg) != null ? _a : {}, ...patch };
  try {
    void ((_e = (_d = (_c = (_b = state.storage) == null ? void 0 : _b.set) == null ? void 0 : _c.call(_b, patch)) == null ? void 0 : _d.catch) == null ? void 0 : _e.call(_d, () => {
    }));
  } catch {
  }
}
function chatPeople() {
  var _a, _b;
  const list = [];
  const you = me();
  if (you == null ? void 0 : you.id) list.push({ id: String(you.id), name: (you.globalName || you.username || "You") + " (you)" });
  const seen = new Set(list.map((person) => person.id));
  let chat = null;
  try {
    chat = openChat();
  } catch {
  }
  for (const user of [...(_a = chat == null ? void 0 : chat.others) != null ? _a : [], ...(_b = chat == null ? void 0 : chat.members) != null ? _b : []]) {
    if (!(user == null ? void 0 : user.id) || seen.has(String(user.id))) continue;
    seen.add(String(user.id));
    list.push({ id: String(user.id), name: user.globalName || user.username || String(user.id) });
  }
  return list;
}
function Editor({ title, fields, onSend }) {
  var _a;
  const D = (_a = import_design.Design) != null ? _a : {};
  const start = {};
  for (const field of fields) start[field.key] = field.value;
  const [values, setValues] = (0, import_react.useState)(start);
  const [queries, setQueries] = (0, import_react.useState)({});
  const Alert = D.AlertModal;
  const Action = D.AlertActionButton;
  const RadioGroup = D.TableRadioGroup;
  const RadioRow = D.TableRadioRow;
  if (!Alert) return null;
  const label = (field) => (0, import_react.createElement)(
    import_react_native2.Text,
    { style: { color: PALETTE.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.4, marginBottom: 6 } },
    field.label
  );
  const peoplePicker = (field) => {
    var _a2, _b;
    const people = (_a2 = field.people) != null ? _a2 : [];
    const chosen = values[field.key];
    const query = String((_b = queries[field.key]) != null ? _b : "");
    const chose = (next) => setValues((prev) => ({ ...prev, [field.key]: next }));
    const typed = (next) => setQueries((prev) => ({ ...prev, [field.key]: next }));
    const needle = query.trim().toLowerCase();
    const shown = needle ? people.filter((person) => person.name.toLowerCase().includes(needle) || person.id.includes(needle)) : people;
    const search = (0, import_react.createElement)(import_react_native2.TextInput, {
      key: field.key + "-search",
      value: query,
      onChangeText: typed,
      placeholder: "Search people",
      placeholderTextColor: PALETTE.muted,
      autoCorrect: false,
      style: {
        color: PALETTE.text,
        backgroundColor: PALETTE.input,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 15,
        marginBottom: 8
      }
    });
    const rows = (Group, Row) => (0, import_react.createElement)(
      Group,
      { key: field.key + "-rows", title: field.label, value: chosen, onChange: chose },
      ...shown.map(
        (person) => (0, import_react.createElement)(Row, {
          key: person.id,
          label: person.name,
          value: person.id,
          subLabel: chosen === person.id ? "Selected" : "Tap to pick"
        })
      )
    );
    const byHand = () => (0, import_react.createElement)(
      import_react_native2.View,
      { key: field.key + "-rows", style: { backgroundColor: PALETTE.card, borderRadius: 12, padding: 12 } },
      label(field),
      ...shown.length ? shown.map(
        (person) => (0, import_react.createElement)(
          import_react_native2.Pressable,
          {
            key: person.id,
            accessibilityRole: "button",
            accessibilityLabel: person.name,
            onPress: () => chose(person.id),
            style: { flexDirection: "row", alignItems: "center", paddingVertical: 9 }
          },
          (0, import_react.createElement)(import_react_native2.Text, { style: { color: PALETTE.text, flex: 1 } }, person.name),
          (0, import_react.createElement)(
            import_react_native2.Text,
            { style: { color: chosen === person.id ? PALETTE.accent : PALETTE.muted } },
            chosen === person.id ? "\u2713" : ""
          )
        )
      ) : [(0, import_react.createElement)(import_react_native2.Text, { key: "nobody", style: { color: PALETTE.muted } }, "Nobody here yet")]
    );
    const body = RadioGroup && RadioRow && people.length ? rows(RadioGroup, RadioRow) : byHand();
    return (0, import_react.createElement)(
      import_react_native2.View,
      { key: field.key, style: { marginTop: 12 } },
      RadioGroup && RadioRow && people.length ? null : null,
      search,
      body,
      needle && !shown.length ? (0, import_react.createElement)(
        import_react_native2.Text,
        { key: field.key + "-none", style: { color: PALETTE.muted, fontSize: 13, marginTop: 6 } },
        'Nobody matches "' + query.trim() + '".'
      ) : null
    );
  };
  const textField = (field) => (0, import_react.createElement)(
    import_react_native2.View,
    { key: field.key, style: { marginTop: 12 } },
    label(field),
    (0, import_react.createElement)(import_react_native2.TextInput, {
      value: values[field.key],
      onChangeText: (next) => setValues((prev) => ({ ...prev, [field.key]: next })),
      multiline: !!field.multiline,
      keyboardType: field.numeric ? "numeric" : "default",
      placeholderTextColor: PALETTE.muted,
      style: {
        color: PALETTE.text,
        backgroundColor: PALETTE.input,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        minHeight: field.multiline ? 88 : 0,
        textAlignVertical: field.multiline ? "top" : "center"
      }
    })
  );
  const content = (0, import_react.createElement)(
    import_react_native2.View,
    { style: { width: "100%" } },
    ...fields.map((field) => field.people ? peoplePicker(field) : textField(field))
  );
  return (0, import_react.createElement)(Alert, {
    title,
    content,
    actions: Action ? (0, import_react.createElement)(Action, { text: "Send", onPress: () => toast(onSend(values)) }) : void 0
  });
}
var editors = 0;
function openEditor(title, fields, onSend) {
  try {
    const actions = import_actions.AlertActionCreators;
    if (typeof (actions == null ? void 0 : actions.openAlert) !== "function") return false;
    editors += 1;
    actions.openAlert("fakedm-editor-" + editors, (0, import_react.createElement)(Editor, { title, fields, onSend }));
    return true;
  } catch {
    return false;
  }
}
function edit(title, fields, onSend) {
  return () => {
    var _a;
    if (openEditor(title, fields, onSend)) return;
    const start = {};
    for (const field of fields) start[field.key] = field.value;
    try {
      toast(onSend(start));
    } catch (error) {
      toast("Failed: " + ((_a = error == null ? void 0 : error.message) != null ? _a : "unknown error"));
    }
  };
}
function withSetting(key, value, task) {
  const before = state.cfg[key];
  state.cfg = { ...state.cfg, [key]: value };
  try {
    return task();
  } finally {
    state.cfg = { ...state.cfg, [key]: before };
  }
}
function menuItems() {
  const people = () => chatPeople();
  const youAs = () => {
    var _a, _b;
    const list = people();
    return state.cfg.senderId || ((_a = list.find((person) => / \(you\)$/.test(person.name))) == null ? void 0 : _a.id) || ((_b = list[0]) == null ? void 0 : _b.id) || "";
  };
  const whoCalls = () => {
    var _a;
    return state.cfg.callerId || ((_a = people()[0]) == null ? void 0 : _a.id) || "";
  };
  return [
    {
      label: "Send the message",
      action: edit(
        "Send the message",
        [
          { key: "as", label: "Send as", value: youAs(), people: people() },
          { key: "text", label: "Message", value: state.cfg.text, multiline: true }
        ],
        (values) => {
          var _a;
          saveCfg({ text: values.text });
          return withSetting("senderId", String((_a = values.as) != null ? _a : ""), fakeFromPanel);
        }
      )
    },
    {
      label: "Send a call",
      action: edit(
        "Send a call",
        [
          { key: "from", label: "Who calls", value: whoCalls(), people: people() },
          { key: "seconds", label: "Seconds it lasted", value: String(state.cfg.callSeconds), numeric: true }
        ],
        (values) => {
          var _a, _b;
          saveCfg({ callSeconds: String((_a = values.seconds) != null ? _a : "") });
          return withSetting("callerId", String((_b = values.from) != null ? _b : ""), fakeCallNow);
        }
      )
    },
    {
      label: "Send a missed call",
      action: edit(
        "Send a missed call",
        [{ key: "from", label: "Who called", value: whoCalls(), people: people() }],
        (values) => {
          var _a;
          return withSetting("callerId", String((_a = values.from) != null ? _a : ""), fakeMissedNow);
        }
      )
    },
    {
      label: "Send the batch",
      action: edit(
        "Send the batch",
        [
          { key: "as", label: "Send as", value: youAs(), people: people() },
          { key: "batch", label: "One message per line", value: state.cfg.batch, multiline: true }
        ],
        (values) => {
          var _a;
          saveCfg({ batch: values.batch });
          return withSetting("senderId", String((_a = values.as) != null ? _a : ""), fakeBatch);
        }
      )
    },
    {
      label: "Add a reaction",
      action: edit(
        "Add a reaction",
        [
          { key: "as", label: "Who reacts", value: youAs(), people: people() },
          { key: "emoji", label: "Emoji", value: state.cfg.reactEmoji },
          { key: "message", label: "Message id", value: state.cfg.reactId }
        ],
        (values) => {
          var _a;
          saveCfg({ reactEmoji: values.emoji, reactId: values.message });
          return withSetting("senderId", String((_a = values.as) != null ? _a : ""), fakeReactionNow);
        }
      )
    },
    {
      label: "Clear fakes here",
      action: edit("Clear fakes here", [], () => clearNow())
    }
  ];
}
function contextMenuComponent() {
  var _a, _b, _c;
  try {
    const fromDesign = (_a = import_design.Design) == null ? void 0 : _a.ContextMenu;
    if (typeof fromDesign === "function") return fromDesign;
  } catch {
  }
  try {
    const [mod] = (_b = (0, import_finders.lookupModule)((0, import_filters.withProps)("ContextMenu"))) != null ? _b : [];
    const component = (_c = mod == null ? void 0 : mod.ContextMenu) != null ? _c : mod == null ? void 0 : mod.default;
    if (typeof component === "function") return component;
  } catch {
  }
  return null;
}
function findButtonTemplate(node) {
  var _a;
  if (!(0, import_react.isValidElement)(node)) return null;
  const props = (_a = node.props) != null ? _a : {};
  if (props.__fakedm === true || node.key === "fakedm") return null;
  if (typeof props.IconComponent === "function") return node;
  const kids = props.children;
  for (const child of Array.isArray(kids) ? kids : [kids]) {
    const hit = findButtonTemplate(child);
    if (hit) return hit;
  }
  return null;
}
function buttonFor(tree) {
  if (typeof import_react.createElement !== "function") return null;
  try {
    const template = findButtonTemplate(tree);
    const press = () => {
      try {
        fake();
      } catch {
      }
    };
    const render = (props = {}) => template ? (0, import_react.cloneElement)(template, {
      ...props,
      key: "fakedm",
      __fakedm: true,
      accessibilityLabel: "FakeDM",
      IconComponent: FakeIcon
    }) : null;
    const ContextMenu = contextMenuComponent();
    if (template) {
      state.buttonKind = "discord";
      if (typeof ContextMenu === "function") {
        return (0, import_react.createElement)(ContextMenu, { align: "above", triggerOnTap: true, items: menuItems() }, render);
      }
      return render({ onPress: press });
    }
    return buildButton();
  } catch {
    return null;
  }
}
function buildButton() {
  var _a;
  if (typeof import_react.createElement !== "function") return null;
  const press = () => {
    try {
      fake();
    } catch {
    }
  };
  const ContextMenu = (_a = import_design.Design) == null ? void 0 : _a.ContextMenu;
  try {
    if (state.actionButton) {
      state.buttonKind = "discord";
      const button = (props = {}) => (0, import_react.createElement)(state.actionButton, {
        ...props,
        accessibilityLabel: "FakeDM",
        IconComponent: FakeIcon
      });
      if (typeof ContextMenu === "function") {
        return (0, import_react.createElement)(ContextMenu, { align: "above", triggerOnTap: true, items: menuItems() }, button);
      }
      return button({ onPress: press });
    }
    state.buttonKind = "plain";
    return (0, import_react.createElement)(
      import_react_native2.Pressable,
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
var hasKey = (node) => {
  var _a;
  return (0, import_react.isValidElement)(node) && (((_a = node.props) == null ? void 0 : _a.__fakedm) === true || node.key === "fakedm");
};
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
function pickFinders(api) {
  const candidates = [
    () => PathFinders,
    () => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = api == null ? void 0 : api.unscoped) == null ? void 0 : _a.discord) == null ? void 0 : _b.utils) == null ? void 0 : _c.modules) == null ? void 0 : _d.finders;
    },
    () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = api == null ? void 0 : api.discord) == null ? void 0 : _a.utils) == null ? void 0 : _b.modules) == null ? void 0 : _c.finders;
    },
    () => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = globalThis == null ? void 0 : globalThis.valenced) == null ? void 0 : _a.discord) == null ? void 0 : _b.utils) == null ? void 0 : _c.modules) == null ? void 0 : _d.finders;
    }
  ];
  for (const candidate of candidates) {
    try {
      const found = candidate();
      if (found && typeof found.getModuleWithImportedPath === "function") return found;
    } catch {
    }
  }
  return null;
}
function finders() {
  if (state.finders) return state.finders;
  return pickFinders(null);
}
function importedPaths() {
  try {
    const map = ImportTracker == null ? void 0 : ImportTracker.mImportedPaths;
    const out = [];
    if (map && typeof map.forEach === "function") {
      map.forEach((_id, path) => {
        if (typeof path === "string") out.push(path);
      });
    }
    return out;
  } catch {
    return [];
  }
}
function resolvePath(candidates, fallback) {
  const paths = importedPaths();
  for (const candidate of candidates) {
    const hit = paths.find((path) => path === candidate || path.endsWith("/" + candidate));
    if (hit) return hit;
  }
  return fallback;
}
var INPUT_CANDIDATES = ["native/ChatInput.tsx", "ChatInput.tsx", "native/ChatInput.ts"];
var BUTTON_CANDIDATES = ["action_buttons/ChatInputActionButton.tsx", "ChatInputActionButton.tsx"];
var withComponentName = (() => {
  try {
    const make = import_filters.createFilterGenerator;
    if (typeof make !== "function") return null;
    return make(
      ([name], _scopes, exports) => {
        var _a;
        return ((_a = exports == null ? void 0 : exports.type) == null ? void 0 : _a.length) === 1 && exports.type.displayName === name;
      },
      ([name]) => `component(${name})`
    );
  } catch {
    return null;
  }
})();
function watchComponent(name, done, cleanup) {
  if (!withComponentName) return false;
  try {
    const stop = (0, import_finders.getModules)(
      withComponentName(name),
      (mod) => {
        try {
          done(mod);
        } catch {
        }
      },
      { max: 1 }
    );
    if (typeof stop === "function") cleanup(stop);
    return true;
  } catch {
    return false;
  }
}
var PROBE_PATHS = [
  INPUT_PATH,
  BUTTON_PATH,
  "modules/chat_input/native/action_buttons/ChatInputRightActions.tsx",
  "modules/chat_input/native/action_buttons/ChatInputActions.tsx"
];
function probePaths() {
  return PROBE_PATHS.map((path) => {
    var _a, _b, _c;
    try {
      const [mod] = (_c = (_b = (_a = finders()) == null ? void 0 : _a.lookupModuleWithImportedPath) == null ? void 0 : _b.call(_a, path)) != null ? _c : [];
      return { path, found: !!mod };
    } catch {
      return { path, found: false };
    }
  });
}
function moduleFromPath(path) {
  var _a, _b, _c, _d;
  try {
    const api = finders();
    const [mod] = (_b = (_a = api == null ? void 0 : api.lookupModuleWithImportedPath) == null ? void 0 : _a.call(api, path)) != null ? _b : [];
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
  var _a;
  try {
    const finder = (_a = finders()) == null ? void 0 : _a.getModuleWithImportedPath;
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
        var _a2, _b2;
        let result = (_a2 = params[1]) != null ? _a2 : params[0];
        try {
          const rendered = params.find((value) => {
            var _a3;
            return (_a3 = import_react.isValidElement) == null ? void 0 : _a3(value);
          });
          if (rendered) result = rendered;
          if (state.cfg.button === false) return result;
          const button = buttonFor(result);
          if (!button) return result;
          return addButton(result, button);
        } catch (error) {
          (_b2 = logger == null ? void 0 : logger.warn) == null ? void 0 : _b2.call(logger, "[FakeDM] chat button skipped this render", error);
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
  const buttonPath = resolvePath(BUTTON_CANDIDATES, BUTTON_PATH);
  const inputPath = resolvePath(INPUT_CANDIDATES, INPUT_PATH);
  state.diag.buttonPath = buttonPath;
  state.diag.inputPath = inputPath;
  if (!state.actionButton) {
    state.actionButton = moduleFromPath(buttonPath);
    state.diag.button = state.actionButton ? "path" : "";
    if (!state.actionButton) {
      onModule(
        buttonPath,
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
    if (!state.actionButton) {
      watchComponent(
        "ChatInputActionButton",
        (mod) => {
          var _a2;
          const found = (_a2 = mod == null ? void 0 : mod.default) != null ? _a2 : mod;
          if (!found || state.actionButton) return;
          state.actionButton = found;
          state.diag.button = "display";
          if (!state.button || state.buttonKind !== "discord") state.button = buildButton();
        },
        cleanup
      );
    }
  }
  if (!state.button || state.actionButton && state.buttonKind !== "discord") state.button = buildButton();
  let ChatInput = moduleFromPath(inputPath);
  state.diag.input = ChatInput ? "path" : "";
  state.diag.inputName = ChatInput ? String((_b = (_a = ChatInput == null ? void 0 : ChatInput.displayName) != null ? _a : ChatInput == null ? void 0 : ChatInput.name) != null ? _b : "anonymous") : "";
  if (!ChatInput) {
    ChatInput = moduleByName("ChatInput");
    state.diag.input = ChatInput ? "name" : "";
  }
  if (ChatInput) return installPatch(ChatInput, cleanup, logger);
  if (!state.watchingByNameInput && withComponentName) {
    state.watchingByNameInput = true;
    watchComponent(
      "ChatInput",
      (mod) => {
        var _a2, _b2, _c, _d;
        const found = typeof (mod == null ? void 0 : mod.type) === "function" ? mod : (_a2 = mod == null ? void 0 : mod.default) != null ? _a2 : mod;
        if (!found) return;
        state.diag.input = "display";
        state.diag.inputName = String(
          (_d = (_c = (_b2 = mod == null ? void 0 : mod.type) == null ? void 0 : _b2.displayName) != null ? _c : found == null ? void 0 : found.displayName) != null ? _d : "ChatInput"
        );
        installPatch(found, cleanup, logger);
      },
      cleanup
    );
  }
  if (!state.watchingInput) {
    state.watchingInput = true;
    onModule(
      inputPath,
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
  get text() {
    return token("TEXT_NORMAL");
  },
  get muted() {
    return token("TEXT_MUTED");
  },
  get accent() {
    return token("BRAND_500");
  },
  get card() {
    return token("BACKGROUND_SECONDARY");
  },
  get input() {
    return token("BACKGROUND_TERTIARY");
  }
};
var WHEN_CHOICES = [
  { label: "Now", minutes: "0" },
  { label: "5 minutes ago", minutes: "5" },
  { label: "1 hour ago", minutes: "60" },
  { label: "3 hours ago", minutes: "180" },
  { label: "Yesterday", minutes: "1440" }
];
function Panel({ api } = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
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
  const StackView = (_d = D.Stack) != null ? _d : import_react_native2.View;
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
  const section = (title, children) => Group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.View, { style: { gap: 10, padding: 16 }, children }) }, title) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { backgroundColor: PALETTE.card, borderRadius: 12, padding: 12, gap: 10 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: PALETTE.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.4 }, children: title }),
    children
  ] }, title);
  const info = (label, subLabel) => Row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label, subLabel }, label) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { paddingVertical: 6 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: PALETTE.text, fontWeight: "600" }, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: PALETTE.muted, fontSize: 12 }, children: subLabel })
  ] }, label);
  const hint = (text) => DText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DText, { variant: "text-xs/medium", children: text }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: PALETTE.muted, fontSize: 12 }, children: text });
  const action = (label, subLabel, onPress) => Row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label, subLabel, arrow: true, onPress }, label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_native2.Pressable,
    {
      accessibilityRole: "button",
      accessibilityLabel: label,
      onPress,
      style: { backgroundColor: PALETTE.input, borderRadius: 10, paddingVertical: 12, alignItems: "center" },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: PALETTE.text, fontWeight: "700" }, children: label })
    },
    label
  );
  const field = (key, placeholder, options = {}) => {
    var _a2;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_native2.TextInput,
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
  const pick = (title, value, entries, onPick) => RadioGroup && RadioRow && entries.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, { title, value, onChange: onPick, children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioRow, { label: entry.label, subLabel: entry.subLabel, value: entry.value }, entry.value)) }, title) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { backgroundColor: PALETTE.card, borderRadius: 12, padding: 12, gap: 2 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: PALETTE.muted, fontSize: 12, fontWeight: "700", letterSpacing: 0.4 }, children: title }),
    entries.length ? entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_react_native2.Pressable,
      {
        accessibilityRole: "button",
        accessibilityLabel: entry.label,
        onPress: () => onPick(entry.value),
        style: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 9 },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: PALETTE.text, flex: 1 }, children: entry.label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: value === entry.value ? PALETTE.accent : PALETTE.muted }, children: value === entry.value ? "\u2713" : "" })
        ]
      },
      entry.value
    )) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: PALETTE.muted, paddingVertical: 9 }, children: "Nobody here yet" })
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
      info("Plugin API keys", state.apiKeys || "none"),
      info("Discord API keys", state.discordKeys || "none"),
      info("Import map", String(importedPaths().length) + " paths recorded"),
      info("Chat input path", state.diag.inputPath || "not resolved yet"),
      info("Chat bar button path", state.diag.buttonPath || "not resolved yet"),
      info(
        "Module finders",
        finders() ? "ready (" + Object.keys((_k = finders()) != null ? _k : {}).length + " exports)" : "missing"
      ),
      probePaths().map(
        (probe) => info(probe.path.split("/").slice(-1)[0], probe.found ? "resolves" : "not in this build")
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.ScrollView, { contentContainerStyle: { paddingHorizontal: 16, paddingTop: 16, gap: 16, paddingBottom: 80 }, keyboardShouldPersistTaps: "handled", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StackView, { ...D.Stack ? { spacing: 24 } : { style: { gap: 24 } }, children: [
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
    (_l = pages[cat]) != null ? _l : messagePage,
    section("Clean up", action("Clear fakes", "Removes every fake in this chat", () => run(clearNow)))
  ] }) });
}
function SettingsComponent(props = {}) {
  try {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { ...props });
  } catch {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { padding: 16 }, children: "FakeDM could not draw its settings." });
  }
}
function FakeScreen(props) {
  try {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsComponent, { ...props });
  } catch {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { padding: 16 }, children: "FakeDM could not draw its settings." });
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    state.button = null;
    state.buttonKind = "";
    state.watchingInput = false;
    state.watchingByNameInput = false;
    state.patched = false;
    try {
      state.finders = pickFinders(api);
      state.apiKeys = Object.keys(api != null ? api : {}).join(", ");
      state.discordKeys = Object.keys((_c = (_b = api == null ? void 0 : api.discord) != null ? _b : (_a = globalThis == null ? void 0 : globalThis.valenced) == null ? void 0 : _a.discord) != null ? _c : {}).join(", ");
    } catch {
    }
    try {
      state.storage = (_d = api == null ? void 0 : api.jsonStorage) != null ? _d : null;
      const cached = (_f = (_e = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _e.cache) != null ? _f : {};
      state.cfg = { ...DEFAULTS, ...cached };
      if (!Array.isArray(state.cfg.fakes)) state.cfg.fakes = [];
      if ((cached == null ? void 0 : cached.barDefault) !== 1 && (cached == null ? void 0 : cached.button) === void 0) {
        state.cfg = { ...state.cfg, button: true, barDefault: 1 };
        void ((_j = (_i = (_h = (_g = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _g.set) == null ? void 0 : _h.call(_g, { button: true, barDefault: 1 })) == null ? void 0 : _i.catch) == null ? void 0 : _j.call(_i, () => {
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
        if (typeof off === "function") (_k = api == null ? void 0 : api.cleanup) == null ? void 0 : _k.call(api, off);
      }
    } catch (error) {
      (_m = (_l = api == null ? void 0 : api.logger) == null ? void 0 : _l.warn) == null ? void 0 : _m.call(_l, "[FakeDM] could not watch chat selection", error);
    }
    try {
      patchChatInput(api == null ? void 0 : api.cleanup, api == null ? void 0 : api.logger);
    } catch (error) {
      (_o = (_n = api == null ? void 0 : api.logger) == null ? void 0 : _n.error) == null ? void 0 : _o.call(_n, "[FakeDM] chat bar button skipped", error);
    }
    if (state.cfg.section === true) {
      try {
        installSettingsEntry(api == null ? void 0 : api.cleanup, api == null ? void 0 : api.logger);
      } catch (error) {
        (_q = (_p = api == null ? void 0 : api.logger) == null ? void 0 : _p.error) == null ? void 0 : _q.call(_p, "[FakeDM] settings entry skipped", error);
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
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && (typeof __plugin === 'object' || typeof __plugin === 'function')) { try { Object.defineProperty(__plugin, 'default', { value: __plugin, enumerable: false, configurable: true }); } catch (ignored) { try { __plugin.default = __plugin; } catch (ignored2) {} } } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()