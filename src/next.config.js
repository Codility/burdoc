import { join, resolve } from 'path';

import glob from 'glob';
import update from 'immutability-helper';
import { fromPairs, get } from 'lodash';
import { CLIENT_STATIC_FILES_RUNTIME_MAIN } from 'next/constants';

import burdocConfig from 'burdocConfig';

function addVendorDependencies(entries) {
  if (!entries.hasOwnProperty(CLIENT_STATIC_FILES_RUNTIME_MAIN)) {
    return entries;
  }

  return update(entries, {
    [CLIENT_STATIC_FILES_RUNTIME_MAIN]: { $push: burdocConfig.vendorDependencies },
  });
}

function testNormalizedPath(regExp, path) {
  return regExp.test(path.replace(/\\/g, '/'));
}

const pagesPath = join(__dirname, 'pages');

export default {
  distDir: burdocConfig.distPath,

  webpack(config, options) {
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

    let babelRule;

    config.module.rules.forEach(rule => {
      if (get(rule, 'use.loader') === 'next-babel-loader') {
        babelRule = rule;
        rule.include = [resolve()];
        rule.use.options.cacheDirectory = burdocConfig.cachePath;
      }
    });

    config.module.rules.push(update(babelRule, {
      include: { $set: [pagesPath] },
      exclude: { $set: [] },
      use: {
        options: {
          cacheDirectory: { $set: false },
        },
      },
    }));

    config.module.rules.push({
      test: /\.js$/,
      include: [pagesPath],
      loader: 'burdoc/burdocImportsLoader',
      options: {
        docsPath: burdocConfig.docsPath,
      },
    });

    return burdocConfig.webpack(config, options);
  },

  exportPathMap: async (defaultPathMap) => {
    const docs = glob.sync('**/*.docs.js', { cwd: burdocConfig.docsPath, nodir: true });
    return {
      '/': { page: '/' },
      ...fromPairs(docs.map(doc => [`/${doc}.html`, { page: '/', query: { pathname: `/${doc}` } }])),
    };
  },
};
