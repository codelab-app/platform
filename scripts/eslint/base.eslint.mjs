import banPlugin from 'eslint-plugin-ban'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys'
import prettierPlugin from 'eslint-plugin-prettier'
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'
import importPlugin from 'eslint-plugin-import-x'
import unicornPlugin from 'eslint-plugin-unicorn'
import stylistic from '@stylistic/eslint-plugin'

/**
 * ESLint base configurations with specific overrides.
 */
export default [
  // Override 1: General rules for TS/JS files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      ban: banPlugin,
      perfectionist: perfectionistPlugin,
      '@typescript-eslint': tsPlugin,
      'sort-destructure-keys': sortDestructureKeysPlugin,
      prettier: prettierPlugin,
      '@stylistic': stylistic,
    },
    rules: {
      'ban/ban': [
        2, // Equivalent to "error"
        {
          name: 'useSearchParams',
        },
      ],
      'perfectionist/sort-objects': 'off',
      'prefer-destructuring': [
        'off',
        {
          array: false,
          object: true,
        },
      ],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      'no-dupe-class-members': 'off',
      'no-unused-vars': 'off',
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        { caseSensitive: false },
      ],
      'id-length': [
        'error',
        {
          properties: 'never',
          exceptions: ['_', 'a', 'b', '$', 'z', 'i'],
        },
      ],
      'no-implicit-coercion': 'error',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'func-style': 'error',
    },
  },
  // Override 2: JS/JSX specific rules
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Removed @typescript-eslint rules - moved to typescript.config.mjs
    },
  },
  // Override 4: Pages/App specific rules
  {
    files: ['**/pages/**/*.tsx', '**/app/**/*.tsx'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
  // Override 5: TS/TSX specific rules with import plugin
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'prefer-arrow': preferArrowPlugin,
      '@typescript-eslint': tsPlugin,
      'import-x': importPlugin,
    },
    rules: {
      ...(importPlugin.configs.typescript?.rules || {}),
      curly: ['error', 'all'],
      'prefer-arrow/prefer-arrow-functions': 'error',
      // Removed all @typescript-eslint rules - moved to typescript.config.mjs
    },
    settings: {
      ...(importPlugin.configs.typescript?.settings || {}),
    },
  },
]
