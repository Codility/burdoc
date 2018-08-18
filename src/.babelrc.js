'use strict';

const nextBabel = require('next/babel');

module.exports = api => {
  api.cache.never();

  const { presets: nextPresets, plugins: nextPlugins } = nextBabel(api, {
    'styled-jsx': {
      optimizeForSpeed: true,
      sourceMaps: false,
      vendorPrefixes: true,
    },
  });

  return {
    presets: nextPresets,
    plugins: [
      ...nextPlugins,
      [require('babel-plugin-module-resolver'), { root: __dirname }],
      require('./babelPlugins/codeExample'),
    ],
  };
};
