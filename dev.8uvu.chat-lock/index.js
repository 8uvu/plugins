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

// plugins/dev.8uvu.chat-lock/js/index.tsx
var index_exports = {};
__export(index_exports, {
  addLock: () => addLock,
  checkPasscode: () => checkPasscode,
  clearPasscode: () => clearPasscode,
  default: () => index_default,
  derivePin: () => derivePin,
  elementForGate: () => elementForGate,
  elementForList: () => elementForList,
  hasPasscode: () => hasPasscode,
  hidesFromList: () => hidesFromList,
  isLockedNow: () => isLockedNow,
  lockNow: () => lockNow,
  locks: () => locks,
  removeLock: () => removeLock,
  setPasscode: () => setPasscode,
  sha256: () => sha256,
  unlockWith: () => unlockWith
});
module.exports = __toCommonJS(index_exports);
var import_finders = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get getModules() { return __g().getModules }, get lookupModule() { return __g().lookupModule }, get lookupModules() { return __g().lookupModules }, get waitForModules() { return __g().waitForModules } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get createFilterGenerator() { return __g().createFilterGenerator }, get withProps() { return __g().withProps }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withName() { return __g().withName }, get withDependencies() { return __g().withDependencies }, get anyOf() { return __g().anyOf }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_flux = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Stores() { return __g().Stores }, get getStore() { return __g().getStore }, get onFluxEventDispatched() { return __g().onFluxEventDispatched }, get onAnyFluxEventDispatched() { return __g().onAnyFluxEventDispatched } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_patcher = (function () { const __g = () => { try { return (valenced.patcher) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get after() { return __g().after }, get before() { return __g().before }, get instead() { return __g().instead } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return (valenced.react && (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime)) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get afterJSX() { return __g().afterJSX }, get beforeJSX() { return __g().beforeJSX }, get insteadJSX() { return __g().insteadJSX } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get useState() { return __g().useState }, get createElement() { return __g().createElement }, get isValidElement() { return __g().isValidElement }, get cloneElement() { return __g().cloneElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native2 = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get Pressable() { return __g().Pressable }, get Modal() { return __g().Modal }, get ScrollView() { return __g().ScrollView }, get AppState() { return __g().AppState }, get Appearance() { return __g().Appearance }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();

// plugins/_shared/theme.ts
var import_common = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens }, get Logger() { return __g().Logger }, get Constants() { return __g().Constants } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get Pressable() { return __g().Pressable }, get Modal() { return __g().Modal }, get ScrollView() { return __g().ScrollView }, get AppState() { return __g().AppState }, get Appearance() { return __g().Appearance }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
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
    const definition2 = (_a = module2 == null ? void 0 : module2.SemanticColor) == null ? void 0 : _a[name];
    const resolve = (_c = (_b = module2 == null ? void 0 : module2.default) == null ? void 0 : _b.internal) == null ? void 0 : _c.resolveSemanticColor;
    if (typeof resolve === "function" && definition2) {
      return resolve(activeBase(), definition2);
    }
    const colours = (_e = (_d = module2 == null ? void 0 : module2.default) == null ? void 0 : _d.colors) == null ? void 0 : _e[name];
    if (typeof colours === "string") return colours;
    if (typeof definition2 === "string") return definition2;
  } catch {
  }
  return void 0;
}
var settingsScroll = { paddingHorizontal: 16, paddingTop: 16, gap: 16 };

// plugins/dev.8uvu.chat-lock/js/index.tsx
var import_jsx_runtime2 = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsxs() { return __g().jsxs }, get jsx() { return __g().jsx }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULTS = {
  enabled: true,
  salt: "",
  hash: "",
  iterations: 1e4,
  locks: [],
  autoLockMinutes: 0,
  mode: "place",
  hideFromList: false
};
var CHAT_SCREENS = ["Messages", "MessageList", "MessagesList", "ChannelMessages"];
var LIST_ROWS = ["PrivateChannel", "ChannelListItem", "ChannelListRow", "DMListItem"];
var AUTO_LOCK = [
  { label: "When I leave the app", value: 0 },
  { label: "After a minute", value: 1 },
  { label: "After 5 minutes", value: 5 },
  { label: "After 15 minutes", value: 15 }
];
var K = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
var rotr = (x, n) => x >>> n | x << 32 - n;
function sha256(text) {
  const bytes = [];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code < 128) bytes.push(code);
    else if (code < 2048) bytes.push(192 | code >> 6, 128 | code & 63);
    else bytes.push(224 | code >> 12, 128 | code >> 6 & 63, 128 | code & 63);
  }
  const bits = bytes.length * 8;
  bytes.push(128);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const high = Math.floor(bits / 4294967296);
  const low = bits >>> 0;
  for (let i = 3; i >= 0; i--) bytes.push(high >>> i * 8 & 255);
  for (let i = 3; i >= 0; i--) bytes.push(low >>> i * 8 & 255);
  const h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
  const w = new Array(64);
  for (let offset = 0; offset < bytes.length; offset += 64) {
    for (let i = 0; i < 16; i++) {
      const at = offset + i * 4;
      w[i] = bytes[at] << 24 | bytes[at + 1] << 16 | bytes[at + 2] << 8 | bytes[at + 3];
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ w[i - 15] >>> 3;
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ w[i - 2] >>> 10;
      w[i] = w[i - 16] + s0 + w[i - 7] + s1 | 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = e & f ^ ~e & g;
      const t1 = hh + S1 + ch + K[i] + w[i] | 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = a & b ^ a & c ^ b & c;
      const t2 = S0 + maj | 0;
      hh = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    h[0] = h[0] + a | 0;
    h[1] = h[1] + b | 0;
    h[2] = h[2] + c | 0;
    h[3] = h[3] + d | 0;
    h[4] = h[4] + e | 0;
    h[5] = h[5] + f | 0;
    h[6] = h[6] + g | 0;
    h[7] = h[7] + hh | 0;
  }
  return h.map((word) => (word >>> 0).toString(16).padStart(8, "0")).join("");
}
function derivePin(pin, salt, iterations) {
  let digest = sha256(salt + ":" + pin);
  for (let i = 1; i < Math.max(1, iterations); i++) digest = sha256(digest + salt);
  return digest;
}
function makeSalt() {
  let salt = "";
  for (let i = 0; i < 16; i++) salt += Math.floor(Math.random() * 36).toString(36);
  return salt;
}
var api = null;
var cfg = { ...DEFAULTS };
var unlocked = /* @__PURE__ */ new Set();
var unlockedAt = 0;
var listeners = /* @__PURE__ */ new Set();
var diag = { chatScreen: "", listRow: "", gate: "" };
function storage() {
  var _a, _b;
  try {
    const live = (_b = (_a = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _a.use) == null ? void 0 : _b.call(_a);
    if (live) cfg = { ...DEFAULTS, ...live };
  } catch {
  }
  return cfg;
}
function persist(patch) {
  var _a, _b;
  cfg = { ...cfg, ...patch };
  try {
    (_b = (_a = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _a.set) == null ? void 0 : _b.call(_a, patch);
  } catch {
  }
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch {
    }
  }
}
function hidesFromList() {
  const settings = storage();
  return settings.mode === "hidden" || settings.hideFromList === true;
}
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function hasPasscode() {
  const settings = storage();
  return typeof settings.hash === "string" && settings.hash.length === 64 && !!settings.salt;
}
function setPasscode(pin) {
  const clean = String(pin != null ? pin : "").trim();
  if (!/^[0-9]{4,12}$/.test(clean)) return false;
  const salt = makeSalt();
  const iterations = storage().iterations || DEFAULTS.iterations;
  persist({ salt, hash: derivePin(clean, salt, iterations), iterations });
  unlocked.clear();
  return true;
}
function clearPasscode() {
  persist({ salt: "", hash: "" });
  unlocked.clear();
}
function checkPasscode(pin) {
  const settings = storage();
  if (!settings.hash || !settings.salt) return false;
  const attempt = derivePin(String(pin != null ? pin : "").trim(), settings.salt, settings.iterations || DEFAULTS.iterations);
  if (attempt.length !== settings.hash.length) return false;
  let diff = 0;
  for (let i = 0; i < attempt.length; i++) diff |= attempt.charCodeAt(i) ^ settings.hash.charCodeAt(i);
  return diff === 0;
}
function locks() {
  const settings = storage();
  return Array.isArray(settings.locks) ? settings.locks : [];
}
function addLock(id, name) {
  if (!id) return;
  const existing = locks().filter((lock) => lock.id !== id);
  persist({ locks: [...existing, { id, name: name || id }] });
}
function removeLock(id) {
  persist({ locks: locks().filter((lock) => lock.id !== id) });
  unlocked.delete(id);
}
function isLockedNow(id) {
  var _a;
  const settings = storage();
  if (!settings.enabled || !hasPasscode()) return false;
  if (!id || !locks().some((lock) => lock.id === id)) return false;
  if (unlocked.has(id)) {
    const window = Number((_a = settings.autoLockMinutes) != null ? _a : 0);
    if (window === 0) return false;
    if (Date.now() - unlockedAt < window * 6e4) return false;
    unlocked.delete(id);
  }
  return true;
}
function unlockWith(pin, id) {
  if (!checkPasscode(pin)) return false;
  if (id) unlocked.add(id);
  unlockedAt = Date.now();
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch {
    }
  }
  return true;
}
function lockNow() {
  unlocked.clear();
  for (const listener of [...listeners]) {
    try {
      listener();
    } catch {
    }
  }
}
function channelIdOf(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  if (!props) return "";
  return props.channelId || ((_a = props.channel) == null ? void 0 : _a.id) || ((_c = (_b = props.route) == null ? void 0 : _b.params) == null ? void 0 : _c.channelId) || ((_f = (_e = (_d = props.route) == null ? void 0 : _d.params) == null ? void 0 : _e.channel) == null ? void 0 : _f.id) || ((_j = (_i = (_h = (_g = props.navigation) == null ? void 0 : _g.getState) == null ? void 0 : _h.call(_g)) == null ? void 0 : _i.params) == null ? void 0 : _j.channelId) || "";
}
function safeStore(name) {
  var _a, _b;
  try {
    return (_b = (_a = import_flux.Stores) == null ? void 0 : _a[name]) != null ? _b : null;
  } catch {
    return null;
  }
}
function channelName(id) {
  var _a, _b, _c;
  try {
    const channel = (_b = (_a = safeStore("ChannelStore")) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, id);
    if (!channel) return "this chat";
    const recipients = channel.recipients;
    if (Array.isArray(recipients) && recipients.length) {
      return recipients.map((user) => {
        var _a2, _b2;
        return (_b2 = (_a2 = user == null ? void 0 : user.globalName) != null ? _a2 : user == null ? void 0 : user.username) != null ? _b2 : "someone";
      }).join(", ");
    }
    return (_c = channel.name) != null ? _c : "this chat";
  } catch {
    return "this chat";
  }
}
var componentNamed = (() => {
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
function LockScreen({ id, onUnlocked }) {
  const [pin, setPin] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)("");
  const name = channelName(id);
  const submit = () => {
    if (unlockWith(pin, id)) {
      setPin("");
      setError("");
      onUnlocked == null ? void 0 : onUnlocked();
      return;
    }
    setError("That passcode is not right.");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native2.View, { style: { flex: 1, paddingHorizontal: 16, paddingTop: 16, gap: 16, justifyContent: "center" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontSize: 18, fontWeight: "600" }, children: "This chat is locked" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_MUTED") }, children: [
      name,
      " is hidden until you enter your passcode."
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_react_native2.TextInput,
      {
        accessibilityLabel: "Passcode",
        value: pin,
        onChangeText: (text) => {
          setPin(text.replace(/[^0-9]/g, ""));
          setError("");
        },
        placeholder: "Passcode",
        placeholderTextColor: token("TEXT_MUTED"),
        keyboardType: "number-pad",
        secureTextEntry: true,
        maxLength: 12,
        style: {
          color: token("TEXT_NORMAL"),
          backgroundColor: token("BACKGROUND_SECONDARY"),
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 10
        }
      }
    ),
    error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("TEXT_DANGER") }, children: error }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_react_native2.Pressable,
      {
        accessibilityLabel: "Unlock chat",
        accessibilityRole: "button",
        onPress: submit,
        style: { backgroundColor: token("BRAND_500"), borderRadius: 4, paddingVertical: 10, alignItems: "center" },
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontWeight: "600" }, children: "Unlock" })
      }
    )
  ] });
}
function Gate({ id }) {
  const [tick, setTick] = (0, import_react.useState)(0);
  (0, import_react.useState)(() => {
    subscribe(() => setTick((value) => value + 1));
    return 0;
  });
  void tick;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LockScreen, { id, onUnlocked: () => setTick((value) => value + 1) });
}
function elementForGate(element) {
  var _a;
  try {
    const id = channelIdOf((_a = element == null ? void 0 : element.props) != null ? _a : {});
    if (!id || !isLockedNow(id)) return element;
    return (0, import_react.createElement)(Gate, { key: "chatlock-gate", id });
  } catch {
    return element;
  }
}
function elementForList(element) {
  var _a, _b, _c, _d, _e;
  try {
    const props = (_a = element == null ? void 0 : element.props) != null ? _a : {};
    const id = (_e = (_d = (_c = (_b = props.channel) == null ? void 0 : _b.id) != null ? _c : props.channelId) != null ? _d : props.id) != null ? _e : "";
    if (!hidesFromList() || !isLockedNow(id)) return element;
    return null;
  } catch {
    return element;
  }
}
function elementTypes(mod) {
  const types = [];
  for (const candidate of [mod == null ? void 0 : mod.default, mod == null ? void 0 : mod.type, typeof mod === "function" ? mod : null]) {
    if (!candidate || types.includes(candidate)) continue;
    if (typeof candidate === "function" || typeof candidate === "object") types.push(candidate);
  }
  return types;
}
function hookModule(mod, hook, cleanup) {
  const types = elementTypes(mod);
  if (!types.length) return false;
  if (typeof import_jsx_runtime.afterJSX === "function") {
    let hooked = 0;
    for (const type of types) {
      try {
        const stop = (0, import_jsx_runtime.afterJSX)(type, hook);
        if (typeof stop === "function") cleanup(stop);
        hooked++;
      } catch {
      }
    }
    if (hooked) {
      diag.gate = "jsx";
      return true;
    }
  }
  if (typeof (mod == null ? void 0 : mod.type) === "function") {
    try {
      const unhook = (0, import_patcher.after)(
        mod,
        "type",
        (...params) => {
          var _a;
          return hook((_a = params.find((value) => {
            var _a2;
            return (_a2 = import_react.isValidElement) == null ? void 0 : _a2(value);
          })) != null ? _a : params[1]);
        }
      );
      if (typeof unhook === "function") cleanup(unhook);
      diag.gate = "render";
      return true;
    } catch {
    }
  }
  return false;
}
function installChatGate(cleanup) {
  for (const name of CHAT_SCREENS) {
    let handled = false;
    try {
      (0, import_finders.getModules)(
        componentNamed(name),
        (mod) => {
          if (handled) return;
          handled = hookModule(mod, elementForGate, cleanup);
          if (handled) diag.chatScreen = name;
        },
        { max: 1 }
      );
      if (handled) return true;
    } catch {
    }
  }
  return false;
}
function installListHiding(cleanup) {
  for (const name of LIST_ROWS) {
    let handled = false;
    try {
      (0, import_finders.getModules)(
        componentNamed(name),
        (mod) => {
          if (handled) return;
          handled = hookModule(mod, elementForList, cleanup);
          if (handled) diag.listRow = name;
        },
        { max: 1 }
      );
      if (handled) return;
    } catch {
    }
  }
}
function privateChannels() {
  var _a, _b, _c, _d, _e, _f;
  try {
    const store = safeStore("ChannelStore");
    const list = (_f = (_e = (_c = (_a = store == null ? void 0 : store.getSortedPrivateChannels) == null ? void 0 : _a.call(store)) != null ? _c : (_b = store == null ? void 0 : store.getPrivateChannels) == null ? void 0 : _b.call(store)) != null ? _e : (_d = store == null ? void 0 : store.getDMChannels) == null ? void 0 : _d.call(store)) != null ? _f : [];
    return list.map((channel) => {
      var _a2, _b2;
      return { id: String((_a2 = channel == null ? void 0 : channel.id) != null ? _a2 : ""), label: channelName(String((_b2 = channel == null ? void 0 : channel.id) != null ? _b2 : "")) };
    }).filter((entry) => entry.id);
  } catch {
    return [];
  }
}
function SettingsPage() {
  var _a, _b, _c, _d;
  const [, setVersion] = (0, import_react.useState)(0);
  const refresh = () => setVersion((value) => value + 1);
  const [pinMode, setPinMode] = (0, import_react.useState)("");
  const [pin, setPin] = (0, import_react.useState)("");
  const [confirm, setConfirm] = (0, import_react.useState)("");
  const [pinError, setPinError] = (0, import_react.useState)("");
  const [picking, setPicking] = (0, import_react.useState)(false);
  const [choices, setChoices] = (0, import_react.useState)([]);
  const settings = storage();
  const ModalC = (_a = import_react_native2.Modal) != null ? _a : import_react_native2.View;
  const D = (_b = import_design.Design) != null ? _b : {};
  const Rows = D.TableRowGroup;
  const Row = D.TableRow;
  const SwitchRow = D.TableSwitchRow;
  const RadioGroup = D.TableRadioGroup;
  const RadioRow = D.TableRadioRow;
  const Button = D.Button;
  const savePin = () => {
    if (pin !== confirm) {
      setPinError("The two passcodes do not match.");
      return;
    }
    if (!setPasscode(pin)) {
      setPinError("Use 4 to 12 digits.");
      return;
    }
    setPin("");
    setConfirm("");
    setPinError("");
    setPinMode("");
    refresh();
  };
  const openPicker = () => {
    setChoices(privateChannels());
    setPicking(true);
  };
  if (Rows && Row && SwitchRow) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native2.ScrollView, { style: settingsScroll, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Rows, { title: "Chat Lock", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SwitchRow,
          {
            label: "Lock chats",
            subLabel: "Locked chats ask for your passcode before they open.",
            value: settings.enabled !== false,
            onValueChange: (value) => {
              persist({ enabled: value });
              refresh();
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Row,
          {
            label: hasPasscode() ? "Change passcode" : "Set a passcode",
            subLabel: hasPasscode() ? "A passcode is set." : "4 to 12 digits. Needed before a chat can be locked.",
            onPress: () => setPinMode("set")
          }
        ),
        RadioGroup && RadioRow ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          RadioGroup,
          {
            title: "Lock again",
            value: String((_c = settings.autoLockMinutes) != null ? _c : 0),
            onChange: (value) => {
              persist({ autoLockMinutes: Number(value) });
              refresh();
            },
            children: AUTO_LOCK.map((option) => {
              var _a2;
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                RadioRow,
                {
                  label: option.label,
                  value: String(option.value),
                  subLabel: String((_a2 = settings.autoLockMinutes) != null ? _a2 : 0) === String(option.value) ? "Selected" : void 0
                },
                option.value
              );
            })
          }
        ) : null,
        RadioGroup && RadioRow ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          RadioGroup,
          {
            title: "Where a locked chat lives",
            value: (_d = settings.mode) != null ? _d : "place",
            onChange: (value) => {
              persist({ mode: value === "hidden" ? "hidden" : "place", hideFromList: false });
              refresh();
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                RadioRow,
                {
                  label: "Keep it in place",
                  value: "place",
                  subLabel: "Stays in your chat list; opening it asks for the passcode."
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                RadioRow,
                {
                  label: "Hide it from the list",
                  value: "hidden",
                  subLabel: "Leaves the list and appears under Locked chats below. Opening it still asks."
                }
              )
            ]
          }
        ) : null
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Rows, { title: "Locked chats", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Row,
          {
            label: "Add a chat",
            subLabel: picking ? "Close the picker first." : "Choose a DM to lock.",
            onPress: openPicker
          }
        ),
        locks().length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "No chats locked yet", subLabel: "Add one above." }) : null,
        locks().map((lock) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Row,
          {
            label: lock.name,
            subLabel: "Locked",
            onPress: () => {
              removeLock(lock.id);
              refresh();
            }
          },
          lock.id
        ))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Rows, { title: "Good to know", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "This is a screen lock", subLabel: "Messages are not encrypted, and they stay on Discord's servers." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "Who it stops", subLabel: "Someone who picks up your phone. Not someone with your account." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "Lock now", subLabel: "Locks every chat again straight away.", onPress: () => {
          lockNow();
          refresh();
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "Fingerprint", subLabel: "Not available: the plugin runtime has no biometric API, so the passcode is the only check." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "Folders", subLabel: "Discord has no folder API for plugins; hiding a chat and listing it under Locked chats is the closest equivalent." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Row,
          {
            label: "Chat screen",
            subLabel: diag.chatScreen ? "Found: " + diag.chatScreen + (diag.gate ? " via " + diag.gate : "") : "Not found on this build yet. Open a chat once, then come back."
          }
        )
      ] }),
      picking ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Rows, { title: "Choose a chat", children: [
        choices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "No chats to choose", subLabel: "Your DM list has not loaded yet. Open your messages once, then try again." }) : null,
        choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          Row,
          {
            label: choice.label,
            subLabel: locks().some((lock) => lock.id === choice.id) ? "Already locked" : "Tap to lock",
            onPress: () => {
              addLock(choice.id, choice.label);
              refresh();
            }
          },
          choice.id
        )),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Row, { label: "Done", onPress: () => setPicking(false) })
      ] }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ModalC, { visible: pinMode === "set", transparent: true, animationType: "fade", onRequestClose: () => setPinMode(""), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.View, { style: { flex: 1, justifyContent: "center", paddingHorizontal: 16, backgroundColor: token("BACKGROUND_PRIMARY") }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native2.View, { style: { backgroundColor: token("BACKGROUND_SECONDARY"), borderRadius: 8, padding: 16, gap: 12 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontSize: 16, fontWeight: "600" }, children: "Set a passcode" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_react_native2.TextInput,
          {
            accessibilityLabel: "New passcode",
            value: pin,
            onChangeText: (text) => setPin(text.replace(/[^0-9]/g, "")),
            placeholder: "New passcode",
            placeholderTextColor: token("TEXT_MUTED"),
            keyboardType: "number-pad",
            secureTextEntry: true,
            maxLength: 12,
            style: { color: token("TEXT_NORMAL"), backgroundColor: token("BACKGROUND_TERTIARY"), borderRadius: 8, padding: 10 }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_react_native2.TextInput,
          {
            accessibilityLabel: "Repeat passcode",
            value: confirm,
            onChangeText: (text) => setConfirm(text.replace(/[^0-9]/g, "")),
            placeholder: "Repeat passcode",
            placeholderTextColor: token("TEXT_MUTED"),
            keyboardType: "number-pad",
            secureTextEntry: true,
            maxLength: 12,
            style: { color: token("TEXT_NORMAL"), backgroundColor: token("BACKGROUND_TERTIARY"), borderRadius: 8, padding: 10 }
          }
        ),
        pinError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("TEXT_DANGER") }, children: pinError }) : null,
        Button ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { text: "Save passcode", onPress: savePin }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Pressable, { accessibilityLabel: "Save passcode", onPress: savePin, style: { paddingVertical: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("BRAND_500"), fontWeight: "600" }, children: "Save passcode" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Pressable, { accessibilityLabel: "Cancel", onPress: () => {
          setPinMode("");
          setPin("");
          setConfirm("");
          setPinError("");
        }, style: { paddingVertical: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED") }, children: "Cancel" }) })
      ] }) }) })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native2.ScrollView, { style: settingsScroll, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontWeight: "600" }, children: "Chat Lock" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_MUTED") }, children: [
      hasPasscode() ? "Passcode set." : "No passcode yet.",
      " ",
      locks().length,
      " chat(s) locked."
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED") }, children: "Discord's settings rows were not available, so this is a summary only." })
  ] });
}
var definition = {
  jsonStorage: { load: true, default: DEFAULTS },
  start(pluginApi) {
    var _a, _b, _c, _d, _e, _f, _g;
    api = pluginApi;
    storage();
    try {
      const cleanups = [];
      const cleanup = (fn) => {
        if (typeof fn === "function") cleanups.push(fn);
      };
      (_a = pluginApi == null ? void 0 : pluginApi.cleanup) == null ? void 0 : _a.call(pluginApi, () => {
        for (const fn of cleanups) {
          try {
            fn();
          } catch {
          }
        }
        cleanups.length = 0;
      });
      installChatGate(cleanup);
      installListHiding(cleanup);
      try {
        const subscription = (_c = (_b = import_react_native2.AppState) == null ? void 0 : _b.addEventListener) == null ? void 0 : _c.call(_b, "change", (next) => {
          if (next === "background") lockNow();
        });
        if (subscription == null ? void 0 : subscription.remove) cleanup(() => subscription.remove());
      } catch {
      }
      (_e = (_d = pluginApi == null ? void 0 : pluginApi.logger) == null ? void 0 : _d.log) == null ? void 0 : _e.call(_d, `[ChatLock] chat screen: ${diag.chatScreen || "not found"}; list row: ${diag.listRow || "not found"}`);
    } catch (error) {
      (_g = (_f = pluginApi == null ? void 0 : pluginApi.logger) == null ? void 0 : _f.warn) == null ? void 0 : _g.call(_f, "[ChatLock] setup was incomplete", error);
    }
  },
  stop() {
    lockNow();
  },
  SettingsComponent: SettingsPage
};
Object.defineProperty(definition, "__test", {
  value: {
    sha256,
    derivePin,
    setPasscode,
    clearPasscode,
    checkPasscode,
    addLock,
    removeLock,
    isLockedNow,
    unlockWith,
    lockNow,
    locks,
    hasPasscode,
    diag,
    LockScreen,
    storage,
    elementForGate,
    elementForList,
    hidesFromList
  },
  enumerable: false
});
var index_default = plugin(definition);
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && (typeof __plugin === 'object' || typeof __plugin === 'function')) { try { Object.defineProperty(__plugin, 'default', { value: __plugin, enumerable: false, configurable: true }); } catch (ignored) { try { __plugin.default = __plugin; } catch (ignored2) {} } } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return { default: __plugin }; })()