'use strict';

const { createReadStream, stat } = require('fs');
const { extname, join, normalize, resolve } = require('path');

const cosmiconfig = require('cosmiconfig');
const { get } = require('lodash');
const mime = require('mime-types');

const cosmiconfigExplorer = cosmiconfig('burdoc');
const userConfig = get(cosmiconfigExplorer.searchSync(), 'config');
const burdocConfig = {
  rootPath: resolve('./root'),
  ...userConfig,
};

function isAcceptedError(error) {
  return ['EISDIR', 'ENOENT'].includes(error.code);
}

function promiseStat(path) {
  return new Promise((resolve, reject) => {
    stat(path, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        resolve(stats);
      }
    });
  });
}

module.exports = async function serveRootFiles(ctx, next) {
  const destPath = normalize(join(burdocConfig.rootPath, ctx.path));
  try {
    const stats = await promiseStat(destPath);
    if (stats.isDirectory()) {
      await next();
    } else {
      ctx.body = createReadStream(destPath);
      ctx.set('Content-Type', mime.contentType(extname(destPath)) || 'application/octet-stream')
    }
  } catch (error) {
    if (isAcceptedError(error)) {
      await next();
    } else {
      throw error;
    }
  }
};
