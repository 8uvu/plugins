// Host Probe — diagnostic plugin that reports which plugin loader and API
// surface the running Revenge build actually exposes. Zero eval-time access
// to host globals: everything resolves lazily inside functions, and the
// start lifecycle branches on what exists.
//
// Universal across the three known Revenge-family loaders:
//   - Revenge Next:  new Function('revenge','plugin','return '+code) → .default → start(api)
//   - Revenge Classic bunny manager: (bunny,definePlugin)=>{code; return plugin?.default ?? plugin} → start()
//   - Vendetta-compat manager: vendetta=>{return code} → onLoad()/settings

interface ProbeRow {
    key: string;
    value: string;
}

const rows: ProbeRow[] = [];

function push(key: string, value: unknown): void {
    rows.push({ key, value: value === undefined ? 'undefined' : String(value) });
}

function probeGlobals(): string[] {
    const present: string[] = [];
    try { if (typeof revenge !== 'undefined' && (revenge as any)) present.push('revenge'); } catch {}
    try { if (typeof bunny !== 'undefined' && (bunny as any)) present.push('bunny'); } catch {}
    try { if (typeof vendetta !== 'undefined' && (vendetta as any)) present.push('vendetta'); } catch {}
    try { if (typeof valenced !== 'undefined' && (valenced as any)) present.push('valenced'); } catch {}
    try { if (typeof plugin !== 'undefined' && typeof (plugin as any) === 'function') present.push('plugin(factory)'); } catch {}
    return present;
}

function probeRevenge(): void {
    try {
        if (typeof revenge === 'undefined') return;
        const r: any = revenge;
        push('revenge.api version', r?.api?.version ?? r?.apiVersion ?? '?');
        push('revenge.react', !!r?.react);
        push('revenge.react.jsxRuntime', !!r?.react?.jsxRuntime);
        push('revenge.discord.flux', !!r?.discord?.flux);
        push('flux.onFluxEventDispatched', typeof r?.discord?.flux?.onFluxEventDispatched);
        push('flux.Stores.UserStore', !!r?.discord?.flux?.Stores?.UserStore);
        push('revenge.discord.actions', !!r?.discord?.actions);
        push('revenge.discord.design', !!r?.discord?.design);
        push('revenge.discord.native.FileModule', !!r?.discord?.native?.FileModule);
        push('revenge.logger', !!r?.logger);
    } catch (e) {
        push('revenge probe error', e instanceof Error ? e.message : String(e));
    }
}

function probeBunny(): void {
    try {
        if (typeof bunny === 'undefined') return;
        const b: any = bunny;
        push('bunny.api.flux.intercept', typeof b?.api?.flux?.intercept);
        push('bunny.plugin.createStorage', typeof b?.plugin?.createStorage);
        push('bunny.plugin.logger', !!b?.plugin?.logger);
        push('bunny.metro', !!b?.metro);
        push('bunny.metro.common.React', !!b?.metro?.common?.React);
        push('bunny.metro.common.FluxDispatcher', !!b?.metro?.common?.FluxDispatcher);
        push('bunny.native.FileModule', !!(b?.api?.native?.FileModule || b?.native?.FileModule));
    } catch (e) {
        push('bunny probe error', e instanceof Error ? e.message : String(e));
    }
}

function probeVendetta(): void {
    try {
        if (typeof vendetta === 'undefined') return;
        const v: any = vendetta;
        push('vendetta.plugin.storage', !!v?.plugin?.storage);
        push('vendetta.metro.common.React', !!v?.metro?.common?.React);
        push('vendetta.metro.common.FluxDispatcher', !!v?.metro?.common?.FluxDispatcher);
        push('dispatcher.addInterceptor', typeof (v?.metro?.common?.FluxDispatcher ?? v?.common?.FluxDispatcher)?.addInterceptor);
        push('vendetta.ui.toasts.showToast', typeof (v?.ui?.toasts?.showToast ?? v?.common?.toasts?.showToast));
        push('vendetta.metro.findByStoreName', typeof v?.metro?.findByStoreName);
        try {
            const us = v?.metro?.findByStoreName?.('UserStore');
            push('metro UserStore', !!us);
        } catch {
            push('metro UserStore', 'finder threw');
        }
    } catch (e) {
        push('vendetta probe error', e instanceof Error ? e.message : String(e));
    }
}

