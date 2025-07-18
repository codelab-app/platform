// eslint.config.ts – Flat-Config version of the previous JSON override

import tseslint from 'typescript-eslint' // TS-ESLint plugin + parser
import importPlugin from 'eslint-plugin-import-x' // import/* rules
import unusedImports from 'eslint-plugin-unused-imports' // unused-imports/* rules

export default /** @type {import('eslint').FlatConfig[]} */ [
  // Use the pre-configured TypeScript config from import-x
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],

    //
    // Register plugins (each key only once)
    //
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      'unused-imports': unusedImports,
    },

    //
    // Parser & parserOptions
    //
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // TODO: Re-enable after migrating all library eslint configs
        // projectService: true,
        // project: tsProjects,
      },
    },

    //
    // import/* resolver & parser settings
    //
    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import-x/resolver': {
        typescript: {
          // Enable TypeScript resolver
          alwaysTryTypes: true,
        },
      },
      'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
    },

    //
    // Rules
    //
    rules: {
      //
      // Custom import rules
      //
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/newline-after-import': 'error',
      'import/first': 'error',

      // SUPER SLOW!
      'import/no-cycle': 'off',

      'import/no-duplicates': 'error',
      'import/no-namespace': 'error',

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'antd/lib/select',
              importNames: ['DefaultOptionType'],
              message:
                'Please use `SelectOption` from `@codelab/frontend/abstract/types` instead',
            },
            // {
            //   name: 'change-case-all',
            //   message: 'Use string transformation from `@codelab/shared/utils`'
            // },
            {
              name: 'slugify',
              message: 'Use string transformation from `@codelab/shared/utils`',
            },
          ],
        },
      ],
    },
  },

  //
  // TypeScript-specific rules
  //
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-require-imports': 'error',
    },
  },

  //
  // Override for *.config.js files
  //
  {
    files: ['*.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
