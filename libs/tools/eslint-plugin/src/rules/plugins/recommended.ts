import type { Linter } from '@typescript-eslint/utils/dist/ts-eslint/Linter'

export const recommendedConfig: Linter.Config = {
  extends: ['plugin:barrel-files/recommended'],
  overrides: [
    {
      // excludedFiles: ['src/use-cases/index.{ts,tsx}'],
      files: [
        // Allow top level
        'src/*/index.{ts,tsx}',
        // Allow second level for uses-cases
        'src/use-cases/*/index.{ts,tsx}',
        'src/use-cases/*/server/index.{ts,tsx}',
      ],
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
