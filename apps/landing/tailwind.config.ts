import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import { join } from 'path'
// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from '../../scripts/tailwind/tailwind.config'

module.exports = {
  content: [
    join(__dirname, '{src,pages}/**/*.{ts,tsx,html}'),
    // ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [rootTailwindConfig],
}
