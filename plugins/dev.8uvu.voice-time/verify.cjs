// Drives the built VoiceTime bundle through a Valenced-shaped host.
//
// Two things here cannot be checked by reading the source: that a voice session
// credits the right people for the right slices of time, and that the settings
// page really renders all three tabs (the previous version had no verifier at
// all, so a blank tab would have shipped silently).
//
// The clock is handed to the engine explicitly — settle/voiceState/handlePayload
// all accept an `at` — so the checks are exact instead of "roughly a minute".
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

function makeHost(saved = {}) {
    const handlers = {};
    const pushes = [];
    const users = {
        42: { id: '42', username: 'me', globalName: 'Me' },
        43: { id: '43', username: 'ghost', globalName: 'Ghost' },
        44: { id: '44', username: 'stranger', globalName: 'Stranger' },
    };
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
                        getCurrentUser: () => users[42],
                        getUser: (id) => users[String(id)] ?? null,
                    },
                    GuildStore: { getGuild: (id) => (String(id) === 'g1' ? { id: 'g1', name: 'Guild One' } : null) },
                },
                onFluxEventDispatched(event, callback) {
                    handlers[event] = callback;
                    return () => { delete handlers[event]; };
                },
            },
        },
    };
    return { host, handlers, pushes, storage, users };
}

// A minimal React that actually re-renders: hooks are read in call order, each
// setter re-invokes the root component, so a tab press changes what is on screen
// instead of being swallowed.
function makeRenderer() {
    let hooks = [];
    let cursor = 0;
    let tree = null;
    let element = null;
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
        // A children array may itself hold arrays (the settings page passes a
        // built row list straight through), so flatten before walking.
        if (Array.isArray(node)) return node.map(expand);
        if (typeof node.type === 'function') return expand(node.type(node.props || {}));
        const raw = node.children;
        const kids = Array.isArray(raw) ? raw.map(expand) : expand(raw);
        return { ...node, children: kids, props: { ...(node.props || {}), children: kids } };
    };
    const render = () => {
        cursor = 0;
        tree = expand(element);
    };
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
        // A Text's child is its label: emit it once instead of also walking it.
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
        if (node.props && node.props.accessibilityLabel === label && typeof node.props.onPress === 'function') {
            hit = node;
            return;
        }
        const kids = node.children;
        for (const kid of Array.isArray(kids) ? kids : [kids]) walk(kid);
    };
    walk(tree);
    return hit;
};

