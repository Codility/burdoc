const { relative, resolve } = require('path');

const cosmiconfig = require('cosmiconfig');
const { get } = require('lodash');

const cosmiconfigExplorer = cosmiconfig('burdoc');
const userConfig = get(cosmiconfigExplorer.searchSync(), 'config');

export default {
  cachePath: true,
  distPath: relative(__dirname, resolve('.burdoc')),
  docsPath: resolve('.'),
  rootPath: resolve('./root'),
  vendorDependencies: [],
  ...userConfig,
};
