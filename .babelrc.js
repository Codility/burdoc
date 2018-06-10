'use strict';

module.exports = {
  presets: [
    require('./src/.babelrc.js'),
  ],
  plugins: [
    ['styled-components', { ssr: true }],
    ['jsx-svg-inject', { root: './icons' }],
    ['module-resolver', {
      root: __dirname,
      alias: {
        ducc: './src/core',
      },
    }],
  ],
};
