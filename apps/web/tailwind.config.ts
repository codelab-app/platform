import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import type { Config } from 'tailwindcss'

import path, { join } from 'path'
// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from '../../tailwind.config'

const resolveWorkspaceAbsolutePath = (pattern: string) =>
  path.resolve(__dirname, '../../', pattern)

const config: Config = {
  presets: [rootTailwindConfig],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
}

export default config
