import pkg from '../package.json';

export const appData = {};

export const appSettings = {
  version: pkg.version,
  stage: {
    clearColor: '0xffffff'
  },
  debug: false
};

export const platformSettings = {
  log: true,
  path: './',
  showVersion: false
};
