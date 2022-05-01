module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
