(() => {
    try {
        const module = { exports: {} };
        const exports = module.exports;
        var __defProp = Object.defineProperty;
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

// plugins/dev.8uvu.voice-guard/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var PLUGIN_VERSION = "1.0.1";
var DEBOUNCE_MS = 1500;
var MAX_RECONNECTS = 3;
var DEFAULTS = { reconnect: true, autoUndeafen: true, autoUnmute: true };
function getValenced() {
  try {
    if (typeof valenced !== "undefined" && valenced) return valenced;
  } catch {
  }
  return null;
}
function getReact() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  try {
    const r = (_b = (_a = getValenced()) == null ? void 0 : _a.react) == null ? void 0 : _b.React;
    if (r == null ? void 0 : r.createElement) return r;
  } catch {
  }
  try {
    if (typeof revenge !== "undefined") return (_d = (_c = revenge == null ? void 0 : revenge.react) == null ? void 0 : _c.React) != null ? _d : null;
  } catch {
  }
  try {
    if (typeof bunny !== "undefined") return (_h = (_g = bunny == null ? void 0 : bunny.React) != null ? _g : (_f = (_e = bunny == null ? void 0 : bunny.metro) == null ? void 0 : _e.common) == null ? void 0 : _f.React) != null ? _h : null;
  } catch {
  }
  try {
    if (typeof vendetta !== "undefined") return (_k = (_j = (_i = vendetta == null ? void 0 : vendetta.metro) == null ? void 0 : _i.common) == null ? void 0 : _j.React) != null ? _k : null;
  } catch {
  }
  return null;
}
function getRN() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  try {
    const rn = (_b = (_a = getValenced()) == null ? void 0 : _a.react) == null ? void 0 : _b.ReactNative;
    if ((rn == null ? void 0 : rn.View) && (rn == null ? void 0 : rn.Text)) return rn;
  } catch {
  }
  try {
    if (typeof revenge !== "undefined") return (_d = (_c = revenge == null ? void 0 : revenge.react) == null ? void 0 : _c.ReactNative) != null ? _d : null;
  } catch {
  }
  try {
    if (typeof bunny !== "undefined") return (_h = (_g = bunny == null ? void 0 : bunny.ReactNative) != null ? _g : (_f = (_e = bunny == null ? void 0 : bunny.metro) == null ? void 0 : _e.common) == null ? void 0 : _f.ReactNative) != null ? _h : null;
  } catch {
  }
  try {
    if (typeof vendetta !== "undefined") return (_k = (_j = (_i = vendetta == null ? void 0 : vendetta.metro) == null ? void 0 : _i.common) == null ? void 0 : _j.ReactNative) != null ? _k : null;
  } catch {
  }
  return null;
}
function getDesign() {
  var _a, _b, _c, _d, _e, _f;
  try {
    const g = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.design;
    const d = (_c = g == null ? void 0 : g.Design) != null ? _c : g;
    if (d == null ? void 0 : d.TableRowGroup) return d;
  } catch {
  }
  try {
    const g = (_e = (_d = typeof revenge !== "undefined" ? revenge : null) == null ? void 0 : _d.discord) == null ? void 0 : _e.design;
    const d = (_f = g == null ? void 0 : g.Design) != null ? _f : g;
    if (d == null ? void 0 : d.TableRowGroup) return d;
  } catch {
  }
  return null;
}
function getStores() {
  var _a, _b, _c, _d, _e, _f;
  try {
    const s = (_c = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.flux) == null ? void 0 : _c.Stores;
    if (s) return s;
  } catch {
  }
  try {
    if (typeof revenge !== "undefined") return (_f = (_e = (_d = revenge == null ? void 0 : revenge.discord) == null ? void 0 : _d.flux) == null ? void 0 : _e.Stores) != null ? _f : {};
  } catch {
  }
  return {};
}
function toast(text) {
  var _a, _b, _c, _d;
  const message = String(text != null ? text : "");
  try {
    const RN = getRN();
    if ((_a = RN == null ? void 0 : RN.ToastAndroid) == null ? void 0 : _a.show) {
      RN.ToastAndroid.show(message, (_b = RN.ToastAndroid.SHORT) != null ? _b : 0);
      return;
    }
    (_d = (_c = RN == null ? void 0 : RN.Alert) == null ? void 0 : _c.alert) == null ? void 0 : _d.call(_c, "Voice Guard", message);
  } catch {
  }
}
function hostError(msg, e) {
  var _a, _b, _c, _d, _e;
  try {
    const logger = (_c = (_b = (_a = getValenced()) == null ? void 0 : _a.logger) != null ? _b : typeof revenge !== "undefined" ? revenge == null ? void 0 : revenge.logger : null) != null ? _c : console;
    ((_e = (_d = logger == null ? void 0 : logger.error) != null ? _d : logger == null ? void 0 : logger.log) != null ? _e : (() => {
    })).call(logger, "[VoiceGuard] " + msg, e != null ? e : "");
  } catch {
  }
}
function lookupModule(props) {
  var _a, _b, _c, _d, _e;
  const finders = (_b = (_a = getValenced()) == null ? void 0 : _a.modules) == null ? void 0 : _b.finders;
  const filters = (_e = (_d = (_c = getValenced()) == null ? void 0 : _c.modules) == null ? void 0 : _d.finders) == null ? void 0 : _e.filters;
  if (typeof (finders == null ? void 0 : finders.lookupModule) !== "function" || typeof (filters == null ? void 0 : filters.withProps) !== "function") return null;
  try {
    const found = finders.lookupModule(filters.withProps(...props));
    const mod = Array.isArray(found) ? found[0] : found;
    return mod != null ? mod : null;
  } catch {
    return null;
  }
}
var restLabel = "not looked up yet";
var actionsLabel = "not looked up yet";
function getRest() {
  const rest = lookupModule(["patch", "get", "post"]);
  restLabel = rest ? "found (members patch)" : "not found on this build";
  return rest;
}
function getVoiceActions() {
  const actions = lookupModule(["selectVoiceChannel"]);
  actionsLabel = actions ? "found (selectVoiceChannel)" : "not found on this build";
  return actions;
}
function patchMember(guildId, body) {
  var _a, _b;
  const rest = getRest();
  const patch = (_b = rest == null ? void 0 : rest.patch) != null ? _b : (_a = rest == null ? void 0 : rest.api) == null ? void 0 : _a.patch;
  if (typeof patch !== "function" || !guildId) return false;
  try {
    void patch.call(rest, { url: "/guilds/" + guildId + "/members/@me", body });
    return true;
  } catch (e) {
    hostError("member patch failed", e);
    return false;
  }
}
var cfg = { ...DEFAULTS };
var jsonStorageApi = null;
var myId = "";
var lastChannelId = null;
var lastGuildId = "";
var lastHandledAt = 0;
var lastMoveAt = 0;
var reconnectAttempts = 0;
var watchLabel = "not started";
var counters = { reconnects: 0, unmutes: 0, undeafens: 0, refusals: 0 };
function persist(patch) {
  var _a;
  cfg = { ...cfg, ...patch };
  try {
    void ((_a = jsonStorageApi == null ? void 0 : jsonStorageApi.set) == null ? void 0 : _a.call(jsonStorageApi, patch));
  } catch (e) {
    hostError("could not save settings", e);
  }
}
function recover(guildId, undeafen, unmute) {
  const body = {};
  if (undeafen) body.deaf = false;
  if (unmute) body.mute = false;
  if (!Object.keys(body).length) return;
  if (!patchMember(guildId, body)) {
    counters.refusals++;
    toast("Voice guard: cannot reach the member API on this build");
    return;
  }
  if (undeafen) counters.undeafens++;
  if (unmute) counters.unmutes++;
  const parts = [undeafen ? "undeafened" : "", unmute ? "unmuted" : ""].filter(Boolean);
  toast("Voice guard: " + parts.join(" and ") + " you");
}
function attemptReconnect() {
  if (reconnectAttempts >= MAX_RECONNECTS) return;
  const actions = getVoiceActions();
  if (typeof (actions == null ? void 0 : actions.selectVoiceChannel) !== "function" || !lastChannelId) {
    counters.refusals++;
    return;
  }
  reconnectAttempts++;
  lastMoveAt = Date.now();
  try {
    actions.selectVoiceChannel(lastChannelId);
    counters.reconnects++;
    toast("Voice guard: reconnected to the channel you were in");
  } catch (e) {
    counters.refusals++;
    hostError("reconnect failed", e);
  }
}
function stateList(payload) {
  var _a;
  if (Array.isArray(payload == null ? void 0 : payload.voiceStates)) return payload.voiceStates;
  if (Array.isArray(payload)) return payload;
  const single = (_a = payload == null ? void 0 : payload.voiceState) != null ? _a : payload;
  return single ? [single] : [];
}
function onVoiceStates(payload) {
  var _a, _b, _c, _d, _e;
  try {
    const states = stateList(payload);
    if (!states.length) return;
    const mine = (_a = states.find((s) => {
      var _a2, _b2;
      return String((_b2 = (_a2 = s == null ? void 0 : s.userId) != null ? _a2 : s == null ? void 0 : s.user_id) != null ? _b2 : "") === myId;
    })) != null ? _a : null;
    if (!mine) {
      if (lastChannelId && cfg.reconnect && Date.now() - lastMoveAt > DEBOUNCE_MS) attemptReconnect();
      return;
    }
    const channelId = (_c = (_b = mine.channelId) != null ? _b : mine.channel_id) != null ? _c : null;
    const guildId = String((_e = (_d = mine.guildId) != null ? _d : mine.guild_id) != null ? _e : "");
    lastMoveAt = Date.now();
    lastChannelId = channelId ? String(channelId) : null;
    lastGuildId = guildId;
    reconnectAttempts = 0;
    if (!lastChannelId || !guildId) return;
    const undeafen = cfg.autoUndeafen && mine.deaf === true;
    const unmute = cfg.autoUnmute && mine.mute === true;
    if (!undeafen && !unmute) return;
    if (Date.now() - lastHandledAt < DEBOUNCE_MS) return;
    lastHandledAt = Date.now();
    recover(guildId, undeafen, unmute);
  } catch (e) {
    hostError("voice state handling failed", e);
  }
}
var cleanupFns = [];
function subscribe() {
  var _a, _b;
  const flux = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.flux;
  let installed = 0;
  for (const event of ["VOICE_STATE_UPDATE", "VOICE_STATE_UPDATES"]) {
    try {
      if (typeof (flux == null ? void 0 : flux.onFluxEventDispatched) !== "function") break;
      const off = flux.onFluxEventDispatched(event, (payload) => {
        onVoiceStates(payload);
        return payload;
      });
      if (typeof off === "function") {
        cleanupFns.push(off);
        installed++;
      }
    } catch (e) {
      hostError("subscribe " + event + " failed", e);
    }
  }
  watchLabel = installed ? "watching voice state (" + installed + " event" + (installed === 1 ? "" : "s") + ")" : "voice state events not available";
}
async function startNext(api) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  jsonStorageApi = (_a = api == null ? void 0 : api.jsonStorage) != null ? _a : null;
  try {
    await ((_b = jsonStorageApi == null ? void 0 : jsonStorageApi.get) == null ? void 0 : _b.call(jsonStorageApi));
  } catch {
  }
  try {
    const saved = (_d = (_c = jsonStorageApi == null ? void 0 : jsonStorageApi.use) == null ? void 0 : _c.call(jsonStorageApi)) != null ? _d : null;
    if (saved && typeof saved === "object") cfg = { ...DEFAULTS, ...saved };
  } catch (e) {
    hostError("could not load settings", e);
  }
  try {
    myId = String((_h = (_g = (_f = (_e = getStores().UserStore) == null ? void 0 : _e.getCurrentUser) == null ? void 0 : _f.call(_e)) == null ? void 0 : _g.id) != null ? _h : "");
  } catch {
  }
  getRest();
  getVoiceActions();
  subscribe();
}
function stopNext() {
  var _a;
  while (cleanupFns.length) {
    try {
      (_a = cleanupFns.pop()) == null ? void 0 : _a();
    } catch {
    }
  }
  myId = "";
  lastChannelId = null;
  lastGuildId = "";
  lastHandledAt = 0;
  lastMoveAt = 0;
  reconnectAttempts = 0;
  watchLabel = "stopped";
}
var engine = {
  onVoiceStates,
  getConfig() {
    return { ...cfg };
  },
  setConfig(patch) {
    cfg = { ...cfg, ...patch };
  },
  setMyId(id) {
    myId = String(id != null ? id : "");
  },
  getState() {
    return {
      myId,
      lastChannelId,
      lastGuildId,
      counters: { ...counters },
      restLabel,
      actionsLabel,
      watchLabel
    };
  },
  resetCounters() {
    counters.reconnects = 0;
    counters.unmutes = 0;
    counters.undeafens = 0;
    counters.refusals = 0;
  }
};
function buildSettings() {
  const React = getReact();
  const RN = getRN();
  if (!(React == null ? void 0 : React.createElement) || !(RN == null ? void 0 : RN.Text)) return null;
  const el = React.createElement;
  return function VoiceGuardSettings() {
    const D = getDesign();
    const [tick, setTick] = React.useState(0);
    const refresh = () => setTick((n) => n + 1);
    void tick;
    const toggle = (patch) => {
      persist(patch);
      refresh();
    };
    const status = "Voice guard: " + watchLabel;
    const calls = "Member API: " + restLabel;
    const voice = "Channel actions: " + actionsLabel;
    const tally = counters.undeafens + " undeafened \xB7 " + counters.unmutes + " unmuted \xB7 " + counters.reconnects + " reconnected \xB7 " + counters.refusals + " could not act";
    if ((D == null ? void 0 : D.TableRowGroup) && (D == null ? void 0 : D.TableSwitchRow) && (D == null ? void 0 : D.TableRow)) {
      return el(
        RN.ScrollView,
        { style: { flex: 1 } },
        el(
          D.TableRowGroup,
          { title: "Voice Guard" },
          el(D.TableSwitchRow, {
            label: "Undo server deafen",
            subLabel: "Server-deafened you? This turns it back off.",
            value: cfg.autoUndeafen,
            onValueChange: (v) => toggle({ autoUndeafen: v })
          }),
          el(D.TableSwitchRow, {
            label: "Undo server mute",
            subLabel: "Only works where you are allowed to change your own mute.",
            value: cfg.autoUnmute,
            onValueChange: (v) => toggle({ autoUnmute: v })
          }),
          el(D.TableSwitchRow, {
            label: "Reconnect when dropped",
            subLabel: "Rejoins the channel you were in, up to " + MAX_RECONNECTS + " times.",
            value: cfg.reconnect,
            onValueChange: (v) => toggle({ reconnect: v })
          })
        ),
        el(
          D.TableRowGroup,
          { title: "This session" },
          el(D.TableRow, { label: status }),
          el(D.TableRow, { label: calls }),
          el(D.TableRow, { label: voice }),
          el(D.TableRow, { label: tally }),
          el(D.TableRow, { label: "Reset counters", onPress: () => {
            engine.resetCounters();
            refresh();
          } })
        )
      );
    }
    const row = (label, value, patch) => el(RN.Pressable, {
      accessibilityLabel: label,
      onPress: () => toggle(patch),
      style: { paddingVertical: 8 }
    }, el(RN.Text, { style: { color: "#ffffff" } }, label + ": " + (value ? "on" : "off")));
    return el(
      RN.ScrollView,
      { style: { flex: 1, padding: 16 } },
      el(RN.Text, { style: { color: "#ffffff", fontSize: 18, fontWeight: "800" } }, "Voice Guard " + PLUGIN_VERSION),
      row("Undo server deafen", cfg.autoUndeafen, { autoUndeafen: !cfg.autoUndeafen }),
      row("Undo server mute", cfg.autoUnmute, { autoUnmute: !cfg.autoUnmute }),
      row("Reconnect when dropped", cfg.reconnect, { reconnect: !cfg.reconnect }),
      el(RN.Text, { style: { color: "#ffffff", fontWeight: "700", marginTop: 12 } }, status),
      el(RN.Text, { style: { color: "#9ba0a8", marginTop: 4 } }, calls),
      el(RN.Text, { style: { color: "#9ba0a8" } }, voice),
      el(RN.Text, { style: { color: "#9ba0a8" } }, tally),
      el(RN.Pressable, {
        accessibilityLabel: "Reset counters",
        onPress: () => {
          engine.resetCounters();
          refresh();
        },
        style: { marginTop: 12, paddingVertical: 8 }
      }, el(RN.Text, { style: { color: "#5865F2" } }, "Reset counters"))
    );
  };
}
var __built = null;
var __instance = {
  jsonStorage: { load: true, default: { ...DEFAULTS } },
  start: startNext,
  stop: stopNext,
  SettingsComponent: function(props) {
    var _a, _b, _c;
    const api = (_a = props == null ? void 0 : props.api) != null ? _a : props;
    const React = getReact();
    if (!(React == null ? void 0 : React.createElement)) return null;
    try {
      if (api == null ? void 0 : api.jsonStorage) jsonStorageApi = api.jsonStorage;
      if (!__built) __built = buildSettings();
      if (__built) return React.createElement(__built, { api });
    } catch (e) {
      hostError("settings build failed", e);
    }
    const RN = (_b = getRN()) != null ? _b : {};
    return React.createElement((_c = RN.Text) != null ? _c : "text", { style: { color: "#ffffff", padding: 12 } }, "Voice Guard settings could not load on this build.");
  }
};
__instance.__engine = engine;
if (typeof plugin === "function") {
  __instance = plugin(__instance);
}
globalThis.plugin = __instance;
__instance.onLoad = function() {
  var _a;
  return (_a = __instance.start) == null ? void 0 : _a.call(__instance);
};
__instance.onUnload = function() {
  var _a;
  return (_a = __instance.stop) == null ? void 0 : _a.call(__instance);
};
__instance.settings = __instance.SettingsComponent;
var index_default = __instance;
;
        const exported = (module.exports && module.exports.default) || module.exports;
        if (!exported || typeof exported !== 'object') throw new Error('bundle exported ' + typeof exported + ' instead of a plugin object');
        // Valenced evaluates this file and then reads result.default
        // (bundle/lib/plugins/src/_internal/script.ts). Returning the bare plugin
        // therefore gives it undefined and it fails with
        // "Plugin options must be an object" — the plugin never starts and has no
        // settings page. Older loaders want the plugin itself, so expose BOTH:
        // the object is the plugin and its own .default points back at it.
        if (!exported.default) {
            try { exported.default = exported; } catch (ignored) {}
        }
        return exported;
    } catch (error) {
        const message = String((error && (error.stack || error.message)) || error);
        try { console.error('[dev.8uvu.voice-guard] bundle failed to evaluate', error); } catch (ignored) {}
        const fallback = {
            jsonStorage: { load: true, default: {} },
            start() {},
            stop() {},
            SettingsComponent() {
                try {
                    const R = valenced.react.React;
                    const N = valenced.react.ReactNative;
                    if (!R || !N || typeof R.createElement !== 'function') return null;
                    const el = R.createElement;
                    return el(N.ScrollView, { style: { padding: 16 } },
                        el(N.Text, { style: { color: '#f04747', fontSize: 16, fontWeight: '700', marginBottom: 8 } }, "Voice Guard" + ' failed to load'),
                        el(N.Text, { style: { color: '#9ba0a8', fontSize: 12, marginBottom: 8 } }, 'Copy this text to the plugin author — it is the exact error:'),
                        el(N.Text, { style: { color: '#ffffff', fontSize: 11 } }, message));
                } catch (uiError) {
                    return null;
                }
            },
        };
        try { fallback.default = fallback; } catch (ignored) {}
        return fallback;
    }
})()