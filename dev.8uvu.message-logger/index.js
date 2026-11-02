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

// plugins/dev.8uvu.message-logger/js/index.tsx
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
var import_react = (({ default: valenced.react.React, ...valenced.react.React }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DEFAULTS = { enabled: true, toastGhostPings: true };
var MAX_ENTRIES = 500;
var entries = /* @__PURE__ */ new Map();
function selfId() {
  var _a, _b, _c, _d;
  try {
    return String((_d = (_c = (_b = (_a = import_flux.Stores.UserStore) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a)) == null ? void 0 : _c.id) != null ? _d : "");
  } catch {
    return "";
  }
}
function authorName(author) {
  var _a, _b, _c;
  if (!author) return "unknown";
  return String((_c = (_b = (_a = author.globalName) != null ? _a : author.username) != null ? _b : author.id) != null ? _c : "unknown");
}
function mentionsMe(message, me) {
  var _a;
  if (!me || ((_a = message == null ? void 0 : message.author) == null ? void 0 : _a.id) === me) return false;
  if (Array.isArray(message == null ? void 0 : message.mentions) && message.mentions.some((m) => {
    var _a2;
    return String((_a2 = m == null ? void 0 : m.id) != null ? _a2 : m) === me;
  })) return true;
  return Boolean(message == null ? void 0 : message.mention_everyone);
}
var engine = {
  handleCreate(payload) {
    var _a, _b, _c, _d, _e;
    const message = payload == null ? void 0 : payload.message;
    if (!(message == null ? void 0 : message.id)) return;
    const id = String(message.id);
    if (!entries.has(id)) {
      entries.set(id, {
        id,
        channelId: String((_b = (_a = message.channel_id) != null ? _a : payload == null ? void 0 : payload.channelId) != null ? _b : ""),
        author: authorName(message.author),
        authorId: String((_d = (_c = message.author) == null ? void 0 : _c.id) != null ? _d : ""),
        content: String((_e = message.content) != null ? _e : ""),
        timestamp: Date.now(),
        deleted: false,
        edited: false,
        mentionedMe: mentionsMe(message, selfId()),
        history: []
      });
      while (entries.size > MAX_ENTRIES) {
        const oldest = entries.keys().next().value;
        if (oldest === void 0) break;
        entries.delete(oldest);
      }
    }
  },
  handleUpdate(payload) {
    var _a;
    const message = payload == null ? void 0 : payload.message;
    if (!(message == null ? void 0 : message.id)) return;
    const id = String(message.id);
    const held = entries.get(id);
    const content = String((_a = message.content) != null ? _a : "");
    if (held && content !== held.content) {
      held.history.push(held.content);
      held.content = content;
      held.edited = true;
    }
  },
  handleDelete(api, payload) {
    var _a, _b, _c, _d, _e;
    const id = String((_c = (_b = payload == null ? void 0 : payload.id) != null ? _b : (_a = payload == null ? void 0 : payload.message) == null ? void 0 : _a.id) != null ? _c : "");
    const held = entries.get(id);
    if (!held || held.deleted) return false;
    held.deleted = true;
    const cfg = (_e = (_d = api == null ? void 0 : api.jsonStorage) == null ? void 0 : _d.cache) != null ? _e : DEFAULTS;
    if (cfg.toastGhostPings !== false && held.mentionedMe && held.authorId !== selfId()) {
      engine.ghostPingToast({ author: { globalName: held.author } });
      return true;
    }
    return false;
  },
  ghostPingToast(message) {
    try {
      import_actions.ToastActionCreators.open("message-logger", {
        text: `${authorName(message == null ? void 0 : message.author)} deleted a message`,
        variant: "default"
      });
    } catch {
      try {
        import_actions.ToastActionCreators.open({ key: "message-logger", content: "A logged message was deleted" });
      } catch {
      }
    }
  },
  all() {
    return [...entries.values()].sort((a, b) => b.timestamp - a.timestamp);
  },
  search(query) {
    const q = query.trim().toLowerCase();
    const all = engine.all();
    if (!q) return all;
    return all.filter((e) => e.content.toLowerCase().includes(q) || e.author.toLowerCase().includes(q));
  },
  clear() {
    entries.clear();
  },
  size: () => entries.size
};
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  engine,
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    const api = { jsonStorage };
    cleanup(
      (0, import_flux.onFluxEventDispatched)("MESSAGE_CREATE", (payload) => {
        var _a2, _b;
        try {
          if (((_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS).enabled !== false) engine.handleCreate(payload);
        } catch (error) {
          (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, "[MessageLogger] create failed", error);
        }
        return payload;
      })
    );
    cleanup(
      (0, import_flux.onFluxEventDispatched)("MESSAGE_UPDATE", (payload) => {
        var _a2, _b;
        try {
          if (((_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS).enabled !== false) engine.handleUpdate(payload);
        } catch (error) {
          (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, "[MessageLogger] update failed", error);
        }
        return payload;
      })
    );
    cleanup(
      (0, import_flux.onFluxEventDispatched)("MESSAGE_DELETE", (payload) => {
        var _a2, _b;
        try {
          if (((_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS).enabled === false) return payload;
          engine.handleDelete(api, payload);
        } catch (error) {
          (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, "[MessageLogger] delete failed", error);
        }
        return payload;
      })
    );
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[MessageLogger] started");
  },
  stop() {
    entries.clear();
  },
  SettingsComponent({ api }) {
    var _a, _b;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => api.jsonStorage.set(patch);
    const [query, setQuery] = (0, import_react.useState)("");
    const listed = engine.search(query).slice(0, 100);
    const D = (_b = import_design.Design) != null ? _b : {};
    if (D.TableRowGroup && D.TableSwitchRow && D.TableRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "MessageLogger", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Log messages",
              subLabel: "Only messages seen while the app is open can be logged.",
              value: settings.enabled !== false,
              onValueChange: (v) => set({ enabled: v })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Toast on deleted pings",
              value: settings.toastGhostPings !== false,
              onValueChange: (v) => set({ toastGhostPings: v })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "Clear log", subLabel: `${engine.size()} message(s)`, onPress: () => engine.clear() })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: `Logged (${listed.length})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { marginVertical: 4 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 2 }, children: "Search" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_react_native.TextInput,
              {
                style: { color: "#ffffff", backgroundColor: "#232428", borderRadius: 8, padding: 8 },
                value: query,
                onChangeText: setQuery
              }
            )
          ] }),
          listed.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableRow,
            {
              label: `${entry.author}${entry.deleted ? " (deleted)" : ""}${entry.edited ? " (edited)" : ""}`,
              subLabel: entry.content || "(no text)"
            },
            entry.id
          ))
        ] })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "MessageLogger" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 8 }, children: "Only messages seen while the app is open can be logged." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Log messages", onPress: () => set({ enabled: !(settings.enabled !== false) }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Log messages: ",
        settings.enabled !== false ? "on" : "off"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.Pressable,
        {
          accessibilityLabel: "Toast on deleted pings",
          onPress: () => set({ toastGhostPings: !(settings.toastGhostPings !== false) }),
          style: { paddingVertical: 8 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
            "Toast on deleted pings: ",
            settings.toastGhostPings !== false ? "on" : "off"
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Clear log", onPress: () => engine.clear(), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        "Clear log (",
        engine.size(),
        ")"
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginTop: 8, marginBottom: 4 }, children: "Search:" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.TextInput,
        {
          style: { color: "#ffffff", backgroundColor: "#232428", borderRadius: 8, padding: 8, marginBottom: 8 },
          defaultValue: query,
          onChangeText: setQuery
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginTop: 8 }, children: [
        "Logged (",
        listed.length,
        ")"
      ] }),
      listed.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { paddingVertical: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
          entry.author,
          entry.deleted ? " (deleted)" : "",
          entry.edited ? " (edited)" : ""
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8" }, children: entry.content || "(no text)" })
      ] }, entry.id))
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()