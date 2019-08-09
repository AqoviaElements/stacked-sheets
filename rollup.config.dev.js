/* eslint-disable import/no-extraneous-dependencies */
import url from 'postcss-url';
import babel from 'rollup-plugin-babel';
import cleaner from 'rollup-plugin-cleaner';
import copy from 'rollup-plugin-copy';
import html from 'rollup-plugin-html-scaffold';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import babelEs6 from './babel.es6.config';

export default {
  input: ['src/stacked-sheets.js'],
  output: {
    file: 'demo/stacked-sheets.es6.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    cleaner({ targets: ['./demo/'] }),
    copy({
      targets: {
        'node_modules/@webcomponents/webcomponentsjs/bundles': 'demo/bundles',
        'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js':
          'demo/webcomponents-loader.js',
      },
      verbose: true,
    }),
    html({
      input: 'src/index.html',
      output: 'index.html',
      template: {},
    }),
    progress(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    postcss({ plugins: [url({ url: 'inline' })] }),
    resolve(),
    babel(babelEs6),
    serve({ contentBase: 'demo', verbose: true }),
    livereload({ watch: 'demo', exts: ['html', 'js'] }),
  ],
};