function probeValenced(): void {
    let v: any = null;
    try { v = typeof valenced !== 'undefined' ? valenced : null; } catch {}
    if (!v) { push('valenced global', 'absent'); return; }
    push('valenced global', 'present');
    try {
        push('valenced.react', !!v?.react);
        push('react.React.createElement', typeof v?.react?.React?.createElement);
        push('react.ReactNative.View', !!v?.react?.ReactNative?.View);
        push('react.jsxRuntime.afterJSX', typeof v?.react?.jsxRuntime?.afterJSX);
        push('react.ReactJSXRuntime.afterJSX', typeof v?.react?.ReactJSXRuntime?.afterJSX);
    } catch (e) { push('react probe error', e instanceof Error ? e.message : String(e)); }
    try {
        push('discord.flux', !!v?.discord?.flux);
        push('flux.onFluxEventDispatched', typeof v?.discord?.flux?.onFluxEventDispatched);
        const stores = v?.discord?.flux?.Stores;
        let names = '';
        try {
            const keys: string[] = [];
            if (stores) for (const k in stores) { keys.push(k); if (keys.length >= 12) break; }
            names = keys.join(',') || 'empty';
        } catch { names = 'unreadable'; }
        push('flux.Stores sample', names);
        push('UserStore present', !!stores?.UserStore);
        push('PresenceStore present', !!stores?.PresenceStore);
        push('ChannelStore present', !!stores?.ChannelStore);
        push('SelectedChannelStore present', !!stores?.SelectedChannelStore);
        push('discord.actions.ToastActionCreators.open', typeof v?.discord?.actions?.ToastActionCreators?.open);
        const d = v?.discord?.design?.Design ?? v?.discord?.design;
        push('design TableRowGroup', !!(d?.TableRowGroup));
        push('discord.native.FileModule', !!v?.discord?.native?.FileModule);
    } catch (e) { push('discord probe error', e instanceof Error ? e.message : String(e)); }
    try {
        const finders = v?.modules?.finders;
        const filters = v?.modules?.finders?.filters;
        push('modules.finders.lookupModule', typeof finders?.lookupModule);
        push('modules.finders.getModules', typeof finders?.getModules);
        push('filters.withProps', typeof filters?.withProps);
        push('filters.withName', typeof filters?.withName);
        push('filters.anyOf', typeof filters?.anyOf);
        if (finders && filters) {
            try {
                const [mod] = finders.lookupModule(filters.withProps('dispatch', 'subscribe'));
                push('dispatcher via finders', mod && typeof mod.dispatch === 'function' ? 'FOUND' : 'not found');
            } catch { push('dispatcher via finders', 'threw'); }
            const named: Array<[string, any]> = [];
            try { named.push(['ChatInput', filters.withName('ChatInput')]); } catch {}
            try { named.push(['ChannelTextArea', filters.withName('ChannelTextArea')]); } catch {}
            try { named.push(['MessageInput', filters.withName('MessageInput')]); } catch {}
            try { named.push(['ChatBox', filters.withName('ChatBox')]); } catch {}
            const byProps: Array<[string, any]> = [];
            try { byProps.push(['channelId+onSend', filters.withProps('channelId', 'onSend')]); } catch {}
            try { byProps.push(['sendMessage+channelId', filters.withProps('sendMessage', 'channelId')]); } catch {}
            try { byProps.push(['renderAccessory+channelId', filters.withProps('renderAccessory', 'channelId')]); } catch {}
            let combined: any = null;
            try { combined = filters.anyOf(...named.map((n) => n[1]), ...byProps.map((b) => b[1])); } catch {}
            const seen: string[] = [];
            const describe = (m: any): string => {
                if (!m) return 'miss';
                const c = m?.default ?? m;
                return 'HIT:' + String(c?.displayName ?? c?.name ?? typeof c);
            };
            const runFilter = (label: string, f: any): void => {
                try {
                    const [m] = finders.lookupModule(f);
                    push('chat candidate ' + label, describe(m));
                    if (m) seen.push(label);
                } catch { push('chat candidate ' + label, 'threw'); }
            };
            for (const [label, f] of named) runFilter(label, f);
            for (const [label, f] of byProps) runFilter(label, f);
            if (combined) {
                try {
                    const [m] = finders.lookupModule(combined);
                    push('chat candidate COMBINED', describe(m));
                } catch { push('chat candidate COMBINED', 'threw'); }
            }
            push('chat candidates hit', seen.join(',') || 'NONE');
        }
        push('patcher.after', typeof v?.patcher?.after);
    } catch (e) { push('modules probe error', e instanceof Error ? e.message : String(e)); }
}

