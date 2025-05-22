import pluginJest from 'eslint-plugin-jest'
import pluginJestFormatting from 'eslint-plugin-jest-formatting'

/**
 * ESLint configuration for Jest test files.
 * Applies recommended rules from Jest and Jest-formatting plugins,
 * along with custom import rules.
 */
export default [
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    plugins: {
      jest: pluginJest,
      'jest-formatting': pluginJestFormatting,
    },
    rules: {
      // Base rules from eslint-plugin-jest recommended config
      ...pluginJest.configs.recommended.rules,
      // Base rules from eslint-plugin-jest-formatting strict config
      ...pluginJestFormatting.configs.strict.rules,

      // Custom rules for Jest files from your original config
      'import/no-unresolved': 'error',
      'import/named': 'error',
    },
  },
]
