// Drives the built FakeDM bundle through a Valenced-shaped host.
//
// The chat-bar button is the part that cannot be checked by reading code: it
// depends on a memo component being handed over by the module finders, on the
// patcher reaching into that memo's `type`, and on the inserted Pressable
// surviving a re-render. So this harness builds the same shapes the phone has —
// memo row, module finders with filters, patcher, FluxDispatcher, stores — and
// asserts the button is really there and really works.
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { requireInstallPath } = require('../../scripts/publish-paths.cjs');

const manifest = JSON.parse(readFileSync(join(__dirname, 'manifest.json'), 'utf8'));
const code = readFileSync(join(__dirname, '..', '..', 'dist', requireInstallPath(manifest.id), 'index.js'), 'utf8');

const problems = [];
function check(label, condition, detail) {
    if (condition) return;
    problems.push(label + (detail === undefined ? '' : ' — ' + detail));
}

function makeHost() {
    const events = [];
    const state = { patchedKeys: [], rowFound: false, releases: [] };

    const React = {
        Fragment: 'Fragment',
        createElement(type, props, ...children) {
            const flat = children.length === 1 ? children[0] : children;
            return { type, props: { ...(props || {}), children: flat }, children: flat };
        },
        useState: (value) => [typeof value === 'function' ? value() : value, () => {}],
        useEffect() {},
        useMemo: (fn) => fn(),
        useCallback: (fn) => fn,
        useRef: (value) => ({ current: value }),
        memo: (fn) => fn,
    };
    const RN = {
        View: 'View',
        Text: 'Text',
        ScrollView: 'ScrollView',
        Pressable: 'Pressable',
        TextInput: 'TextInput',
        Switch: 'Switch',
        Alert: { alert() {} },
        ToastAndroid: { show() {}, SHORT: 0 },
    };

    const dispatcher = {
        dispatch(payload) {
            events.push(payload);
            return true;
        },
        subscribe: () => () => {},
        addInterceptor: () => () => {},
    };

    // Discord's chat action row is a memo: an object whose `type` is the render
    // function. It registers a moment after a plugin starts, hence the delay.
    const row = {
        type: function ChatInputRightActions() {
            return React.createElement(
                RN.View,
                { style: { flexDirection: 'row' } },
                React.createElement(RN.Pressable, { accessibilityLabel: 'gift', onPress() {} }, React.createElement(RN.Text, {}, 'Gift')),
                React.createElement(RN.Pressable, { accessibilityLabel: 'emoji', onPress() {} }, React.createElement(RN.Text, {}, 'Emoji')),
                React.createElement(RN.Pressable, { accessibilityLabel: 'attach', onPress() {} }, React.createElement(RN.Text, {}, 'Attach')),
            );
        },
    };
    row.type.displayName = 'ChatInputRightActions';

    const patcher = {
        after(target, key, hook) {
            const original = target[key];
            state.patchedKeys.push(key);
            const wrapper = function (...args) {
                const result = original.apply(this, args);
                const out = hook(args, result);
                return out === undefined ? result : out;
            };
            target[key] = wrapper;
            return () => { target[key] = original; };
        },
        before: () => () => {},
        instead: () => () => {},
    };

    const filters = {
        createFilterGenerator: (predicate) => (name) => ({ token: name, predicate }),
        withProps: (...props) => ({ props }),
        withName: (name) => ({ name }),
    };
    const finders = {
        getModules(filter, callback) {
            if (filter && filter.token === 'ChatInputRightActions') {
                setTimeout(() => {
                    state.rowFound = true;
                    callback(row);
                }, 20);
            }
            return () => {};
        },
        lookupModule: () => [dispatcher],
    };
    finders.filters = filters;

    const findInReactFiber = (node, predicate) => {
        if (!node || typeof node !== 'object') return null;
        if (predicate(node)) return node;
        const kids = node.children;
        for (const kid of Array.isArray(kids) ? kids : [kids]) {
            const hit = findInReactFiber(kid, predicate);
            if (hit) return hit;
        }
        return null;
    };

    const host = {
        react: { React, ReactNative: RN, native: RN, jsxRuntime: {} },
        modules: { finders, metro: {} },
        patcher,
        utils: { react: { findInReactFiber } },
        discord: {
            flux: {
                Stores: {
                    SelectedChannelStore: { getChannelId: () => '999000111' },
                    UserStore: {
                        getCurrentUser: () => ({ id: '42', username: 'me' }),
                        getUser: (id) => (String(id) === '42' ? { id: '42', username: 'me', discriminator: '0' } : null),
                    },
                    ChannelStore: { getChannel: (id) => (String(id) === '111' ? null : { id: String(id), name: 'DM' }) },
                },
                onFluxEventDispatched: () => () => {},
            },
            design: {},
            actions: { ToastActionCreators: { open: (payload) => events.push({ toast: payload && payload.content }) } },
            native: {},
        },
    };
    return { host, row, React, RN, events, state };
}

