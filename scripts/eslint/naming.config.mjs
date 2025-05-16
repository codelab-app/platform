import pluginReact from 'eslint-plugin-react'
import pluginUnicorn from 'eslint-plugin-unicorn'
import tsPlugin from '@typescript-eslint/eslint-plugin'

/**
 * ESLint configuration for naming conventions and related rules.
 */
export default [
  {
    // This block had empty rules in the original config.
    // It can be a base or placeholder for future general naming rules.
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {},
  },
  {
    files: ['*.tsx'],
    plugins: {
      react: pluginReact,
      unicorn: pluginUnicorn,
    },
    rules: {
      'react/display-name': 'error',
      'unicorn/filename-case': [
        'error',
        {
          case: 'pascalCase',
          ignore: [
            '.*\\.hook(\\.spec)?\\.tsx?$',
            '.*\\.spec\\.tsx?$',
            '^preview\\.tsx',
            '^_app\\.tsx',
            '^_document\\.tsx',
          ],
        },
      ],
    },
  },
  {
    files: ['*.hook.tsx?'], // Matches *.hook.ts and *.hook.tsx
    plugins: {
      unicorn: pluginUnicorn,
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
        },
      ],
    },
  },
  {
    files: ['*.ts'],
    plugins: {
      unicorn: pluginUnicorn,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: false,
            pascalCase: false,
            kebabCase: true,
          },
          ignore: ['.*\\.hook(\\.spec)?\\.tsx?$'],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['typeProperty'],
          format: ['camelCase', 'PascalCase'],
          filter: {
            regex: '^data-',
            match: false,
          },
          leadingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: ['parameter', 'variable'],
          format: ['camelCase'],
          filter: {
            regex: 'DTO',
            match: true,
          },
          custom: {
            regex: 'Dto',
            match: true,
          },
        },
      ],
    },
  },
]
