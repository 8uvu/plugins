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

// plugins/dev.8uvu.themes/js/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_common2 = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens }, get Logger() { return __g().Logger }, get Constants() { return __g().Constants } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native2 = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get ScrollView() { return __g().ScrollView }, get View() { return __g().View }, get Text() { return __g().Text }, get Appearance() { return __g().Appearance }, get TextInput() { return __g().TextInput }, get Pressable() { return __g().Pressable }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();

// plugins/_shared/theme.ts
var import_common = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens }, get Logger() { return __g().Logger }, get Constants() { return __g().Constants } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get ScrollView() { return __g().ScrollView }, get View() { return __g().View }, get Text() { return __g().Text }, get Appearance() { return __g().Appearance }, get TextInput() { return __g().TextInput }, get Pressable() { return __g().Pressable }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
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
    const definition = (_a = module2 == null ? void 0 : module2.SemanticColor) == null ? void 0 : _a[name];
    const resolve = (_c = (_b = module2 == null ? void 0 : module2.default) == null ? void 0 : _b.internal) == null ? void 0 : _c.resolveSemanticColor;
    if (typeof resolve === "function" && definition) {
      return resolve(activeBase(), definition);
    }
    const colours = (_e = (_d = module2 == null ? void 0 : module2.default) == null ? void 0 : _d.colors) == null ? void 0 : _e[name];
    if (typeof colours === "string") return colours;
    if (typeof definition === "string") return definition;
  } catch {
  }
  return void 0;
}

