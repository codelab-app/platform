// Foundation file for all ESLint plugins and shared configuration
// This file imports plugins AND registers them within the configuration objects below.

// Core ESLint & TypeScript
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
// import tsPlugin from '@typescript-eslint/eslint-plugin' // Imported via tseslint.plugin
// import tsParser from '@typescript-eslint/parser' // Imported via tseslint.parser

// Nx
import nx from '@nx/eslint-plugin'

// React & UI
import reactPlugin from 'eslint-plugin-react'
import tailwindcssPlugin from 'eslint-plugin-tailwindcss'
import readableTailwindPlugin from 'eslint-plugin-readable-tailwind'

// Import handling
import importPlugin from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'

// Testing

// Code style
import banPlugin from 'eslint-plugin-ban'
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys'
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts'
import preferArrowPlugin from 'eslint-plugin-prefer-arrow'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

// Export necessary utilities if needed by other configs, but not plugins for registration
export const utils = {
  createTypeScriptImportResolver,
  // Export specific plugins IF they are used for configuration presets elsewhere,
  // but generally, registration happens inline below.
  js, // Example: js.configs.recommended can be used elsewhere
  importPlugin, // Example: importPlugin.configs.typescript can be used elsewhere
  eslintPluginPrettierRecommended, // Needed for recommended config preset
  nx,
  reactPlugin,
  tailwindcssPlugin,
  readableTailwindPlugin,
  preferArrowPlugin,
}

// Base configuration - Plugins registered inline
export default [
  {
    plugins: {
      'sort-destructure-keys': sortDestructureKeysPlugin,
    },
  },
  // Config 1: *.ts, *.tsx, *.js, *.jsx
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'sort-destructure-keys': sortDestructureKeysPlugin,
    },
    // languageOptions: {
    //   parser: tseslint.parser,
    //   parserOptions: {
    //     project: true,
    //   },
    // },
    rules: {
      'prefer-destructuring': [
        'off',
        {
          array: false,
          object: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
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
            object: {
              message: 'Use {} or ObjectLike instead',
              fixWith: 'ObjectLike',
            },
          },
        },
      ],
      '@stylistic/ts/quotes': ['error', 'single', { avoidEscape: true }],
      'no-dupe-class-members': 'off',
      'no-unused-vars': 'off', // Base rule off, TS version handles it
      '@typescript-eslint/no-unused-vars': 'off',
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

  // Config 2: *.js, *.jsx
  {
    files: ['**/*.{js,jsx}'],
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
      '@typescript-eslint': tseslint.plugin,
    },
    settings: {
      // ...importPlugin.configs.typescript.settings, // Merge settings from 'plugin:import/typescript'
    },
    rules: {
      // ...importPlugin.configs.typescript.rules, // Merge rules from 'plugin:import/typescript'
      curly: ['error', 'all'], // Enforce curly braces for all control statements
      'prefer-arrow/prefer-arrow-functions': 'error',
      '@typescript-eslint/no-extraneous-class': [
        'off',
        { allowWithDecorator: true }, // Allow classes used only as decorators
      ],
      '@typescript-eslint/method-signature-style': ['error', 'method'], // Prefer method syntax for signatures
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
          default: 'generic', // Prefer T[] over Array<T>
        },
      ],
      '@typescript-eslint/no-dynamic-delete': 'error',
    },
  },

  // Config 6: *.config.ts
  {
    files: ['**/*.config.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Need plugin for the rule below
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow explicit any in config files
    },
  },
]
