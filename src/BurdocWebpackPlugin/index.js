import ChunkNameMapTemplatePlugin from 'BurdocWebpackPlugin/ChunkNameMapTemplatePlugin';
import patchImportDependencyTemplate from 'BurdocWebpackPlugin/patchImportDependencyTemplate';
import patchImportParserPlugin from 'BurdocWebpackPlugin/patchImportParserPlugin';
import patchRequireContextDependencyParserPlugin from 'BurdocWebpackPlugin/patchRequireContextDependencyParserPlugin';

export default class BurdocWepbackPlugin {
  apply(compiler) {
    /**
     * Since the export is being patched and Node's require.cache is not being cleared,
     * patching can be done once.
     */
    patchImportDependencyTemplate();
    patchImportParserPlugin();
    patchRequireContextDependencyParserPlugin();

    compiler.plugin('compilation', (compilation, params) => {
      compilation.moduleTemplate.apply(new ChunkNameMapTemplatePlugin());
    });
  }
}
