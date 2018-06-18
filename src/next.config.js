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
        'classnames',
        'color',
        'popper.js',
        'styled-components',
      ],
    },
  });
}

module.exports = {
  distDir: relative(__dirname, resolve('.burdoc')),

  webpack(config, { isServer }) {
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

        if (get(rule, 'use.options.cacheDirectory')) {
          rule.use.options.cacheDirectory = false;
        }
      }
    });

    config.plugins.push(new BurdocWebpackPlugin());

    return config;
  },
};
