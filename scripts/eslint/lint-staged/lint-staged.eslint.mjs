import baseConfig from '../../../eslint.config.mjs'
import unusedImports from 'eslint-plugin-unused-imports'

// Lint-staged specific config that includes unused-imports plugin
// and disables rules that require project-specific context
export default [
  ...baseConfig,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Enable unused imports checking for lint-staged
      'unused-imports/no-unused-imports': 'error',

      // Disable rules that require project-specific context
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/named': 'off',
      'import-x/namespace': 'off',
      'import-x/default': 'off',
      'import-x/export': 'off',
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      '@nx/enforce-module-boundaries': 'off',
    },
  },
]
