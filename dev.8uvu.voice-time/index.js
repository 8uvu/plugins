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

// plugins/dev.8uvu.voice-time/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  engine: () => engine,
  formatDuration: () => formatDuration,
  voiceState: () => voiceState
});
module.exports = __toCommonJS(index_exports);
var PLUGIN_VERSION = "1.0.2";
var DEFAULTS = { days: {}, session: null };
var MAX_DAYS = 90;
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
function hostError(msg, e) {
  var _a, _b, _c, _d, _e;
  try {
    const logger = (_c = (_b = (_a = getValenced()) == null ? void 0 : _a.logger) != null ? _b : typeof revenge !== "undefined" ? revenge == null ? void 0 : revenge.logger : null) != null ? _c : console;
    ((_e = (_d = logger == null ? void 0 : logger.error) != null ? _d : logger == null ? void 0 : logger.log) != null ? _e : (() => {
    })).call(logger, "[VoiceTime] " + msg, e != null ? e : "");
  } catch {
  }
}
var cfg = { ...DEFAULTS };
var jsonStorageApi = null;
var myId = "";
function dayKey(at = Date.now()) {
  const d = new Date(at);
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}
function persist(patch) {
  var _a;
  cfg = { ...cfg, ...patch };
  try {
    void ((_a = jsonStorageApi == null ? void 0 : jsonStorageApi.set) == null ? void 0 : _a.call(jsonStorageApi, patch));
  } catch (e) {
    hostError("could not save", e);
  }
}
function guildName(guildId) {
  var _a, _b, _c;
  claim: try {
    const g = (_c = (_b = (_a = getStores().GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId)) != null ? _c : null;
    if (g == null ? void 0 : g.name) return String(g.name);
    if (!guildId) return "Direct call";
  } catch {
  }
  return guildId ? "Server " + guildId.slice(-6) : "Direct call";
}
function formatDuration(sec) {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  if (h > 0) return h + "h " + m + "m";
  if (m > 0) return m + "m " + s % 60 + "s";
  return s + "s";
}
function credit(seconds, guildId, at = Date.now()) {
  var _a, _b;
  if (seconds <= 0) return;
  const key = dayKey(at);
  const days = { ...(_a = cfg.days) != null ? _a : {} };
  const day = days[key] ? { totalSec: days[key].totalSec, byGuild: { ...days[key].byGuild } } : { totalSec: 0, byGuild: {} };
  day.totalSec += seconds;
  const gid = guildId || "dm";
  day.byGuild[gid] = ((_b = day.byGuild[gid]) != null ? _b : 0) + seconds;
  days[key] = day;
  const keys = Object.keys(days).sort();
  while (keys.length > MAX_DAYS) {
    const oldest = keys.shift();
    if (oldest) delete days[oldest];
  }
  persist({ days });
}
function voiceState(userId, channelId, guildId) {
  if (!myId || String(userId) !== String(myId)) return false;
  const session = cfg.session;
  if (channelId) {
    if (session && session.guildId === (guildId || "")) return false;
    if (session) {
      credit((Date.now() - session.startedAt) / 1e3, session.guildId);
    }
    persist({ session: { startedAt: Date.now(), guildId: guildId || "" } });
    return true;
  }
  if (!session) return false;
  credit((Date.now() - session.startedAt) / 1e3, session.guildId);
  persist({ session: null });
  return true;
}
function handlePayload(payload) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    const list = Array.isArray(payload == null ? void 0 : payload.voiceStates) ? payload.voiceStates : [(_a = payload == null ? void 0 : payload.voiceState) != null ? _a : payload];
    for (const state of list) {
      if (!state) continue;
      const userId = (_e = (_d = (_b = state.userId) != null ? _b : state.user_id) != null ? _d : (_c = state.user) == null ? void 0 : _c.id) != null ? _e : "";
      if (!myId || String(userId) !== String(myId)) continue;
      const channelId = (_g = (_f = state.channelId) != null ? _f : state.channel_id) != null ? _g : null;
      const guildId = (_i = (_h = state.guildId) != null ? _h : state.guild_id) != null ? _i : "";
      voiceState(String(userId), channelId ? String(channelId) : null, String(guildId != null ? guildId : ""));
    }
  } catch (e) {
    hostError("voice payload failed", e);
  }
}
var engine = {
  voiceState,
  handlePayload,
  formatDuration,
  today() {
    var _a, _b;
    return (_b = ((_a = cfg.days) != null ? _a : {})[dayKey()]) != null ? _b : { totalSec: 0, byGuild: {} };
  },
  days() {
    var _a;
    return Object.entries((_a = cfg.days) != null ? _a : {}).map(([key, day]) => ({ key, totalSec: day.totalSec })).sort((a, b) => a.key < b.key ? 1 : -1);
  },
  guildsToday() {
    var _a;
    const day = engine.today();
    return Object.entries((_a = day.byGuild) != null ? _a : {}).map(([gid, sec]) => ({ name: guildName(gid === "dm" ? "" : gid), sec })).sort((a, b) => b.sec - a.sec);
  },
  liveSeconds() {
    return cfg.session ? (Date.now() - cfg.session.startedAt) / 1e3 : 0;
  },
  resetToday() {
    var _a;
    const days = { ...(_a = cfg.days) != null ? _a : {} };
    delete days[dayKey()];
    persist({ days });
  },
  setMyId(id) {
    myId = String(id != null ? id : "");
  },
  getConfig() {
    return JSON.parse(JSON.stringify(cfg));
  },
  setConfig(patch) {
    cfg = { ...cfg, ...patch };
  }
};
var cleanupFns = [];
function subscribe() {
  var _a, _b;
  const flux = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.flux;
  let installed = 0;
  for (const event of ["VOICE_STATE_UPDATE", "VOICE_STATE_UPDATES"]) {
    try {
      if (typeof (flux == null ? void 0 : flux.onFluxEventDispatched) !== "function") break;
      const off = flux.onFluxEventDispatched(event, (payload) => {
        handlePayload(payload);
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
  return installed;
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
    hostError("could not load voice time", e);
  }
  try {
    myId = String((_h = (_g = (_f = (_e = getStores().UserStore) == null ? void 0 : _e.getCurrentUser) == null ? void 0 : _f.call(_e)) == null ? void 0 : _g.id) != null ? _h : "");
  } catch {
  }
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
  if (cfg.session) {
    credit((Date.now() - cfg.session.startedAt) / 1e3, cfg.session.guildId);
    persist({ session: null });
  }
}
function buildSettings() {
  const React = getReact();
  const RN = getRN();
  if (!(React == null ? void 0 : React.createElement) || !(RN == null ? void 0 : RN.Text)) return null;
  const el = React.createElement;
  return function VoiceTimeSettings() {
    const D = getDesign();
    const [tick, setTick] = React.useState(0);
    const refresh = () => setTick((n) => n + 1);
    void tick;
    const today = engine.today();
    const live = engine.liveSeconds();
    const days = engine.days().slice(0, 7);
    if ((D == null ? void 0 : D.TableRowGroup) && (D == null ? void 0 : D.TableRow)) {
      return el(
        RN.ScrollView,
        { style: { flex: 1 } },
        el(
          D.TableRowGroup,
          { title: "VoiceTime" },
          el(D.TableRow, {
            label: "Today: " + formatDuration(today.totalSec),
            subLabel: cfg.session ? "In a call right now \xB7 " + formatDuration(live) : "Not in a call"
          }),
          el(D.TableRow, { label: "Reset today", onPress: () => {
            engine.resetToday();
            refresh();
          } })
        ),
        el(
          D.TableRowGroup,
          { title: "Where the time went" },
          engine.guildsToday().length === 0 ? el(D.TableRow, { label: "Nothing today yet", subLabel: "Join a voice channel and this fills in." }) : engine.guildsToday().map((g) => el(D.TableRow, { key: g.name, label: g.name, subLabel: formatDuration(g.sec) }))
        ),
        el(
          D.TableRowGroup,
          { title: "Recent days" },
          days.length === 0 ? el(D.TableRow, { label: "No history yet" }) : days.map((d) => el(D.TableRow, { key: d.key, label: d.key, subLabel: formatDuration(d.totalSec) }))
        )
      );
    }
    return el(
      RN.ScrollView,
      { style: { flex: 1, padding: 16 } },
      el(RN.Text, { style: { color: "#ffffff", fontSize: 18, fontWeight: "800" } }, "VoiceTime " + PLUGIN_VERSION),
      el(RN.Text, { style: { color: "#ffffff", marginTop: 8 } }, "Today: " + formatDuration(today.totalSec)),
      el(RN.Text, { style: { color: "#9ba0a8" } }, cfg.session ? "In a call right now \xB7 " + formatDuration(live) : "Not in a call"),
      engine.guildsToday().map((g) => el(
        RN.View,
        { key: g.name, style: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 } },
        el(RN.Text, { style: { color: "#ffffff" } }, g.name),
        el(RN.Text, { style: { color: "#9ba0a8" } }, formatDuration(g.sec))
      )),
      el(RN.Text, { style: { color: "#ffffff", fontWeight: "700", marginTop: 12 } }, "Recent days"),
      days.map((d) => el(
        RN.View,
        { key: d.key, style: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 } },
        el(RN.Text, { style: { color: "#ffffff" } }, d.key),
        el(RN.Text, { style: { color: "#9ba0a8" } }, formatDuration(d.totalSec))
      )),
      el(
        RN.Pressable,
        { accessibilityLabel: "Reset today", onPress: () => {
          engine.resetToday();
          refresh();
        }, style: { marginTop: 12 } },
        el(RN.Text, { style: { color: "#f04747" } }, "Reset today")
      )
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
    return React.createElement((_c = RN.Text) != null ? _c : "text", { style: { color: "#ffffff", padding: 12 } }, "VoiceTime settings could not load on this build.");
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
        try { console.error('[dev.8uvu.voice-time] bundle failed to evaluate', error); } catch (ignored) {}
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
                        el(N.Text, { style: { color: '#f04747', fontSize: 16, fontWeight: '700', marginBottom: 8 } }, "VoiceTime" + ' failed to load'),
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