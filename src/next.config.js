import { relative, resolve } from 'path';

import update from 'immutability-helper';
import { get } from 'lodash';

import BurdocWebpackPlugin from 'BurdocWebpackPlugin';
import burdocConfig from 'burdocConfig';

function addVendorDependencies(entries) {
  if (!entries.hasOwnProperty('main.js')) {
    return entries;
  }

  return update(entries, { 'main.js': { $push: burdocConfig.vendorDependencies } });
}

function testNormalizedPath(regExp, path) {
  return regExp.test(path.replace(/\\/g, '/'));
}

export default {
  distDir: burdocConfig.distPath,

  webpack(config, { isServer }) {
    config.externals = config.externals.map(prevExternal =>
      (context, request, callback) => {
        if (testNormalizedPath(/node_modules\/burdoc/, context) && request.startsWith('.')) {
          return callback();
        }
        return prevExternal(context, request, callback);
      },
    );

    const prevEntry = config.entry;
    config.entry = async () => {
      let entries = await prevEntry();
      entries = addVendorDependencies(entries);
      return entries;
    };

    config.resolve.alias.__cwd = burdocConfig.docsPath;

    config.module.rules.forEach(rule => {
      if (get(rule, 'use.loader') === 'next-babel-loader') {
        rule.include.push(resolve('.'));
        rule.use.options.cacheDirectory = burdocConfig.cachePath;
      }
    });

    config.plugins.push(new BurdocWebpackPlugin());

    return config;
  },
};
