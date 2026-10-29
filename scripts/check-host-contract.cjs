// Host contract check — evaluates every built bundle the same way Valenced does
// and asserts the plugin options survive the trip.
//
// Valenced's loader (bundle/lib/plugins/src/_internal/script.ts) does:
//     new Function('valenced', 'plugin', `return ${script}`)(api, o => o)?.default
// so a bundle that returns the bare plugin object, without a `.default` pointing
// at it, yields `undefined` and the host throws "Plugin options must be an
// object": no start(), no settings tab, and the plugin looks dead on the phone.
// That failure is invisible to every other check here, so it gets its own.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

// Only the eager parts of the API are here: the check must stay at eval time,
// which is exactly what the host does before any plugin is started.
const api = {
    react: { React: { createElement: () => null }, native: { View: 'View', Text: 'Text', ScrollView: 'ScrollView' } },
    patcher: { before() {}, after() {}, instead() {} },
    modules: {},
    plugins: {},
    assets: {},
    externals: {},
    utils: {},
    components: {},
    discord: { flux: { Stores: {} }, design: {}, actions: {} },
};

const problems = [];
let checked = 0;

for (const name of fs.readdirSync(dist).sort()) {
    const dir = path.join(dist, name);
    const manifestPath = path.join(dir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const script = manifest.dist && manifest.dist.script;
    if (!script) {
        problems.push(`${name}: manifest declares no dist.script, so the host loads nothing`);
        continue;
    }
    const code = fs.readFileSync(path.join(dir, script), 'utf8');
    checked++;

    let options;
    try {
        options = new Function('valenced', 'plugin', `return ${code}\n//# sourceURL=Valenced:Plugin:${name}`)(
            api,
            (o) => o,
        )?.default;
    } catch (e) {
        problems.push(`${name} @${manifest.version}: evaluating the bundle threw: ${e && e.message}`);
        continue;
    }

    if (typeof options !== 'object' || options === null) {
        problems.push(`${name} @${manifest.version}: result.default is ${options === null ? 'null' : typeof options} — the host reports "Plugin options must be an object"`);
        continue;
    }
    if (typeof options.SettingsComponent !== 'function') {
        problems.push(`${name} @${manifest.version}: no SettingsComponent, so the plugin has no settings tab`);
    }
    for (const key of ['preInit', 'init', 'start', 'stop']) {
        if (options[key] !== undefined && typeof options[key] !== 'function') {
            problems.push(`${name} @${manifest.version}: lifecycle ${key} is not a function`);
        }
    }
}

if (!checked) problems.push('no built plugins found in dist/ — run node build.mjs first');

if (problems.length) {
    for (const problem of problems) console.error('  - ' + problem);
    console.error(`\nHOST CONTRACT FAILED: ${problems.length} problem(s) across ${checked} bundle(s)`);
    process.exit(1);
}
console.log(`HOST CONTRACT OK: ${checked} bundle(s) return plugin options with a settings page when evaluated the way Valenced evaluates them`);
