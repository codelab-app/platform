import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import path from 'path'
import type { Config } from 'tailwindcss'
// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from '../../scripts/tailwind/tailwind.config'

const config: Config = {
  content: [
    path.join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  resets: [rootTailwindConfig],
}

export default config
