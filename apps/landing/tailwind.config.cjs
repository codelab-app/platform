import tailwindConfig from '../../scripts/tailwind/tailwind.config.ts/index.js'
import { join } from 'path'
import { createGlobPatternsForDependencies } from '@nx/react/tailwind'

module.exports = {
  ...tailwindConfig,
  content: [
    join(__dirname, '{src,pages}/**/*.{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}
