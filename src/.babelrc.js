'use strict';

const nextBabel = require('next/babel');
const handleImportsPlugin = require('next/dist/build/babel/plugins/handle-import');

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
      require('@babel/plugin-syntax-dynamic-import'),
      ...nextPlugins.filter(plugin => ![handleImportsPlugin].includes(plugin)),
      [require('babel-plugin-module-resolver'), { root: __dirname }],
      require('./utils/plugins/code-example'),
    ],
  };
};
