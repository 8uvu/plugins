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

// plugins/dev.8uvu.message-stats/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  engine: () => engine
});
module.exports = __toCommonJS(index_exports);
var PLUGIN_VERSION = "1.0.0";
var DEFAULTS = { channels: {}, daily: {}, tracking: true, trackDMs: false };
var MAX_DAYS = 400;
var MAX_CHANNELS = 1e3;
var FLUSH_MS = 2e3;
var CHART_DAYS = 7;
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
    })).call(logger, "[MessageStats] " + msg, e != null ? e : "");
  } catch {
  }
}
var cfg = { ...DEFAULTS };
var jsonStorageApi = null;
var myId = "";
var status = "not started";
var dirty = false;
var flushTimer = null;
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
function isDM(guildId) {
  return !guildId || guildId === "@me";
}
function channelPath(guildId, channelId) {
  return (isDM(guildId) ? "dm_" : "guild_" + guildId + "_") + channelId;
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
function markDirty() {
  dirty = true;
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_MS);
}
function flush() {
  if (!dirty) return;
  dirty = false;
  persist({ channels: cfg.channels, daily: cfg.daily, tracking: cfg.tracking, trackDMs: cfg.trackDMs });
}
function trim(daily) {
  const keys = Object.keys(daily).sort();
  while (keys.length > MAX_DAYS) {
    const oldest = keys.shift();
    if (oldest) delete daily[oldest];
  }
}
function trimChannels(channels) {
  const keys = Object.keys(channels);
  if (keys.length <= MAX_CHANNELS) return;
  keys.sort((a, b) => channels[b].sent + channels[b].received - (channels[a].sent + channels[a].received));
  for (const key of keys.slice(MAX_CHANNELS)) delete channels[key];
}
function bump(map, key, kind) {
  var _a, _b;
  const prev = map[key];
  const next = { sent: (_a = prev == null ? void 0 : prev.sent) != null ? _a : 0, received: (_b = prev == null ? void 0 : prev.received) != null ? _b : 0 };
  next[kind] += 1;
  map[key] = next;
}
function handleMessage(payload, at = Date.now()) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  try {
    if (!cfg.tracking) return false;
    const message = (_a = payload == null ? void 0 : payload.message) != null ? _a : payload;
    const channelId = String((_e = (_d = (_c = (_b = message == null ? void 0 : message.channelId) != null ? _b : message == null ? void 0 : message.channel_id) != null ? _c : payload == null ? void 0 : payload.channelId) != null ? _d : payload == null ? void 0 : payload.channel_id) != null ? _e : "");
    if (!channelId) return false;
    const authorId = String((_i = (_h = (_g = (_f = message == null ? void 0 : message.author) == null ? void 0 : _f.id) != null ? _g : message == null ? void 0 : message.authorId) != null ? _h : payload == null ? void 0 : payload.authorId) != null ? _i : "");
    const guildId = String(
      (_q = (_p = (_l = (_k = (_j = message == null ? void 0 : message.guildId) != null ? _j : message == null ? void 0 : message.guild_id) != null ? _k : payload == null ? void 0 : payload.guildId) != null ? _l : payload == null ? void 0 : payload.guild_id) != null ? _p : (_o = (_n = (_m = getStores().ChannelStore) == null ? void 0 : _m.getChannel) == null ? void 0 : _n.call(_m, channelId)) == null ? void 0 : _o.guild_id) != null ? _q : ""
    );
    if (isDM(guildId) && !cfg.trackDMs) return false;
    const kind = authorId && String(authorId) === String(myId) ? "sent" : "received";
    const channels = { ...(_r = cfg.channels) != null ? _r : {} };
    bump(channels, channelPath(guildId, channelId), kind);
    trimChannels(channels);
    const daily = { ...(_s = cfg.daily) != null ? _s : {} };
    bump(daily, dayKey(at), kind);
    trim(daily);
    cfg = { ...cfg, channels, daily };
    markDirty();
    return true;
  } catch (e) {
    hostError("could not count a message", e);
    return false;
  }
}
function channelName(channelId) {
  var _a, _b, _c, _d, _e, _f;
  try {
    const ch = (_c = (_b = (_a = getStores().ChannelStore) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, channelId)) != null ? _c : null;
    const name = (_f = ch == null ? void 0 : ch.name) != null ? _f : (_e = (_d = ch == null ? void 0 : ch.recipients) == null ? void 0 : _d.map) == null ? void 0 : _e.call(_d, (u) => {
      var _a2;
      return (_a2 = u == null ? void 0 : u.globalName) != null ? _a2 : u == null ? void 0 : u.username;
    }).filter(Boolean).join(", ");
    if (name) return String(name);
  } catch {
  }
  return channelId ? "Channel " + channelId.slice(-4) : "Unknown";
}
function channelStats(channelId, guildId) {
  var _a, _b, _c, _d, _e, _f;
  if (!channelId) return { sent: 0, received: 0 };
  const gid = guildId != null ? guildId : String((_d = (_c = (_b = (_a = getStores().ChannelStore) == null ? void 0 : _a.getChannel) == null ? void 0 : _b.call(_a, channelId)) == null ? void 0 : _c.guild_id) != null ? _d : "");
  return { ...(_f = (_e = cfg.channels) == null ? void 0 : _e[channelPath(gid, channelId)]) != null ? _f : { sent: 0, received: 0 } };
}
function serverStats(guildId) {
  var _a;
  if (isDM(guildId)) return { sent: 0, received: 0 };
  const prefix = "guild_" + guildId + "_";
  let sent = 0;
  let received = 0;
  for (const [key, counts] of Object.entries((_a = cfg.channels) != null ? _a : {})) {
    if (!key.startsWith(prefix)) continue;
    sent += counts.sent;
    received += counts.received;
  }
  return { sent, received };
}
function totalStats() {
  var _a;
  let sent = 0;
  let received = 0;
  for (const counts of Object.values((_a = cfg.channels) != null ? _a : {})) {
    sent += counts.sent;
    received += counts.received;
  }
  return { sent, received };
}
function dayStats(key) {
  var _a, _b;
  return { ...(_b = (_a = cfg.daily) == null ? void 0 : _a[key]) != null ? _b : { sent: 0, received: 0 } };
}
function weekStats() {
  var _a;
  const keys = new Set(Array.from({ length: CHART_DAYS }, (_, i) => dateAgo(i)));
  let sent = 0;
  let received = 0;
  for (const [key, counts] of Object.entries((_a = cfg.daily) != null ? _a : {})) {
    if (!keys.has(key)) continue;
    sent += counts.sent;
    received += counts.received;
  }
  return { sent, received };
}
function dailySeries(span = CHART_DAYS) {
  return Array.from({ length: span }, (_, i) => {
    const date = dateAgo(span - 1 - i);
    const counts = dayStats(date);
    return { date, sent: counts.sent, received: counts.received, total: counts.sent + counts.received };
  });
}
function topChannels(guildId, limit = 10) {
  var _a;
  const prefix = isDM(guildId) ? "dm_" : "guild_" + guildId + "_";
  const rows = [];
  for (const [key, counts] of Object.entries((_a = cfg.channels) != null ? _a : {})) {
    if (!key.startsWith(prefix)) continue;
    const id = key.slice(prefix.length);
    rows.push({
      id,
      name: isDM(guildId) ? channelName(id) : "#" + channelName(id),
      total: counts.sent + counts.received,
      sent: counts.sent,
      received: counts.received
    });
  }
  return rows.sort((a, b) => b.total - a.total).slice(0, limit);
}
function reset() {
  cfg = { ...cfg, channels: {}, daily: {} };
  dirty = false;
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  persist({ channels: {}, daily: {} });
}
function currentChannelId() {
  var _a, _b, _c, _d;
  try {
    const s = getStores().SelectedChannelStore;
    return String((_d = (_c = (_a = s == null ? void 0 : s.getChannelId) == null ? void 0 : _a.call(s)) != null ? _c : (_b = s == null ? void 0 : s.getSelectedChannelId) == null ? void 0 : _b.call(s)) != null ? _d : "");
  } catch {
    return "";
  }
}
function currentGuildId(channelId) {
  var _a, _b, _c, _d, _e;
  try {
    const s = getStores().SelectedGuildStore;
    const id = (_a = s == null ? void 0 : s.getGuildId) == null ? void 0 : _a.call(s);
    if (id) return String(id);
  } catch {
  }
  try {
    return String((_e = (_d = (_c = (_b = getStores().ChannelStore) == null ? void 0 : _b.getChannel) == null ? void 0 : _c.call(_b, channelId)) == null ? void 0 : _d.guild_id) != null ? _e : "");
  } catch {
    return "";
  }
}
function formatNumber(n) {
  return Math.max(0, Math.round(n)).toLocaleString();
}
var engine = {
  handleMessage,
  flush,
  channelStats,
  serverStats,
  totalStats,
  today: () => dayStats(dayKey()),
  week: weekStats,
  dailySeries,
  topChannels,
  channelName,
  reset,
  status: () => status,
  setTracking(on) {
    cfg = { ...cfg, tracking: on };
    persist({ tracking: on });
  },
  setTrackDMs(on) {
    cfg = { ...cfg, trackDMs: on };
    persist({ trackDMs: on });
  },
  getConfig() {
    return JSON.parse(JSON.stringify(cfg));
  },
  setMyId(id) {
    myId = String(id != null ? id : "");
  }
};
var cleanupFns = [];
function subscribe() {
  var _a, _b;
  const flux = (_b = (_a = getValenced()) == null ? void 0 : _a.discord) == null ? void 0 : _b.flux;
  let installed = 0;
  try {
    if (typeof (flux == null ? void 0 : flux.onFluxEventDispatched) === "function") {
      const off = flux.onFluxEventDispatched("MESSAGE_CREATE", (payload) => {
        handleMessage(payload);
        return payload;
      });
      if (typeof off === "function") {
        cleanupFns.push(off);
        installed++;
      }
    }
  } catch (e) {
    hostError("could not subscribe to MESSAGE_CREATE", e);
  }
  status = installed ? "counting" : "no MESSAGE_CREATE event on this build";
}
async function startNext(api) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  jsonStorageApi = (_a = api == null ? void 0 : api.jsonStorage) != null ? _a : null;
  try {
    await ((_b = jsonStorageApi == null ? void 0 : jsonStorageApi.get) == null ? void 0 : _b.call(jsonStorageApi));
  } catch {
  }
  let saved = null;
  try {
    saved = (_d = (_c = jsonStorageApi == null ? void 0 : jsonStorageApi.use) == null ? void 0 : _c.call(jsonStorageApi)) != null ? _d : null;
  } catch {
  }
  if (saved && typeof saved === "object") {
    cfg = {
      channels: { ...(_e = saved.channels) != null ? _e : {} },
      daily: { ...(_f = saved.daily) != null ? _f : {} },
      tracking: saved.tracking !== false,
      trackDMs: saved.trackDMs === true
    };
  }
  try {
    myId = String((_j = (_i = (_h = (_g = getStores().UserStore) == null ? void 0 : _g.getCurrentUser) == null ? void 0 : _h.call(_g)) == null ? void 0 : _i.id) != null ? _j : "");
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
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  flush();
  status = "stopped";
}
function buildSettings() {
  const React = getReact();
  const RN = getRN();
  if (!(React == null ? void 0 : React.createElement) || !(RN == null ? void 0 : RN.Text)) return null;
  const el = React.createElement;
  const TABS = [
    { key: "channel", label: "Channel" },
    { key: "server", label: "Server" },
    { key: "total", label: "Total" },
    { key: "daily", label: "Daily" }
  ];
  return function MessageStatsSettings() {
    const D = getDesign();
    const [tab, setTabState] = React.useState("channel");
    const [confirmReset, setConfirmReset] = React.useState(false);
    const [tick, setTick] = React.useState(0);
    const setTab = (next) => setTabState(next);
    const refresh = () => setTick((n) => n + 1);
    void tick;
    const channelId = currentChannelId();
    const guildId = channelId ? currentGuildId(channelId) : "";
    const inDM = isDM(guildId);
    const channel = channelStats(channelId, guildId);
    const server = serverStats(guildId);
    const total = totalStats();
    const today = engine.today();
    const week = weekStats();
    const series = dailySeries();
    const maxDay = Math.max(1, ...series.map((d) => d.total));
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
    const counts = (key, label, c) => row(key, label, "Sent " + formatNumber(c.sent) + " \xB7 received " + formatNumber(c.received) + " \xB7 total " + formatNumber(c.sent + c.received));
    let body;
    if (tab === "server") {
      body = inDM || !guildId ? row("nodm", "Not in a server channel", "Open a server channel to see that server's totals.") : [
        counts("server", "This server", server),
        heading("top", "Busiest channels"),
        ...topChannels(guildId).length ? topChannels(guildId).map((c) => row(c.id, c.name, formatNumber(c.total) + " messages")) : [row("none", "Nothing counted here yet", "Send or receive a message and it appears.")]
      ];
    } else if (tab === "total") {
      body = [
        counts("total", "Everything counted", total),
        counts("today", "Today", today),
        counts("week", "Last " + CHART_DAYS + " days", week)
      ];
    } else if (tab === "daily") {
      body = [
        counts("week", "Last " + CHART_DAYS + " days", week),
        el(
          RN.View,
          { key: "chart", style: { flexDirection: "row", alignItems: "flex-end", height: 108, marginTop: 10 } },
          ...series.map((d, i) => el(
            RN.View,
            {
              key: d.date,
              style: { flex: 1, alignItems: "center", justifyContent: "flex-end", marginHorizontal: 1 }
            },
            el(RN.Text, { style: { color: "#9ba0a8", fontSize: 9, marginBottom: 2 } }, d.total ? String(d.total) : ""),
            el(RN.View, {
              style: {
                width: "74%",
                height: Math.max(2, Math.round(d.total / maxDay * 76)),
                borderRadius: 3,
                backgroundColor: d.date === dayKey() ? "#5865F2" : d.total > 0 ? "#4e5a8a" : "#232428"
              }
            }),
            el(RN.Text, { style: { color: "#9ba0a8", fontSize: 8, marginTop: 2 } }, d.date.slice(8))
          ))
        ),
        heading("days", "Per day"),
        ...series.slice().reverse().map((d) => row(d.date, d.date, "Sent " + formatNumber(d.sent) + " \xB7 received " + formatNumber(d.received) + " \xB7 total " + formatNumber(d.total)))
      ];
    } else {
      body = [
        counts("channel", channelId ? channelName(channelId) : "No channel open", channel),
        counts("today", "Today", today),
        row("tracking", "Track messages: " + (cfg.tracking ? "On" : "Off"), "Tap to switch counting on or off.", () => {
          engine.setTracking(!cfg.tracking);
          refresh();
        }),
        row("dms", "Track DMs: " + (cfg.trackDMs ? "On" : "Off"), "Direct messages are skipped while this is off.", () => {
          engine.setTrackDMs(!cfg.trackDMs);
          refresh();
        })
      ];
    }
    return el(
      RN.ScrollView,
      { style: { flex: 1, backgroundColor: "#1e1f22" } },
      el(
        RN.View,
        { style: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 30 } },
        el(RN.Text, { style: { color: "#ffffff", fontSize: 18, fontWeight: "800" } }, "Message Stats " + PLUGIN_VERSION),
        el(
          RN.Text,
          { style: { color: "#9ba0a8", fontSize: 12, marginTop: 2 } },
          status === "counting" ? "Counting messages" : status
        ),
        el(
          RN.ScrollView,
          { horizontal: true, showsHorizontalScrollIndicator: false },
          ...TABS.map((t) => chip(t.key, t.label, tab === t.key, () => setTab(t.key)))
        ),
        body,
        el(RN.Pressable, {
          key: "reset",
          accessibilityLabel: confirmReset ? "Tap again to clear" : "Reset stats",
          onPress: () => {
            if (!confirmReset) {
              setConfirmReset(true);
              return;
            }
            engine.reset();
            setConfirmReset(false);
            refresh();
          },
          style: { marginTop: 18, paddingVertical: 8 }
        }, el(
          RN.Text,
          { style: { color: "#f04747", fontSize: 13 } },
          confirmReset ? "Tap again to clear every count" : "Reset stats"
        ))
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
    return React.createElement((_c = RN.Text) != null ? _c : "text", { style: { color: "#ffffff", padding: 12 } }, "Message Stats settings could not load on this build.");
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
        try { console.error('[dev.8uvu.message-stats] bundle failed to evaluate', error); } catch (ignored) {}
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
                        el(N.Text, { style: { color: '#f04747', fontSize: 16, fontWeight: '700', marginBottom: 8 } }, "Message Stats" + ' failed to load'),
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