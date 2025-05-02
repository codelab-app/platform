// Main ESLint configuration using flat config format
// This is the ONLY file that should register plugins

// Import the foundation file and specific configurations
import { plugins } from './scripts/eslint/base.config.mjs'
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
import prettierConfig from './scripts/eslint/prettier.config.mjs'

// Register all plugins at the root level, making them available to all configs
const allPlugins = {
  // TypeScript & Core Plugins
  '@typescript-eslint': plugins.typescript,
  '@stylistic/ts': plugins.stylisticTs,

  // Import Plugins
  'import-x': plugins.import,
  'unused-imports': plugins.unusedImports,

  // React & UI Plugins
  react: plugins.react,
  tailwindcss: plugins.tailwindcss,
  'readable-tailwind': plugins.readableTailwind,

  // Testing Plugins
  jest: plugins.jest,
  'jest-formatting': plugins.jestFormatting,

  // Code Style Plugins
  ban: plugins.ban,
  'sort-destructure-keys': plugins.sortDestructureKeys,
  'prefer-arrow': plugins.preferArrow,
}

export default plugins.tseslint.config(
  // Global language options and parser configuration
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: plugins.tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    // Register all plugins once at the top level
    plugins: allPlugins,
  },

  // Base recommended configs - using plugins from the foundation file
  plugins.js.configs.recommended,
  ...plugins.tseslint.configs.strict,

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
  ...prettierConfig,

  // Nx plugin recommended configs - using plugins from the foundation file
  ...plugins.nx.configs['flat/base'],
  ...plugins.nx.configs['flat/typescript'],
  ...plugins.nx.configs['flat/javascript'],

  // Global ignores
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
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
