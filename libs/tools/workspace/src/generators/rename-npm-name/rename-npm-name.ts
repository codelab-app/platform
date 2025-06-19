import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { processAllProjects } from '../utils/process-all-projects'
import { updateProjectImports } from './imports'
import { getPackageNameFromOldAlias } from './path-alias/path-alias'

const renameNpmName = async (
  tree: Tree,
  projectName: string,
  projectConfig: ProjectConfiguration,
) => {
  console.log(`Renaming npm name for project: ${projectName}`)

  // Update all import paths in the project
  updateProjectImports(tree, projectConfig, (importPath) => {
    const transformedPath = getPackageNameFromOldAlias(importPath)

    return transformedPath
  })
}

const renameNpmNameGenerator = async (tree: Tree) => {
  console.log('Starting npm name rename for all projects...')

  await processAllProjects(tree, renameNpmName)

  console.log('\nNpm name rename completed for all projects!')
}

export default renameNpmNameGenerator
