import { get } from 'lodash';

import getSectionConfig from 'getSectionConfig';
import home from 'home';

export const defaultSectionConfig = getSectionConfig('./');

function getHomeSection() {
  return {
    ...defaultSectionConfig,
    name: 'Home',
    Section: home,
  };
}

const burdocDocsImports = BURDOC_DOCS_IMPORTS;

function getDocsSections() {
  return burdocDocsImports.map(([path, Section]) => {
    const sectionConfig = getSectionConfig(path);
    return { ...sectionConfig, Section };
  });
}

const sections = [getHomeSection(), ...getDocsSections()];
sections.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

export default sections;
