/* eslint-disable import/no-extraneous-dependencies */
import url from 'postcss-url';
import analyze from 'rollup-plugin-analyzer';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import cleaner from 'rollup-plugin-cleaner';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import html from 'rollup-plugin-html-scaffold';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import babelEs5 from './babel.es5.config';
import babelEs6 from './babel.es6.config';

export default [
  {
    input: ['src/stacked-sheets.js'],
    output: {
      file: 'dist/stacked-sheets.es5.js',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      cleaner({ targets: ['./dist/'] }),
      copy({
        targets: {
          'node_modules/@webcomponents/webcomponentsjs/bundles': 'dist/bundles',
          'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js':
            'dist/webcomponents-loader.js',
        },
        verbose: true,
      }),
      html({
        input: 'src/index.html',
        output: 'index.html',
        template: {},
      }),
      progress(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      postcss({ plugins: [url({ url: 'inline' })] }),
      resolve(),
      babel(babelEs5),
      minify({ comments: false }),
      analyze(),
      filesize(),
    ],
  },
  {
    input: ['src/stacked-sheets.js'],
    output: {
      file: 'dist/stacked-sheets.es6.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      progress(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      postcss({ plugins: [url({ url: 'inline' })] }),
      resolve(),
      babel(babelEs6),
      minify({ comments: false }),
      analyze(),
      filesize(),
    ],
  },
];
