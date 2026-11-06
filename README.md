<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/images/lightlex-light.svg">
  <img src="public/images/lightlex.svg" alt="Lightlex" width="420">
</picture>

# Lightlex

This app was created using LightningJS. It is a proof of concept to explore the LightningJS SDK and Core features, as Routing, Texture loading, Animations, Transitions, Shapes, and more.

#### Prerequisites

- [mise](https://mise.jdx.dev/), which installs the Node.js and pnpm versions pinned in `mise.toml` (run `mise install` in the project root)
- A [TMDB](https://www.themoviedb.org/) API key, provided either in a `.env` file or in the `API_KEY` environment variable. Example `.env`:

```bash
API_KEY=8e88asdsad89asua
```

More information about how to get the TMDB API key [here](https://www.themoviedb.org/settings/api).

#### Developing the App

```bash
mise install
pnpm install
pnpm dev        # webpack-dev-server on http://localhost:3000
```

To use a different port, pass `--port` or set `PORT` (in the environment or in `.env`):

```bash
pnpm dev --port 4000
PORT=4000 pnpm dev
```

#### Building the App

```bash
pnpm typecheck
pnpm build      # production bundle in dist/
```

`dist/` is a static site and can be served from any sub-path (all asset URLs are relative).

#### Deployment

Every push to `main` runs `.github/workflows/gh-pages.yml`, which builds the app with the `API_KEY` repository secret and publishes `dist/` to the `gh-pages` branch, served at https://rlebre.github.io/lightlex/. Pull requests only run the build check in `.github/workflows/webpack.yml`.
