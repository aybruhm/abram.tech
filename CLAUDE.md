# abram-tech

Abram's public personal website for `abram.tech`, styled as an original Windows 7 Aero-era desktop. Every section of the site is a window. It's a static SvelteKit build served from Abram's home server **hadal** through Cloudflare Tunnel.

The infrastructure is in a separate repo, `hadal-stack`. This repo only has to produce static files.

## 1. Stack (exact versions in package-lock.json)

| Package | Version |
|---|---|
| `@sveltejs/kit` | 3.0.1 |
| `svelte` | 5.57 (runes only) |
| `vite` | 8.3 |
| `@sveltejs/adapter-static` | 4.0 |
| `@sveltejs/vite-plugin-svelte` | 7.3 |
| `typescript` | 6.0 |
| `svelte-check` | 4.7 |
| Node | >= 22.17 (Kit 3 requirement) |

**SvelteKit 3 is newer than most model training data.** Verify against `node_modules/@sveltejs/kit` or svelte.dev before assuming Kit 2 behaviour. Confirmed differences:

- **Config lives in `vite.config.ts`**, passed to `sveltekit({ adapter: ... })`. `svelte.config.js` is no longer read.
- **`$lib` is gone.** Use Node subpath imports: `package.json` has `"imports": { "#lib/*": "./src/lib/*" }`. Import with the file extension: `'#lib/content.ts'`, `'#lib/wm.svelte.ts'`, `'#lib/components/Icon.svelte'`. Extensionless `#lib` imports fail to resolve.
- **`tsconfig.json` extends `$app/tsconfig`**, not `./.svelte-kit/tsconfig.json`.

## 2. Commands

```bash
npm ci
npm run dev        # local dev server
npm run check      # svelte-kit sync + svelte-check. Must stay at 0 errors, 0 warnings
npm run build      # static output in build/
npm run preview    # serve build/ locally. Restart it after every rebuild; it serves stale chunk names otherwise
bash deploy.sh     # on hadal only: ci, check, build, rsync build/ -> /srv/abram.tech (root:caddy)
```

## 3. Architecture

| File | Role |
|---|---|
| `src/lib/content.ts` | **Single source of all site text**: `profile`, `projects`, `experience`, `openSource`, `skills`. An empty string hides a field or link |
| `src/lib/apps.ts` | App registry. Key = app id = URL hash (`abram.tech/#projects`). Each entry: `title`, `icon`, `component`, `size`, `desktop` (desktop icon), `pinned` (taskbar). Also `labels`, `appIds`, `isAppId` |
| `src/lib/wm.svelte.ts` | Window manager: class with `$state` fields. One window per app; z-order by focus; open/close/minimise/maximise/move with viewport clamping; `startOpen`; hash sync through `replaceState` from `$app/navigation` (wrapped in try/catch because the router may not be ready at first paint); `compact` mode under 720 px |
| `src/routes/+page.svelte` | Desktop composition: wallpaper, icons, windows, Start menu, taskbar, boot/shutdown screens. On mount it opens the hash target, else About. A boot splash shows once per session (`sessionStorage`, try/catch), skipped on deep links. Includes a visually hidden text summary for crawlers and screen readers |
| `src/routes/+layout.ts` | `prerender = true`, `trailingSlash = 'never'` |
| `src/lib/components/Window.svelte` | Glass frame, pointer-capture dragging on the title bar, double-click maximises, caption buttons |
| `src/lib/components/Taskbar.svelte` | Start orb, pinned and running buttons (restore/focus/minimise logic in `wm.taskbarClick`), clock (en-GB), show-desktop strip |
| `src/lib/components/StartMenu.svelte` | Program list with live search (Enter launches the first match), right column of links, Shut down |
| `src/lib/components/DesktopIcons.svelte` | Mouse: click selects, double-click opens. Touch: tap opens |
| `src/lib/components/Icon.svelte` | Hand-made glossy SVG icons. `IconName` union is exported from `<script module>`. Gradient ids use `$props.id()` so repeated icons never collide |
| `src/lib/components/Orb.svelte` | Original "A" monogram glass orb (Start button, boot screen, favicon) |
| `src/lib/components/Wallpaper.svelte` | Original deep-water gradient with animated light ribbons and particles. Respects `prefers-reduced-motion` |
| `src/lib/components/Power.svelte` | Boot splash, "Shutting down", "safe to close this tab" screens |
| `src/lib/apps/*.svelte` | Window contents: `About` (Control Panel style), `Projects` (Explorer tiles/details + details pane), `Experience` (timeline + open-source table; **hidden**, see section 5), `Skills` ("Programs and Features", sortable/searchable), `Contact` (mailto compose), `Cmd` (command prompt), `Readme` (Notepad) |
| `src/app.css` | Global tokens (`--taskbar-h`, fonts, colours) and shared classes: `.toolbar`, `.crumb`, `.btn`, `.tag`, `.sr-only` |

