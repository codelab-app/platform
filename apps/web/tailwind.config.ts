import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import path from 'path'
import type { Config } from 'tailwindcss'
// eslint-disable-next-line @nx/enforce-module-boundaries
import rootTailwindConfig from './../../scripts/tailwind/tailwind.config'

const resolveWorkspaceAbsolutePath = (pattern: string) =>
  path.resolve(__dirname, '../../', pattern)

const config: Config = {
  content: [
    resolveWorkspaceAbsolutePath(
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
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
