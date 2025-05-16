import typescriptConfig from './scripts/eslint/typescript.config.mjs'
import canonical from './scripts/eslint/recommended/canonical.mjs'
import prettierConfig from './scripts/eslint/prettier.eslint.mjs'
import nxConfig from './scripts/eslint/nx.config.mjs'
import importConfig from './scripts/eslint/import.config.mjs'
import jestEslintConfig from './scripts/eslint/jest.eslint.config.mjs'
import globalsEslintConfig from './scripts/eslint/globals.eslint.config.mjs'
import formatConfig from './scripts/eslint/format.config.mjs'
import namingConfig from './scripts/eslint/naming.config.mjs'
import codelabConfig from './scripts/eslint/codelab.config.mjs'
import sortingConfig from './scripts/eslint/sorting.config.mjs'
import codegenConfig from './scripts/eslint/codegen.config.mjs'
import reactConfig from './scripts/eslint/react.config.mjs'
import baseEslintConfig from './scripts/eslint/base.eslint.config.mjs'
import tailwindConfig from './scripts/eslint/recommended/tailwind.config.mjs'

export default [
  ...typescriptConfig,
  ...canonical,
  ...prettierConfig,
  ...nxConfig,
  ...importConfig,
  ...jestEslintConfig,
  ...globalsEslintConfig,
  ...formatConfig,
  ...namingConfig,
  ...codelabConfig,
  ...sortingConfig,
  ...codegenConfig,
  ...reactConfig,
  ...tailwindConfig,
  ...baseEslintConfig,
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      'node_modules',
      'dist',
      '/data',
      '.next',
      '.cache',
      '/coverage',
      '/tmp',
      '/.nx',
      '.aider*',
      'public',
      '*.png',
      '*.d.ts',
      '*.mp4',
      '*.log',
      '**/*.gen.ts',
      'jest.config.ts',
      'graphql.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
]
