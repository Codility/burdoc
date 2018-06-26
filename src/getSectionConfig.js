import { get, last, upperFirst } from 'lodash';
import { Fragment } from 'react';

const sectionConfigFiles = require.context('__cwd', true, /\/burdoc\.section\.js$/);
const keys = sectionConfigFiles.keys();
const sectionConfigs = [...keys]
  .sort((keyA, keyB) => (keyA.length - keyB.length) || keyA.localeCompare(keyB))
  .map(key => [key.replace(/burdoc\.section\.js$/, ''), sectionConfigFiles(key)]);

function normalizePath(path) {
  return path.replace(/\\/g, '/').replace(/^\.\//, '');
}

function getNameFromPath(normalizedPath) {
  return upperFirst(
    last(
      normalizedPath
        .replace(/\.docs\.js$/, '')
        .replace(/\/index$/, '')
        .split('/'),
    ),
  );
}

function getCategoryFromPath(normalizedPath) {
  return upperFirst(normalizedPath.split('/')[0]);
}

function getDefaultConfig(path) {
  const normalizedPath = normalizePath(path);
  return {
    name: getNameFromPath(normalizedPath),
    category: getCategoryFromPath(normalizedPath),
    pathname: `/${normalizedPath}`,
    title: 'Burdoc',
    head: (
      <Fragment>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700" />
        <style jsx global>{`
          html {
            font-family: Roboto, sans-serif;
          }
        `}</style>
      </Fragment>
    ),
  }
}

export default function getSectionConfig(path) {
  return Object.assign(
    getDefaultConfig(path),
    ...sectionConfigs
      .filter(([key]) => path.startsWith(key))
      .map(([, config]) => get(config, 'default', config)),
  );
}
