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

// plugins/dev.8uvu.server-cloner/js/index.tsx
var index_exports = {};
__export(index_exports, {
  DEFAULT_OPTIONS: () => DEFAULT_OPTIONS,
  cancelClone: () => cancelClone,
  default: () => index_default,
  getLog: () => getLog,
  planClone: () => planClone,
  runClone: () => runClone
});
module.exports = __toCommonJS(index_exports);
var import_flux = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.flux) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Stores() { return __g().Stores }, get getStore() { return __g().getStore }, get onFluxEventDispatched() { return __g().onFluxEventDispatched }, get onAnyFluxEventDispatched() { return __g().onAnyFluxEventDispatched } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_design = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.design) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Design() { return __g().Design } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_finders = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get lookupModule() { return __g().lookupModule }, get lookupModules() { return __g().lookupModules }, get getModules() { return __g().getModules }, get waitForModules() { return __g().waitForModules } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_filters = (function () { const __g = () => { try { return (valenced.modules && valenced.modules.finders && valenced.modules.finders.filters) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get withProps() { return __g().withProps }, get withoutProps() { return __g().withoutProps }, get withSingleProp() { return __g().withSingleProp }, get withName() { return __g().withName }, get withDependencies() { return __g().withDependencies }, get anyOf() { return __g().anyOf }, get allOf() { return __g().allOf }, get namespaceOnly() { return __g().namespaceOnly }, get createFilterGenerator() { return __g().createFilterGenerator }, get partial() { return __g().partial } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native2 = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get Pressable() { return __g().Pressable }, get ScrollView() { return __g().ScrollView }, get Appearance() { return __g().Appearance }, get TextInput() { return __g().TextInput }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();

// plugins/_shared/theme.ts
var import_common = (function () { const __g = () => { try { return (valenced.discord && valenced.discord.common) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get Tokens() { return __g().Tokens }, get Logger() { return __g().Logger }, get Constants() { return __g().Constants } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_react_native = (function () { const __g = () => { try { return (valenced.react && valenced.react.ReactNative) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get View() { return __g().View }, get Text() { return __g().Text }, get Pressable() { return __g().Pressable }, get ScrollView() { return __g().ScrollView }, get Appearance() { return __g().Appearance }, get TextInput() { return __g().TextInput }, get Switch() { return __g().Switch }, get Image() { return __g().Image }, get Modal() { return __g().Modal }, get FlatList() { return __g().FlatList }, get StyleSheet() { return __g().StyleSheet }, get Platform() { return __g().Platform }, get Dimensions() { return __g().Dimensions }, get Alert() { return __g().Alert }, get Linking() { return __g().Linking }, get Animated() { return __g().Animated }, get Vibration() { return __g().Vibration }, get RefreshControl() { return __g().RefreshControl }, get SafeAreaView() { return __g().SafeAreaView }, get TouchableOpacity() { return __g().TouchableOpacity }, get ActivityIndicator() { return __g().ActivityIndicator }, get KeyboardAvoidingView() { return __g().KeyboardAvoidingView } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
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

// plugins/dev.8uvu.server-cloner/js/index.tsx
var import_react = (function () { const __g = () => { try { return (valenced.react && valenced.react.React) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get useState() { return __g().useState }, get createElement() { return __g().createElement }, get cloneElement() { return __g().cloneElement }, get isValidElement() { return __g().isValidElement }, get Fragment() { return __g().Fragment }, get Component() { return __g().Component }, get memo() { return __g().memo }, get forwardRef() { return __g().forwardRef }, get createContext() { return __g().createContext }, get useEffect() { return __g().useEffect }, get useRef() { return __g().useRef }, get useMemo() { return __g().useMemo }, get useCallback() { return __g().useCallback }, get useReducer() { return __g().useReducer }, get useContext() { return __g().useContext }, get useLayoutEffect() { return __g().useLayoutEffect } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var import_jsx_runtime = (function () { const __g = () => { try { return ((valenced.react && (valenced.react.ReactJSXRuntime || valenced.react.jsxRuntime))) || {}; } catch (error) { return {}; } }; const __ns = { get default() { return __g().default }, get jsxs() { return __g().jsxs }, get jsx() { return __g().jsx }, get jsxDEV() { return __g().jsxDEV }, get Fragment() { return __g().Fragment } }; return typeof Proxy === 'function' ? new Proxy(__ns, { get(target, key) { return key in target ? target[key] : __g()[key]; } }) : __ns; })();
var DEFAULT_OPTIONS = { guildSettings: true, roles: true, channels: true, permissions: true };
var SPACING_MS = 350;
var running = false;
var cancelled = false;
var runLog = [];
function guilds() {
  var _a, _b;
  try {
    const store = import_flux.Stores.GuildStore;
    const all = (_b = (_a = store == null ? void 0 : store.getGuilds) == null ? void 0 : _a.call(store)) != null ? _b : {};
    return Object.values(all).map((g) => {
      var _a2;
      return { id: String(g.id), name: String((_a2 = g.name) != null ? _a2 : g.id) };
    }).sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}
function sourceRoles(guildId) {
  var _a, _b, _c, _d, _e, _f;
  try {
    const roles = (_f = (_e = (_b = (_a = import_flux.Stores.GuildRoleStore) == null ? void 0 : _a.getRoles) == null ? void 0 : _b.call(_a, guildId)) != null ? _e : (_d = (_c = import_flux.Stores.GuildStore) == null ? void 0 : _c.getRoles) == null ? void 0 : _d.call(_c, guildId)) != null ? _f : {};
    return Object.values(roles).filter((role) => !(role == null ? void 0 : role.managed) && String(role == null ? void 0 : role.id) !== String(guildId));
  } catch {
    return [];
  }
}
function sourceChannels(guildId) {
  var _a, _b, _c;
  try {
    const channels = (_c = (_b = (_a = import_flux.Stores.ChannelStore) == null ? void 0 : _a.getChannels) == null ? void 0 : _b.call(_a, guildId)) != null ? _c : [];
    return Array.isArray(channels) ? channels : Object.values(channels);
  } catch {
    return [];
  }
}
function findRest() {
  const shapes = [(0, import_filters.withProps)("getAPIBaseURL", "get", "post"), (0, import_filters.withProps)("post", "patch", "delete"), (0, import_filters.withProps)("doRequest")];
  for (const shape of shapes) {
    try {
      const [mod] = (0, import_finders.lookupModule)(shape);
      if (mod && (typeof mod.post === "function" || typeof mod.doRequest === "function")) return mod;
    } catch {
    }
  }
  return null;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function planClone(sourceId, targetId, options) {
  var _a, _b;
  const plan = { roles: [], categories: [], channels: [], warnings: [] };
  if (!sourceId || !targetId) {
    plan.warnings.push("Pick a source server and a server to copy into first.");
    return plan;
  }
  if (sourceId === targetId) {
    plan.warnings.push("Source and target are the same server.");
    return plan;
  }
  const target = guilds().find((guild) => guild.id === targetId);
  if (!target) plan.warnings.push("The target server is not in your list.");
  if (options.roles) {
    const roles = sourceRoles(sourceId);
    plan.roles = roles.map((role) => {
      var _a2;
      return String((_a2 = role.name) != null ? _a2 : role.id);
    });
    if (!roles.length) plan.warnings.push("No roles could be read from the cache for the source.");
    else if (roles.length > 20) plan.warnings.push(roles.length + " roles will be created; Discord rate-limits this, so it takes a while.");
  }
  if (options.channels) {
    const list = sourceChannels(sourceId);
    for (const channel of list) {
      if (channel.type === 4) plan.categories.push(String((_a = channel.name) != null ? _a : channel.id));
      else plan.channels.push(String((_b = channel.name) != null ? _b : channel.id));
    }
    if (!list.length) plan.warnings.push("No channels could be read from the cache for the source.");
  }
  if (!options.roles && !options.channels && !options.guildSettings) plan.warnings.push("Nothing is switched on.");
  return plan;
}
async function restCall(rest, method, url, body) {
  var _a, _b;
  try {
    if (typeof rest[method] === "function") return (_a = await rest[method]({ url, body })) != null ? _a : {};
    if (typeof rest.doRequest === "function") return (_b = await rest.doRequest({ method: method.toUpperCase(), url, body })) != null ? _b : {};
  } catch (error) {
    runLog.push({ text: `${method.toUpperCase()} ${url} failed`, ok: false });
    void error;
    return null;
  }
  return null;
}
async function runClone(sourceId, targetId, options, logger, spacing = SPACING_MS) {
  var _a, _b, _c, _d, _e, _f, _g;
  let created = 0;
  let failed = 0;
  if (running) {
    runLog.push({ text: "A copy is already running.", ok: false });
    return { created, failed };
  }
  const plan = planClone(sourceId, targetId, options);
  if (plan.warnings.some((warning) => warning.includes("same server") || warning.includes("Pick a source"))) {
    runLog.push({ text: plan.warnings[0], ok: false });
    return { created, failed };
  }
  const rest = findRest();
  if (!rest) {
    runLog.push({ text: "No REST module on this build; nothing can be copied.", ok: false });
    (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "[ServerCloner] no REST module on this build");
    return { created, failed };
  }
  running = true;
  cancelled = false;
  const roleMap = /* @__PURE__ */ new Map();
  const categoryMap = /* @__PURE__ */ new Map();
  try {
    if (options.guildSettings) {
      const source = (_c = (_b = import_flux.Stores.GuildStore) == null ? void 0 : _b.getGuild) == null ? void 0 : _c.call(_b, sourceId);
      if (source) {
        const ok = await restCall(rest, "patch", `/guilds/${targetId}`, {
          name: source.name,
          description: source.description,
          verification_level: source.verificationLevel
        });
        ok ? created++ : failed++;
        await sleep(spacing);
      }
    }
    if (options.roles && !cancelled) {
      for (const role of sourceRoles(sourceId)) {
        if (cancelled) break;
        const made = await restCall(rest, "post", `/guilds/${targetId}/roles`, {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          mentionable: role.mentionable,
          permissions: String((_d = role.permissions) != null ? _d : "0")
        });
        if (made && made.id) {
          roleMap.set(String(role.id), String(made.id));
          created++;
        } else {
          failed++;
        }
        await sleep(spacing);
      }
    }
    if (options.channels && !cancelled) {
      const list = sourceChannels(sourceId);
      const order = [4, 0, 2, 5, 15, 13];
      const channels = [...list].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
      for (const channel of channels) {
        if (cancelled) break;
        if (!order.includes(channel.type)) continue;
        const overwrites = options.permissions ? ((_e = channel.permissionOverwrites) != null ? _e : []).map((overwrite) => ({
          ...overwrite,
          // Members do not exist in the target; roles do, under new ids.
          id: roleMap.get(String(overwrite.id))
        })).filter((overwrite) => !!overwrite.id) : [];
        const parentId = channel.parent_id ? categoryMap.get(String(channel.parent_id)) : void 0;
        const made = await restCall(rest, "post", `/guilds/${targetId}/channels`, {
          name: channel.name,
          type: channel.type,
          topic: channel.topic,
          nsfw: channel.nsfw,
          parent_id: parentId,
          permission_overwrites: overwrites
        });
        if (made) {
          if (channel.type === 4 && made.id) categoryMap.set(String(channel.id), String(made.id));
          created++;
        } else {
          failed++;
        }
        await sleep(spacing);
      }
    }
    runLog.push({ text: `Copy finished: ${created} made, ${failed} failed.`, ok: failed === 0 });
  } catch (error) {
    runLog.push({ text: "Copy stopped: " + String((_f = error == null ? void 0 : error.message) != null ? _f : error), ok: false });
    (_g = logger == null ? void 0 : logger.error) == null ? void 0 : _g.call(logger, "[ServerCloner] copy failed", error);
  }
  running = false;
  return { created, failed };
}
function cancelClone() {
  cancelled = true;
}
function getLog() {
  return runLog.slice(-40);
}
var index_default = {
  jsonStorage: { load: true, default: {} },
  engine: { planClone, runClone, cancelClone, getLog },
  start({ logger }) {
    var _a;
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[ServerCloner] started");
  },
  SettingsComponent({ api }) {
    var _a, _b;
    const [sourceId, setSourceId] = (0, import_react.useState)("");
    const [targetId, setTargetId] = (0, import_react.useState)("");
    const [options, setOptions] = (0, import_react.useState)({ ...DEFAULT_OPTIONS });
    const [plan, setPlan] = (0, import_react.useState)(null);
    const [busy, setBusy] = (0, import_react.useState)(false);
    const [, bump] = (0, import_react.useState)(0);
    const D = (_a = import_design.Design) != null ? _a : {};
    const setOption = (patch) => setOptions({ ...options, ...patch });
    const list = guilds();
    const source = list.find((guild) => guild.id === sourceId);
    const target = list.find((guild) => guild.id === targetId);
    const preview = () => setPlan(planClone(sourceId, targetId, options));
    const start = async () => {
      setBusy(true);
      await runClone(sourceId, targetId, options, api == null ? void 0 : api.logger);
      setBusy(false);
      setPlan(null);
      bump((n) => n + 1);
    };
    const picker = (title, value, entries, onPick) => {
      const RadioGroup = D.TableRadioGroup;
      const RadioRow = D.TableRadioRow;
      if (!RadioGroup || !RadioRow) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { marginBottom: 12 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_MUTED"), marginBottom: 4 }, children: title }),
          entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Pressable, { accessibilityLabel: entry.name, onPress: () => onPick(entry.id), style: { paddingVertical: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: value === entry.id ? token("BRAND_500") : token("TEXT_NORMAL") }, children: [
            value === entry.id ? "\u2713 " : "",
            entry.name
          ] }) }, entry.id))
        ] }, title);
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, { title, value, onChange: onPick, children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        RadioRow,
        {
          label: entry.name,
          subLabel: value === entry.id ? "Selected" : void 0,
          value: entry.id
        },
        entry.id
      )) }, title);
    };
    const planBlock = () => plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "What will be copied", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: plan.roles.length + " role(s)", subLabel: plan.roles.slice(0, 4).join(", ") || "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        D.TableRow,
        {
          label: plan.categories.length + " categor" + (plan.categories.length === 1 ? "y" : "ies"),
          subLabel: plan.categories.slice(0, 4).join(", ") || "none"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: plan.channels.length + " channel(s)", subLabel: plan.channels.slice(0, 4).join(", ") || "none" }),
      plan.warnings.map((warning, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "Heads up", subLabel: warning }, "warning-" + index))
    ] }) : null;
    const logBlock = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "Log", children: getLog().length ? getLog().slice(-10).reverse().map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: entry.ok ? "Done" : "Problem", subLabel: entry.text }, "log-" + index)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "Nothing copied yet", subLabel: "Pick a source and a target, preview, then copy." }) });
    if (D.TableRowGroup && D.TableSwitchRow && D.TableRow && D.Button) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.ScrollView, { style: { paddingHorizontal: 16, paddingTop: 16, gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "ServerCloner", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          D.TableRow,
          {
            label: "Copying",
            subLabel: source && target ? source.name + " \u2192 " + target.name : source ? "Now pick the server to copy into." : "Pick the server to copy from."
          }
        ) }),
        list.length ? picker("Copy from", sourceId, list, (id) => {
          setSourceId(id);
          setPlan(null);
          if (id === targetId) setTargetId("");
        }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "Copy from", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "No servers", subLabel: "Discord has not reported any servers yet." }) }),
        list.filter((guild) => guild.id !== sourceId).length ? picker(
          "Copy into",
          targetId,
          list.filter((guild) => guild.id !== sourceId),
          (id) => {
            setTargetId(id);
            setPlan(null);
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "What to copy", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Server name and description",
              value: options.guildSettings,
              onValueChange: (value) => setOption({ guildSettings: value })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableSwitchRow, { label: "Roles", value: options.roles, onValueChange: (value) => setOption({ roles: value }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Categories and channels",
              value: options.channels,
              onValueChange: (value) => setOption({ channels: value })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableSwitchRow,
            {
              label: "Channel permissions",
              subLabel: "Copies each role's access into the new channels.",
              value: options.permissions,
              onValueChange: (value) => setOption({ permissions: value })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Preview", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            D.TableRow,
            {
              label: plan ? "Preview ready" : "Nothing previewed yet",
              subLabel: plan ? "Check the list below, then copy." : "A preview reads the source server without sending anything."
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.Button, { text: plan ? "Preview again" : "Preview clone", onPress: preview }),
          plan && !busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.Button, { text: "Copy into " + ((_b = target == null ? void 0 : target.name) != null ? _b : "the target"), onPress: () => void start() }) : null,
          busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.Button, { text: "Copying\u2026", onPress: () => cancelClone() }) : null
        ] }),
        planBlock(),
        logBlock()
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.View, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), fontWeight: "bold", marginBottom: 8 }, children: "ServerCloner" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_MUTED"), marginBottom: 8 }, children: [
        source ? source.name : "No source picked",
        " \u2192 ",
        target ? target.name : "no target picked"
      ] }),
      list.map((guild) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Pressable, { accessibilityLabel: guild.name, onPress: () => setSourceId(guild.id), style: { paddingVertical: 6 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: sourceId === guild.id ? token("BRAND_500") : token("TEXT_NORMAL") }, children: guild.name }) }, guild.id)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Pressable, { accessibilityLabel: "Preview clone", onPress: preview, style: { padding: 12, backgroundColor: token("BACKGROUND_TERTIARY"), borderRadius: 8, marginTop: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL") }, children: "Preview clone" }) }),
      plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native2.Text, { style: { color: token("TEXT_NORMAL"), marginTop: 8 }, children: [
        plan.roles.length,
        " roles, ",
        plan.channels.length,
        " channels. ",
        plan.warnings.join(" ")
      ] }) : null
    ] });
  }
};
; const __plugin = (module.exports && module.exports.default) || module.exports; if (__plugin && (typeof __plugin === 'object' || typeof __plugin === 'function')) { try { Object.defineProperty(__plugin, 'default', { value: __plugin, enumerable: false, configurable: true }); } catch (ignored) { try { __plugin.default = __plugin; } catch (ignored2) {} } } if (__plugin && typeof __plugin.start === 'function') { const __start = __plugin.start.bind(__plugin); __plugin.start = function (...args) { try { return __start(...args); } catch (error) { try { (args[0] && args[0].logger && args[0].logger.error) ? args[0].logger.error('[plugin] start failed', error) : console.error('[plugin] start failed', error); } catch (ignored) {} } }; } return { default: __plugin }; })()