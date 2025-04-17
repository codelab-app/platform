import type { ProjectConfiguration, Tree } from '@nx/devkit'
import type { PackageJson } from 'type-fest'

import { joinPathFragments, readJson, writeJson } from '@nx/devkit'

import { getProjectImports } from '../imports/project-imports'
import { getBaseImportPaths, getRelativeExports } from './paths'
import { setDevDependencies } from './setter/package-dev-dependencies'
import { setPackageJsonExports } from './setter/package-exports'
import { setPackageJsonName } from './setter/package-name'

/**
 * Writes the package.json object to the specified path within the project root.
 */
const writeToPackageJson = (
  tree: Tree,
  projectRoot: string,
  packageJson: PackageJson,
) => {
  const packageJsonPath = joinPathFragments(projectRoot, 'package.json')

  console.log(`Writing updated package.json to ${packageJsonPath}`)
  writeJson(tree, packageJsonPath, packageJson)
}

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

  // Read existing or create new package.json
  const packageJson: PackageJson = {}

  setPackageJsonName(packageJson, projectName)

  const allImports = getProjectImports(tree, projectConfig)

  console.log(
    `Found ${allImports.length} potential @codelab imports in ${projectName}`,
  )

  const baseImportPaths = getBaseImportPaths(allImports)

  console.log(
    `Found ${baseImportPaths.length} unique base @codelab dependencies to add.`,
  )

  const relativeExports = getRelativeExports(allImports, baseImportPaths)

  console.log(
    'Generated Exports Map:',
    JSON.stringify(relativeExports, null, 2),
  )

  setPackageJsonExports(packageJson, relativeExports)
  setDevDependencies(packageJson, baseImportPaths)

  writeToPackageJson(tree, projectConfig.root, packageJson)
}
