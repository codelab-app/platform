// eslint.config.ts – Flat-Config version of the previous JSON override

import tseslint from 'typescript-eslint' // TS-ESLint plugin + parser
import importPlugin from 'eslint-plugin-import' // import/* rules
import unusedImports from 'eslint-plugin-unused-imports' // unused-imports/* rules

const tsProjects = ['tsconfig.base.json', '(apps|libs)/*/tsconfig.lib.json']

export default /** @type {import('eslint').FlatConfig[]} */ [
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
        projectService: true,
        project: tsProjects,
      },
    },

    //
    // import/* resolver & parser settings
    //
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        //
        // Use the TS resolver
        //
        typescript: {
          // always try to resolve types under `<root>@types`
          // even when no source code is present (e.g. `@types/unist`)
          alwaysTryTypes: true,
          project: tsProjects,
        },
        //
        // Fallback to the Node resolver
        //
        node: {
          project: tsProjects,
        },
      },
    },

    //
    // Rules
    //
    rules: {
      '@typescript-eslint/no-require-imports': 'error',

      //
      // Custom import rules
      //
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
  // Override for *.config.js files
  //
  {
    files: ['*.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
