<img src="https://github.com/rlebre/lightlex/blob/main/public/images/lightlex.png" alt="logo" width="650"/>

# Lightlex

This app was created using LightningJS. It is a proof of concept to explore the LightningJS SDK and Core features, as Routing, Texture loading, Animations, Transitions, Shapes, and more.

#### Prerequisites

- Node.js 22.22+ (the version used in CI is pinned in `.node-version`)
- Yarn 1 (`corepack enable` provides it)
- A [TMDB](https://www.themoviedb.org/) API key, provided either in a `.env` file or in the `API_KEY` environment variable. Example `.env`:

```bash
API_KEY=8e88asdsad89asua
```

More information about how to get the TMDB API key [here](https://www.themoviedb.org/settings/api).

#### Developing the App

```bash
yarn install
yarn dev        # webpack-dev-server on http://localhost:3000 (override with PORT)
```

#### Building the App

```bash
yarn typecheck
yarn build      # production bundle in dist/
```

`dist/` is a static site and can be served from any sub-path (all asset URLs are relative).

#### Deployment

Every push to `main` runs `.github/workflows/gh-pages.yml`, which builds the app with the `API_KEY` repository secret and publishes `dist/` to the `gh-pages` branch, served at https://rlebre.github.io/lightlex/. Pull requests only run the build check in `.github/workflows/webpack.yml`.
