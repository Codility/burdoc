'use strict';

const { flatten, fromPairs } = require('lodash');
const { ConcatSource } = require('webpack-sources');

const marker = JSON.stringify('|');

function getChunkNameMap(module) {
  return fromPairs(flatten(
    module.blocks
      .filter(block => block.dependencies[0].module)
      .map(block => (block.chunks || []).map(chunk => [chunk.id, chunk.name.replace(/^chunks\//, '')])),
  ));
}

function getChunkNameMapSource(module) {
  const chunkNameMap = getChunkNameMap(module);
  return `
var chunkNameMap = ${JSON.stringify(chunkNameMap, null, '\t')};

function webpackContextResolveChunk(req) {
  if (!map.hasOwnProperty(req)) {
    throw new Error("Cannot find module '" + req + "'.");
  }
  return chunkNameMap[map[req][1]];
};

function chunkNameMapWebpackAsyncContext(req) {
  if (req.indexOf(${marker}) === -1) {
    throw new Error("Cannot handle unmarked module request '" + req + "'.");
  }

  var unmarkedReq = req.slice(req.indexOf(${marker}) + 1, req.lastIndexOf(${marker}));

  return webpackAsyncContext(unmarkedReq).then(function(module) {
    module.__webpackChunkName = webpackContextResolveChunk(unmarkedReq);
    return module;
  })
};

module.exports = chunkNameMapWebpackAsyncContext;
`;
}

module.exports = class ChunkNameMapTemplatePlugin {
  apply(moduleTemplate) {
    moduleTemplate.plugin('module', (source, module) => {
      if (module.async !== 'lazy') {
        return source;
      }
      return new ConcatSource(source, getChunkNameMapSource(module));
    });
  }
}
