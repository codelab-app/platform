import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { readJson, writeJson } from '@nx/devkit'
import { join } from 'path'
import { sortBy } from 'remeda'

/**
 * Removes the 'targets' property from the 'nx' object in package.json
 * @param tree - The file system tree.
 * @param packageJsonPath - Path to the package.json file.
 */
export const removeTargetsFromNx = (tree: Tree, packageJsonPath: string) => {
  if (!tree.exists(packageJsonPath)) {
    console.warn(`No package.json found at ${packageJsonPath}`)

    return
  }

  const packageJson = readJson(tree, packageJsonPath)

  if (packageJson.nx && packageJson.nx.targets) {
    // Create a new nx object without the targets property
    const { targets, ...restOfNx } = packageJson.nx

    packageJson.nx = restOfNx

    writeJson(tree, packageJsonPath, packageJson)
    console.log(`Removed 'targets' from nx in ${packageJsonPath}`)
  } else {
    console.log(`No 'targets' found in nx property at ${packageJsonPath}`)
  }
}

/**
 * Migrates project configuration specifics (name, projectType, sourceRoot, tags)
 * from project.json to the 'nx' property within package.json for inferred configuration.
 * Also removes 'targets' property from the 'nx' object if it exists.
 * This function is idempotent and can be safely run multiple times.
 * @param tree - The file system tree.
 * @param projectConfig - The configuration of the project to migrate.
 */
export const migrateToInferred = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log('Migrating to inferred configuration!!!')

  // Ensure project name exists before proceeding
  if (!projectConfig.name) {
    console.warn(
      `Skipping migration for project with missing name at root: ${projectConfig.root}`,
    )

    return
  }

  const packageJsonPath = join(projectConfig.root, 'package.json')

  if (!tree.exists(packageJsonPath)) {
    console.warn(
      `Skipping migration for ${projectConfig.name}: package.json not found at ${packageJsonPath}`,
    )

    return
  }

  const packageJson = readJson(tree, packageJsonPath)

  console.log('packageJson', packageJson)

  // Create or update nx property
  packageJson.nx = packageJson.nx || {}

  // Ensure essential properties are set (but don't overwrite if they exist)
  packageJson.nx.name = packageJson.nx.name || projectConfig.name
  packageJson.nx.projectType =
    packageJson.nx.projectType || projectConfig.projectType
  packageJson.nx.sourceRoot =
    packageJson.nx.sourceRoot || projectConfig.sourceRoot
  packageJson.nx.tags = packageJson.nx.tags || projectConfig.tags || []

  // Remove targets from nx property if it exists
  if (packageJson.nx.targets) {
    const { targets, ...restOfNx } = packageJson.nx

    packageJson.nx = restOfNx
    console.log(`Removed 'targets' from nx in ${packageJsonPath}`)
  }

  writeJson(tree, packageJsonPath, packageJson)

  // Delete the original project.json file if it exists
  const projectJsonPath = join(projectConfig.root, 'project.json')

  if (tree.exists(projectJsonPath)) {
    tree.delete(projectJsonPath)
    console.log(`Deleted original project.json for ${projectConfig.name}`)
  } else {
    console.log(
      `No project.json found for ${projectConfig.name} at ${projectJsonPath} (already migrated)`,
    )
  }

  console.log(
    `Migrated nx configuration to package.json for ${projectConfig.name}`,
  )
}