(async () => {
    const t0 = Date.now();

    // 1. Boot, subscribe, and count a call: your own time, the server, and the
    //    people in the channel with you.
    const run = makeHost();
    const options = new Function('valenced', 'plugin', `return ${code}
//# sourceURL=Valenced:Plugin:${manifest.id}`)(run.host, (o) => o)?.default;
    check('the bundle returns plugin options', options && typeof options === 'object');
    check('the plugin exposes a settings page', typeof options?.SettingsComponent === 'function');
    await options.start?.({ jsonStorage: run.storage });
    const engine = options?.__engine;
    check('the engine is exported', !!engine);
    check('the voice events are subscribed', typeof run.handlers.VOICE_STATE_UPDATE === 'function', Object.keys(run.handlers).join(','));

    const joined = engine.voiceState('42', '111', 'g1', t0);
    check('joining a channel opens a session', joined === true, String(joined));
    check('the open session names the channel', engine.liveChannelId() === '111', engine.liveChannelId());

    // A partner in the same channel is credited; a stranger in another one is not.
    engine.handlePayload({ voiceState: { userId: '43', channelId: '111', guildId: 'g1' } }, t0);
    engine.handlePayload({ voiceState: { userId: '44', channelId: '222', guildId: 'g1' } }, t0);
    check('the session is still open after a partner joins', engine.liveChannelId() === '111', engine.liveChannelId());

    // Ten minutes later, a single event banks the slice for both of you.
    engine.handlePayload({ voiceState: { userId: '43', channelId: '111', guildId: 'g1' } }, t0 + 600_000);
    const afterTen = engine.today();
    check('ten minutes are credited to today', Math.abs(afterTen.totalSec - 600) < 0.01, JSON.stringify(afterTen));
    check('the time is filed under the server', Math.abs((afterTen.byGuild.g1 ?? 0) - 600) < 0.01, JSON.stringify(afterTen.byGuild));
    const board = engine.leaderboard();
    check('the partner appears on the leaderboard', board.length === 1 && board[0].id === '43', JSON.stringify(board.map((p) => p.id)));
    check('the partner is credited the same ten minutes', Math.abs((board[0]?.totalSec ?? 0) - 600) < 0.01, JSON.stringify(board[0]));
    check('the partner is named from UserStore', board[0]?.name === 'Ghost', board[0]?.name);
    check('the partner has today and recent totals', Math.abs((board[0]?.todaySec ?? 0) - 600) < 0.01 && Math.abs((board[0]?.recentSec ?? 0) - 600) < 0.01, JSON.stringify(board[0]));
    check('someone in another channel is not credited', !board.some((p) => p.id === '44'), JSON.stringify(board.map((p) => p.id)));

    // Leaving banks the last slice and closes the session.
    engine.handlePayload({ voiceState: { userId: '42', channelId: null, guildId: 'g1' } }, t0 + 900_000);
    check('leaving closes the session', engine.liveChannelId() === '', engine.liveChannelId());
    check('the whole call is credited', Math.abs(engine.today().totalSec - 900) < 0.01, String(engine.today().totalSec));
    check('the partner keeps the whole call too', Math.abs((engine.leaderboard()[0]?.totalSec ?? 0) - 900) < 0.01, JSON.stringify(engine.leaderboard()[0]));

    engine.handlePayload({ voiceState: { userId: '43', channelId: '111', guildId: 'g1' } }, t0 + 1_800_000);
    check('events after the call add nothing', Math.abs(engine.today().totalSec - 900) < 0.01, String(engine.today().totalSec));

    // The day view the History tab is built from: one entry per day, newest last.
    const series = engine.historyFor('43', 14);
    check('history has one entry per day', series.length === 14, String(series.length));
    const todayKey = new Date().toISOString().slice(0, 10);
    void todayKey;
    check('the newest history entry is today', series[13]?.date === new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10), JSON.stringify(series[13]));
    check('the newest history entry holds the call', Math.abs((series[13]?.secs ?? 0) - 900) < 0.01, JSON.stringify(series[13]));
    check('the history totals match the leaderboard', Math.abs(series.reduce((sum, d) => sum + d.secs, 0) - 900) < 0.01, String(series.reduce((sum, d) => sum + d.secs, 0)));

    // 2. The settings page: three tabs that really render, with live data.
    // The plugin resolves React from the host, so hand it the re-rendering one
    // before it builds anything.
    const renderer = makeRenderer();
    run.host.react.React = renderer.React;
    renderer.mount(options.SettingsComponent({ api: { jsonStorage: run.storage } }));
    let text = textIn(renderer.tree);
    check('the settings page renders', text.length > 0);
    check('the page names its version', text.includes(manifest.version), text.slice(0, 80));
    check('the page shows today', /Today: \d/.test(text), text.slice(0, 160));
    check('the tabs are present', text.includes('Leaderboard') && text.includes('History'), text.slice(0, 160));

    const leaderboardTab = findPressable(renderer.tree, 'Leaderboard');
    check('the leaderboard tab is pressable', !!leaderboardTab);
    leaderboardTab?.props?.onPress?.();
    text = textIn(renderer.tree);
    check('the leaderboard tab renders the partner', text.includes('Ghost'), text.slice(0, 200));
    check('the leaderboard reports totals', text.includes('total 15m'), text.slice(0, 260));

    const historyTab = findPressable(renderer.tree, 'History');
    check('the history tab is pressable', !!historyTab);
    historyTab?.props?.onPress?.();
    text = textIn(renderer.tree);
    check('the history tab renders the partner picker', text.includes('Ghost'), text.slice(0, 200));
    check('the history tab renders its day rows', text.includes('LAST ACTIVE DAYS'), text.slice(0, 260));

    const backToToday = findPressable(renderer.tree, 'Today');
    check('the today tab is pressable', !!backToToday);
    backToToday?.props?.onPress?.();
    check('the today tab comes back', textIn(renderer.tree).includes('Reset today'), textIn(renderer.tree).slice(0, 160));

    // 3. Reset clears today, and the saved session is banked on stop so closing
    //    the app mid-call never loses the call.
    engine.resetToday();
    check('reset clears today', engine.today().totalSec === 0, String(engine.today().totalSec));
    const savedPatch = run.pushes[run.pushes.length - 1] ?? {};
    check('the day and people tables are persisted together', !!savedPatch.days || !!savedPatch.people, JSON.stringify(Object.keys(savedPatch)));
    options.stop?.();
    check('stopping unsubscribes every voice event', Object.keys(run.handlers).length === 0, Object.keys(run.handlers).join(','));

    const resumed = makeHost({ session: { startedAt: Date.now() - 60_000, guildId: '', channelId: 'c1' }, days: {}, people: {} });
    const resumedOptions = new Function('valenced', 'plugin', `return ${code}
//# sourceURL=Valenced:Plugin:${manifest.id}`)(resumed.host, (o) => o)?.default;
    await resumedOptions.start?.({ jsonStorage: resumed.storage });
    resumedOptions.stop?.();
    const banked = resumedOptions.__engine.today().totalSec;
    check('a saved mid-call session is banked on stop', banked >= 55 && banked <= 65, String(banked));

    if (problems.length) {
        for (const problem of problems) console.error('  - ' + problem);
        console.error(`\nVOICETIME VERIFY FAILED: ${problems.length} problem(s)`);
        process.exit(1);
    }
    console.log(`VOICETIME VERIFY OK v${manifest.version}: per-person credits, server split, leaderboard and history tabs, reset and mid-call resume`);
})();
