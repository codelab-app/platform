import type { Linter } from '@typescript-eslint/utils/dist/ts-eslint/Linter'

export const recommendedConfig: Linter.Config = {
  extends: ['plugin:barrel-files/recommended'],
  overrides: [
    {
      // Allow top level
      excludedFiles: ['src/use-cases/index.{ts,tsx}'],
      files: ['src/*/index.{ts,tsx}'],
      rules: {
        'barrel-files/avoid-barrel-files': 'off',
        'barrel-files/avoid-re-export-all': 'off',
      },
    },
    {
      // Allow second level for uses-cases
      files: ['src/use-cases/*/index.{ts,tsx}'],
      rules: {
        'barrel-files/avoid-barrel-files': 'off',
        'barrel-files/avoid-re-export-all': 'off',
      },
    },
  ],
  plugins: ['barrel-files'],
  rules: {
    'barrel-files/avoid-barrel-files': [
      'error',
      {
        amountOfExportsToConsiderModuleAsBarrel: 1,
      },
    ],
  },
}
