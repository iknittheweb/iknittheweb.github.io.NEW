// ------------------------------------------------------------
// BEGINNER-FRIENDLY EXPLANATORY COMMENTS
// ------------------------------------------------------------
// This file configures ESLint, a tool for checking JavaScript code for errors and style issues.
// You can set rules to enforce coding standards and catch mistakes early.
//
// Key concepts:
// - ESLint: Tool for finding and fixing problems in JavaScript
// - Rule: Defines what is allowed or not in your code
// - Configuration: Controls how ESLint works for your project
// ------------------------------------------------------------
// ESLint v9+ flat config migration (2025-10-02)
// See: https://eslint.org/docs/latest/use/configure/migration-guide

import prettierConfig from 'eslint-config-prettier';

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
      ...prettierConfig.rules, // Disable rules that conflict with Prettier
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
