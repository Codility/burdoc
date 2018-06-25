import { get } from 'lodash';
import dynamic, { SameLoopPromise } from 'next/dynamic';

import getSectionConfig from 'getSectionConfig';
import home from 'home';

function getHomeSection() {
  return {
    name: 'Home',
    pathname: '/',
    Section: home,
  };
}

function getDocsSections() {
  const weakDocs = require.context('__cwd', true, /\.docs\.js$/, 'weak');
  const lazyDocs = require.context('__cwd', true, /\.docs\.js$/, 'lazy');
  const sections = weakDocs.keys().map(path => {
    const sectionConfig = getSectionConfig(path);
    const normalizedPath = normalizePath(path);
    return {
      name: sectionConfig.name,
      category: sectionConfig.category,
      pathname: `/${normalizedPath}`,
      Section: dynamic(new SameLoopPromise((resolve, reject) => {
        const weakId = weakDocs.resolve(path);

        try {
          const weakModule = __webpack_require__(weakId);
          return resolve(weakModule);
        } catch (error) {}

        lazyDocs(path).then(resolve);
      })),
    };
  });

  return sections;
}

const sections = [getHomeSection(), ...getDocsSections()];
sections.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

export default sections;
