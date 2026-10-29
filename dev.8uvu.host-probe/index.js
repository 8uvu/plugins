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

// plugins/dev.8uvu.host-probe/js/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var rows = [];
function push(key, value) {
  rows.push({ key, value: value === void 0 ? "undefined" : String(value) });
}
function probeGlobals() {
  const present = [];
  try {
    if (typeof revenge !== "undefined" && revenge) present.push("revenge");
  } catch {
  }
  try {
    if (typeof bunny !== "undefined" && bunny) present.push("bunny");
  } catch {
  }
  try {
    if (typeof vendetta !== "undefined" && vendetta) present.push("vendetta");
  } catch {
  }
  try {
    if (typeof valenced !== "undefined" && valenced) present.push("valenced");
  } catch {
  }
  try {
    if (typeof plugin !== "undefined" && typeof plugin === "function") present.push("plugin(factory)");
  } catch {
  }
  return present;
}
function probeRevenge() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  try {
    if (typeof revenge === "undefined") return;
    const r = revenge;
    push("revenge.api version", (_c = (_b = (_a = r == null ? void 0 : r.api) == null ? void 0 : _a.version) != null ? _b : r == null ? void 0 : r.apiVersion) != null ? _c : "?");
    push("revenge.react", !!(r == null ? void 0 : r.react));
    push("revenge.react.jsxRuntime", !!((_d = r == null ? void 0 : r.react) == null ? void 0 : _d.jsxRuntime));
    push("revenge.discord.flux", !!((_e = r == null ? void 0 : r.discord) == null ? void 0 : _e.flux));
    push("flux.onFluxEventDispatched", typeof ((_g = (_f = r == null ? void 0 : r.discord) == null ? void 0 : _f.flux) == null ? void 0 : _g.onFluxEventDispatched));
    push("flux.Stores.UserStore", !!((_j = (_i = (_h = r == null ? void 0 : r.discord) == null ? void 0 : _h.flux) == null ? void 0 : _i.Stores) == null ? void 0 : _j.UserStore));
    push("revenge.discord.actions", !!((_k = r == null ? void 0 : r.discord) == null ? void 0 : _k.actions));
    push("revenge.discord.design", !!((_l = r == null ? void 0 : r.discord) == null ? void 0 : _l.design));
    push("revenge.discord.native.FileModule", !!((_n = (_m = r == null ? void 0 : r.discord) == null ? void 0 : _m.native) == null ? void 0 : _n.FileModule));
    push("revenge.logger", !!(r == null ? void 0 : r.logger));
  } catch (e) {
    push("revenge probe error", e instanceof Error ? e.message : String(e));
  }
}
function probeBunny() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  try {
    if (typeof bunny === "undefined") return;
    const b = bunny;
    push("bunny.api.flux.intercept", typeof ((_b = (_a = b == null ? void 0 : b.api) == null ? void 0 : _a.flux) == null ? void 0 : _b.intercept));
    push("bunny.plugin.createStorage", typeof ((_c = b == null ? void 0 : b.plugin) == null ? void 0 : _c.createStorage));
    push("bunny.plugin.logger", !!((_d = b == null ? void 0 : b.plugin) == null ? void 0 : _d.logger));
    push("bunny.metro", !!(b == null ? void 0 : b.metro));
    push("bunny.metro.common.React", !!((_f = (_e = b == null ? void 0 : b.metro) == null ? void 0 : _e.common) == null ? void 0 : _f.React));
    push("bunny.metro.common.FluxDispatcher", !!((_h = (_g = b == null ? void 0 : b.metro) == null ? void 0 : _g.common) == null ? void 0 : _h.FluxDispatcher));
    push("bunny.native.FileModule", !!(((_j = (_i = b == null ? void 0 : b.api) == null ? void 0 : _i.native) == null ? void 0 : _j.FileModule) || ((_k = b == null ? void 0 : b.native) == null ? void 0 : _k.FileModule)));
  } catch (e) {
    push("bunny probe error", e instanceof Error ? e.message : String(e));
  }
}
function probeVendetta() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
  try {
    if (typeof vendetta === "undefined") return;
    const v = vendetta;
    push("vendetta.plugin.storage", !!((_a = v == null ? void 0 : v.plugin) == null ? void 0 : _a.storage));
    push("vendetta.metro.common.React", !!((_c = (_b = v == null ? void 0 : v.metro) == null ? void 0 : _b.common) == null ? void 0 : _c.React));
    push("vendetta.metro.common.FluxDispatcher", !!((_e = (_d = v == null ? void 0 : v.metro) == null ? void 0 : _d.common) == null ? void 0 : _e.FluxDispatcher));
    push("dispatcher.addInterceptor", typeof ((_j = (_i = (_g = (_f = v == null ? void 0 : v.metro) == null ? void 0 : _f.common) == null ? void 0 : _g.FluxDispatcher) != null ? _i : (_h = v == null ? void 0 : v.common) == null ? void 0 : _h.FluxDispatcher) == null ? void 0 : _j.addInterceptor));
    push("vendetta.ui.toasts.showToast", typeof ((_o = (_l = (_k = v == null ? void 0 : v.ui) == null ? void 0 : _k.toasts) == null ? void 0 : _l.showToast) != null ? _o : (_n = (_m = v == null ? void 0 : v.common) == null ? void 0 : _m.toasts) == null ? void 0 : _n.showToast));
    push("vendetta.metro.findByStoreName", typeof ((_p = v == null ? void 0 : v.metro) == null ? void 0 : _p.findByStoreName));
    try {
      const us = (_r = (_q = v == null ? void 0 : v.metro) == null ? void 0 : _q.findByStoreName) == null ? void 0 : _r.call(_q, "UserStore");
      push("metro UserStore", !!us);
    } catch {
      push("metro UserStore", "finder threw");
    }
  } catch (e) {
    push("vendetta probe error", e instanceof Error ? e.message : String(e));
  }
}
function probeValenced() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
  let v = null;
  try {
    v = typeof valenced !== "undefined" ? valenced : null;
  } catch {
  }
  if (!v) {
    push("valenced global", "absent");
    return;
  }
  push("valenced global", "present");
  try {
    push("valenced.react", !!(v == null ? void 0 : v.react));
    push("react.React.createElement", typeof ((_b = (_a = v == null ? void 0 : v.react) == null ? void 0 : _a.React) == null ? void 0 : _b.createElement));
    push("react.ReactNative.View", !!((_d = (_c = v == null ? void 0 : v.react) == null ? void 0 : _c.ReactNative) == null ? void 0 : _d.View));
    push("react.jsxRuntime.afterJSX", typeof ((_f = (_e = v == null ? void 0 : v.react) == null ? void 0 : _e.jsxRuntime) == null ? void 0 : _f.afterJSX));
    push("react.ReactJSXRuntime.afterJSX", typeof ((_h = (_g = v == null ? void 0 : v.react) == null ? void 0 : _g.ReactJSXRuntime) == null ? void 0 : _h.afterJSX));
  } catch (e) {
    push("react probe error", e instanceof Error ? e.message : String(e));
  }
  try {
    push("discord.flux", !!((_i = v == null ? void 0 : v.discord) == null ? void 0 : _i.flux));
    push("flux.onFluxEventDispatched", typeof ((_k = (_j = v == null ? void 0 : v.discord) == null ? void 0 : _j.flux) == null ? void 0 : _k.onFluxEventDispatched));
    const stores = (_m = (_l = v == null ? void 0 : v.discord) == null ? void 0 : _l.flux) == null ? void 0 : _m.Stores;
    let names = "";
    try {
      const keys = [];
      if (stores) for (const k in stores) {
        keys.push(k);
        if (keys.length >= 12) break;
      }
      names = keys.join(",") || "empty";
    } catch {
      names = "unreadable";
    }
    push("flux.Stores sample", names);
    push("UserStore present", !!(stores == null ? void 0 : stores.UserStore));
    push("PresenceStore present", !!(stores == null ? void 0 : stores.PresenceStore));
    push("ChannelStore present", !!(stores == null ? void 0 : stores.ChannelStore));
    push("SelectedChannelStore present", !!(stores == null ? void 0 : stores.SelectedChannelStore));
    push("discord.actions.ToastActionCreators.open", typeof ((_p = (_o = (_n = v == null ? void 0 : v.discord) == null ? void 0 : _n.actions) == null ? void 0 : _o.ToastActionCreators) == null ? void 0 : _p.open));
    const d = (_t = (_r = (_q = v == null ? void 0 : v.discord) == null ? void 0 : _q.design) == null ? void 0 : _r.Design) != null ? _t : (_s = v == null ? void 0 : v.discord) == null ? void 0 : _s.design;
    push("design TableRowGroup", !!(d == null ? void 0 : d.TableRowGroup));
    push("discord.native.FileModule", !!((_v = (_u = v == null ? void 0 : v.discord) == null ? void 0 : _u.native) == null ? void 0 : _v.FileModule));
  } catch (e) {
    push("discord probe error", e instanceof Error ? e.message : String(e));
  }
  try {
    const finders = (_w = v == null ? void 0 : v.modules) == null ? void 0 : _w.finders;
    const filters = (_y = (_x = v == null ? void 0 : v.modules) == null ? void 0 : _x.finders) == null ? void 0 : _y.filters;
    push("modules.finders.lookupModule", typeof (finders == null ? void 0 : finders.lookupModule));
    push("modules.finders.getModules", typeof (finders == null ? void 0 : finders.getModules));
    push("filters.withProps", typeof (filters == null ? void 0 : filters.withProps));
    push("filters.withName", typeof (filters == null ? void 0 : filters.withName));
    push("filters.anyOf", typeof (filters == null ? void 0 : filters.anyOf));
    if (finders && filters) {
      try {
        const [mod] = finders.lookupModule(filters.withProps("dispatch", "subscribe"));
        push("dispatcher via finders", mod && typeof mod.dispatch === "function" ? "FOUND" : "not found");
      } catch {
        push("dispatcher via finders", "threw");
      }
      const named = [];
      try {
        named.push(["ChatInput", filters.withName("ChatInput")]);
      } catch {
      }
      try {
        named.push(["ChannelTextArea", filters.withName("ChannelTextArea")]);
      } catch {
      }
      try {
        named.push(["MessageInput", filters.withName("MessageInput")]);
      } catch {
      }
      try {
        named.push(["ChatBox", filters.withName("ChatBox")]);
      } catch {
      }
      const byProps = [];
      try {
        byProps.push(["channelId+onSend", filters.withProps("channelId", "onSend")]);
      } catch {
      }
      try {
        byProps.push(["sendMessage+channelId", filters.withProps("sendMessage", "channelId")]);
      } catch {
      }
      try {
        byProps.push(["renderAccessory+channelId", filters.withProps("renderAccessory", "channelId")]);
      } catch {
      }
      let combined = null;
      try {
        combined = filters.anyOf(...named.map((n) => n[1]), ...byProps.map((b) => b[1]));
      } catch {
      }
      const seen = [];
      const describe = (m) => {
        var _a2, _b2, _c2;
        if (!m) return "miss";
        const c = (_a2 = m == null ? void 0 : m.default) != null ? _a2 : m;
        return "HIT:" + String((_c2 = (_b2 = c == null ? void 0 : c.displayName) != null ? _b2 : c == null ? void 0 : c.name) != null ? _c2 : typeof c);
      };
      const runFilter = (label, f) => {
        try {
          const [m] = finders.lookupModule(f);
          push("chat candidate " + label, describe(m));
          if (m) seen.push(label);
        } catch {
          push("chat candidate " + label, "threw");
        }
      };
      for (const [label, f] of named) runFilter(label, f);
      for (const [label, f] of byProps) runFilter(label, f);
      if (combined) {
        try {
          const [m] = finders.lookupModule(combined);
          push("chat candidate COMBINED", describe(m));
        } catch {
          push("chat candidate COMBINED", "threw");
        }
      }
      push("chat candidates hit", seen.join(",") || "NONE");
    }
    push("patcher.after", typeof ((_z = v == null ? void 0 : v.patcher) == null ? void 0 : _z.after));
  } catch (e) {
    push("modules probe error", e instanceof Error ? e.message : String(e));
  }
}
function probeStorageApi(api) {
  push("jsonStorage passed to start", !!(api == null ? void 0 : api.jsonStorage));
  if (api == null ? void 0 : api.jsonStorage) {
    push("jsonStorage.get", typeof api.jsonStorage.get);
    push("jsonStorage.subscribe", typeof api.jsonStorage.subscribe);
  }
}
function summary() {
  const globals = probeGlobals();
  let kind = "unknown host";
  try {
    if (typeof valenced !== "undefined" && valenced) kind = "Valenced";
    else if (typeof revenge !== "undefined") kind = "Revenge (Next API)";
    else if (typeof bunny !== "undefined") kind = "Revenge Classic (bunny)";
    else if (typeof vendetta !== "undefined") kind = "Vendetta-compat manager";
  } catch {
  }
  return kind + " \xB7 globals: " + (globals.join(", ") || "NONE");
}
var _React = null;
function react() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (_React) return _React;
  try {
    const v = typeof valenced !== "undefined" ? valenced : null;
    const r = (_a = v == null ? void 0 : v.react) == null ? void 0 : _a.React;
    if (r == null ? void 0 : r.createElement) _React = r;
  } catch {
  }
  try {
    if (typeof revenge !== "undefined") {
      const r = revenge.react;
      if (r) _React = r.React || r;
    }
  } catch {
  }
  try {
    if (!_React && typeof bunny !== "undefined") {
      const b = bunny;
      _React = b.React || ((_b = b.common) == null ? void 0 : _b.React) || ((_d = (_c = b.metro) == null ? void 0 : _c.common) == null ? void 0 : _d.React);
    }
  } catch {
  }
  try {
    if (!_React && typeof vendetta !== "undefined") _React = (_h = (_e = vendetta == null ? void 0 : vendetta.common) == null ? void 0 : _e.React) != null ? _h : (_g = (_f = vendetta == null ? void 0 : vendetta.metro) == null ? void 0 : _f.common) == null ? void 0 : _g.React;
  } catch {
  }
  return _React;
}
var _RN = null;
function reactNative() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  if (_RN) return _RN;
  try {
    const v = typeof valenced !== "undefined" ? valenced : null;
    const rn = (_a = v == null ? void 0 : v.react) == null ? void 0 : _a.ReactNative;
    if ((rn == null ? void 0 : rn.View) && (rn == null ? void 0 : rn.Text)) _RN = rn;
  } catch {
  }
  try {
    if (typeof revenge !== "undefined") _RN = (_b = revenge == null ? void 0 : revenge.react) == null ? void 0 : _b.ReactNative;
  } catch {
  }
  try {
    if (!_RN && typeof bunny !== "undefined") {
      const b = bunny;
      _RN = b.ReactNative || ((_c = b.common) == null ? void 0 : _c.ReactNative) || ((_e = (_d = b.metro) == null ? void 0 : _d.common) == null ? void 0 : _e.ReactNative);
    }
  } catch {
  }
  try {
    if (!_RN && typeof vendetta !== "undefined") _RN = (_i = (_f = vendetta == null ? void 0 : vendetta.common) == null ? void 0 : _f.ReactNative) != null ? _i : (_h = (_g = vendetta == null ? void 0 : vendetta.metro) == null ? void 0 : _g.common) == null ? void 0 : _h.ReactNative;
  } catch {
  }
  return _RN;
}
function settingsInk() {
  var _a, _b, _c, _d, _e;
  let dark = true;
  try {
    const tm = (_c = (_b = (_a = globalThis.revenge) == null ? void 0 : _a.metro) == null ? void 0 : _b.findByProps) == null ? void 0 : _c.call(_b, "theme", "setTheme");
    const t = (_e = (_d = tm == null ? void 0 : tm.theme) != null ? _d : tm == null ? void 0 : tm.resolvedTheme) != null ? _e : tm == null ? void 0 : tm.currentTheme;
    if (t) dark = String(t).toLowerCase().includes("dark");
  } catch {
  }
  return dark ? { text: "#ffffff", sub: "#9ba0a8" } : { text: "#060607", sub: "#5c5e66" };
}
function resolveDesign() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  try {
    const v = typeof valenced !== "undefined" ? valenced : null;
    const d = (_d = (_b = (_a = v == null ? void 0 : v.discord) == null ? void 0 : _a.design) == null ? void 0 : _b.Design) != null ? _d : (_c = v == null ? void 0 : v.discord) == null ? void 0 : _c.design;
    if (d && (d.TableRowGroup || d.TableSwitchRow || d.TableRow)) return d;
  } catch {
  }
  try {
    const g = (_f = (_e = globalThis.revenge) == null ? void 0 : _e.discord) == null ? void 0 : _f.design;
    const d = (_g = g == null ? void 0 : g.Design) != null ? _g : g;
    if (d && (d.TableRowGroup || d.TableSwitchRow || d.TableRow)) return d;
  } catch {
  }
  try {
    const b = (_h = globalThis.bunny) == null ? void 0 : _h.ui;
    if (b == null ? void 0 : b.FormTableRowGroup) return b;
  } catch {
  }
  return null;
}
function makeSettings() {
  const ink = settingsInk();
  const React = react();
  const RN = reactNative();
  if (!React || !RN) return null;
  const { View, Text, ScrollView } = RN;
  const el = React.createElement;
  const D = resolveDesign();
  return function Settings() {
    try {
      if ((D == null ? void 0 : D.TableRowGroup) && (D == null ? void 0 : D.TableRow)) {
        return el(
          ScrollView,
          { style: { flex: 1 } },
          el(
            D.TableRowGroup,
            { title: "Host" },
            el(D.TableRow, { key: "summary", label: "Host probe", subLabel: summary() }),
            ...rows.map((r, i) => el(D.TableRow, { key: i, label: r.key, subLabel: r.value }))
          )
        );
      }
    } catch {
    }
    return el(
      ScrollView,
      { style: { flex: 1 } },
      el(View, { style: { padding: 12 } }, el(Text, { style: { fontWeight: "bold", marginBottom: 8, color: ink.text } }, summary())),
      rows.map(
        (r, i) => el(
          View,
          { key: i, style: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 } },
          el(Text, { style: { flex: 1, color: ink.text } }, r.key),
          el(Text, { style: { color: ink.sub } }, r.value)
        )
      )
    );
  };
}
function showToastEverywhere(content, key) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const show = (fn, arg) => {
    try {
      if (typeof fn !== "function") return false;
      fn(arg);
      return true;
    } catch {
      return false;
    }
  };
  try {
    const v = typeof valenced !== "undefined" ? valenced : null;
    const open = (_c = (_b = (_a = v == null ? void 0 : v.discord) == null ? void 0 : _a.actions) == null ? void 0 : _b.ToastActionCreators) == null ? void 0 : _c.open;
    if (show(open, { key, content })) return;
  } catch {
  }
  try {
    const a = typeof revenge !== "undefined" ? (_d = revenge == null ? void 0 : revenge.discord) == null ? void 0 : _d.actions : null;
    const open = (_f = (_e = a == null ? void 0 : a.ToastActionCreators) == null ? void 0 : _e.open) != null ? _f : a == null ? void 0 : a.open;
    if (show(open, { key, content })) return;
  } catch {
  }
  try {
    const v = typeof vendetta !== "undefined" ? vendetta : null;
    const s = (_k = (_h = (_g = v == null ? void 0 : v.ui) == null ? void 0 : _g.toasts) == null ? void 0 : _h.showToast) != null ? _k : (_j = (_i = v == null ? void 0 : v.common) == null ? void 0 : _i.toasts) == null ? void 0 : _j.showToast;
    if (show(s, { key, content }) || show(s, content)) return;
  } catch {
  }
  try {
    const b = typeof bunny !== "undefined" ? bunny : null;
    if (show((_m = (_l = b == null ? void 0 : b.api) == null ? void 0 : _l.toasts) == null ? void 0 : _m.showToast, { key, content })) return;
  } catch {
  }
  try {
    const ta = (_n = reactNative()) == null ? void 0 : _n.ToastAndroid;
    (_p = ta == null ? void 0 : ta.show) == null ? void 0 : _p.call(ta, content, (_o = ta == null ? void 0 : ta.SHORT) != null ? _o : 0);
  } catch {
  }
}
function runProbe(startApi) {
  var _a, _b;
  rows.length = 0;
  push("probe at", (/* @__PURE__ */ new Date()).toLocaleTimeString());
  push("globals present", probeGlobals().join(", ") || "NONE");
  push("plugin factory injected", typeof plugin !== "undefined" && typeof plugin === "function");
  probeStorageApi(startApi);
  probeRevenge();
  probeBunny();
  probeVendetta();
  probeValenced();
  const oneLine = summary();
  showToastEverywhere("Host Probe: " + oneLine, "hostprobe-summary");
  try {
    (_b = (_a = typeof revenge !== "undefined" ? revenge == null ? void 0 : revenge.logger : null) == null ? void 0 : _a.log) == null ? void 0 : _b.call(_a, "[HostProbe] " + rows.map((r) => r.key + "=" + r.value).join(" | "));
  } catch {
  }
}
var _settings = null;
function SettingsComponent(props) {
  if (!_settings) _settings = makeSettings();
  if (!_settings) {
    const React0 = react();
    const RN0 = reactNative();
    if (React0 && (RN0 == null ? void 0 : RN0.Text)) return React0.createElement(RN0.Text, { style: { color: settingsInk().text, padding: 12 } }, "HostProbe settings could not load on this build.");
    return null;
  }
  const React = react();
  return _settings(props);
}
var instance = {
  jsonStorage: { load: true, default: {} },
  start(api) {
    try {
      runProbe(api);
    } catch (e) {
      showToastEverywhere("HostProbe probe failed: " + (e instanceof Error ? e.message : String(e)), "hostprobe-fail");
    }
  },
  stop() {
  },
  SettingsComponent
};
if (typeof plugin === "function") {
  instance = plugin(instance);
}
globalThis.plugin = instance;
instance.onLoad = function() {
  var _a;
  (_a = instance.start) == null ? void 0 : _a.call(instance);
};
instance.onUnload = function() {
  var _a;
  (_a = instance.stop) == null ? void 0 : _a.call(instance);
};
instance.settings = instance.SettingsComponent;
var index_default = globalThis.plugin;
;
        const exported = (module.exports && module.exports.default) || module.exports;
        if (!exported || typeof exported !== 'object') throw new Error('bundle exported ' + typeof exported + ' instead of a plugin object');
        return exported;
    } catch (error) {
        const message = String((error && (error.stack || error.message)) || error);
        try { console.error('[dev.8uvu.host-probe] bundle failed to evaluate', error); } catch (ignored) {}
        return {
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
                        el(N.Text, { style: { color: '#f04747', fontSize: 16, fontWeight: '700', marginBottom: 8 } }, "Host Probe" + ' failed to load'),
                        el(N.Text, { style: { color: '#9ba0a8', fontSize: 12, marginBottom: 8 } }, 'Copy this text to the plugin author — it is the exact error:'),
                        el(N.Text, { style: { color: '#ffffff', fontSize: 11 } }, message));
                } catch (uiError) {
                    return null;
                }
            },
        };
    }
})()