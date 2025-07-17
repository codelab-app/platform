import typescriptConfig from './scripts/eslint/typescript.eslint.mjs'
import canonical from './scripts/eslint/recommended/canonical.eslint.mjs'
import prettierConfig from './scripts/eslint/prettier.eslint.mjs'
import nxConfig from './scripts/eslint/nx.eslint.mjs'
import importConfig from './scripts/eslint/import.eslint.mjs'
import jestEslintConfig from './scripts/eslint/jest.eslint.mjs'
import globalsEslintConfig from './scripts/eslint/globals.eslint.mjs'
import formatConfig from './scripts/eslint/format.eslint.mjs'
import namingConfig from './scripts/eslint/naming.eslint.mjs'
import codelabConfig from './scripts/eslint/codelab.eslint.mjs'
import sortingConfig from './scripts/eslint/sorting.eslint.mjs'
import codegenConfig from './scripts/eslint/codegen.eslint.mjs'
import reactConfig from './scripts/eslint/react.eslint.mjs'
import baseConfig from './scripts/eslint/base.eslint.mjs'
import tailwindConfig from './scripts/eslint/recommended/tailwind.eslint.mjs'

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
  ...baseConfig,
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