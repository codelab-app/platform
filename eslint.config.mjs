import typescriptConfig from './scripts/eslint/typescript.eslint.mjs'
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
      // Performance-critical directories - these can contain thousands of files
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/storybook-static/**',
      '**/.nx/**',
      '**/coverage/**',
      '**/.cache/**',

      // Other ignores
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/tmp/**',
      '**/.aider*',
      '**/public/**',
      '**/*.png',
      '**/*.d.ts',
      '**/*.mp4',
      '**/*.log',
      '**/*.gen.ts',
      '**/jest.config.ts',
      '**/graphql.ts',
      '.lintstagedrc.cjs',
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