**Extension recipes**
- New text: edit `content.ts` only.
- New window: create `src/lib/apps/X.svelte`, add an entry in `apps.ts` and a label in `labels`. Add a new icon branch in `Icon.svelte` if needed.
- New terminal command: add to the `commands` object in `Cmd.svelte` (`help` lists it automatically). Aliases are in `aliases`.

**Known Svelte 5 trap already hit**: `$state` deep-proxies objects, so `selected === p` identity checks fail when `selected` holds an object. Track by a primitive key (see `selectedName` in `Projects.svelte`).

## 4. Design rules

- **Original assets only.** No Microsoft logos, flag, wallpapers, icon art or shipped Segoe UI font. The font stack starts with `'Segoe UI'` as a local system font, then falls back. `readme.txt` states the site is a tribute and not affiliated with Microsoft. Keep that line.
- Aero vocabulary: translucent glass frames with `backdrop-filter` blur, glowing title text, red close button, glossy split-gradient buttons, white content panes with blue-grey toolbars.
- Desktop over 720 px: draggable windows. Under 720 px: windows open maximised and dragging is off. Under 480 px: the Start menu hides its right column.
- Accessibility: real `<button>`s throughout, `aria-label` on icon-only controls, Enter opens desktop icons, Esc closes the Start menu, Ctrl+Esc toggles it, focus-visible outlines, reduced-motion support.
- **Copy style: plain, direct, no em dashes.** Abram prefers his work to speak for itself. No hype words.

## 5. Content and privacy rules

This is a **public** site. Only professional information goes in. Never add family details, nationality or immigration matters, company finances or salary, health, or anything else personal, even if it appears in other context.

**Confirmed by Abram**
- Profile links: GitHub only (`https://github.com/aybruhm`). No LinkedIn or Substack. Do not add them back.
- Experience window: hidden for now, to be revisited. `Experience.svelte` and the `experience`/`openSource` data in `content.ts` are kept. The wiring is commented out in `apps.ts`, `StartMenu.svelte`, `About.svelte` and `Cmd.svelte`; every such line is marked `EXPERIENCE`, so `grep -rn EXPERIENCE src` finds them all. `#experience` deep links fall back to About. To restore, uncomment those lines and add `#experience` back to the link list in `Readme.svelte`.

**Pending review by Abram (not yet confirmed for publication)**
- Role titles and dates, and the Agenta.ai "200% query performance improvement" figure: parked while Experience is hidden. Do not invent them.
- Project repo link (`href`) for hadal is empty.

## 6. Deployment contract (handled by hadal-stack)

- `bash deploy.sh` on hadal publishes to `/srv/abram.tech` (owned `root:caddy`).
- Caddy serves that directory on `http://127.0.0.1:8080` with security headers (HSTS, nosniff, DENY framing, strict referrer) and a JSON access log.
- Cloudflare Tunnel maps `abram.tech` and `www` to `127.0.0.1:8080`. TLS ends at Cloudflare.
- Purely static: no server runtime, no API routes, no environment variables, no secrets. If a feature needs a server, raise it first. It changes the hadal-stack Caddy block and the memory budget.
- **Status (2026-10-09): not deployed yet.** The tunnel is not created, `/srv/abram.tech` does not exist, and the Caddy `:8080` block is in the repo but not yet on hadal.

## 7. Verification

What was checked on 2026-10-09:
- `npm run check`: 188 files, 0 errors, 0 warnings.
- `npm run build` from a clean `npm ci`: succeeded.
- Screenshots of the production build at 1440x900 (About, Projects, Start menu), 1280x800 (Command Prompt, boot) and 390x844 (mobile): no console errors.

Headless screenshots without a system browser: install `playwright-core` and `@sparticuz/chromium` in a scratch directory, launch with `executablePath: await chromium.executablePath()`, and use a fresh browser per screenshot.

Before calling any change done: `npm run check` is clean, `npm run build` succeeds, and you have looked at the changed views at desktop and mobile widths.

## 8. Ideas backlog (none started)

1. Window resizing from edges and corners.
2. Lighthouse pass (performance, accessibility, SEO) and an Open Graph image.
3. Writing window fed by an RSS feed at build time (prerendered, still static). Parked: Abram does not publish a Substack link.
4. Playwright smoke tests in CI: boot, open each app from icon, Start menu search and taskbar restore.
5. Persist window positions per visitor in `localStorage` (try/catch, cosmetic only).
6. Light/dark "theme" switch (Aero Basic vs Aero Glass).
