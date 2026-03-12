import lit from 'eslint-plugin-lit';
import wc from 'eslint-plugin-wc';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

export default defineConfig([
  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: { js, wc, lit, tseslint },
    extends: [
      "js/recommended",
      "tseslint/recommended",
      "wc/recommended",
      "lit/recommended",
    ],
    languageOptions: { globals: globals.browser },
  },
]);
