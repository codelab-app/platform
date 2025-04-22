import type { ProjectConfiguration, Tree } from '@nx/devkit'
import type { PackageJson } from 'type-fest'

import { joinPathFragments, readJson, writeJson } from '@nx/devkit'

import { getProjectImports } from '../imports/project-imports'
import {
  getPackageNameFromOldAlias,
  getPackageNameFromProjectName,
} from '../path-alias/path-alias'
import { getRelativeExports } from './exports/relative-exports'
import { getBaseImportPaths } from './paths'
import { setDevDependencies } from './setter/package-dev-dependencies'
import { setPackageJsonName } from './setter/package-name'

/**
 * Creates package.json files for non-buildable projects, including dependency analysis
 */
export const createNonbuildablePackageJson = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const projectName = projectConfig.name

  console.log(
    `Creating/Updating package.json for ${projectName} (non-buildable library)`,
  )

  if (!projectName) {
    throw new Error('Project name is required')
  }

  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')

  console.log(`Checking if path exists: ${packageJsonPath}`)

  if (tree.exists(packageJsonPath)) {
    console.log(`Package.json already exists for ${projectName}`)

    return
  }

  const packageJson: PackageJson = {}
  const packageName = getPackageNameFromProjectName(projectName)

  setPackageJsonName(packageJson, projectName)

  // Get transformed imports
  console.log('Getting project imports')

  const allImports = getProjectImports(tree, projectConfig).map((importPath) =>
    getPackageNameFromOldAlias(importPath),
  )

  console.log(
    `Found ${allImports.length} potential @codelab imports in ${projectName}`,
  )

  const baseImportPaths = getBaseImportPaths(allImports)

  console.log(
    `Found ${baseImportPaths.length} unique base @codelab dependencies to add.`,
  )

  // Save import data
  // saveImportData(tree, projectConfig.root, allImports, baseImportPaths)

  const relativeExports = getRelativeExports(packageName)

  console.log(
    'Generated Exports Map:',
    JSON.stringify(relativeExports, null, 2),
  )

  setDevDependencies(packageJson, baseImportPaths)

  writeToPackageJson(tree, projectConfig.root, packageJson)
}

/**
 * Writes the package.json object to the specified path within the project root.
 */
export const writeToPackageJson = (
  tree: Tree,
  projectRoot: string,
  packageJson: PackageJson,
) => {
  const packageJsonPath = joinPathFragments(projectRoot, 'package.json')

  console.log(`Writing updated package.json to ${packageJsonPath}`)
  writeJson(tree, packageJsonPath, packageJson)
}
