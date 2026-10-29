// Notification safety check.
//
// Discord's own toast container crashed the client on the Android build:
//   TypeError: Cannot read property 'position' of undefined
//     at useToastContainer -> ToastContainer -> ManaToastSurface
// when a plugin opened a toast through `ToastActionCreators.open`. Nothing in
// this repository may reach that container again: notifications go to the
// platform's native toast, then to a native dialog, and nowhere else.
//
// This reads the plugin sources rather than the bundles, so the rule is checked
// where it is written instead of after minification has rearranged it.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const pluginsDir = path.join(root, 'plugins');

// Calls that end up in Discord's toast container.
const FORBIDDEN = [
    /ToastActionCreators\s*(\?\.)?\s*\.?\s*open\s*\(/,
    /\bactions\s*(\?\.)?\s*\.?\s*open\s*\(\s*\{\s*key\s*:/,
    /\.toasts\s*(\?\.)?\s*\.?\s*showToast\s*\(/,
];

const problems = [];
let scanned = 0;

for (const plugin of fs.readdirSync(pluginsDir).sort()) {
    const jsDir = path.join(pluginsDir, plugin, 'js');
    if (!fs.existsSync(jsDir)) continue;
    for (const file of fs.readdirSync(jsDir)) {
        if (!/\.(ts|tsx)$/.test(file)) continue;
        const full = path.join(jsDir, file);
        const code = fs.readFileSync(full, 'utf8');
        scanned++;
        code.split('\n').forEach((line, i) => {
            // `typeof x.ToastActionCreators.open` only reports whether the API
            // exists (Host Probe does this); it never opens a toast.
            if (/typeof\s/.test(line)) return;
            for (const pattern of FORBIDDEN) {
                if (pattern.test(line)) {
                    problems.push(`${plugin}/js/${file}:${i + 1}: opens a Discord toast — ${line.trim().slice(0, 90)}`);
                }
            }
        });
    }
}

if (problems.length) {
    for (const problem of problems) console.error('  - ' + problem);
    console.error(`\nNOTIFICATION SAFETY FAILED: ${problems.length} Discord toast call(s). Use RN.ToastAndroid, then RN.Alert.`);
    process.exit(1);
}
console.log(`NOTIFICATION SAFETY OK: ${scanned} plugin source file(s), none opens a Discord toast`);
