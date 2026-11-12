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

// plugins/dev.8uvu.dont-control-me/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_flux = (valenced.discord.flux);
var import_design = (valenced.discord.design);
var import_finders = (valenced.modules.finders);
var import_filters = (valenced.modules.finders.filters);
var import_react_native = ((function () { return { ...((valenced.react && valenced.react.ReactNative) || {}) }; })());
var import_jsx_runtime = ((function () { const rt = () => (valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime)) || {}; return { get jsx() { return rt().jsx }, get jsxs() { return rt().jsxs }, get Fragment() { return rt().Fragment } }; })());
var DEFAULTS = {
  reconnect: true,
  moveToPinned: true,
  autoUnmute: true,
  autoUndeafen: true,
  pinnedChannelId: null
};
function selfId() {
  var _a, _b, _c, _d;
  try {
    return String((_d = (_c = (_b = (_a = import_flux.Stores.UserStore) == null ? void 0 : _a.getCurrentUser) == null ? void 0 : _b.call(_a)) == null ? void 0 : _c.id) != null ? _d : "");
  } catch {
    return "";
  }
}
function currentVoiceChannelId() {
  var _a, _b, _c, _d, _e;
  try {
    const selected = (_a = import_flux.Stores.SelectedChannelStore) != null ? _a : import_flux.Stores.SelectedVoiceChannelStore;
    const id = (_e = (_d = (_b = selected == null ? void 0 : selected.getVoiceChannelId) == null ? void 0 : _b.call(selected)) != null ? _d : (_c = selected == null ? void 0 : selected.getChannelId) == null ? void 0 : _c.call(selected)) != null ? _e : null;
    return id ? String(id) : null;
  } catch {
    return null;
  }
}
function findVoiceActions() {
  try {
    const [mod] = (0, import_finders.lookupModule)((0, import_filters.withProps)("selectVoiceChannel"));
    if (mod && typeof mod.selectVoiceChannel === "function") return mod;
  } catch {
  }
  return null;
}
function findVoiceStateActions() {
  try {
    const [mod] = (0, import_finders.lookupModule)((0, import_filters.withProps)("updateVoiceState"));
    if (mod && typeof mod.updateVoiceState === "function") return mod;
  } catch {
  }
  return null;
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    let cooling = false;
    let warned = false;
    const guarded = (fn) => {
      var _a2;
      if (cooling) return;
      cooling = true;
      setTimeout(() => {
        cooling = false;
      }, 1e3);
      try {
        fn();
      } catch (error) {
        (_a2 = logger == null ? void 0 : logger.error) == null ? void 0 : _a2.call(logger, "[DontControlMe] action failed", error);
      }
    };
    cleanup(
      (0, import_flux.onFluxEventDispatched)("VOICE_STATE_UPDATE", (payload) => {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
        try {
          const cfg = (_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS;
          const state = (_b = payload == null ? void 0 : payload.voiceState) != null ? _b : payload;
          const states = Array.isArray(payload == null ? void 0 : payload.voiceStates) ? payload.voiceStates : [state];
          const me = selfId();
          for (const vs of states) {
            const userId = String((_e = (_d = (_c = vs == null ? void 0 : vs.userId) != null ? _c : vs == null ? void 0 : vs.user_id) != null ? _d : payload == null ? void 0 : payload.userId) != null ? _e : "");
            if (!me || userId && userId !== me) continue;
            const channelId = (_h = (_g = (_f = vs == null ? void 0 : vs.channelId) != null ? _f : vs == null ? void 0 : vs.channel_id) != null ? _g : payload == null ? void 0 : payload.channelId) != null ? _h : null;
            const pinned = (_i = cfg.pinnedChannelId) != null ? _i : null;
            if (pinned && cfg.moveToPinned && channelId && String(channelId) !== pinned) {
              const voice = findVoiceActions();
              if (!voice) {
                if (!warned) {
                  warned = true;
                  (_j = logger == null ? void 0 : logger.error) == null ? void 0 : _j.call(logger, "[DontControlMe] no voice actions module; move-back is idle");
                }
              } else {
                guarded(() => voice.selectVoiceChannel(pinned));
              }
            }
            if ((!channelId || channelId === null) && cfg.reconnect && pinned) {
              const voice = findVoiceActions();
              if (voice) guarded(() => voice.selectVoiceChannel(pinned));
            }
            const muted = (_k = vs == null ? void 0 : vs.mute) != null ? _k : payload == null ? void 0 : payload.mute;
            const deafened = (_l = vs == null ? void 0 : vs.deaf) != null ? _l : payload == null ? void 0 : payload.deaf;
            if (muted && cfg.autoUnmute || deafened && cfg.autoUndeafen) {
              const actions = findVoiceStateActions();
              if (actions) {
                guarded(
                  () => actions.updateVoiceState(pinned, {
                    mute: muted && cfg.autoUnmute ? false : void 0,
                    deaf: deafened && cfg.autoUndeafen ? false : void 0
                  })
                );
              }
            }
          }
        } catch (error) {
          (_m = logger == null ? void 0 : logger.error) == null ? void 0 : _m.call(logger, "[DontControlMe] handler failed", error);
        }
        return payload;
      })
    );
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[DontControlMe] started");
  },
  SettingsComponent({ api }) {
    var _a, _b, _c, _d, _e;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => api.jsonStorage.set(patch);
    const pin = () => {
      const id = currentVoiceChannelId();
      if (id) api.jsonStorage.set({ pinnedChannelId: id });
    };
    const D = (_b = import_design.Design) != null ? _b : {};
    const pinned = (_c = settings.pinnedChannelId) != null ? _c : null;
    if (D.TableRowGroup && D.TableSwitchRow) {
      const Row = (_d = D.TableRow) != null ? _d : null;
      const Button = (_e = D.Button) != null ? _e : null;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Don't Control Me", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Rejoin when dropped",
            value: settings.reconnect !== false,
            onValueChange: (v) => set({ reconnect: v })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Return to pinned channel",
            value: settings.moveToPinned !== false,
            onValueChange: (v) => set({ moveToPinned: v })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Undo server mute",
            value: settings.autoUnmute !== false,
            onValueChange: (v) => set({ autoUnmute: v })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Undo server deafen",
            value: settings.autoUndeafen !== false,
            onValueChange: (v) => set({ autoUndeafen: v })
          }
        ),
        Row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Pinned channel", subLabel: pinned != null ? pinned : "None \u2014 join a voice channel, then pin it." }) : null,
        Button ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { text: pinned ? "Unpin channel" : "Pin current channel", onPress: () => pinned ? set({ pinnedChannelId: null }) : pin() }) : null
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "Don't Control Me" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 8 }, children: [
        "Pinned: ",
        pinned != null ? pinned : "none"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.Pressable,
        {
          accessibilityLabel: pinned ? "Unpin channel" : "Pin current channel",
          onPress: () => pinned ? set({ pinnedChannelId: null }) : pin(),
          style: { padding: 12, backgroundColor: "#232428", borderRadius: 8, marginBottom: 8 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: pinned ? "Unpin channel" : "Pin current channel" })
        }
      ),
      ["reconnect", "moveToPinned", "autoUnmute", "autoUndeafen"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.Pressable,
        {
          accessibilityLabel: key,
          onPress: () => set({ [key]: !settings[key] }),
          style: { paddingVertical: 10 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
            key,
            ": ",
            settings[key] !== false ? "on" : "off"
          ] })
        },
        key
      ))
    ] });
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } return __plugin; })()