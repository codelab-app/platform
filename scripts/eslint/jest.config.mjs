// Jest rules configuration - using plugins from the foundation file
// NO PLUGIN REGISTRATION HERE - plugins are registered only in eslint.config.mjs
import { plugins } from './base.config.mjs'

export default [
  {
    // Applies Jest globals to all files covered by this config
    // If you only want globals in spec files, move this into the object below
    languageOptions: {
      globals: {
        ...plugins.globals.jest,
      },
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'], // Target spec files
    // No plugins property - plugins are registered only in eslint.config.mjs
    rules: {
      ...plugins.jest.configs.recommended.rules, // Apply Jest recommended rules
      ...plugins.jestFormatting.configs.strict.rules, // Apply Jest Formatting strict rules
      'import/no-unresolved': 'error', // Ensure imports can be resolved
      'import/named': 'error', // Ensure named imports correspond to named exports
      // Add any other specific rules for Jest files here
    },
  },
]
