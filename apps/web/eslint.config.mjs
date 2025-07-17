import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import rootConfig from '../../eslint.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  // Import root config
  ...rootConfig,
  // Project-specific ignores
  {
    ignores: ['storybook-static/**', 'jest.config.ts'],
  },
  // Extend Nx React TypeScript and Next.js configs
  ...compat.extends(
    'plugin:@nx/react-typescript',
    'next',
    'next/core-web-vitals',
  ),
  // Project-specific configuration
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.*.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/jsx-no-useless-fragment': 'off',
    },
  },
  // Disable import/named for Sentry config files
  {
    files: ['**/sentry.*.config.js'],
    rules: {
      'import/named': 'off',
    },
  },
]
