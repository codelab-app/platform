import type { ProjectConfiguration, Tree } from '@nx/devkit'

import {
  getPackageNameFromOldAlias,
  getPackageNameFromProjectName,
} from '../path-alias/path-alias'
import { updateProjectImports } from './project-imports'

/**
 * Change all the import paths a project uses
 */
export const migrateProjectImports = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  updateProjectImports(tree, projectConfig, (importPath) => {
    const transformedPath = getPackageNameFromOldAlias(importPath)

    return transformedPath
  })
}
