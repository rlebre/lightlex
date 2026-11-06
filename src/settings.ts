import pkg from '../package.json';

export const appData = {};

export const appSettings = {
  version: pkg.version,
  stage: {
    clearColor: '0xffffff'
  },
  // Merged over the SDK's default key map, which sends Esc (27) to 'Menu'; Backspace (8) stays 'Back' too
  keys: {
    27: 'Back'
  },
  debug: false
};

export const platformSettings = {
  log: true,
  path: './',
  showVersion: false
};
