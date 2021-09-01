import { join } from 'path';
import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import livereload from 'rollup-plugin-livereload';
import dev from 'rollup-plugin-dev';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import replace from '@rollup/plugin-replace';
import inline, {
  defaultTemplate,
} from './plugins/rollup-plugin-html-inline.mjs';
import packageOutput from './plugins/rollup-plugin-package-js13k.js';

const env = process.env.NODE_ENV || 'production';
const isDev = env === 'development';

let plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
    preventAssignment: true,
  }),
  image(),
  postcss({
    extract: true,
    minimize: true,
    path: './',
    plugins: [],
  }),
  json(),
  typescript(),
  terser({
    ecma: 11,
    module: true,
    toplevel: true,
    compress: {
      keep_fargs: false,
      passes: 10,
      pure_funcs: ['assert', 'debug'],
      pure_getters: true,
      unsafe: true,
      unsafe_arrows: true,
      unsafe_comps: true,
      unsafe_math: true,
      unsafe_methods: true,
      hoist_funs: true,
      booleans_as_integers: true,
      drop_console: !isDev,
      drop_debugger: !isDev,
    },
    mangle: {
      properties: {
        reserved: [
          'number',
          'size',
          'spawn',
          'bodies',
          'spawnPlanet',
          'goalPlanet',
          'seed',
          'totalLaunches',
          'holeLaunches',
          'v',
        ],
      },
      module: true,
      toplevel: true,
    },
  }),
  inline({
    title: 'InterPlanetary Transport System',
    canvasId: 'g',
    template: defaultTemplate,
    sourcemap: isDev ? 'bundle.js.map' : undefined,
    delete: false,
    meta: [
      '<meta name="monetization" content="$ilp.uphold.com/g64DLNdpidDy">',
      '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">',
      '<meta name="apple-mobile-web-app-capable" content="yes">',
      '<meta name="mobile-web-app-capable" content="yes"></meta>',
    ],
    scripts: [
      //'https://cdn.jsdelivr.net/npm/near-api-js@0.41.0/dist/near-api-js.min.js',
    ],
    roadroller: !isDev,
  }),
  packageOutput({
    name: 'js13k-2021-interplanetary-transport-system',
    directory: 'dist',
    include: ['index.html'],
    notify: isDev,
  }),
];

if (isDev) {
  plugins.push(
    dev({
      dirs: ['dist'],
    }),
  );

  plugins.push(
    livereload({
      watch: 'dist',
    }),
  );
}

export default defineConfig({
  input: join('src', 'index.ts'),
  output: {
    file: join('dist', 'bundle.js'),
    format: 'iife',
    sourcemap: true,
    strict: false,
  },
  plugins: plugins,
});
