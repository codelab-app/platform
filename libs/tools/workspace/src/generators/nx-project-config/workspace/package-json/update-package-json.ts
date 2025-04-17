import {
  joinPathFragments,
  type ProjectConfiguration,
  type Tree,
} from '@nx/devkit'

import { setExports } from './exports/set-exports'

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

  setExports(tree, projectConfig)
}