function probeStorageApi(api: any): void {
    push('jsonStorage passed to start', !!api?.jsonStorage);
    if (api?.jsonStorage) {
        push('jsonStorage.get', typeof api.jsonStorage.get);
        push('jsonStorage.subscribe', typeof api.jsonStorage.subscribe);
    }
}

function summary(): string {
    const globals = probeGlobals();
    let kind = 'unknown host';
    try {
        if (typeof valenced !== 'undefined' && (valenced as any)) kind = 'Valenced';
        else if (typeof revenge !== 'undefined') kind = 'Revenge (Next API)';
        else if (typeof bunny !== 'undefined') kind = 'Revenge Classic (bunny)';
        else if (typeof vendetta !== 'undefined') kind = 'Vendetta-compat manager';
    } catch {}
    return kind + ' · globals: ' + (globals.join(', ') || 'NONE');
}

// ---- Lazy UI resolution (no react access at eval time) ---------------------

let _React: any = null;
function react(): any {
    if (_React) return _React;
    try { const v: any = typeof valenced !== 'undefined' ? valenced : null; const r = v?.react?.React; if (r?.createElement) _React = r; } catch {}
    try { if (typeof revenge !== 'undefined') { const r: any = (revenge as any).react; if (r) _React = r.React || r; } } catch {}
    try { if (!_React && typeof bunny !== 'undefined') { const b: any = bunny; _React = b.React || b.common?.React || b.metro?.common?.React; } } catch {}
    try { if (!_React && typeof vendetta !== 'undefined') _React = (vendetta as any)?.common?.React ?? (vendetta as any)?.metro?.common?.React; } catch {}
    return _React;
}

let _RN: any = null;
function reactNative(): any {
    if (_RN) return _RN;
    try { const v: any = typeof valenced !== 'undefined' ? valenced : null; const rn = v?.react?.ReactNative; if (rn?.View && rn?.Text) _RN = rn; } catch {}
    try { if (typeof revenge !== 'undefined') _RN = (revenge as any)?.react?.ReactNative; } catch {}
    try { if (!_RN && typeof bunny !== 'undefined') { const b: any = bunny; _RN = b.ReactNative || b.common?.ReactNative || b.metro?.common?.ReactNative; } } catch {}
    try { if (!_RN && typeof vendetta !== 'undefined') _RN = (vendetta as any)?.common?.ReactNative ?? (vendetta as any)?.metro?.common?.ReactNative; } catch {}
    return _RN;
}

// Discord's theme store decides light vs dark; default dark. Plain Text without
// an explicit color renders black on the dark theme, so every label sets one.
function settingsInk(): { text: string; sub: string } {
    let dark = true;
    try {
        const tm: any = (globalThis as any).revenge?.metro?.findByProps?.('theme', 'setTheme');
        const t = tm?.theme ?? tm?.resolvedTheme ?? tm?.currentTheme;
        if (t) dark = String(t).toLowerCase().includes('dark');
    } catch {}
    return dark ? { text: '#ffffff', sub: '#9ba0a8' } : { text: '#060607', sub: '#5c5e66' };
}

