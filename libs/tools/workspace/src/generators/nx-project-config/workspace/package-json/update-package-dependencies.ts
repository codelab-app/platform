import type { ProjectConfiguration, Tree } from '@nx/devkit'

import {
  getProjects,
  joinPathFragments,
  readJson,
  readProjectConfiguration,
  visitNotIgnoredFiles,
  writeJson,
} from '@nx/devkit'

import {
  getPackageJsonNameFromMapping,
  getPackageJsonNameFromProjectName,
} from '../../migrate-project-reference/utils'
import { getProjectImports } from '../imports/project-imports'

/**
 * Updates the app to include dependencies to libraries
 */
export const updatePackageDependencies = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log('Updating app dependencies')

  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')

  if (!tree.exists(packageJsonPath)) {
    console.log('No package.json found')

    return
  }

  if (!projectConfig.name) {
    throw new Error('Project name is required')
  }

  console.log(`Analyzing and updating dependencies in ${packageJsonPath}`)

  const packageJson = readJson(tree, packageJsonPath)
  // Here we want to read each file in this library
  const imports = getProjectImports(tree, projectConfig)

  console.log(
    `Found ${imports.length} @codelab imports in ${projectConfig.name}`,
  )
  console.log('Imports:', JSON.stringify(imports, null, 2))

  // Ensure devDependencies exists
  packageJson.devDependencies = packageJson.devDependencies || {}

  writeJson(tree, packageJsonPath, packageJson)
  console.log(`Updated dependencies in ${packageJsonPath}`)
}
