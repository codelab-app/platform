import baseConfig from '../../../../eslint.config.mjs'
import reactConfig from '../../../../scripts/eslint/react.eslint.mjs'
import tseslint from 'typescript-eslint'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  ...baseConfig,
  ...reactConfig,
  // Enable type checking for TypeScript files in this library
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.*?.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
)
