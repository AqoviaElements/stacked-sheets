/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require("@open-wc/testing-karma");
const merge = require("webpack-merge");

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        {
          pattern: config.grep ? config.grep : "test/**/*.test.js",
          type: "module"
        }
      ],

      esm: {
        // if you are using 'bare module imports' you will need this option
        nodeResolve: true
      },

      // you can overwrite/extend the config further
      coverageIstanbulReporter: {
        thresholds: {
          global: {
            branches: 75
          }
        }
      }
    })
  );
  return config;
};