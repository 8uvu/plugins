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
var PLUGIN_VERSION = "1.1.0";
var DEFAULTS = { days: {}, session: null, people: {} };
var MAX_DAYS = 90;
var MAX_PEOPLE = 100;
var HISTORY_DAYS = 14;
var RECENT_DAYS = 7;
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
var present = {};
function dayKey(at = Date.now()) {
  const d = new Date(at);
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}
function dateAgo(n) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() - n);
  return dayKey(d.getTime());
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
  try {
    const g = (_c = (_b = (_a = getStores().GuildStore) == null ? void 0 : _a.getGuild) == null ? void 0 : _b.call(_a, guildId)) != null ? _c : null;
    if (g == null ? void 0 : g.name) return String(g.name);
    if (!guildId) return "Direct call";
  } catch {
  }
  return guildId ? "Server " + guildId.slice(-6) : "Direct call";
}
function personName(userId) {
  var _a, _b, _c, _d, _e;
  try {
    const u = (_c = (_b = (_a = getStores().UserStore) == null ? void 0 : _a.getUser) == null ? void 0 : _b.call(_a, userId)) != null ? _c : null;
    const name = (_e = (_d = u == null ? void 0 : u.globalName) != null ? _d : u == null ? void 0 : u.username) != null ? _e : "";
    if (name) return String(name);
  } catch {
  }
  return userId ? "User " + String(userId).slice(-4) : "Unknown";
}
function formatDuration(sec) {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  if (h > 0) return h + "h " + m + "m";
  if (m > 0) return m + "m " + s % 60 + "s";
  return s + "s";
}
function trimDays(days) {
  const keys = Object.keys(days).sort();
  while (keys.length > MAX_DAYS) {
    const oldest = keys.shift();
    if (oldest) delete days[oldest];
  }
}
function trimPersonDays(days) {
  const keys = Object.keys(days).sort();
  while (keys.length > MAX_DAYS) {
    const oldest = keys.shift();
    if (oldest) delete days[oldest];
  }
}
function trimPeople(people) {
  const ids = Object.keys(people);
  if (ids.length <= MAX_PEOPLE) return;
  ids.sort((a, b) => people[b].totalSec - people[a].totalSec);
  for (const id of ids.slice(MAX_PEOPLE)) delete people[id];
}
function recentSeconds(days, span = HISTORY_DAYS) {
  var _a;
  let sum = 0;
  for (let i = 0; i < span; i++) sum += (_a = days[dateAgo(i)]) != null ? _a : 0;
  return sum;
}
function settle(at = Date.now()) {
  var _a, _b, _c, _d, _e, _f;
  const session = cfg.session;
  if (!session || !session.startedAt) return 0;
  const seconds = (at - session.startedAt) / 1e3;
  if (!(seconds > 0)) return 0;
  const key = dayKey(session.startedAt);
  const days = { ...(_a = cfg.days) != null ? _a : {} };
  const day = days[key] ? { totalSec: days[key].totalSec, byGuild: { ...days[key].byGuild } } : { totalSec: 0, byGuild: {} };
  day.totalSec += seconds;
  const gid = session.guildId || "dm";
  day.byGuild[gid] = ((_b = day.byGuild[gid]) != null ? _b : 0) + seconds;
  days[key] = day;
  trimDays(days);
  const people = { ...(_c = cfg.people) != null ? _c : {} };
  for (const uid of Object.keys(present)) {
    if (!uid || String(uid) === String(myId)) continue;
    const prev = people[uid];
    const next = { totalSec: ((_d = prev == null ? void 0 : prev.totalSec) != null ? _d : 0) + seconds, days: { ...(_e = prev == null ? void 0 : prev.days) != null ? _e : {} } };
    next.days[key] = ((_f = next.days[key]) != null ? _f : 0) + seconds;
    trimPersonDays(next.days);
    people[uid] = next;
  }
  trimPeople(people);
  persist({ days, people, session: { ...session, startedAt: at } });
  return seconds;
}
function voiceState(userId, channelId, guildId, at = Date.now()) {
  if (!myId || String(userId) !== String(myId)) return false;
  const session = cfg.session;
  if (channelId) {
    const next = String(channelId);
    if (session && session.channelId === next) {
      settle(at);
      return false;
    }
    settle(at);
    present = {};
    persist({ session: { startedAt: at, guildId: String(guildId || ""), channelId: next } });
    return true;
  }
  if (!session) return false;
  settle(at);
  present = {};
  persist({ session: null });
  return true;
}
function handlePayload(payload, at = Date.now()) {
  var _a, _b, _c;
  try {
    const list = Array.isArray(payload == null ? void 0 : payload.voiceStates) ? payload.voiceStates : [(_a = payload == null ? void 0 : payload.voiceState) != null ? _a : payload];
    const states = list.filter(Boolean);
    settle(at);
    const userIdOf = (state) => {
      var _a2, _b2, _c2, _d;
      return String((_d = (_c2 = (_a2 = state == null ? void 0 : state.userId) != null ? _a2 : state == null ? void 0 : state.user_id) != null ? _c2 : (_b2 = state == null ? void 0 : state.user) == null ? void 0 : _b2.id) != null ? _d : "");
    };
    const channelOf = (state) => {
      var _a2, _b2;
      const id = (_b2 = (_a2 = state == null ? void 0 : state.channelId) != null ? _a2 : state == null ? void 0 : state.channel_id) != null ? _b2 : null;
      return id ? String(id) : null;
    };
    for (const state of states) {
      const userId = userIdOf(state);
      if (!userId || userId !== String(myId)) continue;
      voiceState(userId, channelOf(state), String((_c = (_b = state.guildId) != null ? _b : state.guild_id) != null ? _c : ""), at);
    }
    const session = cfg.session;
    for (const state of states) {
      const userId = userIdOf(state);
      if (!userId || userId === String(myId)) continue;
      const channelId = channelOf(state);
      if (session && channelId && channelId === session.channelId) present[userId] = true;
      else delete present[userId];
    }
  } catch (e) {
    hostError("voice payload failed", e);
  }
}
var engine = {
  voiceState,
  handlePayload,
  settle,
  formatDuration,
  personName,
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
  // Everyone you have shared a call with, biggest total first.
  leaderboard() {
    var _a;
    return Object.entries((_a = cfg.people) != null ? _a : {}).map(([id, person]) => {
      var _a2, _b, _c;
      return {
        id,
        name: personName(id),
        totalSec: person.totalSec,
        todaySec: (_b = (_a2 = person.days) == null ? void 0 : _a2[dayKey()]) != null ? _b : 0,
        recentSec: recentSeconds((_c = person.days) != null ? _c : {})
      };
    }).filter((p) => p.totalSec > 0).sort((a, b) => b.totalSec - a.totalSec);
  },
  historyFor(id, span = HISTORY_DAYS) {
    var _a, _b, _c;
    const days = (_c = (_b = (_a = cfg.people) == null ? void 0 : _a[id]) == null ? void 0 : _b.days) != null ? _c : {};
    return Array.from({ length: span }, (_, i) => {
      var _a2;
      const date = dateAgo(span - 1 - i);
      return { date, secs: (_a2 = days[date]) != null ? _a2 : 0 };
    });
  },
  liveSeconds() {
    return cfg.session ? (Date.now() - cfg.session.startedAt) / 1e3 : 0;
  },
  liveChannelId() {
    var _a, _b;
    return (_b = (_a = cfg.session) == null ? void 0 : _a.channelId) != null ? _b : "";
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  jsonStorageApi = (_a = api == null ? void 0 : api.jsonStorage) != null ? _a : null;
  try {
    await ((_b = jsonStorageApi == null ? void 0 : jsonStorageApi.get) == null ? void 0 : _b.call(jsonStorageApi));
  } catch {
  }
  try {
    const saved = (_d = (_c = jsonStorageApi == null ? void 0 : jsonStorageApi.use) == null ? void 0 : _c.call(jsonStorageApi)) != null ? _d : null;
    if (saved && typeof saved === "object") {
      cfg = {
        days: { ...(_e = saved.days) != null ? _e : {} },
        people: { ...(_f = saved.people) != null ? _f : {} },
        session: (_g = saved.session) != null ? _g : null
      };
    }
  } catch (e) {
    hostError("could not load voice time", e);
  }
  try {
    myId = String((_k = (_j = (_i = (_h = getStores().UserStore) == null ? void 0 : _h.getCurrentUser) == null ? void 0 : _i.call(_h)) == null ? void 0 : _j.id) != null ? _k : "");
  } catch {
  }
  present = {};
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
    settle();
    present = {};
    persist({ session: null });
  }
}
function buildSettings() {
  const React = getReact();
  const RN = getRN();
  if (!(React == null ? void 0 : React.createElement) || !(RN == null ? void 0 : RN.Text)) return null;
  const el = React.createElement;
  const TABS = [
    { key: "overview", label: "Today" },
    { key: "leaderboard", label: "Leaderboard" },
    { key: "history", label: "History" }
  ];
  return function VoiceTimeSettings() {
    var _a, _b, _c;
    const D = getDesign();
    const [tab, setTabState] = React.useState("overview");
    const [who, setWho] = React.useState(null);
    const [tick, setTick] = React.useState(0);
    const setTab = (next) => setTabState(next);
    const refresh = () => setTick((n) => n + 1);
    void tick;
    const today = engine.today();
    const live = engine.liveSeconds();
    const recent = engine.days().slice(0, RECENT_DAYS);
    const people = engine.leaderboard();
    const selected = (_b = who != null ? who : (_a = people[0]) == null ? void 0 : _a.id) != null ? _b : null;
    const history = selected ? engine.historyFor(selected, HISTORY_DAYS) : [];
    const selectedPerson = (_c = people.find((p) => p.id === selected)) != null ? _c : null;
    const maxDay = Math.max(1, ...history.map((d) => d.secs));
    const row = (key, label, sub, onPress) => {
      if (D == null ? void 0 : D.TableRow) return el(D.TableRow, { key, label, subLabel: sub, onPress });
      const kids = [el(RN.Text, { key: "l", style: { color: "#ffffff", fontSize: 14 } }, label)];
      if (sub) kids.push(el(RN.Text, { key: "s", style: { color: "#9ba0a8", fontSize: 12, marginTop: 2 } }, sub));
      const style = { paddingVertical: 8, paddingHorizontal: 4 };
      return onPress ? el(RN.Pressable, { key, accessibilityLabel: label, onPress, style }, ...kids) : el(RN.View, { key, style }, ...kids);
    };
    const heading = (key, text) => el(RN.Text, {
      key,
      style: { color: "#9ba0a8", fontSize: 11, fontWeight: "700", marginTop: 16, marginBottom: 2, letterSpacing: 0.6 }
    }, text.toUpperCase());
    const chip = (key, label, active, onPress) => el(RN.Pressable, {
      key,
      accessibilityLabel: label,
      onPress,
      style: {
        backgroundColor: active ? "#5865F2" : "#2b2d31",
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginTop: 8
      }
    }, el(RN.Text, { style: { color: active ? "#ffffff" : "#dbdee1", fontSize: 12, fontWeight: "700" } }, label));
    let body;
    if (tab === "leaderboard") {
      body = people.length === 0 ? row("empty", "No one tracked yet", "Join a voice channel with people and their time starts counting.") : [
        row("count", people.length + " tracked", "Total time you have been in voice together."),
        ...people.map((p, i) => row(
          p.id,
          (i === 0 ? "1. " : i === 1 ? "2. " : i === 2 ? "3. " : i + 1 + ". ") + p.name + (p.id === myId ? " (you)" : ""),
          "Today " + formatDuration(p.todaySec) + " \xB7 last " + HISTORY_DAYS + "d " + formatDuration(p.recentSec) + " \xB7 total " + formatDuration(p.totalSec)
        ))
      ];
    } else if (tab === "history") {
      body = people.length === 0 ? row("empty", "No history yet", "Time spent together is recorded per day once you are both in a call.") : [
        el(RN.ScrollView, {
          key: "who",
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          style: { marginTop: 8 }
        }, ...people.slice(0, 12).map((p) => chip(p.id, p.name + (p.id === myId ? " (you)" : ""), p.id === selected, () => setWho(p.id)))),
        selectedPerson ? row("summary", selectedPerson.name, "Last " + HISTORY_DAYS + "d " + formatDuration(selectedPerson.recentSec) + " \xB7 best day " + formatDuration(Math.max(1, ...history.map((d) => d.secs))) + " \xB7 today " + formatDuration(selectedPerson.todaySec)) : null,
        el(
          RN.View,
          { key: "chart", style: { flexDirection: "row", alignItems: "flex-end", height: 108, marginTop: 10 } },
          ...history.map((d, i) => el(
            RN.View,
            {
              key: d.date,
              style: { flex: 1, alignItems: "center", justifyContent: "flex-end", marginHorizontal: 1 }
            },
            el(RN.View, {
              style: {
                width: "74%",
                height: Math.max(2, Math.round(d.secs / maxDay * 84)),
                borderRadius: 3,
                backgroundColor: d.date === dayKey() ? "#5865F2" : d.secs > 0 ? "#4e5a8a" : "#232428"
              }
            }),
            i % 3 === 0 ? el(RN.Text, { style: { color: "#9ba0a8", fontSize: 8, marginTop: 2 } }, d.date.slice(8)) : null
          ))
        ),
        heading("recent", "Last active days"),
        ...history.filter((d) => d.secs > 0).slice(-7).reverse().map((d) => row(d.date, d.date, formatDuration(d.secs)))
      ];
    } else {
      body = [
        row("today", "Today: " + formatDuration(today.totalSec), cfg.session ? "In a call right now \xB7 " + formatDuration(live) : "Not in a call"),
        row("reset", "Reset today", "Clears your own time for today only.", () => {
          engine.resetToday();
          refresh();
        }),
        heading("guilds", "Where the time went"),
        engine.guildsToday().length === 0 ? row("noguild", "Nothing today yet", "Join a voice channel and this fills in.") : engine.guildsToday().map((g) => row(g.name, g.name, formatDuration(g.sec))),
        heading("days", "Recent days"),
        recent.length === 0 ? row("noday", "No history yet", "") : recent.map((d) => row(d.key, d.key, formatDuration(d.totalSec)))
      ];
    }
    return el(
      RN.ScrollView,
      { style: { flex: 1, backgroundColor: "#1e1f22" } },
      el(
        RN.View,
        { style: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 30 } },
        el(RN.Text, { style: { color: "#ffffff", fontSize: 18, fontWeight: "800" } }, "VoiceTime " + PLUGIN_VERSION),
        el(
          RN.Text,
          { style: { color: "#9ba0a8", fontSize: 12, marginTop: 2 } },
          cfg.session ? "In a call \xB7 " + formatDuration(live) : "Not in a call"
        ),
        el(
          RN.ScrollView,
          { horizontal: true, showsHorizontalScrollIndicator: false },
          ...TABS.map((t) => chip(t.key, t.label, tab === t.key, () => setTab(t.key)))
        ),
        body
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