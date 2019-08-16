module.exports = {
  extends: ["@open-wc/eslint-config", "eslint-config-prettier"].map(
    require.resolve
  ),
  rules: {
    "class-methods-use-this": 0,
    "linebreak-style": 0,
    "no-console": "off"
  }
};
