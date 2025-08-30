// Foundation file for all ESLint plugins and shared configuration
// This file imports plugins AND registers them within the configuration objects below.

// Core ESLint & TypeScript
import tseslint from 'typescript-eslint'
// import tsPlugin from '@typescript-eslint/eslint-plugin' // Imported via tseslint.plugin
// import tsParser from '@typescript-eslint/parser' // Imported via tseslint.parser

// Nx

// React & UI

// Import handling
// import importPlugin from 'eslint-plugin-import-x'

// Testing

// Code style
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys'
import stylistic from '@stylistic/eslint-plugin'
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Base configuration - Plugins registered inline
export default tseslint.config(
  // Base configuration without projectService - let apps configure it
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        // Don't set projectService at root level to avoid full monorepo scans
        // Apps will configure this based on their needs
      },
    },
  },
  // Config 1: *.ts, *.tsx, *.js, *.jsx
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'sort-destructure-keys': sortDestructureKeysPlugin,
      '@typescript-eslint': tseslint.plugin, // Ensure TS plugin is registered
      '@stylistic': stylistic,
    },
    rules: {
      'prefer-destructuring': [
        'off',
        {
          array: false,
          object: true,
        },
      ],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      'no-dupe-class-members': 'off', // Base rule off, TS version handles it (likely in strictTypeChecked)
      'no-unused-vars': 'off', // Base rule off, TS version handles it (likely in strictTypeChecked)
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            'null | undefined': {
              message: 'Use Nullish<> instead',
              fixWith: 'Nullish<>',
            },
            'Record<string, any>': {
              message: 'Use ObjectLike instead',
              fixWith: 'ObjectLike',
            },
            'Record<string, unknown>': {
              message: 'Use UnknownObjectLike instead',
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
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        { caseSensitive: false },
      ],
      'id-length': [
        'error',
        {
          properties: 'never',
          exceptions: ['_', 'a', 'b', '$', 'z', 'i'], // Allow short common variable names
        },
      ],
      'no-implicit-coercion': 'error',
      'func-style': 'error',
    },
  },

  // Config 2: *.js, *.jsx, *.mjs, *.cjs
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // JS files will be configured per app/package
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Need plugin for the rule below
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // Allow require in JS files
    },
  },

  // Config 3: *.schema.ts, *.schema.interface.ts
  {
    files: ['**/*.schema.ts', '**/*.schema.interface.ts'],
    rules: {
      // Specific rules for schema files can be added here if needed
    },
  },

  // Config 4: **/pages/**/*.tsx, **/app/**/*.tsx
  {
    files: ['**/pages/**/*.tsx', '**/app/**/*.tsx'],
    rules: {
      // Specific rules for Next.js pages/app files can be added here
    },
  },

  // Config 5: *.ts, *.tsx (Import plugin and TS specific rules)
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'prefer-arrow': preferArrowPlugin,
      '@typescript-eslint': tseslint.plugin, // Ensure TS plugin is available here too
    },
    settings: {
      // ...importPlugin.configs.typescript.settings, // Merge settings from 'plugin:import/typescript'
    },
    rules: {
      // ...importPlugin.configs.typescript.rules, // Merge rules from 'plugin:import/typescript'
      curly: ['error', 'all'], // Enforce curly braces for all control statements
      'prefer-arrow/prefer-arrow-functions': 'error',

      // Rules previously in the global config, now explicitly in TS/TSX scope
      // These were identified as good candidates to be TS/TSX specific.
      // If strictTypeChecked already covers them adequately, some might be redundant,
      // but explicit definition here ensures they are applied as intended for these files.
      '@typescript-eslint/no-extraneous-class': [
        'off',
        { allowWithDecorator: true }, // Allow classes used only as decorators
      ],
      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
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
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    },
  },

  // Config 6: *.config.ts
  {
    files: [
      '**/*.config.ts',
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
    ],
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Need plugin for the rule below
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
)
