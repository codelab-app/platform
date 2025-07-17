import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import nx from '@nx/eslint-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      'data/**',
      '**/.next',
      '**/.cache',
      '**/coverage',
      '**/tmp',
      '**/.nx',
      '.aider*',
      'public/**',
      '**/*.png',
      '**/*.d.ts',
      '**/*.mp4',
      '**/*.log',
      '**/*.gen.ts',
      '**/jest.config.ts',
      '**/graphql.ts',
      '**/storybook-static',
      '**/generated',
      '**/.turbo',
      '.lintstagedrc.js',
      '**/*.config.js',
    ],
  },
  // Base JS config
  js.configs.recommended,
  // Convert existing configs using compat
  ...compat.config({
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['tsconfig.base.json', 'apps/*/tsconfig.json', 'libs/*/tsconfig.json'],
      tsconfigRootDir: __dirname,
    },
    env: {
      browser: true,
      'jest/globals': true,
    },
    globals: {
      JQuery: 'readonly',
      JQueryStatic: 'readonly',
    },
    plugins: [
      'prefer-arrow',
      'canonical',
      'sort-destructure-keys',
      'unicorn',
      '@stylistic/ts',
      'ban',
    ],
    extends: [
      'plugin:canonical/recommended',
      'plugin:@typescript-eslint/strict',
      'eslint:recommended',
      './scripts/eslint/.prettier.eslintrc.json',
      './scripts/eslint/.nx.eslintrc.json',
      './scripts/eslint/.import.eslintrc.js',
      './scripts/eslint/.import.eslintrc.json',
      './scripts/eslint/.jest.eslintrc.json',
      './scripts/eslint/.globals.eslintrc.json',
      './scripts/eslint/.format.eslintrc.json',
      './scripts/eslint/.naming.eslintrc.json',
      './scripts/eslint/.codelab.eslintrc.json',
      './scripts/eslint/.sorting.eslintrc.json',
      './scripts/eslint/.codegen.eslintrc.json',
      './scripts/eslint/.react.eslintrc.json',
      './scripts/eslint/.base.eslintrc.json',
    ],
    settings: {
      tailwindcss: {
        config: './tailwind.config.ts',
      },
      react: {
        version: 'detect',
      },
    },
    overrides: [
      {
        files: '*.json',
        parser: 'jsonc-eslint-parser',
        rules: {},
      },
    ],
  }),
  // Nx plugin config
  {
    plugins: {
      '@nx': nx,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
]