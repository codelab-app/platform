import js from '@eslint/js'
import { fixupConfigRules } from '@eslint/compat'
import nx from '@nx/eslint-plugin'
import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    ignores: ['.next/**/*'],
  },
  'plugin:playwright/recommended',
  'plugin:playwright/jest-playwright',
  'plugin:playwright/playwright-test',
]