// plugins/dev.8uvu.themes/js/index.tsx
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsxs() { return __g().jsxs }, get jsx() { return __g().jsx }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var GROUP = "cenotaph";
var THEMES = [
  {
    id: "slate",
    name: "Slate",
    description: "Cool neutral greys, one quiet blue accent.",
    accent: "#6b8afd",
    bases: ["dark", "darker", "midnight"],
    ladder: { primary: "#26282c", secondary: "#202225", tertiary: "#1a1c1f", raised: "#2c2f34", text: "#dcddde" },
    wallpaper: "assets/slate.jpg"
  },
  {
    id: "graphite",
    name: "Graphite",
    description: "True greys, no colour anywhere. Accent is a light grey.",
    accent: "#9aa0a6",
    bases: ["dark", "darker", "midnight"],
    ladder: { primary: "#2b2b2e", secondary: "#252528", tertiary: "#1f1f22", raised: "#313134", text: "#dbdbde" },
    wallpaper: "assets/graphite.jpg"
  },
  {
    id: "ink",
    name: "Ink",
    description: "Near-black for OLED screens, still layered.",
    accent: "#6c7bff",
    bases: ["darker", "midnight"],
    ladder: { primary: "#0a0a0c", secondary: "#08080a", tertiary: "#050506", raised: "#121215", text: "#e6e6e9" },
    wallpaper: "assets/ink.jpg"
  },
  {
    id: "sand",
    name: "Sand",
    description: "Warm neutral greys with a muted amber accent.",
    accent: "#d8a35c",
    bases: ["dark", "darker", "midnight"],
    ladder: { primary: "#26221f", secondary: "#211d1a", tertiary: "#1a1714", raised: "#2c2724", text: "#e2ded9" },
    wallpaper: "assets/sand.jpg"
  },
  {
    id: "paper",
    name: "Paper",
    description: "Light mode as Discord draws it: white, grey steps, blue accent.",
    accent: "#5865f2",
    bases: ["light"],
    ladder: { primary: "#ffffff", secondary: "#f5f6f8", tertiary: "#e3e5e8", raised: "#fafbfc", text: "#2e3338" },
    wallpaper: "assets/paper.jpg"
  },
  {
    id: "mist",
    name: "Mist",
    description: "Cool light greys, slightly bluer than Paper.",
    accent: "#5b8cff",
    bases: ["light"],
    ladder: { primary: "#f7f8fa", secondary: "#eef0f3", tertiary: "#e4e7eb", raised: "#ffffff", text: "#313338" },
    wallpaper: "assets/mist.jpg"
  }
];
var clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
function parseHex(hex) {
  const clean = String(hex != null ? hex : "").replace("#", "");
  const value = clean.length >= 6 ? clean.slice(0, 6) : "000000";
  return [
    parseInt(value.slice(0, 2), 16) || 0,
    parseInt(value.slice(2, 4), 16) || 0,
    parseInt(value.slice(4, 6), 16) || 0
  ];
}
function toHex(r, g, b) {
  return "#" + [r, g, b].map((channel) => clamp(channel).toString(16).padStart(2, "0")).join("");
}
function shade(hex, amount) {
  const [r, g, b] = parseHex(hex);
  const target = amount >= 0 ? 255 : 0;
  const mix = Math.abs(amount);
  return toHex(r + (target - r) * mix, g + (target - g) * mix, b + (target - b) * mix);
}
function semanticNames() {
  var _a, _b;
  try {
    return Object.keys((_b = (_a = import_common2.Tokens) == null ? void 0 : _a.SemanticColor) != null ? _b : {});
  } catch {
    return [];
  }
}
var ACCENT = /ACCENT|BRAND|BLURPLE|LINK|MENTION|BUTTON_PRIMARY/;
var RAISED = /MODAL|POPOUT|CARD|ELEVATION|FLOATING|SHEET/;
var SURFACE = /BACKGROUND|SURFACE|SIDEBAR|CHANNEL|INPUT/;
var TEXT = /TEXT/;
var OVERLAY = /MODIFIER|OPACITY|TRANSPARENT|SHADOW|BORDER|SCRIM/;
var BASES = ["dark", "darker", "light", "midnight"];
function colorsFor(palette) {
  const semantic = {};
  for (const base of BASES) semantic[base] = {};
  const names = semanticNames();
  for (const name of names) {
    const upper = name.toUpperCase();
    if (OVERLAY.test(upper)) continue;
    const accent = ACCENT.test(upper);
    const text = !accent && TEXT.test(upper);
    const surface = !accent && !text && SURFACE.test(upper);
    if (!accent && !text && !surface) continue;
    for (const base of palette.bases) {
      const bias = base === "midnight" ? -0.28 : base === "darker" ? -0.1 : 0;
      const ladder = palette.ladder;
      const step = (value) => bias ? shade(value, bias) : value;
      if (accent) {
        semantic[base][name] = step(palette.accent);
        continue;
      }
      if (text) {
        semantic[base][name] = ladder.text;
        continue;
      }
      if (RAISED.test(upper)) semantic[base][name] = step(ladder.raised);
      else if (/TERTIARY/.test(upper)) semantic[base][name] = step(ladder.tertiary);
      else if (/SECONDARY/.test(upper)) semantic[base][name] = step(ladder.secondary);
      else semantic[base][name] = step(ladder.primary);
    }
  }
  if (!names.length) {
    for (const base of palette.bases) {
      semantic[base].BACKGROUND_PRIMARY = palette.ladder.primary;
      semantic[base].BACKGROUND_SECONDARY = palette.ladder.secondary;
      semantic[base].BACKGROUND_TERTIARY = palette.ladder.tertiary;
      semantic[base].CARD_BACKGROUND_DEFAULT = palette.ladder.raised;
      semantic[base].BRAND_500 = palette.accent;
    }
  }
  return { semantic };
}
var index_default = {
  jsonStorage: { load: true, default: { note: "themes" } },
  preInit({ themes }) {
    var _a, _b, _c;
    try {
      (_a = themes == null ? void 0 : themes.registerGroup) == null ? void 0 : _a.call(themes, GROUP, {
        name: "Cenotaph",
        description: "Clean themes by cenotaph \u2014 Discord layouts, recoloured."
      });
      for (const palette of THEMES) {
        (_b = themes == null ? void 0 : themes.registerTheme) == null ? void 0 : _b.call(themes, GROUP, palette.id, {
          name: palette.name,
          description: palette.description,
          getColors: () => colorsFor(palette)
        });
        (_c = themes == null ? void 0 : themes.registerTheme) == null ? void 0 : _c.call(themes, GROUP, palette.id + "-wallpaper", {
          name: palette.name + " Wallpaper",
          description: palette.description + " On a quiet wallpaper.",
          getColors: () => colorsFor(palette),
          background: { path: palette.wallpaper, opacity: 0.85, dimming: 0.55, blur: 0 }
        });
      }
    } catch (error) {
      void error;
    }
  },
  start() {
  },
  SettingsComponent() {
    var _a;
    const D = (_a = import_design.Design) != null ? _a : {};
    const Rows = D.TableRowGroup;
    const Row = D.TableRow;
    if (Rows && Row) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.ScrollView, { style: { paddingHorizontal: 16, paddingTop: 16, gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Cenotaph Themes", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Where to apply one", subLabel: "Valenced settings \u2192 Appearance \u2192 Colours \u2192 Cenotaph." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            Row,
            {
              label: "How it works",
              subLabel: "Discord's own surface ladder and text colours, one accent. Overlays are left alone."
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Bases", subLabel: "Dark themes leave light mode alone, and the light themes leave dark alone." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "Included", children: THEMES.map((palette) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: palette.name, subLabel: palette.description }, palette.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "With wallpapers", children: THEMES.map((palette) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: palette.name + " Wallpaper", subLabel: "Same colours, still background." }, palette.id)) })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontWeight: "bold", marginBottom: 8 }, children: "Cenotaph Themes" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED"), marginBottom: 8 }, children: "Settings \u2192 Appearance \u2192 Colours \u2192 Cenotaph. Discord's surface ladder, one accent, overlays untouched." }),
      THEMES.map((palette) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), marginVertical: 2 }, children: [
        palette.name,
        " \u2014 ",
        palette.description
      ] }, palette.id))
    ] });
  }
};
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && (typeof __plugin === 'object' || typeof __plugin === 'function')) { try { Object.defineProperty(__plugin, 'default', { value: __plugin, enumerable: false, configurable: true }); } catch (ignored) { try { __plugin.default = __plugin; } catch (ignored2) {} } } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return { default: __plugin }; })()