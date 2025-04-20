import type { Tree } from '@nx/devkit'

import { formatFiles, getProjects } from '@nx/devkit'
import { join } from 'path'

import { removeTargetsFromNx } from './migrate-to-inferred'

export interface RemoveTargetsGeneratorSchema {
  skipFormat?: boolean
}

/**
 * Generator to remove 'targets' property from 'nx' object in all package.json files
 * @param tree - The file system tree
 * @param options - Generator options
 */
export const removeTargetsGenerator = async (
  tree: Tree,
  options: RemoveTargetsGeneratorSchema = {},
) => {
  console.log('Removing targets from nx property in package.json files...')
 // Get all projects in the workspace
  const projects = getProjects(tree)
  let processedCount = 0

 / Process each project's package.json
  for (const [projectName, projectConfig] of projects.entries()) {
    const packageJsonPath = join(projectConfig.root, 'package.json')

   (tree.exists(packageJsonPath)) {
      removeTargetsFromNx(tree, packageJsonPath)
      processedCount++
    }
  }

  conso.log(`Processed ${processedCount} package.json files`)

  if (!opons.skipFormat) {
    await formatFiles(tree)
  }
}

export default removeTargetsGenerator

