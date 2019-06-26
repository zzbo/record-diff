module.exports = {
  extends: ['eslint-config-imweb'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-use-before-define': 0,
    'global-require': 0,
    'arrow-parens': 0,
  },
};
