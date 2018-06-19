import ChunkNameMapTemplatePlugin from './ChunkNameMapTemplatePlugin';
import patchImportDependencyTemplate from './patchImportDependencyTemplate';
import patchImportParserPlugin from './patchImportParserPlugin';

export default class BurdocWepbackPlugin {
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
