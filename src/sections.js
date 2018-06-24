import { upperFirst } from 'lodash';
import dynamic, { SameLoopPromise } from 'next/dynamic';

import home from 'home';
import marker from 'marker';

function normalizePath(path) {
  return path.replace(/\\/g, '/');
}

function getNameFromPath(path) {
  return upperFirst(
    normalizePath(path)
      .replace('/index', '')
      .replace('.docs.js', '')
      .replace(/^([^/]*\/)*/, ''),
  );
}

function getCategoryFromPath(path) {
  return upperFirst(normalizePath(path).split('/')[2]);
}

function getPathnameFromPath(path) {
  return normalizePath(path)
    .replace(/^\./, '')
    .replace('/index', '')
    .replace('.docs.js', '');
}

function getHomeSection() {
  return {
    name: 'Home',
    category: '',
    pathname: '/',
    Section: home,
  };
}

function getDocsSections() {
  const weakDocs = require.context('__cwd', true, /\.docs\.js/, 'weak');
  const sections = weakDocs.keys().map(path => ({
    name: getNameFromPath(path),
    category: getCategoryFromPath(path),
    pathname: getPathnameFromPath(path),
    Section: dynamic(new SameLoopPromise((resolve, reject) => {
      const weakId = weakDocs.resolve(path);

      try {
        const weakModule = __webpack_require__(weakId);
        return resolve(weakModule);
      } catch (error) {}

      import(`__cwd/${marker}${path}${marker}.docs.js`).then(resolve);
    })),
  }));

  return sections;
}

const sections = [getHomeSection(), ...getDocsSections()];
sections.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

export default sections;
