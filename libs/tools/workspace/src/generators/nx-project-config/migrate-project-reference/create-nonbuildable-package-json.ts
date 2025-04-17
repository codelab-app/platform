import type { ProjectConfiguration, Tree } from '@nx/devkit'
import type { PackageJson } from 'type-fest'

import { joinPathFragments, writeJson } from '@nx/devkit'

import {
  getPackageJsonNameFromMapping,
  getPackageJsonNameFromProjectName,
} from './utils'

/**
 * Creates package.json files for non-buildable projects
 */
export const createNonbuildablePackageJson = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  // Skip if project already has a package.json
  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')

  if (tree.exists(packageJsonPath)) {
    console.log(`Project ${projectConfig.name} already has a package.json file`)

    return
  }

  const projectName = projectConfig.name

  console.log(
    `Creating package.json for ${projectName} (non-buildable library)`,
  )

  if (!projectName) {
    throw new Error('Project name is required')
  }

  // Get the npm package name from the mapping
  const packageName = getPackageJsonNameFromMapping(tree, projectName)

  // Create the package.json content for non-buildable library
  const packageJson: Partial<PackageJson> = {
    name: packageName,
    // eslint-disable-next-line canonical/sort-keys
    exports: {
      '.': {
        default: './src/index.ts',
        import: './src/index.ts',
        types: './src/index.ts',
      },
    },
  }

  // Write the package.json file
  writeJson(tree, packageJsonPath, packageJson)

  console.log(`Created package.json for ${projectName}`)
}
