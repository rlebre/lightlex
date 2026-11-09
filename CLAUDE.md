# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Lightlex is a proof-of-concept TV-style (10-foot UI, remote/keyboard driven) app built on **LightningJS** (`@lightningjs/sdk` 5.x Router + `@lightningjs/core` WebGL renderer), written in TypeScript and bundled with webpack. It browses movies/TV from the **TMDB** API. Rendering happens on a single canvas at a fixed 1920×1080 stage — there is no DOM/CSS UI.

## Commands

Tool versions (Node 24, pnpm) are pinned in `mise.toml`; use mise, not nvm/volta/corepack. The package manager is **pnpm**, not yarn or npm.

- Install: `pnpm install --frozen-lockfile`
- Dev server: `pnpm dev` → webpack-dev-server on `0.0.0.0:3000`; change it with `pnpm dev --port N`, `PORT=N`, or `PORT=N` in `.env`
- Build: `pnpm build` → minified, content-hashed bundle in `dist/`
- Type-check: `pnpm typecheck`
- Dependency install scripts are deny-listed in `pnpm-workspace.yaml` (`allowBuilds`). A new dependency with an install script makes `pnpm install` fail until it's added there as allowed or denied.
- Format: Prettier runs on staged files via husky + lint-staged pre-commit. Style is in `.prettierrc` (single quotes, 120 cols, no trailing commas).
- There are no tests and no linter.

A TMDB key is required at build time, either as `API_KEY=...` in `.env` or as an `API_KEY` environment variable (`dotenv-webpack` with `systemvars: true` inlines `process.env.API_KEY` / `process.env.API_URL` into the bundle). Without it the build still succeeds, but every API call returns 401.

Dependency constraint: stay on Lightning 2 (`@lightningjs/core` 2.x, `@lightningjs/sdk` 5.x). Do not upgrade to Lightning 3.

## Architecture

- `src/index.ts` → `Launch(App, appSettings, platformSettings)` from `src/settings.ts`, then `fitCanvasToWindow` (`src/lib/utils/viewport.ts`). The stage always renders at 1920×1080 (Lightning 2 can't resize the stage after launch); the canvas is scaled with CSS to the largest centred 16:9 rect in the window, letterboxed on black.
- The `'!'` route (`pages/ErrorPage.ts`) catches failed `before` hooks, such as a 401 from TMDB, and shows the reason. Without it the app hangs on the splash spinner. The root `settings.json` / `metadata.json` are Lightning-CLI leftovers and are **not** used by the webpack build.
- `src/App.ts` extends `Router.App`. It declares the always-mounted **widgets** (`Menu`, `MenuWithBackButton`) under `Widgets` and starts the router with `src/router/routes.ts`.
- **Routing** (`src/router/routes.ts`): each route's `before` hook fetches TMDB data and assigns it to `page.tmdbData`; the page component handles it in a `set tmdbData(...)` setter. `$` is the boot/splash route (`Splash` calls `Router.resume()` when its animation ends). Each route's `widgets` array controls which widgets are visible. `home`, `movies`, `livetv` and `discover` all reuse the `Main` page with different data; `pages/Movies.ts`, `LiveTv.ts` and `Discover.ts` are unused placeholders.
- **Key map**: `appSettings.keys` in `src/settings.ts` is merged over the SDK defaults (Esc and Backspace → `Back`, arrows, Enter). Handlers are named after the mapped key (`_handleBack`, `_handleEnter`, …).
- **Focus / key handling** follows Lightning conventions: `_getFocused()` delegates focus down the tree, `_handleLeft/Right/Enter/Back` handle keys, and unhandled keys bubble up to the parent. Focus moves into a widget with `Router.focusWidget('Name')` (the name is case-insensitive) and back to the page with `Router.restoreFocus()`. While a widget has focus, **any key it doesn't handle sends focus back to the page** (the SDK's `autoRestoreRemote` default), so widgets must define handlers, even empty ones like `_handleLeft() {}`, for keys that should keep focus. Widgets receive `_onActivated(page)` when a route that lists them becomes active.
- **Minification**: Lightning resolves `_setState('Name')` by class name, and the Router's `Widgets` state relies on this. `webpack.config.js` therefore sets Terser's `keep_classnames`. Without it the production build silently breaks `Router.focusWidget`, while dev works fine. Always reproduce focus bugs against `pnpm build` output too.
- **Child → page communication** uses `fireAncestors('$itemChanged', item)`. For example, `components/list` tells `Main` which item is focused, and `Main` updates the backdrop and metadata.
- **Data layer**: `src/lib/services/api.ts` is a shared axios instance (base URL plus `api_key` query param); `movies.ts`, `tv.ts` and `discover.ts` return unwrapped `results`. `src/lib/models` holds the TMDB response interfaces. Images are loaded directly from `https://image.tmdb.org/t/p/<size><path>` through `Img(...)` textures.
- **Types**: `@types/lightning.d.ts` declares `@lightningjs/core` and `@lightningjs/sdk` as `any`, so Lightning APIs (and `this.<anything>` on components) are not type-checked. The SDK's own `.d.ts` files conflict with this shim, which is why `skipLibCheck` is on.
- **Texture events**: core emits `txLoaded` only when an element's displayed texture _source_ changes. Don't rely on it alone to reveal an image that may already be cached (see `Main.$itemChanged`), and register listeners once (e.g. in `_init`), not on every update.
- **Branding**: the palette is in `src/constants/colors.ts` (warm black `#17161A`, amber accent `#F5B83D`). Logos are `public/images/lightlex-{icon,light}.svg` (app, dark backgrounds) and `lightlex.svg` (light backgrounds), each with a PNG export. The README uses `lightlex-banner.svg`, which has its own dark background, because a `<picture>` `prefers-color-scheme` switch follows the OS theme and not GitHub's, so it can put the light wordmark on a white page. The wordmark is outlined paths from Nunito ExtraBold (OFL), because SVGs drawn through `getSvgTexture` can't load web fonts. Size `getSvgTexture` calls to each SVG's aspect ratio, and don't force `w`/`h` on the element, or the mark stretches.
- **Assets**: `public/{images,fonts,icons}` are copied into `dist/`. Reference them with relative paths (`Utils.asset('images/x.png')` or `'icons/x.svg'`) and never with a leading `/`, because the app is deployed under a GitHub Pages sub-path.

## CI / deploy

- Both workflows install Node and pnpm from `mise.toml` via `jdx/mise-action`.
- `.github/workflows/gh-pages.yml` runs on every push to `main` (or manually). It builds with the `API_KEY` secret and uses `JamesIves/github-pages-deploy-action` to publish `dist/` to the `gh-pages` branch. GitHub Pages serves that branch at https://rlebre.github.io/lightlex/. https://ruilebre.com/lightlex/ proxies to it through the Cloudflare Worker in the `rlebre/personal-portal` repo (`worker/index.ts`), so a Pages deploy shows up there too. Pages caches for about 10 minutes. The key ends up embedded in the public bundle.
- `.github/workflows/webpack.yml` runs type-check and build on pull requests. It does not deploy.
