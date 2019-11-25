module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "func-call-spacing": ["error", "always", { allowNewlines: true }],
    "react/display-name": ["off"]
  },
  settings: {
      react: {
          version: 'detect'
      }
  }
}
