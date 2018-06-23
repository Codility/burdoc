import ChunkNameMapTemplatePlugin from 'BurdocWebpackPlugin/ChunkNameMapTemplatePlugin';
import patchImportDependencyTemplate from 'BurdocWebpackPlugin/patchImportDependencyTemplate';
import patchImportParserPlugin from 'BurdocWebpackPlugin/patchImportParserPlugin';

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