// Discord's own design components give the settings page Discord's native look.
// Resolved lazily (never at eval time) so the host cannot kill us.
function resolveDesign(): any {
    try {
        const v: any = typeof valenced !== 'undefined' ? valenced : null;
        const d = v?.discord?.design?.Design ?? v?.discord?.design;
        if (d && (d.TableRowGroup || d.TableSwitchRow || d.TableRow)) return d;
    } catch {}
    try {
        const g: any = (globalThis as any).revenge?.discord?.design;
        const d = g?.Design ?? g;
        if (d && (d.TableRowGroup || d.TableSwitchRow || d.TableRow)) return d;
    } catch {}
    try {
        const b: any = (globalThis as any).bunny?.ui;
        if (b?.FormTableRowGroup) return b;
    } catch {}
    return null;
}

function makeSettings(): any {
    const ink = settingsInk();
    const React = react();
    const RN = reactNative();
    if (!React || !RN) return null;
    const { View, Text, ScrollView } = RN;
    const el = React.createElement;
    const D = resolveDesign();
    return function Settings() {
        try {
            if (D?.TableRowGroup && D?.TableRow) {
                return el(
                    ScrollView,
                    { style: { flex: 1 } },
                    el(
                        D.TableRowGroup,
                        { title: 'Host' },
                        el(D.TableRow, { key: 'summary', label: 'Host probe', subLabel: summary() }),
                        ...rows.map((r, i) => el(D.TableRow, { key: i, label: r.key, subLabel: r.value })),
                    ),
                );
            }
        } catch {}
        return el(
            ScrollView,
            { style: { flex: 1 } },
            el(View, { style: { padding: 12 } }, el(Text, { style: { fontWeight: 'bold', marginBottom: 8, color: ink.text } }, summary())),
            rows.map((r, i) =>
                el(
                    View,
                    { key: i, style: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 } },
                    el(Text, { style: { flex: 1, color: ink.text } }, r.key),
                    el(Text, { style: { color: ink.sub } }, r.value),
                ),
            ),
        );
    };
}

// Discord's own toast container crashed the whole client on this build
// (useToastContainer reading `position` of undefined), so a diagnostic never goes
// through it. Native surfaces only: Android's system toast, then a dialog.
function showToastEverywhere(content: string, _key: string): void {
    const message = String(content ?? '');
    try {
        const RN: any = reactNative();
        if (RN?.ToastAndroid?.show) {
            RN.ToastAndroid.show(message, RN.ToastAndroid.SHORT ?? 0);
            return;
        }
        RN?.Alert?.alert?.('Host Probe', message);
    } catch {}
}

function runProbe(startApi: any): void {
    rows.length = 0;
    push('probe at', new Date().toLocaleTimeString());
    push('globals present', probeGlobals().join(', ') || 'NONE');
    push('plugin factory injected', typeof plugin !== 'undefined' && typeof (plugin as any) === 'function');
    probeStorageApi(startApi);
    probeRevenge();
    probeBunny();
    probeVendetta();
    probeValenced();

    const oneLine = summary();
    // No notification on boot: the settings page already shows these rows, and
    // firing anything while the client starts is what kept taking it down.
    void oneLine;
    try {
        (typeof revenge !== 'undefined' ? (revenge as any)?.logger : null)?.log?.('[HostProbe] ' + rows.map((r) => r.key + '=' + r.value).join(' | '));
    } catch {}
}

// ---- Universal plugin instance --------------------------------------------

let _settings: any = null;
function SettingsComponent(props: any) {
    if (!_settings) _settings = makeSettings();
    if (!_settings) {
        const React0 = react();
        const RN0 = reactNative();
        if (React0 && RN0?.Text) return React0.createElement(RN0.Text, { style: { color: settingsInk().text, padding: 12 } }, 'HostProbe settings could not load on this build.');
        return null;
    }
    const React = react();
    return _settings(props);
}

let instance: any = {
    jsonStorage: { load: true, default: {} },
    start(api: any) {
        try {
            runProbe(api);
        } catch (e) {
            showToastEverywhere('HostProbe probe failed: ' + (e instanceof Error ? e.message : String(e)), 'hostprobe-fail');
        }
    },
    stop() {},
    SettingsComponent,
};

if (typeof plugin === 'function') {
    instance = (plugin as any)(instance);
}
(globalThis as any).plugin = instance;

instance.onLoad = function () {
    instance.start?.();
};
instance.onUnload = function () {
    instance.stop?.();
};
instance.settings = instance.SettingsComponent;

export default globalThis.plugin;
