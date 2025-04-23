import type { PackageJson } from 'type-fest'

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
import { getRelativeExports } from './relative-exports'

/**
 * Sorts the third level properties in exports to follow the order: import, types, default
 */
export const sortExports = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const projectName = projectConfig.name
  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')

  console.log(`Sorting exports for ${projectName}`)

  if (!tree.exists(packageJsonPath)) {
    console.log(`Package.json not found for ${projectName}`)

    return
  }

  const packageJson = readJson(tree, packageJsonPath)
  // Process each second-level key (e.g., ".", "./components")
  const exports = packageJson.exports

  // Check if exports exists before processing
  if (!exports) {
    console.log(`No exports found for ${projectName}`)

    return
  }

  // Create a new sorted exports object
  const sortedExports: PackageJson['exports'] = {}

  Object.keys(exports).forEach((exportKey) => {
    const exportObj = exports[exportKey]

    if (typeof exportObj === 'object' && exportObj !== null) {
      // Create a new object with the desired order
      sortedExports[exportKey] = {
        ...(exportObj.import && { import: exportObj.import }),
        ...(exportObj.types && { types: exportObj.types }),
        ...(exportObj.default && { default: exportObj.default }),
      }
    } else {
      // If it's not an object, keep it as is
      sortedExports[exportKey] = exportObj
    }
  })

  // Replace the original exports with the sorted one
  packageJson.exports = sortedExports

  // Write the updated package.json back to file
  writeJson(tree, packageJsonPath, packageJson)
}

export const setPackageJsonExports = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const projectName = projectConfig.name
  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')

  console.log(`Setting exports for ${projectName}`)

  if (!projectName) {
    throw new Error('Project name is required')
  }

  const packageJson: PackageJson = readJson(tree, packageJsonPath)

  if (!packageJson.name) {
    throw new Error('Package name is required')
  }

  const relativeExports = getRelativeExports(packageJson.name)

  console.log('Adding relative exports', relativeExports)

  const exports = {
    '.': {
      import: './src/index.es.js',
      types: './src/index.d.ts',
      // eslint-disable-next-line canonical/sort-keys
      default: './src/index.es.js',
    },
  }

  packageJson.exports = { ...exports, ...relativeExports }

  console.log('Updated package.json exports field.')
  // sortExports(tree, projectConfig)

  writeJson(tree, packageJsonPath, packageJson)
}
