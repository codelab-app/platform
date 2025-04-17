import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { convertToPackageName } from '../path-alias/package-name'
import { updateProjectImports } from './project-imports'

/**
 * Change all the import paths a project uses
 */
export const migrateProjectImports = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  updateProjectImports(tree, projectConfig, (importPath) => {
    const transformedPath = convertToPackageName(importPath)

    return transformedPath
  })
}
