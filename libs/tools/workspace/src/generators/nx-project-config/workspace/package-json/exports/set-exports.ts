import {
  joinPathFragments,
  type ProjectConfiguration,
  readJson,
  type Tree,
  writeJson,
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
  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')

  console.log(`Setting exports for ${projectName}`)

  if (!projectName) {
    throw new Error('Project name is required')
  }

  const packageName = getPackageNameFromProjectName(projectName)
  const relativeExports = getRelativeExports(packageName)
  const packageJson = readJson(tree, packageJsonPath)

  console.log('exports', relativeExports)

  setPackageJsonExports(packageJson, relativeExports)

  writeJson(tree, packageJsonPath, packageJson)
}
