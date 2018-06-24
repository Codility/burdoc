const sectionConfigFiles = require.context('__cwd', true, /\/burdoc\.section\.js$/);
const keys = sectionConfigFiles.keys();
const sectionConfigs = [...keys]
  .sort((keyA, keyB) => (keyA.length - keyB.length) || keyA.localeCompare(keyB))
  .map(key => [key.replace(/burdoc\.section\.js$/, ''), sectionConfigFiles(key)]);

export default function getSectionConfig(path) {
  return Object.assign(
    {},
    ...sectionConfigs
      .filter(([key]) => path.startsWith(key))
      .map(([, config]) => config),
  );
}
