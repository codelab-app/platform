import type { ProjectConfiguration, Tree } from '@nx/devkit'
import type { PackageJson } from 'type-fest'

import { joinPathFragments, writeJson } from '@nx/devkit'

/**
 * Creates package.json files for non-buildable projects
 */
export const createNonbuildableProjectPackageJson = (
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

  // Create the package.json content for non-buildable library
  const packageJson: Partial<PackageJson> = {
    exports: {
      '.': {
        default: './src/index.ts',
        import: './src/index.ts',
        types: './src/index.ts',
      },
    },
    name: projectName,
  }

  // Write the package.json file
  writeJson(tree, packageJsonPath, packageJson)

  console.log(`Created package.json for ${projectName}`)
}
