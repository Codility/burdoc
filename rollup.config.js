import { isAbsolute } from 'path';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default [
  './src/babel.js',
  './src/core/index.js',
  './src/next.config.js',
  './src/pages/_document.js',
  './src/pages/index.js',
  './src/server/index.js',
].map(input => ({
  input,
  output: {
    file: input.replace('src', 'lib'),
    format: input.includes('pages') ? 'es' : 'cjs',
  },
  plugins: [
    resolve(),
    commonjs({
      include: [
        './src/babelPlugins/codeExample.js',
      ],
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      sourceMaps: false,
    }),
  ],
  external(id, parent) {
    if (isAbsolute(id)) {
      return id.includes('node_modules');
    }
    return !id.startsWith('.') && !id.startsWith('\u{0}');
  }
}));
