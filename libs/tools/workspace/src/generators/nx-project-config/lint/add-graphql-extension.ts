import type { ProjectConfiguration, Tree } from '@nx/devkit'
import set from 'lodash/set'
import { join } from 'path'

/**
 * Add `.graphql` to lintFilePatterns
 */
export const addGraphqlExtension = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log('Adding GraphQL extensions...')

  const lintFilePatterns = [
    join(projectConfig.root, '/**/*.{ts,tsx,js,jsx,graphql}'),
  ]

  set(projectConfig, 'targets.lint.options.lintFilePatterns', lintFilePatterns)
}
