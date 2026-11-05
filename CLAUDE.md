# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Lightlex is a proof-of-concept TV-style (10-foot UI, remote/keyboard driven) app built on **LightningJS** (`@lightningjs/sdk` 4.x Router + `@lightningjs/core` WebGL renderer), written in TypeScript and bundled with webpack. It browses movies/TV from the **TMDB** API. Rendering happens on a single canvas at a fixed 1920×1080 stage — there is no DOM/CSS UI.

## Commands

Requires Node ≥22.22 (`.node-version` pins 24) and Yarn 1.

- Install: `yarn install --frozen-lockfile`
- Dev server: `yarn dev` → webpack-dev-server on `0.0.0.0:3000` (or `$PORT`)
- Build: `yarn build` → minified, content-hashed bundle in `dist/`
- Type-check: `yarn typecheck`
- Format: Prettier runs on staged files via husky + lint-staged pre-commit. Style is in `.prettierrc` (single quotes, 120 cols, no trailing commas).
- There are no tests and no linter.

A TMDB key is required at build time, either as `API_KEY=...` in `.env` or as an `API_KEY` environment variable (`dotenv-webpack` with `systemvars: true` inlines `process.env.API_KEY` / `process.env.API_URL` into the bundle). Without it the build still succeeds, but every API call returns 401.

Dependency constraint: stay on Lightning 2 (`@lightningjs/core` 2.x, `@lightningjs/sdk` 5.x). Do not upgrade to Lightning 3.

## Architecture

- `src/index.ts` → `Launch(App, appSettings, platformSettings)` from `src/settings.ts`. The root `settings.json` / `metadata.json` are Lightning-CLI leftovers and are **not** used by the webpack build.
- `src/App.ts` extends `Router.App`. It declares the always-mounted **widgets** (`Menu`, `MenuWithBackButton`) under `Widgets` and starts the router with `src/router/routes.ts`.
- **Routing** (`src/router/routes.ts`): each route's `before` hook fetches TMDB data and assigns it to `page.tmdbData`; the page component handles it in a `set tmdbData(...)` setter. `$` is the boot/splash route (`Splash` calls `Router.resume()` when its animation ends). Each route's `widgets` array controls which widgets are visible. `home`, `movies`, `livetv` and `discover` all reuse the `Main` page with different data; `pages/Movies.ts`, `LiveTv.ts` and `Discover.ts` are unused placeholders.
- **Focus / key handling** follows Lightning conventions: `_getFocused()` delegates focus down the tree, `_handleLeft/Right/Enter/Back` handle keys, and unhandled keys bubble up to the parent. Focus moves into a widget with `Router.focusWidget('Name')` (the name is case-insensitive) and back to the page with `Router.restoreFocus()`. Widgets receive `_onActivated(page)` when a route that lists them becomes active.
- **Child → page communication** uses `fireAncestors('$itemChanged', item)`. For example, `components/list` tells `Main` which item is focused, and `Main` updates the backdrop and metadata.
- **Data layer**: `src/lib/services/api.ts` is a shared axios instance (base URL plus `api_key` query param); `movies.ts`, `tv.ts` and `discover.ts` return unwrapped `results`. `src/lib/models` holds the TMDB response interfaces. Images are loaded directly from `https://image.tmdb.org/t/p/<size><path>` through `Img(...)` textures.
- **Types**: `@types/lightning.d.ts` declares `@lightningjs/core` and `@lightningjs/sdk` as `any`, so Lightning APIs (and `this.<anything>` on components) are not type-checked. The SDK's own `.d.ts` files conflict with this shim, which is why `skipLibCheck` is on.
- **Texture events**: core emits `txLoaded` only when an element's displayed texture _source_ changes. Don't rely on it alone to reveal an image that may already be cached (see `Main.$itemChanged`), and register listeners once (e.g. in `_init`), not on every update.
- **Assets**: `public/{images,fonts,icons}` are copied into `dist/`. Reference them with relative paths (`Utils.asset('images/x.png')` or `'icons/x.svg'`) and never with a leading `/`, because the app is deployed under a GitHub Pages sub-path.

## CI / deploy

- `.github/workflows/gh-pages.yml` runs on every push to `main` (or manually). It builds with the `API_KEY` secret and uses `JamesIves/github-pages-deploy-action` to publish `dist/` to the `gh-pages` branch. GitHub Pages serves that branch at https://rlebre.github.io/lightlex/. The key ends up embedded in the public bundle.
- `.github/workflows/webpack.yml` runs type-check and build on pull requests. It does not deploy.
