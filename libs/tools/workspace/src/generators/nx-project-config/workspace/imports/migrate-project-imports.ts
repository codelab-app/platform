import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { getPackageNameFromProjectName } from '../path-alias/path-alias'
import { updateProjectImports } from './project-imports'

/**
 * Change all the import paths a project uses
 */
export const migrateProjectImports = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  updateProjectImports(tree, projectConfig, (importPath) => {
    const transformedPath = getPackageNameFromProjectName(importPath)

    return transformedPath
  })
}
