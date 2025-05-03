import { createNodeResolver } from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default [
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Mimic extends: ["plugin:import/typescript", "plugin:import/recommended"]
    // Spread recommended and typescript rules directly
    // Apply settings from the original JSON config
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    // No plugins property - plugins are registered only in eslint.config.mjs
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['(apps|libs)/**/tsconfig.lib.json'],
        },
      },
      // 'import-x/parsers': {
      //   '@typescript-eslint/parser': ['.ts', '.tsx'],
      // },
      // 'import-x/resolver-next': [
      //   createTypeScriptImportResolver({
      //     alwaysTryTypes: true,
      //     project: ['(apps|libs)/**/tsconfig.lib.json'],
      //     // conditionNames: ['development'],
      //   }),
      //   // createNodeResolver({
      //   //   node: {
      //   //     project: ['tsconfig.base.json', '(apps|libs)/*/tsconfig.lib.json'],
      //   //   },
      //   // }),
      // ],
    },
    // rules: {
    //   // Rules from plugin:import/recommended and plugin:import/typescript
    //   // Updated to reference pluginImportX configs
    //   ...pluginImportX.configs.recommended.rules,
    //   ...pluginImportX.configs.typescript.rules,

    //   // Original rules from .import.eslintrc.json
    //   // Kept 'import/' prefix for now, may need adjustment to 'import-x/'
    //   'import-x/newline-after-import': 'error',
    //   'import-x/first': 'error',
    //   'import-x/no-cycle': 'off', // Kept as off
    //   'import-x/no-duplicates': 'error',
    //   'import-x/no-namespace': 'error',
    //   'no-restricted-imports': [
    //     'error',
    //     {
    //       paths: [
    //         {
    //           name: 'antd/lib/select',
    //           importNames: ['DefaultOptionType'],
    //           message:
    //             'Please use `SelectOption` from `@codelab/frontend-abstract-types` instead',
    //         },
    //         // {
    //         //   "name": "change-case-all",
    //         //   "message": "Use string transformation from `@codelab/shared/utils`"
    //         // },
    //         {
    //           name: 'slugify',
    //           message: 'Use string transformation from `@codelab/shared/utils`',
    //         },
    //       ],
    //     },
    //   ],

    //   // Existing rule from .import.config.mjs
    //   'unused-imports/no-unused-imports': process.env.CI ? 'error' : 'off',
    // },
  },
  // Override for *.config.js files
  {
    files: ['*.config.js'],
    rules: {
      // Note: Depending on your TS setup, this might need to be handled differently
      // '/@typescript-eslint/no-require-imports': 'off', // Requires TS plugin setup
    },
  },
]
