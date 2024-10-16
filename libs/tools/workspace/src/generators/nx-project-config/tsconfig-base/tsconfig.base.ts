import type { ProjectConfiguration, Tree } from '@nx/devkit'

import {
  generateReferencePathsForLib,
  handleProjectNamePatterns,
} from './orchestrator'

/**
 * Update alias map then run `nx build tools-workspace && pnpm install && nx generate @codelab/tools-workspace:nx-project-config --no-interactive --verbose`
 */
export const updateBaseTsconfig = (
  tree: Tree,
  project: ProjectConfiguration,
): void => {
  const baseTsConfigFile = 'tsconfig.base.json'

  if (!tree.exists(baseTsConfigFile)) {
    console.error(
      'tsconfig.base.json does not exist at the root of your workspace.',
    )

    return
  }

  const projectName = project.name
  const sourceRoot = project.sourceRoot

  if (!projectName || !sourceRoot) {
    console.log('Missing projectName and sourceRoot')

    return
  }

  /**
   * 1. Go through the directory mapping
   */
  handleProjectNamePatterns(project, (patterns) => {
    patterns.forEach((pattern) => {
      generateReferencePathsForLib(tree, project, pattern)
    })
  })
}
