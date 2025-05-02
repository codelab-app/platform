import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.mjs'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import path from 'path'
import { fileURLToPath } from 'url'

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default tseslint.config(
  ...baseConfig,
  // Base TypeScript recommended rules
  ...tseslint.configs.recommended,
  // Next.js recommended and core web vitals configurations
  {
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // Example: rule override specific to Next.js
      '@next/next/no-html-link-for-pages': 'off',
      // You might need to configure the React version setting if not detected automatically
      // 'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    // Ensure TS/TSX files are parsed correctly
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.dev.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  // Optional: Add ignores if needed
  {
    ignores: [
      '.next/**',
      'dist/**',
      'node_modules/**',
      // Add other ignored paths here
    ],
  },
  // Specific overrides for JS/JSX files if necessary (e.g., disable TS-only rules)
  {
    files: ['**/*.js', '**/*.jsx'],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      // Add JS/JSX specific rule overrides here
    },
  },
)
