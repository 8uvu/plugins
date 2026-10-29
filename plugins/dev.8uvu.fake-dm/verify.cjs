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
                MessageStore: {
                    getMessage: (channelId, id) => (String(id) === '555000222'
                        ? { id: '555000222', channelId: String(channelId), content: 'old text', timestamp: new Date().toISOString(), author: { id: '42', username: 'me' }, attachments: [], embeds: [], mentions: [] }
                        : null),
                },
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

    // The switch must act immediately: enabling has to install the button on the
    // spot, disabling has to take the patch back out. Waiting for a reload is what
    // made the feature look broken.
    const switchedOff = onOptions.__engine.setChatButton(false);
    check('turning the switch off reports it is off', String(switchedOff).includes('off in settings'), switchedOff);
    const afterOff = on.row.type({});
    check('turning the switch off removes the button', buttonsIn(afterOff).length === 0, String(buttonsIn(afterOff).length));
    void on.state.patchedKeys;

    onOptions.__engine.setChatButton(true);
    // The module handover is asynchronous on a cold chat; the point is that it
    // happens without a reload.
    await new Promise((resolve) => setTimeout(resolve, 80));
    const switchedOn = onOptions.__engine.chatButtonStatus();
    check('turning the switch on hooks without a reload', String(switchedOn).startsWith('hooked ChatInputRightActions'), switchedOn);
    const afterOn = on.row.type({});
    const pill = buttonsIn(afterOn)[0];
    check('the button comes back after enabling', !!pill);
    check('the button has its own visible surface', pill?.props?.style?.backgroundColor === '#5865F2', JSON.stringify(pill?.props?.style ?? {}));
    check('the button is a real hit target', (pill?.props?.style?.height ?? 0) >= 24 && (pill?.props?.style?.minWidth ?? 0) >= 40, JSON.stringify(pill?.props?.style ?? {}));

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
        { type: 'message', channelId: '999000111', authorId: '42', content: 'restored hello', timestamp: new Date().toISOString(), snowflakeId: '777000111' },
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

    // 6. Batch conversations, ported the way desktop does it: one message per
    //    line, [HH:MM] optional, a bare line falls back to the default sender and
    //    the tab's start time instead of being thrown away.
    const batch = makeHost();
    const batchOptions = new Function('valenced', 'plugin', `return ${code}\n//# sourceURL=Valenced:Plugin:${manifest.id}`)(batch.host, (o) => o)?.default;
    const seeded = [{ type: 'message', channelId: '999000111', authorId: '42', content: 'old text', timestamp: new Date().toISOString(), snowflakeId: '555000222' }];
    const batchStorage = { get: async () => ({ fakes: seeded }), set: async () => {}, use: () => ({ fakes: seeded.map((f) => ({ ...f })) }), subscribe: () => () => {} };
    await batchOptions.start?.({ jsonStorage: batchStorage });

    const base = new Date('2026-09-26T10:00:00');
    const script = [
        '[14:30] me: first line',
        '[14:31] Ghost: who is this',
        'plain line',
        'Somebody: named line',
        'https://example.com/a:b',
    ].join('\n');
    const parsed = batchOptions.__engine.parseBatchScript(script, base);
    check('the batch parser keeps every line', parsed.length === 5, String(parsed.length));
    check('a timed line keeps its time and sender', parsed[0]?.time === '14:30' && parsed[0]?.senderName === 'me', JSON.stringify(parsed[0]));
    check('an untimed line falls back to the base time', parsed[2]?.time === '10:00' && parsed[2]?.senderName === '', JSON.stringify(parsed[2]));
    check('a bare "Name: text" line keeps the name', parsed[3]?.senderName === 'Somebody', JSON.stringify(parsed[3]));
    check('a URL is not mistaken for a sender', parsed[4]?.senderName === '', JSON.stringify(parsed[4]));

    const me = { id: '42', username: 'me' };
    const inject = batchOptions.__engine.injectBatch('999000111', parsed, [me, { id: '43', username: 'Somebody' }], me, base);
    check('unknown senders are counted, not silently dropped', inject.injected === 4 && inject.skipped === 1, JSON.stringify(inject));
    check('the unknown sender is named', inject.unknown[0] === 'Ghost', JSON.stringify(inject.unknown));
    const batchSent = batch.events.filter((e) => e && e.type === 'MESSAGE_CREATE');
    check('the batch dispatches one message per resolvable line', batchSent.length === 4, String(batchSent.length));

    // 7. Editing a fake merges into the cached record (a partial MESSAGE_UPDATE
    //    is what crashes the renderer) and moves the saved copy too.
    const edited = batchOptions.__engine.editFakeMessage('999000111', '555000222', 'new text');
    check('editing a cached fake succeeds', edited.ok === true, edited.reason);
    const update = batch.events.filter((e) => e && e.type === 'MESSAGE_UPDATE').pop();
    check('the update carries the merged record, not a stub', update?.message?.content === 'new text' && !!update?.message?.author?.id, JSON.stringify(update?.message ?? {}).slice(0, 120));
    const savedAfterEdit = batchOptions.__engine.getFakes().find((f) => f.snowflakeId === '555000222');
    check('the saved copy carries the new text', savedAfterEdit?.content === 'new text', savedAfterEdit?.content);
    const missing = batchOptions.__engine.editFakeMessage('999000111', '404404404', 'x');
    check('editing an uncached fake refuses instead of guessing', missing.ok === false, missing.reason);
    batchOptions.stop?.();

    if (problems.length) {
        for (const problem of problems) console.error('  - ' + problem);
        console.error(`
FAKEDM VERIFY FAILED: ${problems.length} problem(s)`);
        process.exit(1);
    }
    console.log(`FAKEDM VERIFY OK v${manifest.version}: quiet boot, validated restore, batch parser keeps every line and reports unknown senders, edit merges the cached record, chat button opt-in and correct`);
})();
