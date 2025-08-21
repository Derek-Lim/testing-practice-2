// eslint.config.mjs
import js from '@eslint/js'
import globals from 'globals'
import jest from 'eslint-plugin-jest'
import prettier from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // Base: Node files
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    extends: [js.configs.recommended],
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error', // make Prettier formatting mandatory
    },
  },

  // Tests: Jest globals
  {
    files: ['test/**/*.{js,mjs,cjs}', '**/*.test.{js,mjs,cjs}'],
    plugins: { jest, prettier },
    languageOptions: {
      globals: { ...globals.jest, ...globals.node },
    },
    extends: ['plugin:jest/recommended', 'plugin:prettier/recommended'],
  },
])
