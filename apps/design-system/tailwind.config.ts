import type { Config } from 'tailwindcss'

import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import { join } from 'path'

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from '../../tailwind.config'

const config: Config = {
  presets: [rootTailwindConfig],
  purge: [
    join(__dirname, '../../libs/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  content: [
    join(__dirname, '../../libs/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}

export default config
