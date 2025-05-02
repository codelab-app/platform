import type { Config } from 'tailwindcss'

import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import path, { join } from 'path'

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from '../../tailwind.config'

const resolveWorkspaceAbsolutePath = (pattern: string) =>
  path.resolve(__dirname, '../../', pattern)

const config: Config = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [rootTailwindConfig],
}

export default config
