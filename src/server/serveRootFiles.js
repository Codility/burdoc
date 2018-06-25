import { createReadStream, stat } from 'fs';
import { extname, join, normalize, resolve } from 'path';

import mime from 'mime-types';

import burdocConfig from 'burdocConfig';

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

export default async function serveRootFiles(ctx, next) {
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
