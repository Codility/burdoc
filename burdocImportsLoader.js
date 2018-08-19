'use strict';

const path = require('path');

const glob = require('glob');
const loaderUtils = require('loader-utils');

const docsImportsPlaceholder = 'BURDOC_DOCS_IMPORTS';
const sectionConfigsPlaceholder = 'BURDOC_SECTION_CONFIGS';

function getDirs(docsPath) {
  console.log('> Gathering directories to watch for changes');
  return glob.sync('**/', { cwd: docsPath });
}

function getDocsImportsCode(docsPath) {
  console.log('> Gathering the docs');
  const docs = glob.sync('**/*.docs.js', { cwd: docsPath, nodir: true });
  return `
(function getBurdocDocsImports() {
  return [
    ${docs
      .map(
        doc => `
    [
      ${JSON.stringify(doc)},
      dynamic({
        loader: () => import(${JSON.stringify(path.resolve(docsPath, doc))}),
      }),
    ],
        `,
      )
      .join('')}
  ];
}())
  `;
}

function getSectionConfigsCode(docsPath) {
  console.log('> Gathering the sections');
  const sections = glob.sync('**/burdoc.section.js', { cwd: docsPath, nodir: true });
  return `
[
  ${sections
    .sort((sectionA, sectionB) => sectionA.length - sectionB.length || sectionA.localeCompare(sectionB))
    .map(
      section => `
  [
    ${JSON.stringify(section.replace(/burdoc\.section\.js$/, ''))},
    require(${JSON.stringify(path.resolve(docsPath, section))}),
  ],
      `,
    )
    .join('')}
]
  `;
}

function getDocsPath(context) {
  return loaderUtils.getOptions(context).docsPath;
}

function addContextDependencies(context, docsPath) {
  context.addContextDependency(docsPath);

  for (const dir of getDirs(docsPath)) {
    context.addContextDependency(path.join(docsPath, dir));
  }
}

module.exports = function burdocImportsLoader(originalContent) {
  let content = originalContent;

  if (content.includes(docsImportsPlaceholder)) {
    const docsPath = getDocsPath(this);
    content = [
      "import dynamic from 'next/dynamic';",
      content.replace(docsImportsPlaceholder, getDocsImportsCode(docsPath)),
    ].join('\n');

    this.cacheable(false);
    addContextDependencies(this, docsPath);
  }

  if (content.includes(sectionConfigsPlaceholder)) {
    const docsPath = getDocsPath(this);
    content = content.replace(sectionConfigsPlaceholder, getSectionConfigsCode(docsPath));

    this.cacheable(false);
    addContextDependencies(this, docsPath);
  }

  return content;
};
