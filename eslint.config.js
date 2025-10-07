// ESLint v9+ flat config migration (2025-10-02)
// See: https://eslint.org/docs/latest/use/configure/migration-guide

import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js'],
    ignores: [
      'src/js/bodyScrollLock.min.js', // Third-party minified library
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      ...prettierConfig.rules, // Disable rules that conflict with Prettier
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
