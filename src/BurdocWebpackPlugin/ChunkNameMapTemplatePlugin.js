import { flatten, fromPairs } from 'lodash';
import { ConcatSource } from 'webpack-sources';

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
  return chunkNameMap[map[req][1]];
};

function chunkNameMapWebpackAsyncContext(req) {
  return webpackAsyncContext(req).then(function(module) {
    module.__webpackChunkName = webpackContextResolveChunk(req);
    return module;
  })
};

module.exports = chunkNameMapWebpackAsyncContext;
`;
}

export default class ChunkNameMapTemplatePlugin {
  apply(moduleTemplate) {
    moduleTemplate.plugin('module', (source, module) => {
      if (module.async !== 'lazy') {
        return source;
      }
      return new ConcatSource(source, getChunkNameMapSource(module));
    });
  }
}
