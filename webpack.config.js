const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

// Make .env values (e.g. PORT) visible to this config too, not only to the bundle via dotenv-webpack
try {
  process.loadEnvFile();
} catch {
  // no .env file
}

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';

  if (!process.env.API_KEY) {
    console.warn(
      '\x1b[33m⚠ API_KEY is not set (add it to .env or the environment): every TMDB request will fail with 401.\x1b[0m'
    );
  }

  return {
    entry: './src/index.ts',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      // Hashed in production so GitHub Pages' CDN cache never serves a stale bundle after a deploy
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      clean: true
    },
    devServer: {
      host: '0.0.0.0',
      // Override with `pnpm dev --port 4000`, `PORT=4000 pnpm dev`, or PORT=4000 in .env
      port: process.env.PORT || 3000,
      static: path.resolve(__dirname, 'public'),
      headers: {
        'Cache-Control': 'no-store'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, './public/images'), to: 'images' },
          { from: path.resolve(__dirname, './public/fonts'), to: 'fonts' },
          { from: path.resolve(__dirname, './public/icons'), to: 'icons' }
        ]
      }),
      // systemvars lets CI provide API_KEY as an environment variable instead of a .env file
      new DotenvWebpackPlugin({ systemvars: true, silent: true })
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    optimization: {
      // Lightning's state machine finds states by class name (e.g. the Router's 'Widgets' state behind
      // Router.focusWidget), so minification must not drop or mangle class names.
      minimizer: [new TerserPlugin({ terserOptions: { keep_classnames: true } })]
    },
    // Single-bundle TV app: the default 244 KiB web budget isn't meaningful here
    performance: { hints: false }
  };
};
