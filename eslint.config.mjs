import baseConfig from './scripts/eslint/base.config.mjs'
import importConfig from './scripts/eslint/import.config.mjs'
import codelabConfig from './scripts/eslint/codelab.config.mjs'
import codegenConfig from './scripts/eslint/codegen.config.mjs'
import globalsConfig from './scripts/eslint/globals.config.mjs'
import jestConfig from './scripts/eslint/jest.config.mjs'
import namingConfig from './scripts/eslint/naming.config.mjs'
import nxRulesConfig from './scripts/eslint/nx.config.mjs'
import reactConfig from './scripts/eslint/react.config.mjs'
import sortingConfig from './scripts/eslint/sorting.config.mjs'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import tseslint from 'typescript-eslint'
import nx from '@nx/eslint-plugin'
import eslint from '@eslint/js'
import pluginImportX from 'eslint-plugin-import-x'
import unusedImports from './scripts/eslint/recommended/unused.config.mjs'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  // Global language options and parser configuration
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.lib.json',
      },
      globals: {
        // Add global variables if needed, e.g.:
      },
    },
    // Register all plugins once at the top level
    plugins: {
      // React & UI Plugins
      // react: plugins.react,
      // tailwindcss: plugins.tailwindcss,
      // 'readable-tailwind': plugins.readableTailwind,
      // // Testing Plugins
      // jest: plugins.jest,
      // 'jest-formatting': plugins.jestFormatting,
      // // Code Style Plugins
      // ban: plugins.ban,
      // 'sort-destructure-keys': plugins.sortDestructureKeys,
      // 'prefer-arrow': plugins.preferArrow,
    },
  },

  // Spread the imported flat config arrays (rules only, no plugin registration)
  ...baseConfig,
  ...globalsConfig,
  ...nxRulesConfig,
  ...jestConfig,
  ...namingConfig,
  ...codelabConfig,
  ...sortingConfig,
  ...codegenConfig,
  ...reactConfig,
  ...importConfig,

  prettierRecommended,
  ...unusedImports,

  // pluginImportX.flatConfigs.recommended,
  // pluginImportX.flatConfigs.typescript,

  tseslint.configs.strict,

  // https://typescript-eslint.io/getting-started
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // stylisticTs.configs.all,

  // Nx plugin recommended configs - using plugins from the foundation file
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // Global ignores
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '**/node_modules',
      '**/data',
      '**/.next',
      '**/.cache',
      '**/coverage',
      '**/tmp',
      '**/.nx',
      '**/.aider*',
      '**/public',
      '**/*.png',
      '**/*.d.ts',
      '**/*.mp4',
      '**/*.log',
      '**/*.gen.ts',
      '**/jest.config.ts',
      '**/graphql.ts',
    ],
  },

  // Original module boundary rule (kept separate for clarity)
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          // Allow config files explicitly
          allow: ['^.*/eslint.*\\.config\\.[cm]?js$'],
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
)
