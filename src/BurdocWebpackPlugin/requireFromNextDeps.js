let nextPath;

function getNextPath() {
  if (!nextPath) {
    nextPath = require.resolve('next');
  }
  return nextPath;
}

export default function requireFromNextDeps(path) {
  const nextPath = getNextPath();
  const resolvedPath = require.resolve(path, { paths: [nextPath] });
  return require(resolvedPath);
}
