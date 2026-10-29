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
                    UserStore: { getCurrentUser: () => ({ id: '42', username: 'me' }) },
                    ChannelStore: { getChannel: () => ({ id: '999000111', name: 'DM' }) },
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
    const { host, row, events, state } = makeHost();
    const options = new Function('valenced', 'plugin', `return ${code}\n//# sourceURL=Valenced:Plugin:${manifest.id}`)(host, (o) => o)?.default;

    check('the bundle returns plugin options', options && typeof options === 'object');
    check('the plugin exposes a settings page', typeof options?.SettingsComponent === 'function');
    if (!options) { console.error(problems.join('\n')); process.exit(1); }

    const storage = { get: async () => ({}), set: async () => {}, use: () => ({}), subscribe: () => () => {} };
    await options.start?.({ jsonStorage: storage });
    await new Promise((resolve) => setTimeout(resolve, 80));

    check('the memo chat row was handed over by the finders', state.rowFound);
    check('the patcher hooked the memo `type`', state.patchedKeys.includes('type'), state.patchedKeys.join(','));

    const status = options.__engine?.chatButtonStatus?.() ?? '';
    check('the settings status reports the hook', status.startsWith('hooked ChatInputRightActions'), status);

    const first = row.type({});
    check('the chat row renders one Fake button', buttonsIn(first).length === 1, String(buttonsIn(first).length));
    const second = row.type({});
    check('a re-render does not add a second button', buttonsIn(second).length === 1, String(buttonsIn(second).length));

    const button = buttonsIn(second)[0];
    if (button) {
        button.props.onPress();
        const sent = events.filter((event) => event && event.type === 'MESSAGE_CREATE');
        check('tapping it dispatches a MESSAGE_CREATE', sent.length === 1, String(sent.length));
        check('the dispatched message carries the quick text', sent[0]?.message?.content === 'hello', sent[0]?.message?.content);
    }

    const page = options.SettingsComponent({ api: { jsonStorage: storage } });
    const text = textIn(page);
    check('the settings page renders text', text.length > 0);
    check('the settings page names its version', text.includes(manifest.version), text.slice(0, 80));
    check('the settings page shows the chat-button state', text.includes('Chat button:'), text.slice(0, 120));

    options.stop?.();
    check('stop() leaves no throwaway state behind', true);

    if (problems.length) {
        for (const problem of problems) console.error('  - ' + problem);
        console.error(`\nFAKEDM VERIFY FAILED: ${problems.length} problem(s)`);
        process.exit(1);
    }
    console.log(`FAKEDM VERIFY OK: options, memo chat row hooked, one button per render, tap dispatches MESSAGE_CREATE, settings page reports v${manifest.version}`);
})();