const buttonsIn = (tree) => {
    const found = [];
    const walk = (node) => {
        if (!node || typeof node !== 'object') return;
        if (node.props && node.props.accessibilityLabel === 'FakeDM quick fake') found.push(node);
        const kids = node.children;
        for (const kid of Array.isArray(kids) ? kids : [kids]) walk(kid);
    };
    walk(tree);
    return found;
};

const textIn = (tree) => {
    const out = [];
    const walk = (node) => {
        if (node == null || typeof node === 'boolean') return;
        if (typeof node === 'string') { out.push(node); return; }
        if (typeof node !== 'object') return;
        if (node.type === 'Text' || node.type === 'DText') out.push(typeof node.children === 'string' ? node.children : '');
        const kids = node.children;
        for (const kid of Array.isArray(kids) ? kids : [kids]) walk(kid);
    };
    walk(tree);
    return out.join(' | ');
};

(async () => {
    // 1. Default: the button must stay OFF. It edits Discord's own tree, so a
    //    fresh install has to load without patching anything at all.
    const off = makeHost();
    const offOptions = new Function('valenced', 'plugin', `return ${code}
//# sourceURL=Valenced:Plugin:${manifest.id}`)(off.host, (o) => o)?.default;
    check('the bundle returns plugin options', offOptions && typeof offOptions === 'object');
    check('the plugin exposes a settings page', typeof offOptions?.SettingsComponent === 'function');
    const emptyStorage = { get: async () => ({}), set: async () => {}, use: () => ({}), subscribe: () => () => {} };
    await offOptions.start?.({ jsonStorage: emptyStorage });
    await new Promise((resolve) => setTimeout(resolve, 80));
    check('a fresh install leaves the chat row untouched', off.state.patchedKeys.length === 0, off.state.patchedKeys.join(','));
    check('a fresh install reports the button as off', String(offOptions.__engine?.chatButtonStatus?.()).includes('off in settings'), offOptions.__engine?.chatButtonStatus?.());
    const untouched = off.row.type({});
    check('an unpatched row has no Fake button', buttonsIn(untouched).length === 0, String(buttonsIn(untouched).length));
    offOptions.stop?.();

    // 2. Opted in: the memo row must be hooked, exactly one button inserted, and
    //    a tap must produce a real MESSAGE_CREATE.
    const on = makeHost();
    const onOptions = new Function('valenced', 'plugin', `return ${code}
//# sourceURL=Valenced:Plugin:${manifest.id}`)(on.host, (o) => o)?.default;
    const storage = { get: async () => ({ chatButton: true }), set: async () => {}, use: () => ({ chatButton: true }), subscribe: () => () => {} };
    await onOptions.start?.({ jsonStorage: storage });
    await new Promise((resolve) => setTimeout(resolve, 80));

    check('the memo chat row was handed over by the finders', on.state.rowFound);
    check('the patcher hooked the memo `type`', on.state.patchedKeys.includes('type'), on.state.patchedKeys.join(','));
    const status = onOptions.__engine?.chatButtonStatus?.() ?? '';
    check('the settings status reports the hook', status.startsWith('hooked ChatInputRightActions'), status);

    const first = on.row.type({});
    check('the chat row renders one Fake button', buttonsIn(first).length === 1, String(buttonsIn(first).length));
    const second = on.row.type({});
    check('a re-render does not add a second button', buttonsIn(second).length === 1, String(buttonsIn(second).length));

    const button = buttonsIn(second)[0];
    if (button) {
        button.props.onPress();
        const sent = on.events.filter((event) => event && event.type === 'MESSAGE_CREATE');
        check('tapping it dispatches a MESSAGE_CREATE', sent.length === 1, String(sent.length));
        check('the dispatched message carries the quick text', sent[0]?.message?.content === 'hello', sent[0]?.message?.content);
    }

    const page = onOptions.SettingsComponent({ api: { jsonStorage: storage } });
    const text = textIn(page);
    check('the settings page renders text', text.length > 0);
    check('the settings page names its version', text.includes(manifest.version), text.slice(0, 80));
    check('the settings page shows the chat-button state', text.includes('Chat button:'), text.slice(0, 120));

    onOptions.stop?.();

    // 3. Boot must not replay saved fakes. That replay is what turns one bad
    //    entry into a crash loop that survives reinstalling the plugin.
    const boot = makeHost();
    const saved = [
        { type: 'message', channelId: '999000111', authorId: '42', content: 'restored hello', timestamp: new Date().toISOString(), snowflakeId: '555000222' },
        { type: 'message', channelId: '111', authorId: '42', content: 'channel is gone', timestamp: new Date().toISOString(), snowflakeId: '555000333' },
    ];
    const bootStorage = { get: async () => ({ fakes: saved }), set: async () => {}, use: () => ({ fakes: saved }), subscribe: () => () => {} };
    const bootOptions = new Function('valenced', 'plugin', `return ${code}
//# sourceURL=Valenced:Plugin:${manifest.id}`)(boot.host, (o) => o)?.default;
    await bootOptions.start?.({ jsonStorage: bootStorage });
    await new Promise((resolve) => setTimeout(resolve, 120));
    const bootDispatches = boot.events.filter((event) => event && event.type === 'MESSAGE_CREATE');
    check('booting with saved fakes dispatches nothing', bootDispatches.length === 0, String(bootDispatches.length));

    // 4. The explicit path restores what is safe and skips what is not.
    const result = bootOptions.__engine?.restoreSaved?.();
    check('the explicit restore only takes the safe entry', result?.restored === 1 && result?.skipped === 1, JSON.stringify(result));
    const restoredEvents = boot.events.filter((event) => event && event.type === 'MESSAGE_CREATE');
    check('the restored message is the valid one', restoredEvents[0]?.message?.content === 'restored hello', restoredEvents[0]?.message?.content);

    // 5. Recovery: deleting saved fakes clears storage and dispatches nothing.
    const before = boot.events.length;
    const deleted = bootOptions.__engine?.deleteSavedFakes?.();
    check('deleteSavedFakes clears every saved fake', deleted === 2, String(deleted));
    check('deleteSavedFakes dispatches nothing', boot.events.length === before, String(boot.events.length - before));
    bootOptions.stop?.();

    if (problems.length) {
        for (const problem of problems) console.error('  - ' + problem);
        console.error(`
FAKEDM VERIFY FAILED: ${problems.length} problem(s)`);
        process.exit(1);
    }
    console.log(`FAKEDM VERIFY OK v${manifest.version}: boot dispatches nothing, restore skips unsafe entries, delete clears storage without dispatching, chat button off by default and correct when enabled`);
})();
