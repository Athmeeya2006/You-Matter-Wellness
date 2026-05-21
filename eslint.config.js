import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Allow uppercase vars, framer-motion's 'motion' namespace, and underscore-prefixed ignored vars
      'no-unused-vars': ['warn', { varsIgnorePattern: '^([A-Z_]|motion|AnimatePresence|_)', argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      // Context files export both provider and hook from the same file - this is intentional
      'react-refresh/only-export-components': 'warn',
      // Missing deps warnings are informational - hooks are intentionally skipped to avoid re-render loops
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
])
