import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { join } from 'path'
import { setPath } from 'remeda'

/**
 * Add `.graphql` to lintFilePatterns
 */
export const addGraphqlExtension = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.debug('Adding GraphQL extensions...')

  const lintFilePatterns = [
    join(projectConfig.root, '/**/*.{ts,tsx,js,jsx,graphql}'),
  ]

  setPath(
    projectConfig,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ['targets', 'lint', 'options', 'lintFilePatterns'] as any,
    lintFilePatterns,
  )
}
