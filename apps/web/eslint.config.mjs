import js from '@eslint/js'
import { fixupConfigRules } from '@eslint/compat'
import nx from '@nx/eslint-plugin'
import baseConfig from '../../eslint.config.mjs'
import nextConfig from '../../scripts/eslint/next.config.mjs'

export default [
  ...baseConfig,
  ...nextConfig,
  {
    ignores: ['.next/**/*'],
  },
]
