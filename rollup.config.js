/* eslint-disable import/no-extraneous-dependencies */
import analyze from 'rollup-plugin-analyzer';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import url from 'rollup-plugin-url';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

export default args => {

    let dest = args.demo ? 'demo' : 'dist';
    let buildType = args.demo ? 'development' : 'production';

    let es5BabelTranspilation = babel();
    let es6BabelTranspilation = babel({ presets: [['@babel/preset-env', { targets: { esmodules: true } }]] });

    let basePlugins = [
        progress(),
        replace({ 'process.env.NODE_ENV': JSON.stringify(buildType) }),
        resolve(),
        minify({ comments: false }),
        analyze(),
        filesize(),
        json(),
        url({
            include: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
            limit: Infinity,
        })
    ];

    let copyTask = copy({
        targets: [
            { src: 'src/index.html', dest },
            { src: 'src/fonts', dest },
            { src: 'node_modules/@webcomponents/webcomponentsjs/bundles', dest },
            { src: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js', dest }
        ],
        verbose: true,
    });


    let stackedSheetEs5 = {
        input: ['src/components/stacked-sheet.js'],
        output: {
            file: `${dest}/stacked-sheet.es5.js`,
            format: 'umd',
            sourcemap: true,
        },
        plugins: [
            ...basePlugins,
            es5BabelTranspilation,
            copyTask
        ]
    };

    let stackedSheetEs6 = {
        input: ['src/components/stacked-sheet.js'],
        output: {
            file: `${dest}/stacked-sheet.js`,
            format: 'es',
            sourcemap: true,
        },
        plugins: [
            ...basePlugins,
            es6BabelTranspilation
        ]
    };

    let stackedSheetsHolderEs5 = {
        input: ['src/components/stacked-sheets-holder.js'],
        output: {
            file: `${dest}/stacked-sheets-holder.es5.js`,
            format: 'umd',
            sourcemap: true,
        },
        plugins: [
            ...basePlugins,
            es5BabelTranspilation,
            copyTask
        ]
    };

    let stackedSheetsHolderEs6 = {
        input: ['src/components/stacked-sheets-holder.js'],
        output: {
            file: `${dest}/stacked-sheets-holder.js`,
            format: 'es',
            sourcemap: true,
        },
        plugins: [
            ...basePlugins,
            es6BabelTranspilation
        ]
    };

    let myAppEs5 = {
        input: ['src/my-app.js'],
        output: {
            file: `${dest}/my-app.es5.js`,
            format: 'umd',
            sourcemap: true,
        },
        plugins: [
            ...basePlugins,
            es5BabelTranspilation,
            copyTask
        ]
    };

    let myAppEs6 = {
        input: ['src/my-app.js'],
        output: {
            file: `${dest}/my-app.js`,
            format: 'es',
            sourcemap: true,
        },
        plugins: [
            ...basePlugins,
            es6BabelTranspilation
        ]
    };


    if (args.demo) {
        let demoPlugins = [
            serve({ contentBase: dest, verbose: true, port: 8999 }),
            livereload({ watch: dest, exts: ['html', 'js'] })
        ];
    
        stackedSheetEs6.plugins = [
            ...stackedSheetEs6.plugins,
            ...demoPlugins
        ];
    }

    return [ stackedSheetEs5, stackedSheetEs6, stackedSheetsHolderEs5, stackedSheetsHolderEs6, myAppEs5, myAppEs6 ];
} 
