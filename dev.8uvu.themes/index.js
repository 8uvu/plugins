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
var import_tokens = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common && valenced.discord.common.tokens) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get ScrollView() { return __g().ScrollView }, get View() { return __g().View }, get Text() { return __g().Text }, get TextInput() { return __g().TextInput }, get Pressable() { return __g().Pressable }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Appearance() { return __g().Appearance }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsxs() { return __g().jsxs }, get jsx() { return __g().jsx }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var GROUP = "cenotaph";
var THEMES = [
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    description: "Discord blue, made colder and deeper.",
    accent: "#5b8cff",
    surface: "#12141c"
  },
  {
    id: "blood-moon",
    name: "Blood Moon",
    description: "Red accent on near-black wine.",
    accent: "#e5484d",
    surface: "#1a1012"
  },
  {
    id: "forest",
    name: "Forest",
    description: "Green accent on deep moss.",
    accent: "#2fbf71",
    surface: "#0f1613"
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    description: "Magenta accent on dark violet.",
    accent: "#e24bf0",
    surface: "#171227"
  },
  {
    id: "ember",
    name: "Ember",
    description: "Warm orange accent on burnt brown.",
    accent: "#ff9f45",
    surface: "#1a1310"
  },
  {
    id: "mono",
    name: "Mono",
    description: "Greyscale everything, no colour accents.",
    accent: "#b9bbbe",
    surface: "#161718"
  }
];
var clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
function parseHex(hex) {
  const clean = String(hex != null ? hex : "").replace("#", "");
  const value = clean.length >= 6 ? clean.slice(0, 6) : "000000";
  return [parseInt(value.slice(0, 2), 16) || 0, parseInt(value.slice(2, 4), 16) || 0, parseInt(value.slice(4, 6), 16) || 0];
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
    const source = (_b = (_a = import_tokens.Tokens) == null ? void 0 : _a.SemanticColor) != null ? _b : {};
    return Object.keys(source);
  } catch {
    return [];
  }
}
var ACCENT = /ACCENT|BRAND|BLURPLE|LINK|MENTION|SELECTED|INTERACTIVE_ACTIVE|BUTTON_PRIMARY/;
var SURFACE = /BACKGROUND|SURFACE|CARD|MODAL|ELEVATION|POPOUT|FLOATING|SIDEBAR|CHANNEL|INPUT/;
var TEXT = /TEXT/;
var BASES = ["dark", "darker", "light", "midnight"];
function colorsFor(palette) {
  const semantic = {};
  for (const base of BASES) semantic[base] = {};
  const names = semanticNames();
  for (const name of names) {
    const upper = name.toUpperCase();
    if (ACCENT.test(upper)) {
      semantic.dark[name] = palette.accent;
      semantic.darker[name] = palette.accent;
      semantic.midnight[name] = shade(palette.accent, -0.1);
      semantic.light[name] = shade(palette.accent, -0.18);
      continue;
    }
    if (SURFACE.test(upper)) {
      semantic.dark[name] = palette.surface;
      semantic.darker[name] = shade(palette.surface, -0.22);
      semantic.midnight[name] = shade(palette.surface, -0.4);
      semantic.light[name] = shade(palette.accent, 0.94);
      continue;
    }
    if (TEXT.test(upper)) {
      semantic.light[name] = shade(palette.surface, -0.78);
    }
  }
  if (!names.length) {
    for (const name of ["BACKGROUND_PRIMARY", "BACKGROUND_SECONDARY", "BACKGROUND_TERTIARY", "BRAND_500", "BRAND_560"]) {
      semantic.dark[name] = SURFACE.test(name) ? palette.surface : palette.accent;
      semantic.darker[name] = SURFACE.test(name) ? shade(palette.surface, -0.22) : palette.accent;
      semantic.midnight[name] = SURFACE.test(name) ? shade(palette.surface, -0.4) : palette.accent;
    }
  }
  return { semantic };
}
var index_default = plugin({
  jsonStorage: { load: true, default: { note: "themes" } },
  preInit({ themes }) {
    var _a, _b;
    try {
      (_a = themes == null ? void 0 : themes.registerGroup) == null ? void 0 : _a.call(themes, GROUP, {
        name: "Cenotaph",
        description: "Colour themes by cenotaph \u2014 Discord layouts, recoloured."
      });
      for (const palette of THEMES) {
        (_b = themes == null ? void 0 : themes.registerTheme) == null ? void 0 : _b.call(themes, GROUP, palette.id, {
          name: palette.name,
          description: palette.description,
          // Token names only exist from init onwards, so the palette is
          // built when the picker asks for it.
          getColors: () => colorsFor(palette)
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
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Cenotaph Themes", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            Row,
            {
              label: "Where to apply one",
              subLabel: "Valenced settings \u2192 Appearance \u2192 Colours \u2192 Cenotaph."
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "How it works", subLabel: "Recolours Discord's semantic tokens; layout and contrast stay Discord's." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "Included", children: THEMES.map((palette) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: palette.name, subLabel: palette.description }, palette.id)) })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "Cenotaph Themes" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 8 }, children: "Settings \u2192 Appearance \u2192 Colours \u2192 Cenotaph. Recolours Discord's semantic tokens." }),
      THEMES.map((palette) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff", marginVertical: 2 }, children: [
        palette.name,
        " \u2014 ",
        palette.description
      ] }, palette.id))
    ] });
  }
});
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && typeof __plugin === 'object' && !__plugin.default) { try { __plugin.default = __plugin; } catch (ignored) {} } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return __plugin; })()