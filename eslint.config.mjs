// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginCypress from 'eslint-plugin-cypress'; // Direct import
import { defineConfig } from 'eslint/config';     // Use core utility

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Apply Cypress rules only to your test files
    files: ['cypress/**/*.ts'],
    plugins: {
      cypress: pluginCypress,
    },
    // Use the built-in recommended object
    rules: {
      ...pluginCypress.configs.recommended.rules,
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-async-tests': 'error',
    },
  },
]);