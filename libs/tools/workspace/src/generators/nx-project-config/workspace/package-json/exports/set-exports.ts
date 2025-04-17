import {
  joinPathFragments,
  type ProjectConfiguration,
  readJson,
  type Tree,
} from '@nx/devkit'

import { getProjectImports } from '../../imports/project-imports'
import {
  getPackageNameFromOldAlias,
  getPackageNameFromProjectName,
} from '../../path-alias/path-alias'
import { getBaseImportPaths } from '../paths'
import { setPackageJsonExports } from '../setter/package-exports'
import { getRelativeExports } from './relative-exports'

export const setExports = (tree: Tree, projectConfig: ProjectConfiguration) => {
  const projectName = projectConfig.name

  console.log(`Setting exports for ${projectName}`)

  if (!projectName) {
    throw new Error('Project name is required')
  }

  const allImports = getProjectImports(tree, projectConfig).map((importPath) =>
    getPackageNameFromOldAlias(importPath),
  )

  const baseImportPaths = getBaseImportPaths(allImports)
  const packageName = getPackageNameFromProjectName(projectName)

  const relativeExports = getRelativeExports(
    allImports,
    baseImportPaths,
    packageName,
  )

  const packageJson = readJson(
    tree,
    joinPathFragments(projectConfig.root, 'package.json'),
  )

  setPackageJsonExports(packageJson, relativeExports)
}
