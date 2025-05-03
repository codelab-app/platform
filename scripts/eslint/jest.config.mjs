import jestPlugin from 'eslint-plugin-jest'
import jestFormattingPlugin from 'eslint-plugin-jest-formatting'
import globals from 'globals'

export default [
  {
    // Applies Jest globals to all files covered by this config
    // If you only want globals in spec files, move this into the object below
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'], // Target spec files
    // No plugins property - plugins are registered only in eslint.config.mjs
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...jestFormattingPlugin.configs.strict.rules,
      'import/no-unresolved': 'error', // Ensure imports can be resolved
      'import/named': 'error', // Ensure named imports correspond to named exports
      // Add any other specific rules for Jest files here
    },
  },
]
