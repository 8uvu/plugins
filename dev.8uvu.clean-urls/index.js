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

// plugins/dev.8uvu.clean-urls/js/index.tsx
var index_exports = {};
__export(index_exports, {
  cleanText: () => cleanText,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_flux = (valenced.discord.flux);
var import_design = (valenced.discord.design);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_react = (({ default: valenced.react.React, ...valenced.react.React }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DEFAULTS = { enabled: true, extra: "" };
var TRACKING = /* @__PURE__ */ new Set([
  "fbclid",
  "gclid",
  "gclsrc",
  "dclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "twclid",
  "ttclid",
  "yclid",
  "igshid",
  "igsh",
  "si",
  "mkt_tok",
  "mc_eid",
  "mc_cid",
  "_hsenc",
  "_hsmi",
  "vero_conv",
  "vero_id",
  "spm",
  "scm",
  "tt_from",
  "trk_contact",
  "trk_msg",
  "trk_module",
  "trk_sid",
  "rb_clickid",
  "oly_anon_id",
  "oly_enc_id",
  "wickedid",
  "trk"
]);
var PREFIXES = ["utm_", "fb_", "ga_", "mc_", "matomo_", "pk_", "mtm_"];
function splitList(raw) {
  return new Set(raw.split(/[\s,]+/).map((s) => s.trim().toLowerCase()).filter(Boolean));
}
function isTracked(key, extra) {
  if (TRACKING.has(key) || extra.has(key)) return true;
  return PREFIXES.some((p) => key.startsWith(p));
}
function cleanUrl(url, extra) {
  const schemeEnd = url.indexOf("://");
  const hostStart = schemeEnd === -1 ? url.startsWith("//") ? 2 : 0 : schemeEnd + 3;
  const afterHost = url.indexOf("/", hostStart);
  const authority = afterHost === -1 ? url : url.slice(0, afterHost);
  const rest = afterHost === -1 ? "" : url.slice(afterHost);
  const queryStart = rest.indexOf("?");
  if (queryStart === -1) return url;
  const hashStart = rest.indexOf("#");
  const path = rest.slice(0, queryStart);
  const queryEnd = hashStart === -1 ? rest.length : hashStart;
  const hashPart = hashStart === -1 ? "" : rest.slice(hashStart);
  const keep = [];
  for (const pair of rest.slice(queryStart + 1, queryEnd).split("&")) {
    if (!pair) continue;
    const eq = pair.indexOf("=");
    const rawKey = eq === -1 ? pair : pair.slice(0, eq);
    let key = rawKey;
    try {
      key = decodeURIComponent(rawKey);
    } catch {
    }
    if (!isTracked(key.toLowerCase(), extra)) keep.push(pair);
  }
  return authority + path + (keep.length ? "?" + keep.join("&") : "") + hashPart;
}
var URL_RE = /https?:\/\/[^\s<>"')\]]+/g;
function cleanText(text, extraRaw) {
  if (!text || typeof text !== "string" || !text.includes("?")) return text;
  const extra = splitList(extraRaw);
  return text.replace(URL_RE, (m) => {
    const trimmed = m.match(/[.,;:!?]+$/);
    const body = trimmed ? m.slice(0, m.length - trimmed[0].length) : m;
    return cleanUrl(body, extra) + (trimmed ? trimmed[0] : "");
  });
}
var index_default = plugin({
  jsonStorage: { load: true, default: DEFAULTS },
  start({ cleanup, jsonStorage, logger }) {
    var _a;
    const scrub = (payload) => {
      var _a2, _b, _c;
      try {
        const cfg = (_a2 = jsonStorage.cache) != null ? _a2 : DEFAULTS;
        if (cfg.enabled === false) return payload;
        const message = payload == null ? void 0 : payload.message;
        if (message && typeof message.content === "string") {
          const out = cleanText(message.content, String((_b = cfg.extra) != null ? _b : ""));
          if (out !== message.content) message.content = out;
        }
      } catch (error) {
        (_c = logger == null ? void 0 : logger.error) == null ? void 0 : _c.call(logger, "[CleanURLs] scrub failed", error);
      }
      return payload;
    };
    cleanup((0, import_flux.onFluxEventDispatched)("MESSAGE_CREATE", scrub));
    cleanup((0, import_flux.onFluxEventDispatched)("MESSAGE_UPDATE", scrub));
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[CleanURLs] started");
  },
  SettingsComponent({ api }) {
    var _a, _b, _c;
    const settings = (_a = api.jsonStorage.use()) != null ? _a : DEFAULTS;
    const set = (patch) => api.jsonStorage.set(patch);
    const D = (_b = import_design.Design) != null ? _b : {};
    const [extra, setExtra] = (0, import_react.useState)((_c = settings.extra) != null ? _c : "");
    const updateExtra = (t) => {
      setExtra(t);
      set({ extra: t });
    };
    if (D.TableRowGroup && D.TableSwitchRow) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Clean URLs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableSwitchRow,
          {
            label: "Strip tracking parameters",
            subLabel: "Removes utm_*, fbclid, gclid and friends from links.",
            value: settings.enabled !== false,
            onValueChange: (v) => set({ enabled: v })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { marginVertical: 4 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 2 }, children: "Extra parameters (comma-separated)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react_native.TextInput,
            {
              style: { color: "#ffffff", backgroundColor: "#232428", borderRadius: 8, padding: 8 },
              value: extra,
              onChangeText: updateExtra
            }
          )
        ] })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "Clean URLs" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 12 }, children: "Removes tracking parameters from links." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff", marginBottom: 4 }, children: [
        "Enabled: ",
        settings.enabled !== false ? "on" : "off"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 4 }, children: "Extra parameters (comma-separated):" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.TextInput,
        {
          style: { color: "#ffffff", backgroundColor: "#232428", borderRadius: 8, padding: 8 },
          value: extra,
          onChangeText: updateExtra
        }
      )
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()