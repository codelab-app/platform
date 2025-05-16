import banPlugin from 'eslint-plugin-ban'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys'
import canonicalPlugin from 'eslint-plugin-canonical'
import prettierPlugin from 'eslint-plugin-prettier'
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'
import importPlugin from 'eslint-plugin-import'
import unicornPlugin from 'eslint-plugin-unicorn'
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts'

/**
 * ESLint base configurations with specific overrides.
 */
export default [
  // Override 1: General rules for TS/JS files
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    plugins: {
      ban: banPlugin,
      perfectionist: perfectionistPlugin,
      '@typescript-eslint': tsPlugin,
      'sort-destructure-keys': sortDestructureKeysPlugin,
      canonical: canonicalPlugin,
      prettier: prettierPlugin,
      '@stylistic/ts': stylisticTsPlugin,
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
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            'null | undefined': {
              message: 'use Nullish instead',
              fixWith: 'Nullish<>',
            },
            'Record<string, any>': {
              message: 'use ObjectLike instead',
              fixWith: 'ObjectLike',
            },
            'Record<string, unknown>': {
              message: 'use UnknownObjectLike instead',
              fixWith: 'UnknownObjectLike',
            },
            Object: {
              message: 'Use {} or ObjectLike instead',
              fixWith: 'ObjectLike',
            },
            object: {
              message: 'Use {} or ObjectLike instead',
              fixWith: 'ObjectLike',
            },
          },
        },
      ],
      '@stylistic/ts/quotes': ['error', 'single', { avoidEscape: true }],
      'no-dupe-class-members': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        { caseSensitive: false },
      ],
      'canonical/destructuring-property-newline': 'off',
      'canonical/import-specifier-newline': 'off',
      'canonical/id-match': 'off',
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
    files: ['*.js', '*.jsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  // Override 3: Schema file specific rules
  {
    files: ['*.schema.ts', '*.schema.interface.ts'],
    plugins: {
      canonical: canonicalPlugin,
    },
    rules: {
      'canonical/sort-keys': 'off',
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
    files: ['*.ts', '*.tsx'],
    plugins: {
      'prefer-arrow': preferArrowPlugin,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    rules: {
      ...(importPlugin.configs.typescript?.rules || {}),
      curly: ['error', 'all'],
      'prefer-arrow/prefer-arrow-functions': 'error',
      '@typescript-eslint/no-extraneous-class': [
        'off',
        { allowWithDecorator: true },
      ],
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
        },
      ],
      '@typescript-eslint/no-dynamic-delete': 'error',
    },
    settings: {
      ...(importPlugin.configs.typescript?.settings || {}),
    },
  },
  // Override 7: Config file specific rules (GraphQL part was commented out)
  {
    files: ['*.config.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
