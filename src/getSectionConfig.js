import { get, last, upperFirst } from 'lodash';
import { Fragment } from 'react';

const sectionConfigs = BURDOC_SECTION_CONFIGS;

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
    styles: (
      <style jsx global>{`
        html {
          font-family: Roboto, sans-serif;
        }
      `}</style>
    ),
    head: <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700" />,
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
