import unusedImportsPlugin from 'eslint-plugin-unused-imports'
// import preferArrowPlugin from 'eslint-plugin-prefer-arrow'; // Not explicitly used by name in rules, but prefer-arrow/prefer-arrow-functions suggests it.
// @typescript-eslint/eslint-plugin and @nx/eslint-plugin are usually part of other configs,
// but if these specific rules need them explicitly here, they should be imported.

/**
 * ESLint configuration for generated code files (*.gen.ts, *.gen.tsx).
 * These files often have less strict linting requirements.
 */
export default [
  {
    files: ['*.gen.ts', '*.gen.tsx'],
    plugins: {
      'unused-imports': unusedImportsPlugin,
      // 'prefer-arrow': preferArrowPlugin, // If the rule is indeed from this plugin and it needs registration
    },
    rules: {
      'unused-imports/no-unused-imports-ts': 'error',
      'func-style': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/member-ordering': 'off',
      'prefer-arrow/prefer-arrow-functions': 'off', // Assuming this is from eslint-plugin-prefer-arrow
      '@nx/enforce-module-boundaries': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
]
