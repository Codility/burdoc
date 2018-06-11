'use strict';

const { Template: ImportDependencyTemplate } = require('webpack/lib/dependencies/ImportDependency');
const webpackMissingPromiseModule = require('webpack/lib/dependencies/WebpackMissingModule').promise;

function augumentContent(content, dep) {
  if (!dep.block.chunkName.startsWith('chunks/')) {
    return content;
  }
  const chunkName = dep.block.chunkName.replace(/^chunks\//, '');
  return `${content}.then(function(module) { module.__webpackChunkName = ${JSON.stringify(chunkName)}; return module; })`;
}

function getGetContent(prevGetContent) {
  return function getContent(promise, dep, comment) {
    const content = prevGetContent(promise, dep, comment);
    if (content.includes('webpackMissingModule')) {
      return content;
    }
    return augumentContent(content, dep);
  }
}

module.exports = function patchImportDependencyTemplate() {
  ImportDependencyTemplate.prototype.getContent = getGetContent(ImportDependencyTemplate.prototype.getContent);
};
