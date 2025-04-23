import {
  joinPathFragments,
  type ProjectConfiguration,
  readJson,
  type Tree,
} from '@nx/devkit'

import { writeToPackageJson } from './create-nonbuildable-package-json'
import { setPackageJsonExports, sortExports } from './exports/set-exports'

export const updatePackageJson = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const projectName = projectConfig.name

  console.log(`Updating package.json for ${projectName}`)

  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')

  console.log(`Checking if path exists: ${packageJsonPath}`)

  if (!tree.exists(packageJsonPath)) {
    console.log(`Package.json not found for ${projectName}`)

    return
  }

  setPackageJsonExports(tree, projectConfig)
  // sortExports(tree, projectConfig)

  // const packageJson = readJson(
  //   tree,
  //   joinPathFragments(projectConfig.root, 'package.json'),
  // )

  // writeToPackageJson(tree, projectConfig.root, packageJson)
}
