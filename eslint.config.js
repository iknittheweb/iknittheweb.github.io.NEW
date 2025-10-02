// ESLint v9+ flat config migration (2025-10-02)
// See: https://eslint.org/docs/latest/use/configure/migration-guide

export default [
  {
    files: ['**/*.js'],
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
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
