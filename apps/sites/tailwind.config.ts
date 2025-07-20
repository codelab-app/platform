import type { Config } from 'tailwindcss'

import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import path from 'path'

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from '../../tailwind.config'

const config: Config = {
  presets: [rootTailwindConfig],
  content: [
    path.join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}

export default config
