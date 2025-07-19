import baseConfig from '../../../../../eslint.config.mjs'
import tseslint from 'typescript-eslint'
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
)
