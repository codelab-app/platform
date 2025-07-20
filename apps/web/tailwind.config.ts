import type { Config } from 'tailwindcss'

import path from 'path'

// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from '../../tailwind.config'

const resolveWorkspaceAbsolutePath = (pattern: string) =>
  path.resolve(__dirname, '../../', pattern)

const config: Config = {
  content: [
    resolveWorkspaceAbsolutePath(
      '{components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    /**
     * Causes workspace root to resolve to `/Root` and throws `server relative imports are not implemented yet. Please try an import relative to the file you are importing from.`
     *
     * The results of the function are valid, but it seems the function is mutating some workspace root variable that is causing subsequent imports to fail
     */
    // ...createGlobPatternsForDependencies(__dirname),
    resolveWorkspaceAbsolutePath(
      'libs/frontend/**/src/**/*!(*.stories|*.spec).{tsx,ts,jsx,js,html}',
    ),
  ],
  presets: [rootTailwindConfig],
}

export default config
