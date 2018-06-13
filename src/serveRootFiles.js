'use strict';

const { createReadStream, stat } = require('fs');
const { join, normalize } = require('path');
const { PassThrough } = require('stream');

const mime = require('mime-types');

const defaultRoot = join(process.cwd(), 'root');

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
  const destPath = normalize(join(defaultRoot, ctx.path));
  try {
    const stats = await promiseStat(destPath);
    if (stats.isDirectory()) {
      await next();
    } else {
      ctx.body = createReadStream(destPath);
      ctx.set('Content-Type', mime.contentType(destPath) || 'application/octet-stream')
    }
  } catch (error) {
    if (isAcceptedError(error)) {
      await next();
    } else {
      throw error;
    }
  }
};
