'use strict';

const path = require('path');

const glob = require('glob');
const loaderUtils = require('loader-utils');

const docsImportsPlaceholder = 'BURDOC_DOCS_IMPORTS';
const sectionConfigsPlaceholder = 'BURDOC_SECTION_CONFIGS';

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

module.exports = function burdocImportsLoader(originalContent) {
  let content = originalContent;

  if (content.includes(docsImportsPlaceholder)) {
    content = [
      "import dynamic from 'next/dynamic';",
      content.replace(docsImportsPlaceholder, getDocsImportsCode(getDocsPath(this))),
    ].join('\n');
  }

  if (content.includes(sectionConfigsPlaceholder)) {
    content = content.replace(sectionConfigsPlaceholder, getSectionConfigsCode(getDocsPath(this)));
  }

  return content;
};
