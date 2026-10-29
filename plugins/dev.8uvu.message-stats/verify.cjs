// Drives the built Message Stats bundle through a Valenced-shaped host.
//
// The counting rule is the whole plugin, and it depends on which side of a
// payload you look at: this build has no before-send hook, so both directions
// come from MESSAGE_CREATE and the author decides. The harness feeds that event
// and checks the counters, the DM gate, the debounced flush, and that all four
// settings tabs actually render.
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

const ReactBase = {
    Fragment: 'Fragment',
    createElement(type, props, ...children) {
        const flat = children.length === 1 ? children[0] : children;
        return { type, props: { ...(props || {}), children: flat }, children: flat };
    },
};
const RN = {
    View: 'View',
    Text: 'Text',
    ScrollView: 'ScrollView',
    Pressable: 'Pressable',
    Alert: { alert() {} },
    ToastAndroid: { show() {}, SHORT: 0 },
};

const CHANNELS = {
    c1: { id: 'c1', name: 'general', guild_id: 'g1' },
    c2: { id: 'c2', name: 'offtopic', guild_id: 'g1' },
    d1: { id: 'd1', name: 'DM' },
};

function makeHost(saved = {}) {
    const handlers = {};
    const pushes = [];
    const storage = {
        get: async () => saved,
        use: () => saved,
        set: (patch) => { pushes.push(patch); },
        subscribe: () => () => {},
    };
    const host = {
        react: { React: ReactBase, ReactNative: RN },
        discord: {
            design: {},
            flux: {
                Stores: {
                    UserStore: {
                        getCurrentUser: () => ({ id: '42', username: 'me' }),
                        getUser: (id) => (String(id) === '42' ? { id: '42', username: 'me' } : null),
                    },
                    ChannelStore: { getChannel: (id) => CHANNELS[String(id)] ?? null },
                    SelectedChannelStore: { getChannelId: () => 'c1' },
                    SelectedGuildStore: { getGuildId: () => 'g1' },
                },
                onFluxEventDispatched(event, callback) {
                    handlers[event] = callback;
                    return () => { delete handlers[event]; };
                },
            },
        },
    };
    return { host, handlers, pushes, storage };
}

// Same re-rendering harness as the VoiceTime verifier: hooks read in call order,
// a setter re-invokes the root, so pressing a tab changes the page.
function makeRenderer() {
    let hooks = [];
    let cursor = 0;
    let element = null;
    let tree = null;
    const React = {
        ...ReactBase,
        useState(initial) {
            const i = cursor++;
            if (!(i in hooks)) hooks[i] = typeof initial === 'function' ? initial() : initial;
            return [hooks[i], (next) => {
                hooks[i] = typeof next === 'function' ? next(hooks[i]) : next;
                render();
            }];
        },
        useEffect() {},
        useMemo: (fn) => fn(),
        useCallback: (fn) => fn(),
        useRef: (value) => ({ current: value }),
        memo: (fn) => fn(),
    };
    const expand = (node) => {
        if (node == null || typeof node !== 'object') return node;
        if (Array.isArray(node)) return node.map(expand);
        if (typeof node.type === 'function') return expand(node.type(node.props || {}));
        const raw = node.children;
        const kids = Array.isArray(raw) ? raw.map(expand) : expand(raw);
        return { ...node, children: kids, props: { ...(node.props || {}), children: kids } };
    };
    const render = () => { cursor = 0; tree = expand(element); };
    return {
        React,
        mount(next) { element = next; render(); },
        get tree() { return tree; },
    };
}

const textIn = (tree) => {
    const out = [];
    const walk = (node) => {
        if (node == null || typeof node === 'boolean') return;
        if (Array.isArray(node)) { for (const kid of node) walk(kid); return; }
        if (typeof node === 'string') { out.push(node); return; }
        if (typeof node !== 'object') return;
        if (node.type === 'Text') { out.push(typeof node.children === 'string' ? node.children : ''); return; }
        const kids = node.children;
        for (const kid of Array.isArray(kids) ? kids : [kids]) walk(kid);
    };
    walk(tree);
    return out.join(' | ');
};

