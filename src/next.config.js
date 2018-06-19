'use strict';

const { relative, resolve } = require('path');

const update = require('immutability-helper');
const { get } = require('lodash');

const BurdocWebpackPlugin = require('./BurdocWebpackPlugin');

function addVendorDependencies(entries) {
  if (!entries.hasOwnProperty('main.js')) {
    return entries;
  }

  return update(entries, {
    'main.js': {
      $push: [
      ],
    },
  });
}

function testNormalizedPath(regExp, path) {
  return regExp.test(path.replace(/\\/g, '/'));
}

module.exports = {
  distDir: relative(__dirname, resolve('.burdoc')),

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

    config.resolve.alias.__cwd = process.cwd();

    config.module.rules.forEach(rule => {
      if (get(rule, 'use.loader') === 'next-babel-loader') {
        rule.include.push(resolve('.'));
        rule.exclude = path => (
          testNormalizedPath(/node_modules/, path) &&
          !testNormalizedPath(/node_modules\/burdoc\/src/, path)
        );
      }
    });

    config.plugins.push(new BurdocWebpackPlugin());

    return config;
  },
};
