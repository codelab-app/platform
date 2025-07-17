import baseConfig from '../../eslint.config.mjs'
import nextConfig from '../../scripts/eslint/next.config.mjs'
import tseslint from 'typescript-eslint'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  // Ignores must come first to prevent scanning these directories
  {
    ignores: ['**/.next/**', '**/node_modules/**', '**/dist/**', '.next', 'node_modules', 'dist', 'jest.config.ts'],
  },
  ...baseConfig,
  ...nextConfig,
  // Disable type checking for JavaScript files and jest.config.ts
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs', 'jest.config.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
  // Enable type checking for TypeScript files in this app
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.storybook.json', './tsconfig.spec.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
)