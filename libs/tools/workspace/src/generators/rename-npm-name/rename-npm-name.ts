import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { updateJson } from '@nx/devkit'

import { processAllProjects } from '../utils/process-all-projects'
import { updateProjectImports } from './imports'
import { getPackageNameFromOldAlias } from './path-alias/path-alias'

const renameNpmName = async (
  tree: Tree,
  projectName: string,
  projectConfig: ProjectConfiguration,
) => {
  console.log(`Renaming npm name for project: ${projectName}`)
  console.log(`  Source root: ${projectConfig.sourceRoot}`)

  // Update all import paths in the project
  updateProjectImports(tree, projectConfig, (importPath) => {
    const transformedPath = getPackageNameFromOldAlias(importPath)

    if (transformedPath !== importPath) {
      console.log(`  Transform: ${importPath} -> ${transformedPath}`)
    }

    return transformedPath
  })
}

const updateTsConfigPaths = (tree: Tree) => {
  console.log('\nUpdating tsconfig.base.json paths...')

  updateJson(tree, 'tsconfig.base.json', (json) => {
    const paths = json.compilerOptions?.paths || {}
    const updatedPaths: Record<string, Array<string>> = {}
    let updatedCount = 0

    for (const [oldPath, pathValues] of Object.entries(paths)) {
      const newPath = getPackageNameFromOldAlias(oldPath)

      if (newPath !== oldPath) {
        updatedCount++
        console.log(`  Updating path: ${oldPath} -> ${newPath}`)
      }

      updatedPaths[newPath] = pathValues as Array<string>
    }

    json.compilerOptions.paths = updatedPaths

    console.log(`Updated ${updatedCount} path mappings in tsconfig.base.json`)

    return json
  })
}

const renameNpmNameGenerator = async (tree: Tree) => {
  console.log('Starting npm name rename for all projects...')

  await processAllProjects(tree, renameNpmName)

  // Update tsconfig.base.json paths
  updateTsConfigPaths(tree)

  console.log(
    '\nNpm name rename completed for all projects and tsconfig.base.json!',
  )
}

export default renameNpmNameGenerator
