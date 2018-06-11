'use strict';

const ChunkNameMapTemplatePlugin = require('./ChunkNameMapTemplatePlugin');
const patchImportDependencyTemplate = require('./patchImportDependencyTemplate');
const patchImportParserPlugin = require('./patchImportParserPlugin');

module.exports = class BurdocWepbackPlugin {
  apply(compiler) {
    /**
     * Since the export is being patched and Node's require.cache is not being cleared,
     * patching can be done once.
     */
    patchImportDependencyTemplate();
    patchImportParserPlugin();

    compiler.plugin('compilation', (compilation, params) => {
      compilation.moduleTemplate.apply(new ChunkNameMapTemplatePlugin());
    });
  }
}
