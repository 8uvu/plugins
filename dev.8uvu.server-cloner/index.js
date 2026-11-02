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
var import_flux = (valenced.discord.flux);
var import_design = (valenced.discord.design);
var import_finders = (valenced.modules.finders);
var import_filters = (valenced.modules.finders.filters);
var import_react_native = (({ ...valenced.react.ReactNative }));
var import_react = (({ default: valenced.react.React, ...valenced.react.React }));
var import_jsx_runtime = (({ jsx: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsx, jsxs: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).jsxs, Fragment: (valenced.react.jsxRuntime || valenced.react.ReactJSXRuntime).Fragment }));
var DEFAULT_OPTIONS = { guildSettings: true, roles: true, channels: true };
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
    });
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const plan = { roles: [], categories: [], channels: [], warnings: [] };
  if (!sourceId || !targetId) {
    plan.warnings.push("Pick a source and a target server first.");
    return plan;
  }
  if (sourceId === targetId) {
    plan.warnings.push("Source and target are the same server.");
    return plan;
  }
  try {
    if (options.roles) {
      const roles = (_f = (_e = (_b = (_a = import_flux.Stores.GuildRoleStore) == null ? void 0 : _a.getRoles) == null ? void 0 : _b.call(_a, sourceId)) != null ? _e : (_d = (_c = import_flux.Stores.GuildStore) == null ? void 0 : _c.getRoles) == null ? void 0 : _d.call(_c, sourceId)) != null ? _f : {};
      plan.roles = Object.values(roles).filter((r) => !r.managed).map((r) => {
        var _a2;
        return String((_a2 = r.name) != null ? _a2 : r.id);
      });
    }
  } catch {
    plan.warnings.push("Could not read source roles from the cache.");
  }
  try {
    if (options.channels) {
      const channels = (_i = (_h = (_g = import_flux.Stores.ChannelStore) == null ? void 0 : _g.getChannels) == null ? void 0 : _h.call(_g, sourceId)) != null ? _i : [];
      const list = Array.isArray(channels) ? channels : Object.values(channels);
      for (const c of list) {
        if (c.type === 4) plan.categories.push(String((_j = c.name) != null ? _j : c.id));
        else plan.channels.push(String((_k = c.name) != null ? _k : c.id));
      }
    }
  } catch {
    plan.warnings.push("Could not read source channels from the cache.");
  }
  return plan;
}
async function restCall(rest, method, url, body) {
  try {
    if (typeof rest[method] === "function") {
      await rest[method]({ url, body });
      return true;
    }
    if (typeof rest.doRequest === "function") {
      await rest.doRequest({ method: method.toUpperCase(), url, body });
      return true;
    }
  } catch (error) {
    runLog.push({ text: `${method.toUpperCase()} ${url} failed`, ok: false });
    void error;
    return false;
  }
  return false;
}
async function runClone(sourceId, targetId, options, logger, spacing = SPACING_MS) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  let created = 0;
  let failed = 0;
  if (running) {
    runLog.push({ text: "A clone is already running.", ok: false });
    return { created, failed };
  }
  const rest = findRest();
  if (!rest) {
    runLog.push({ text: "No REST module on this build; nothing can be cloned.", ok: false });
    (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "[ServerCloner] no REST module on this build");
    return { created, failed };
  }
  running = true;
  cancelled = false;
  const roleMap = /* @__PURE__ */ new Map();
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
      const roles = (_f = (_e = (_d = import_flux.Stores.GuildRoleStore) == null ? void 0 : _d.getRoles) == null ? void 0 : _e.call(_d, sourceId)) != null ? _f : {};
      for (const role of Object.values(roles)) {
        if (cancelled) break;
        if (role.managed) continue;
        const ok = await restCall(rest, "post", `/guilds/${targetId}/roles`, {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          mentionable: role.mentionable,
          permissions: String((_g = role.permissions) != null ? _g : "0")
        });
        ok ? created++ : failed++;
        await sleep(spacing);
      }
    }
    if (options.channels && !cancelled) {
      const channels = (_j = (_i = (_h = import_flux.Stores.ChannelStore) == null ? void 0 : _h.getChannels) == null ? void 0 : _i.call(_h, sourceId)) != null ? _j : [];
      const list = Array.isArray(channels) ? channels : Object.values(channels);
      const parents = /* @__PURE__ */ new Map();
      for (const pass of [4, 0, 2, 5, 15]) {
        for (const channel of list) {
          if (cancelled) break;
          if (channel.type !== pass) continue;
          const overwrites = ((_k = channel.permissionOverwrites) != null ? _k : []).map((o) => {
            var _a2;
            return {
              ...o,
              id: (_a2 = roleMap.get(String(o.id))) != null ? _a2 : o.id
            };
          });
          const ok = await restCall(rest, "post", `/guilds/${targetId}/channels`, {
            name: channel.name,
            type: channel.type,
            topic: channel.topic,
            nsfw: channel.nsfw,
            parent_id: channel.parent_id ? (_l = parents.get(String(channel.parent_id))) != null ? _l : void 0 : void 0,
            permission_overwrites: overwrites
          });
          ok ? created++ : failed++;
          await sleep(spacing);
          void parents;
        }
      }
      void roleMap;
    }
    runLog.push({ text: `Clone finished: ${created} created, ${failed} failed.`, ok: failed === 0 });
  } catch (error) {
    runLog.push({ text: "Clone stopped: " + String((_m = error == null ? void 0 : error.message) != null ? _m : error), ok: false });
    (_n = logger == null ? void 0 : logger.error) == null ? void 0 : _n.call(logger, "[ServerCloner] clone failed", error);
  }
  running = false;
  return { created, failed };
}
function cancelClone() {
  cancelled = true;
}
function getLog() {
  return [...runLog];
}
var index_default = plugin({
  jsonStorage: { load: true, default: {} },
  engine: { planClone, runClone, cancelClone, getLog },
  start({ logger }) {
    var _a;
    (_a = logger == null ? void 0 : logger.log) == null ? void 0 : _a.call(logger, "[ServerCloner] started");
  },
  SettingsComponent({ api }) {
    var _a;
    const [sourceId, setSourceId] = (0, import_react.useState)("");
    const [targetId, setTargetId] = (0, import_react.useState)("");
    const [options, setOptions] = (0, import_react.useState)({ ...DEFAULT_OPTIONS });
    const [plan, setPlan] = (0, import_react.useState)(null);
    const D = (_a = import_design.Design) != null ? _a : {};
    const setOption = (patch) => setOptions({ ...options, ...patch });
    const field = (label, value, onChange) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.View, { style: { marginVertical: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 2 }, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.TextInput, { style: { color: "#ffffff", backgroundColor: "#232428", borderRadius: 8, padding: 8 }, value, onChangeText: onChange })
    ] }, label);
    const toggles = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.View, { children: ["guildSettings", "roles", "channels"].map(
      (key) => D.TableSwitchRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableSwitchRow, { label: key, value: options[key], onValueChange: (v) => setOption({ [key]: v }) }, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: key, onPress: () => setOption({ [key]: !options[key] }), style: { paddingVertical: 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff" }, children: [
        key,
        ": ",
        options[key] ? "on" : "off"
      ] }) }, key)
    ) });
    if (D.TableRowGroup) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "ServerCloner", children: [
          field("Source server ID", sourceId, setSourceId),
          field("Target server ID", targetId, setTargetId),
          toggles,
          D.Button ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.Button, { text: "Preview clone", onPress: () => setPlan(planClone(sourceId, targetId, options)) }) : null,
          D.Button ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.Button, { text: "Start clone", onPress: () => void runClone(sourceId, targetId, options, api == null ? void 0 : api.logger) }) : null,
          D.Button ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.Button, { text: "Cancel clone", onPress: () => cancelClone() }) : null
        ] }),
        plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(D.TableRowGroup, { title: "Preview", children: [
          D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: `${plan.roles.length} roles`, subLabel: plan.roles.slice(0, 5).join(", ") }) : null,
          D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: `${plan.channels.length} channels`, subLabel: plan.channels.slice(0, 5).join(", ") }) : null,
          plan.warnings.map((w, i) => D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: "Warning", subLabel: w }, i) : null)
        ] }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRowGroup, { title: "Log", children: getLog().slice(-10).map((entry, i) => D.TableRow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(D.TableRow, { label: entry.ok ? "Done" : "Error", subLabel: entry.text }, i) : null) })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.ScrollView, { style: { padding: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff", fontWeight: "bold", marginBottom: 8 }, children: "ServerCloner" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#9ba0a8", marginBottom: 8 }, children: "Copies one server's structure into another. Guilds on this device:" }),
      guilds().map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#9ba0a8" }, children: [
        g.name,
        " (",
        g.id,
        ")"
      ] }, g.id)),
      field("Source server ID", sourceId, setSourceId),
      field("Target server ID", targetId, setTargetId),
      toggles,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Pressable, { accessibilityLabel: "Preview clone", onPress: () => setPlan(planClone(sourceId, targetId, options)), style: { padding: 12, backgroundColor: "#232428", borderRadius: 8, marginVertical: 4 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: "Preview clone" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.Pressable,
        {
          accessibilityLabel: "Start clone",
          onPress: () => void runClone(sourceId, targetId, options, api == null ? void 0 : api.logger),
          style: { padding: 12, backgroundColor: "#232428", borderRadius: 8, marginVertical: 4 },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.Text, { style: { color: "#ffffff" }, children: "Start clone" })
        }
      ),
      plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_native.Text, { style: { color: "#ffffff", marginTop: 8 }, children: [
        plan.roles.length,
        " roles, ",
        plan.channels.length,
        " channels. ",
        plan.warnings.join(" ")
      ] }) : null
    ] });
  }
});
; return (module.exports && module.exports.default) || module.exports; })()