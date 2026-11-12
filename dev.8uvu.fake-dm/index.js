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
var import_finders = (valenced.modules.finders);
var import_filters = (valenced.modules.finders.filters);
var import_design = (valenced.discord.design);
var JsxRuntime = __toESM(((function () { const rt = () => (valenced.react && (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime)) || {}; return { get beforeJSX() { return rt().beforeJSX }, get afterJSX() { return rt().afterJSX }, get insteadJSX() { return rt().insteadJSX } }; })()));
var import_react = ((function () { const R = (valenced.react && valenced.react.React) || {}; return { default: R, ...R }; })());
var import_react_native = ((function () { return { ...((valenced.react && valenced.react.ReactNative) || {}) }; })());
var import_jsx_runtime = ((function () { const rt = () => (valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime)) || {}; return { get jsx() { return rt().jsx }, get jsxs() { return rt().jsxs }, get Fragment() { return rt().Fragment } }; })());
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
function installPill(cleanup, logger) {
  var _a, _b;
  const hook = resolveAfterJSX();
  if (!hook) {
    (_a = logger == null ? void 0 : logger.warn) == null ? void 0 : _a.call(
      logger,
      "[FakeDM] this build exposes no afterJSX hook, so the chat-bar Fake pill cannot be installed. Settings and the inject actions still work."
    );
    return;
  }
  const filter = (0, import_filters.anyOf)(...ROW_NAMES.map((name) => (0, import_filters.withName)(name)));
  cleanup(
    (0, import_finders.getModules)(
      filter,
      (row) => {
        var _a2, _b2;
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
        (_b2 = logger == null ? void 0 : logger.log) == null ? void 0 : _b2.call(logger, "[FakeDM] chat-bar pill installed on " + (row.name || "the chat action row"));
      },
      { max: 1 }
    )
  );
  if (state.installed) return;
  const [seen] = (0, import_finders.lookupModule)(filter);
  if (seen) return;
  (_b = logger == null ? void 0 : logger.warn) == null ? void 0 : _b.call(logger, "[FakeDM] no chat action row is loaded yet; waiting for one of " + ROW_NAMES.join(", "));
  state.warnTimer = setTimeout(() => {
    var _a2;
    state.warnTimer = null;
    if (state.installed) return;
    (_a2 = logger == null ? void 0 : logger.warn) == null ? void 0 : _a2.call(
      logger,
      "[FakeDM] chat-bar pill NOT installed: none of " + ROW_NAMES.join(", ") + " appeared. That is why the Fake button is missing. Settings and the inject actions still work."
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
function addPill(el) {
  var _a, _b, _c;
  const enabled = (_c = (_b = (_a = state.storage) == null ? void 0 : _a.cache) == null ? void 0 : _b.chatButton) != null ? _c : state.cfg.chatButton;
  if (!enabled || !(el == null ? void 0 : el.props) || hasPill(el)) return el;
  const kids = el.props.children;
  if (!Array.isArray(kids)) return el;
  const i = kids.findIndex((k) => hasActionRow(k));
  if (i < 0) return el;
  const row = kids[i];
  const rowKids = [...row.props.children, chatButton()];
  const nextRow = { ...row, props: { ...row.props, children: rowKids }, children: rowKids };
  const nextKids = kids.slice();
  nextKids[i] = nextRow;
  return { ...el, props: { ...el.props, children: nextKids }, children: nextKids };
}
function SettingsComponent({ api }) {
  var _a, _b;
  const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
  const set = (patch) => {
    var _a2, _b2;
    return (_b2 = (_a2 = api.jsonStorage.set(patch)).catch) == null ? void 0 : _b2.call(_a2, () => {
    });
  };
  const D = (_b = import_design.Design) != null ? _b : {};
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
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    state.storage = jsonStorage;
    state.cfg = { ...DEFAULTS, ...(_a = jsonStorage.cache) != null ? _a : {} };
    state.installed = false;
    cleanup(() => {
      state.installed = false;
    });
    installPill(cleanup, logger);
  },
  SettingsComponent,
  __engine: { injectMessage, injectReaction, injectCall, clearFakesInChannel, parseBatchScript }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } return __plugin; })()