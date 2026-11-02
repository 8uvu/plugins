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

// plugins/dev.8uvu.last-online-tracker/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  engine: () => engine
});
module.exports = __toCommonJS(index_exports);
var import_flux = (valenced.discord.flux);
var import_actions = (valenced.discord.actions);
var import_design = (valenced.discord.design);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DEFAULTS = { persist: true, notify: false, lastSeen: {} };
var MIN_ONLINE_MS = 5e3;
var POLL_MS = 3e4;
var MAX_LIST = 100;
var lastSeen = {};
var seenOnlineAt = /* @__PURE__ */ new Map();
var pollTimer = null;
var lastEventDebug = "no presence events yet";
function statusOf(payload) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const raw = (_k = (_j = (_g = (_e = (_b = payload == null ? void 0 : payload.status) != null ? _b : (_a = payload == null ? void 0 : payload.presence) == null ? void 0 : _a.status) != null ? _e : (_d = (_c = payload == null ? void 0 : payload.presence) == null ? void 0 : _c.clientStatus) == null ? void 0 : _d.status) != null ? _g : (_f = payload == null ? void 0 : payload.user) == null ? void 0 : _f.status) != null ? _j : (_i = (_h = payload == null ? void 0 : payload.presence) == null ? void 0 : _h.user) == null ? void 0 : _i.status) != null ? _k : null;
  if (typeof raw !== "string") return null;
  const status = raw.toLowerCase();
  return ["online", "idle", "dnd", "offline", "invisible", "unknown"].includes(status) ? status : null;
}
function isOnline(status) {
  return status === "online" || status === "idle" || status === "dnd";
}
function displayName(userId) {
  var _a, _b, _c, _d;
  try {
    const user = (_b = (_a = import_flux.Stores.UserStore) == null ? void 0 : _a.getUser) == null ? void 0 : _b.call(_a, userId);
    return String((_d = (_c = user == null ? void 0 : user.globalName) != null ? _c : user == null ? void 0 : user.username) != null ? _d : userId);
  } catch {
    return String(userId);
  }
}
var engine = {
  receive(api, userId, status) {
    var _a, _b, _c, _d, _e, _f;
    if (!userId || !status) return false;
    const now = Date.now();
    if (isOnline(status)) {
      if (!seenOnlineAt.has(userId)) seenOnlineAt.set(userId, now);
      return false;
    }
    const firstSeen = seenOnlineAt.get(userId);
    seenOnlineAt.delete(userId);
    if (firstSeen === void 0 || now - firstSeen < MIN_ONLINE_MS) return false;
    lastSeen[userId] = now;
    const cfg = (_b = (_a = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _a.cache) != null ? _b : DEFAULTS;
    if (cfg.persist !== false) {
      (_f = (_d = (_c = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _c.set) == null ? void 0 : (_e = _d.call(_c, { lastSeen: { ...lastSeen } })).catch) == null ? void 0 : _f.call(_e, () => {
      });
    }
    if (cfg.notify === true) {
      try {
        import_actions.ToastActionCreators.open({ key: "last-online-tracker", content: `${displayName(userId)} went offline` });
      } catch {
        try {
          import_actions.ToastActionCreators.open("last-online-tracker", { text: `${displayName(userId)} went offline`, variant: "default" });
        } catch {
        }
      }
    }
    return true;
  },
  onlineCount() {
    return seenOnlineAt.size;
  },
  debug() {
    return lastEventDebug;
  },
  entries() {
    return Object.entries(lastSeen).map(([userId, at]) => ({ userId, name: displayName(userId), at })).sort((a, b) => b.at - a.at).slice(0, MAX_LIST);
  },
  reset() {
    for (const key of Object.keys(lastSeen)) delete lastSeen[key];
    seenOnlineAt.clear();
  }
};
function snapshotPresences() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const out = [];
  try {
    const store = import_flux.Stores.PresenceStore;
    if (!store) return out;
    const push = (id, status) => {
      if (id == null || status == null) return;
      const s = String(status).toLowerCase();
      if (s) out.push({ id: String(id), status: s });
    };
    try {
      const ids = (_b = (_a = store == null ? void 0 : store.getUserIds) == null ? void 0 : _a.call(store)) != null ? _b : [];
      for (const id of ids) push(id, (_c = store == null ? void 0 : store.getStatus) == null ? void 0 : _c.call(store, String(id)));
      if (out.length) return out;
    } catch {
    }
    try {
      const state = (_i = (_h = (_f = (_d = store == null ? void 0 : store.getState) == null ? void 0 : _d.call(store)) != null ? _f : (_e = store == null ? void 0 : store.getPresences) == null ? void 0 : _e.call(store)) != null ? _h : (_g = store == null ? void 0 : store.getAll) == null ? void 0 : _g.call(store)) != null ? _i : null;
      const map = (_j = state == null ? void 0 : state.presences) != null ? _j : state;
      if (map && typeof map === "object") {
        const entries = map instanceof Map ? Array.from(map.entries()) : Object.entries(map);
        for (const [id, p] of entries) {
          push(id, typeof p === "string" ? p : (_l = p == null ? void 0 : p.status) != null ? _l : (_k = p == null ? void 0 : p.presence) == null ? void 0 : _k.status);
        }
        if (out.length) return out;
      }
    } catch {
    }
    try {
      const all = (_o = (_n = (_m = store == null ? void 0 : store.getAll) == null ? void 0 : _m.call(store)) != null ? _n : store == null ? void 0 : store.presences) != null ? _o : null;
      if (all && typeof all === "object") {
        for (const [id, p] of Object.entries(all)) push(id, (_p = p == null ? void 0 : p.status) != null ? _p : p);
      }
    } catch {
    }
  } catch {
  }
  return out;
}
function pollOnce(api) {
  for (const { id, status } of snapshotPresences()) {
    try {
      engine.receive(api, id, status);
    } catch {
    }
  }
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  engine,
  start({ cleanup, jsonStorage, logger }) {
    var _a, _b, _c;
    const api = { jsonStorage };
    try {
      const saved = (_a = jsonStorage.cache) == null ? void 0 : _a.lastSeen;
      if (saved && typeof saved === "object") {
        for (const [id, at] of Object.entries(saved)) {
          if (typeof at === "number") lastSeen[id] = at;
        }
      }
    } catch {
    }
    const onPresence = (payload) => {
      var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j;
      const list = Array.isArray(payload == null ? void 0 : payload.presences) ? payload.presences : Array.isArray(payload == null ? void 0 : payload.updates) ? payload.updates : [payload];
      for (const item of list) {
        const userId = String(
          (_i = (_h = (_g = (_f = (_c2 = (_a2 = item == null ? void 0 : item.userId) != null ? _a2 : item == null ? void 0 : item.user_id) != null ? _c2 : (_b2 = item == null ? void 0 : item.user) == null ? void 0 : _b2.id) != null ? _f : (_e = (_d = item == null ? void 0 : item.presence) == null ? void 0 : _d.user) == null ? void 0 : _e.id) != null ? _g : payload == null ? void 0 : payload.userId) != null ? _h : payload == null ? void 0 : payload.user_id) != null ? _i : ""
        );
        const status = (_j = statusOf(item)) != null ? _j : statusOf(payload);
        if (userId && status) {
          lastEventDebug = `${userId} -> ${status}`;
          engine.receive(api, userId, status);
        }
      }
    };
    const unsubs = [];
    try {
      unsubs.push((0, import_flux.onFluxEventDispatched)("PRESENCE_UPDATE", onPresence));
    } catch {
    }
    try {
      unsubs.push((0, import_flux.onFluxEventDispatched)("PRESENCE_UPDATES", onPresence));
    } catch {
    }
    try {
      if (typeof import_flux.onAnyFluxEventDispatched === "function") {
        unsubs.push(
          (0, import_flux.onAnyFluxEventDispatched)((payload) => {
            if (!payload || typeof payload !== "object") return;
            if (!("presences" in payload || "updates" in payload || "presence" in payload)) return;
            try {
              onPresence(payload);
            } catch {
            }
          })
        );
      }
    } catch {
    }
    for (const u of unsubs) cleanup(u);
    try {
      pollOnce(api);
    } catch {
    }
    try {
      (0, import_flux.getStore)("PresenceStore", () => pollOnce(api));
    } catch {
    }
    pollTimer = setInterval(() => pollOnce(api), POLL_MS);
    try {
      (_b = pollTimer == null ? void 0 : pollTimer.unref) == null ? void 0 : _b.call(pollTimer);
    } catch {
    }
    cleanup(() => {
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = null;
    });
    (_c = logger == null ? void 0 : logger.log) == null ? void 0 : _c.call(logger, "[LastOnlineTracker] started");
  },
  stop() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
  },
  SettingsComponent({ api }) {
    var _a, _b;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => api.jsonStorage.set(patch);
    const entries = engine.entries();
    const D = (_b = import_design.Design) != null ? _b : {};
    const fmt = (at) => {
      const d = new Date(at);
      return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    };
    if (D.TableRowGroup && D.TableSwitchRow && D.TableRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "LastOnlineTracker", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Remember across restarts",
              value: settings.persist !== false,
              onValueChange: (v) => set({ persist: v })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Toast on offline",
              subLabel: "Toast when a friend goes offline.",
              value: settings.notify === true,
              onValueChange: (v) => set({ notify: v })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: `Last seen (${entries.length})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: `Tracking ${engine.onlineCount()} online now`, subLabel: `Last event: ${engine.debug()}` }),
          entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "Nothing yet", subLabel: "Leave the app open \u2014 departures appear after someone was online ~5s, then goes offline." }) : entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: entry.name, subLabel: fmt(entry.at) }, entry.userId))
        ] })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "LastOnlineTracker" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Remember across restarts", onPress: () => set({ persist: !(settings.persist !== false) }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Remember across restarts: ",
        settings.persist !== false ? "on" : "off"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Toast on offline", onPress: () => set({ notify: !(settings.notify === true) }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Toast on offline: ",
        settings.notify === true ? "on" : "off"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#9ba0a8", marginTop: 8 }, children: [
        "Tracking ",
        engine.onlineCount(),
        " online now \xB7 Last event: ",
        engine.debug()
      ] }),
      entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginTop: 4 }, children: "Nothing yet \u2014 leave the app open. Departures appear after someone was online ~5s, then goes offline." }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginTop: 8, marginBottom: 4 }, children: [
        "Last seen (",
        entries.length,
        ")"
      ] }),
      entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { paddingVertical: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: entry.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8" }, children: fmt(entry.at) })
      ] }, entry.userId))
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()