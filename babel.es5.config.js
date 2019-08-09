export default {
  presets: [
    [
      '@babel/preset-env',
      {
        exclude: [
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-transform-async-to-generator',
        ],
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['@babel/proposal-decorators', { decoratorsBeforeExport: true }],
    ['module:fast-async', { compiler: { noRuntime: true } }],
  ],
};