const findPressable = (tree, label) => {
    let hit = null;
    const walk = (node) => {
        if (hit || !node || typeof node !== 'object') return;
        if (Array.isArray(node)) { for (const kid of node) walk(kid); return; }
        if (node.props && node.props.accessibilityLabel === label && typeof node.props.onPress === 'function') { hit = node; return; }
        const kids = node.children;
        for (const kid of Array.isArray(kids) ? kids : [kids]) walk(kid);
    };
    walk(tree);
    return hit;
};

(async () => {
    const run = makeHost();
    const options = new Function('valenced', 'plugin', `return ${code}
//# sourceURL=Valenced:Plugin:${manifest.id}`)(run.host, (o) => o)?.default;
    check('the bundle returns plugin options', options && typeof options === 'object');
    check('the plugin exposes a settings page', typeof options?.SettingsComponent === 'function');

    await options.start?.({ jsonStorage: run.storage });
    const engine = options?.__engine;
    check('the engine is exported', !!engine);
    check('MESSAGE_CREATE is subscribed', typeof run.handlers.MESSAGE_CREATE === 'function', Object.keys(run.handlers).join(','));
    check('the status says it is counting', engine.status() === 'counting', engine.status());

    // 1. Both directions from one event: the author decides the counter.
    const writesAtStart = run.pushes.length;
    run.handlers.MESSAGE_CREATE({ message: { id: 'm1', channel_id: 'c1', guild_id: 'g1', author: { id: '42' }, content: 'hi' } });
    run.handlers.MESSAGE_CREATE({ message: { id: 'm2', channel_id: 'c1', guild_id: 'g1', author: { id: '43' }, content: 'yo' } });
    const channel = engine.channelStats('c1', 'g1');
    check('your own message counts as sent', channel.sent === 1, JSON.stringify(channel));
    check('someone else\'s counts as received', channel.received === 1, JSON.stringify(channel));
    const server = engine.serverStats('g1');
    check('the server totals both directions', server.sent === 1 && server.received === 1, JSON.stringify(server));
    const total = engine.totalStats();
    check('the total matches the channel', total.sent === 1 && total.received === 1, JSON.stringify(total));
    const today = engine.today();
    check('today is recorded separately', today.sent === 1 && today.received === 1, JSON.stringify(today));
    check('message counting is debounced, not written per message', run.pushes.length === writesAtStart, String(run.pushes.length - writesAtStart));

    run.handlers.MESSAGE_CREATE({ message: { id: 'm3', channel_id: 'c2', guild_id: 'g1', author: { id: '42' } } });
    check('a second channel is tracked on its own', engine.channelStats('c2', 'g1').sent === 1, JSON.stringify(engine.channelStats('c2', 'g1')));
    check('the server total follows both channels', engine.serverStats('g1').sent === 2, JSON.stringify(engine.serverStats('g1')));
    const top = engine.topChannels('g1');
    check('the busiest channel list is sorted', top.length === 2 && top[0].total >= top[1].total, JSON.stringify(top.map((c) => [c.name, c.total])));

    // 2. DMs are behind their own switch.
    run.handlers.MESSAGE_CREATE({ message: { id: 'm4', channel_id: 'd1', author: { id: '43' } } });
    check('a DM is ignored while the switch is off', engine.channelStats('d1', '').received === 0, JSON.stringify(engine.channelStats('d1', '')));
    engine.setTrackDMs(true);
    run.handlers.MESSAGE_CREATE({ message: { id: 'm5', channel_id: 'd1', author: { id: '43' } } });
    check('a DM counts once the switch is on', engine.channelStats('d1', '').received === 1, JSON.stringify(engine.channelStats('d1', '')));
    engine.setTrackDMs(false);

    // 3. Counting can be turned off without losing what is stored.
    engine.setTracking(false);
    run.handlers.MESSAGE_CREATE({ message: { id: 'm6', channel_id: 'c1', guild_id: 'g1', author: { id: '42' } } });
    check('nothing is counted while tracking is off', engine.channelStats('c1', 'g1').sent === 1, JSON.stringify(engine.channelStats('c1', 'g1')));
    engine.setTracking(true);

    // 4. flush() is the hand brake for the debounced counters.
    const writesBeforeFlush = run.pushes.length;
    engine.flush();
    check('flushing adds exactly one write', run.pushes.length === writesBeforeFlush + 1, String(run.pushes.length - writesBeforeFlush));
    const saved = run.pushes[run.pushes.length - 1] ?? {};
    check('flushing writes the counters', saved.channels?.guild_g1_c1?.sent === 1, JSON.stringify(Object.keys(saved.channels ?? {})));
    check('flushing also writes the daily table', !!saved.daily && Object.keys(saved.daily).length === 1, JSON.stringify(saved.daily));

    // 5. The daily series is seven entries, newest last.
    const series = engine.dailySeries(7);
    check('the chart has seven days', series.length === 7, String(series.length));
    check('the chart ends today', series[6]?.date === new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10), JSON.stringify(series[6]));
    check('the chart sums both directions', series[6]?.sent === 2 && series[6]?.received === 2 && series[6]?.total === 4, JSON.stringify(series[6]));

    // 6. All four tabs render, and the switches act immediately.
    const renderer = makeRenderer();
    run.host.react.React = renderer.React;
    renderer.mount(options.SettingsComponent({ api: { jsonStorage: run.storage } }));
    let text = textIn(renderer.tree);
    check('the settings page renders', text.length > 0);
    check('the page names its version', text.includes(manifest.version), text.slice(0, 80));
    check('the page shows the channel total', text.includes('Sent 1 · received 1'), text.slice(0, 200));
    check('the tabs are present', ['Channel', 'Server', 'Total', 'Daily'].every((t) => text.includes(t)), text.slice(0, 200));

    findPressable(renderer.tree, 'Server')?.props?.onPress?.();
    text = textIn(renderer.tree);
    check('the server tab shows the server total', text.includes('This server') && text.includes('Sent 2 · received 1'), text.slice(0, 240));
    check('the server tab lists its busiest channels', text.includes('#general'), text.slice(0, 240));

    findPressable(renderer.tree, 'Daily')?.props?.onPress?.();
    text = textIn(renderer.tree);
    check('the daily tab renders its chart', text.includes('PER DAY') && text.includes('Last 7 days'), text.slice(0, 240));

    findPressable(renderer.tree, 'Channel')?.props?.onPress?.();
    const offSwitch = findPressable(renderer.tree, 'Track DMs: Off');
    check('the DM switch is present', !!offSwitch);
    offSwitch?.props?.onPress?.();
    text = textIn(renderer.tree);
    check('the DM switch flips on the spot', text.includes('Track DMs: On'), text.slice(0, 240));
    check('the switch also updates the stored setting', engine.getConfig().trackDMs === true, JSON.stringify(engine.getConfig().trackDMs));
    engine.setTrackDMs(false);

    // 7. Reset is a two-tap action and clears everything.
    const reset = findPressable(renderer.tree, 'Reset stats');
    check('the reset control is present', !!reset);
    reset?.props?.onPress?.();
    text = textIn(renderer.tree);
    check('the first tap only asks for confirmation', text.includes('Tap again to clear'), text.slice(0, 240));
    findPressable(renderer.tree, 'Tap again to clear')?.props?.onPress?.();
    check('the second tap clears every counter', engine.totalStats().sent === 0 && engine.totalStats().received === 0, JSON.stringify(engine.totalStats()));

    // 8. Stop unsubscribes and banks what was counted.
    run.handlers.MESSAGE_CREATE({ message: { id: 'm7', channel_id: 'c1', guild_id: 'g1', author: { id: '42' } } });
    options.stop?.();
    check('stopping unsubscribes', Object.keys(run.handlers).length === 0, Object.keys(run.handlers).join(','));
    check('stopping flushes the last counts', run.pushes[run.pushes.length - 1]?.channels?.guild_g1_c1?.sent === 1, JSON.stringify(run.pushes[run.pushes.length - 1]));

    if (problems.length) {
        for (const problem of problems) console.error('  - ' + problem);
        console.error(`\nMESSAGE STATS VERIFY FAILED: ${problems.length} problem(s)`);
        process.exit(1);
    }
    console.log(`MESSAGE STATS VERIFY OK v${manifest.version}: sent/received split, DM gate, debounced flush, four tabs and a guarded reset`);
})();
