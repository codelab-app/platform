import baseConfig from '../../../eslint.config.mjs'
import tseslint from 'typescript-eslint'
import jsoncParser from 'jsonc-eslint-parser'
import nxPlugin from '@nx/eslint-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  ...baseConfig,
  // Enable type checking for TypeScript files in this library
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.*?.json'],
        tsconfigRootDir: dirname,
      },
    },
  },
  // JSON files configuration
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      '@nx': nxPlugin,
    },
    rules: {
      '@nx/dependency-checks': 'error',
    },
  },
)
