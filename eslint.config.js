import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'path';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['**/dist', '**/node_modules']),

  // 🔹 Base TS rules (kaikille .ts/.tsx)
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettier.configs.recommended],
    languageOptions: {
      parser: tseslint.parsers['@typescript-eslint/parser'],
      parserOptions: {
        tsconfigRootDir: path.resolve('./'),
        project: ['./tsconfig.base.json'], // root tsconfig
      },
    },
  },

  // 🔹 Frontend
  {
    files: ['apps/frontend/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      parser: tseslint.parsers['@typescript-eslint/parser'],
      parserOptions: {
        tsconfigRootDir: path.resolve('./apps/frontend'),
        project: ['./tsconfig.json'],
      },
      globals: globals.browser,
      ecmaVersion: 2020,
    },
  },

  // 🔹 Backend
  {
    files: ['apps/backend/**/*.ts'],
    languageOptions: {
      parser: tseslint.parsers['@typescript-eslint/parser'],
      parserOptions: {
        tsconfigRootDir: path.resolve('./apps/backend'),
        project: ['./tsconfig.json'],
      },
      globals: globals.node,
    },
  },
]);
