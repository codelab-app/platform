import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { join } from 'path'

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

  if (!projectConfig.targets) {
    projectConfig.targets = {}
  }

  if (!projectConfig.targets.lint) {
    projectConfig.targets.lint = { options: {} }
  }

  if (!projectConfig.targets.lint.options) {
    projectConfig.targets.lint.options = {}
  }

  projectConfig.targets.lint.options.lintFilePatterns = lintFilePatterns
}
