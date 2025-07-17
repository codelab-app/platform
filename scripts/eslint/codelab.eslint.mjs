// Assuming your custom plugin is correctly installed/linked
// You might need to adjust the import path if it's local
import codelabPlugin from '@codelab/eslint-plugin'

/**
 * ESLint configuration for Codelab specific rules.
 */
export default [
  {
    files: ['*.ts', '*.tsx'],
    plugins: {
      '@codelab': codelabPlugin, // Register the custom plugin
    },
    rules: {
      // '@codelab/domain-layer-constraint': 'error', // This rule was commented out in the original config
      '@codelab/ant-design-icon-import': 'error',
      '@codelab/typebox-schema-naming': 'error',
    },
  },
]
