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

// plugins/dev.8uvu.ghost-ping-sniper/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  engine: () => engine
});
module.exports = __toCommonJS(index_exports);
var import_flux = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Stores() { return __g().Stores }, get onFluxEventDispatched() { return __g().onFluxEventDispatched }, get getStore() { return __g().getStore }, get onAnyFluxEventDispatched() { return __g().onAnyFluxEventDispatched } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_actions = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.actions) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get ToastActionCreators() { return __g().ToastActionCreators }, get ActionSheetActionCreators() { return __g().ActionSheetActionCreators }, get AlertActionCreators() { return __g().AlertActionCreators } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Alert() { return __g().Alert }, get ScrollView() { return __g().ScrollView }, get Text() { return __g().Text }, get Pressable() { return __g().Pressable }, get View() { return __g().View }, get TextInput() { return __g().TextInput }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Linking() { return __g().Linking }, get Appearance() { return __g().Appearance }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsxs() { return __g().jsxs }, get jsx() { return __g().jsx }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULTS = { toast: true, alert: false, everyone: true };
var CACHE_TTL_MS = 10 * 60 * 1e3;
var MAX_CACHE = 500;
var MAX_LOG = 50;
var cache = /* @__PURE__ */ new Map();
var log = [];
function selfId() {
  var _a, _b, _c, _d;
  try {
    return String((_d = (_c = (_b = (_a = import_flux.Stores.UserStore) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a)) == null ? void 0 : _c.id) != null ? _d : "");
  } catch {
    return "";
  }
}
function userName(userId) {
  var _a, _b, _c, _d;
  try {
    const user = (_b = (_a = import_flux.Stores.UserStore) == null ? void 0 : _a.getUser) == null ? void 0 : _b.call(_a, userId);
    return String((_d = (_c = user == null ? void 0 : user.globalName) != null ? _c : user == null ? void 0 : user.username) != null ? _d : userId);
  } catch {
    return String(userId);
  }
}
function channelLabel(channelId, guildId) {
  var _a, _b, _c;
  try {
    const channel = (_b = (_a = import_flux.Stores.ChannelStore) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, channelId);
    if (!channel) return guildId ? "a channel" : "a DM";
    return guildId ? "#" + String((_c = channel.name) != null ? _c : "unknown") : "a DM";
  } catch {
    return guildId ? "a channel" : "a DM";
  }
}
function mentionsMe(message, me, includeEveryone) {
  var _a;
  if (!message || ((_a = message.author) == null ? void 0 : _a.id) === me) return false;
  if (Array.isArray(message.mentions) && message.mentions.some((m) => {
    var _a2;
    return String((_a2 = m == null ? void 0 : m.id) != null ? _a2 : m) === me;
  })) return true;
  if (includeEveryone && (message.mention_everyone || message.mention_here)) return true;
  return false;
}
function prune(now) {
  for (const [id, entry] of cache) {
    if (now - entry.at > CACHE_TTL_MS) cache.delete(id);
  }
  while (cache.size > MAX_CACHE) {
    const oldest = cache.keys().next().value;
    if (oldest === void 0) break;
    cache.delete(oldest);
  }
}
function showToast(text) {
  try {
    import_actions.ToastActionCreators.open("ghost-ping-sniper", { text, variant: "default" });
  } catch {
    try {
      import_actions.ToastActionCreators.open({ key: "ghost-ping-sniper", content: text });
    } catch {
    }
  }
}
var engine = {
  handleCreate(api, payload) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const cfg = (_b = (_a = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _a.cache) != null ? _b : DEFAULTS;
    const message = payload == null ? void 0 : payload.message;
    if (!(message == null ? void 0 : message.id)) return;
    if (!mentionsMe(message, selfId(), cfg.everyone !== false)) return;
    const now = Date.now();
    prune(now);
    cache.set(String(message.id), {
      id: String(message.id),
      channelId: String((_d = (_c = message.channel_id) != null ? _c : payload == null ? void 0 : payload.channelId) != null ? _d : ""),
      guildId: (_g = (_f = (_e = message.guild_id) != null ? _e : payload == null ? void 0 : payload.guild_id) != null ? _f : payload == null ? void 0 : payload.guildId) != null ? _g : null,
      author: userName(String((_i = (_h = message.author) == null ? void 0 : _h.id) != null ? _i : "")),
      authorId: String((_k = (_j = message.author) == null ? void 0 : _j.id) != null ? _k : ""),
      content: String((_l = message.content) != null ? _l : ""),
      at: now
    });
  },
  handleDelete(api, payload) {
    var _a, _b, _c, _d, _e, _f, _g;
    const cfg = (_b = (_a = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _a.cache) != null ? _b : DEFAULTS;
    const id = String((_e = (_d = payload == null ? void 0 : payload.id) != null ? _d : (_c = payload == null ? void 0 : payload.message) == null ? void 0 : _c.id) != null ? _e : "");
    const held = cache.get(id);
    if (!held) return;
    cache.delete(id);
    const channel = channelLabel(held.channelId, held.guildId);
    const entry = { id, channel, author: held.author, content: held.content, at: Date.now() };
    log.unshift(entry);
    while (log.length > MAX_LOG) log.pop();
    if (cfg.toast !== false) showToast(`${held.author} ghost-pinged you in ${channel}`);
    if (cfg.alert) {
      try {
        (_g = (_f = import_react_native.Alert) == null ? void 0 : _f.alert) == null ? void 0 : _g.call(_f, "Ghost ping", `${held.author} in ${channel}: ${held.content}`);
      } catch {
      }
    }
  },
  getLog: () => [...log],
  clearLog: () => {
    log.length = 0;
    cache.clear();
  },
  cacheSize: () => cache.size
};
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  engine,
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    const api = { jsonStorage };
    cleanup((0, import_flux.onFluxEventDispatched)("MESSAGE_CREATE", (payload) => engine.handleCreate(api, payload)));
    cleanup((0, import_flux.onFluxEventDispatched)("MESSAGE_DELETE", (payload) => engine.handleDelete(api, payload)));
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[GhostPingSniper] started");
  },
  stop() {
    cache.clear();
  },
  SettingsComponent({ api }) {
    var _a, _b;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => api.jsonStorage.set(patch);
    const entries = engine.getLog();
    const D = (_b = import_design.Design) != null ? _b : {};
    const rows = entries.map((entry) => ({ entry }));
    if (D.TableRowGroup && D.TableSwitchRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "GhostPingSniper", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Toast on detection",
              value: settings.toast !== false,
              onValueChange: (v) => set({ toast: v })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Alert on detection",
              value: settings.alert === true,
              onValueChange: (v) => set({ alert: v })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Include @everyone / @here",
              value: settings.everyone !== false,
              onValueChange: (v) => set({ everyone: v })
            }
          ),
          D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableRow,
            {
              label: "Clear log",
              subLabel: `${entries.length} caught`,
              onPress: () => engine.clearLog()
            }
          ) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: `Caught pings (${entries.length})`, children: rows.map(
          ({ entry }) => D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableRow,
            {
              label: `${entry.author} in ${entry.channel}`,
              subLabel: entry.content
            },
            entry.id + String(entry.at)
          ) : null
        ) })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "GhostPingSniper" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Toast on detection", onPress: () => set({ toast: !(settings.toast !== false) }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Toast on detection: ",
        settings.toast !== false ? "on" : "off"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Alert on detection", onPress: () => set({ alert: !(settings.alert === true) }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Alert on detection: ",
        settings.alert === true ? "on" : "off"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.Pressable,
        {
          accessibilityLabel: "Include @everyone / @here",
          onPress: () => set({ everyone: !(settings.everyone !== false) }),
          style: { paddingVertical: 8 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
            "Include @everyone / @here: ",
            settings.everyone !== false ? "on" : "off"
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Clear log", onPress: () => engine.clearLog(), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Clear log (",
        entries.length,
        ")"
      ] }) }),
      rows.map(({ entry }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { paddingVertical: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
          entry.author,
          " in ",
          entry.channel
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8" }, children: entry.content })
      ] }, entry.id + String(entry.at)))
    ] });
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()