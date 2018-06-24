import { createHash } from 'crypto';

function getHashForResource(parser) {
  return createHash('md5').update(parser.state.module.resource).digest('hex').slice(0, 20);
}

export function getChunkNameFromPath(parser, path) {
  const cleanPath = path
    .replace(/^__cwd\//, '')
    .replace(/[^\w]/g, '-');
  return `chunks/${cleanPath}-${getHashForResource(parser)}`;
}

export function getChunkNameForContext(parser) {
  return `chunks/[request]-${getHashForResource(parser)}`;
}
