import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { readJson, writeJson } from '@nx/devkit'
import { join } from 'path'
import { sortBy } from 'remeda'

/**
 * Migrates project configuration specifics (name, projectType, sourceRoot, tags)
 * from project.json to the 'nx' property within package.json for inferred configuration.
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

  packageJson.nx = {
    name: projectConfig.name,
    projectType: projectConfig.projectType,
    sourceRoot: projectConfig.sourceRoot,
    tags: projectConfig.tags ?? [],
  }

  writeJson(tree, packageJsonPath, packageJson)

  // Delete the original project.json file
  const projectJsonPath = join(projectConfig.root, 'project.json')

  if (tree.exists(projectJsonPath)) {
    tree.delete(projectJsonPath)
    console.log(`Deleted original project.json for ${projectConfig.name}`)
  } else {
    console.warn(
      `Could not find project.json to delete for ${projectConfig.name} at ${projectJsonPath}`,
    )
  }

  console.log(
    `Migrated nx configuration to package.json for ${projectConfig.name}`,
  )
}
