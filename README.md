# 8uvu's Revenge Plugins

Custom Revenge plugins by 8uvu.

## Plugins

| Plugin | What it does | Install URL |
| --- | --- | --- |
| **FakeDM** | Fake messages, calls, reactions and embeds in any chat, from a chat-bar button or its own settings page. | `https://8uvu.github.io/plugins/dev.8uvu.fake-dm/` |
| **Last Online Tracker** | Remembers when people went offline, so you can see how long someone has been away. | `https://8uvu.github.io/plugins/dev.8uvu.last-online-tracker/` |
| **User Change Alerts** | Toasts when a tracked user changes name, avatar, status or activity. | `https://8uvu.github.io/plugins/dev.8uvu.user-change-alerts/` |
| **Message Bookmarks** | Saves message links with their text and author, and opens them from one list. | `https://8uvu.github.io/plugins/dev.8uvu.message-bookmarks/` |
| **Voice Time** | Counts how long you spent in voice, per day, per server and per person, with a leaderboard and a 14-day history. | `https://8uvu.github.io/plugins/dev.8uvu.voice-time/` |
| **Voice Guard** | Undoes server-side mute/deafen and reconnects you after a drop. | `https://8uvu.github.io/plugins/dev.8uvu.voice-guard/` |
| **Zero Width Sanitizer** | Strips invisible zero-width characters from what you send and edit. | `https://8uvu.github.io/plugins/dev.8uvu.zero-width-sanitizer/` |
| **Clean URLs** | Strips tracking parameters from links in messages. | `https://8uvu.github.io/plugins/dev.8uvu.clean-urls/` |
| **Platform Spoofer** | Reports a different platform than the one you are on. | `https://8uvu.github.io/plugins/dev.8uvu.platform-spoofer/` |
| **Quick Check** | Shows which host APIs your install actually exposes. | `https://8uvu.github.io/plugins/dev.8uvu.quick-check/` |
| **Host Probe** | Diagnostics for which loader and API surface the running build exposes. | `https://8uvu.github.io/plugins/dev.8uvu.host-probe/` |

Add a single plugin by pasting its install URL in Revenge (Settings > Revenge >
Plugins), or add the whole repository:

```
https://8uvu.github.io/plugins/
```

The bare repository URL installs **FakeDM** (`publish.json` pins the root plugin
to `dev.8uvu.fake-dm`). Clicking the repository URL in a plugin manager lists
every id in that file's `published` array — see *What gets published* below.

## Development

```bash
pnpm install
node build.mjs            # write dist/ and print every install URL
node scripts/verify-all.mjs   # integrity + every plugin verifier + typecheck
node scripts/verify-live.cjs  # does the published host serve this build?
```

`verify-all.mjs` is the single source of truth for "is this shippable", and it
is what CI runs. It covers:

- **dist integrity** (`scripts/check-dist.cjs`) — every artifact `index.json`
  advertises exists with the hash and size it claims, the zipped bundle is
  byte-identical to the folder-URL install, the checked-in manifest matches the
  built version, and the root install points at the pinned plugin.
- **every plugin verifier** — each plugin's `verify.cjs` boots the built bundle
  through a Revenge-shaped host and drives the real handlers, interceptors and
  row painters. They assert behaviour, not implementation.
- **typecheck** — `tsc --noEmit` over the plugin sources (non-strict; the host
  objects are `any` by nature).

Artifacts are byte-reproducible: `build.mjs` pins the zip timestamps and
`esbuild`/`fflate` are pinned to exact versions, so the hashes in
`index.json` mean something. Before that, every build of the same source
produced a different archive, which is why a published bundle could never be
checked against a rebuild of it.

## What gets published

`dist/` is the entire public surface, and `publish.json` is the policy that
decides its shape:

- `published` — the plugin ids `index.json` advertises. That is the list
  Revenge's plugin browser shows, and the only place the site names a plugin.
- `root` — the plugin the bare repository URL installs.
- `slug` — the opaque path every *other* plugin is published at instead of its
  id: `dist/38e0c511d322/` and `dist/pool/38e0c511d322@1.2.2.zip` rather than
  `dist/dev.8uvu.fake-dm/`. The id still travels *inside* the artifact, because
  the host keys an install by it — no URL or filename the site serves spells it
  out, so browsing or guessing URLs reveals nothing. (See `scripts/publish-paths.cjs`,
  which the build, both checkers, the release command and the plugin verifiers
  all resolve their paths through.)

Every plugin folder is published with three files, so that whichever one the
install box fetches it gets JSON instead of the 404 page — a URL answering with
the 404 page is exactly the "failed to manifest" Revenge reports:

- `manifest.json` — the manifest the host reads
- `index.json` — a one-plugin repository index; GitHub Pages serves `index.json`
  for a directory URL, which is what makes the bare folder link work
- `index.js` — the bundled plugin

`node build.mjs` wipes `dist/` first. It is the published surface, not a build
cache: a file left behind by an earlier layout keeps being served, which is how
`/dev.8uvu.fake-dm/` stayed reachable long after that plugin was unlisted.
`scripts/check-dist.cjs` fails the build if the published surface — the index,
the 404 page, the root install, or the *name* of anything in `dist/` — names an
unlisted plugin, and `scripts/verify-live.cjs` fails if the deployed site still
serves one at its real id, or if an install URL does not answer with JSON.

This hides plugins from the **site**. It does not hide them from the
**repository**: `https://github.com/8uvu/plugins` is public, so `plugins/` and
`publish.json` are readable there — and anyone who reads them can work out every
slug. Making the repository private — or keeping unlisted plugin sources out of
it and publishing only their built artifacts — is the step that closes that one.

## Releasing

```bash
node scripts/release.mjs dev.8uvu.fake-dm patch "Fix the chat-bar button"
```

That bumps the manifest and `PLUGIN_VERSION`, rebuilds, runs every check,
commits the plugin directory, pushes to `master`, then waits for the published
host to serve the new bundle. It exits non-zero if the deploy never catches up,
so a fix cannot silently sit unpublished — which is exactly how a release went
missing before.

CI on `master` runs the same checks in `verify` and only then deploys to GitHub
Pages; a failing check blocks the deploy instead of publishing a broken build.
