import type {
  NxJsonConfiguration,
  ProjectConfiguration,
  Tree,
} from '@nx/devkit'

import {
  generateFiles,
  joinPathFragments,
  offsetFromRoot,
  readNxJson,
} from '@nx/devkit'
import { join } from 'path'

export const migrateToViteLibs = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log('Migrating to Vite libs:', projectConfig.name)

  // Cast to include npmScope, handling potential type mismatch
  const nxJson = readNxJson(tree)

  if (!nxJson) {
    throw new Error('nx.json not found')
  }

  const substitutions = {
    // Calculate cacheDir relative to workspace root
    cacheDir: joinPathFragments(
      offsetFromRoot(projectConfig.root),
      'node_modules/.vite',
      projectConfig.root,
    ),
    libName: projectConfig.name,
  }

  // Path to the template files directory
  const templateDir = join(__dirname, 'files')
  // Target directory (project root)
  const targetDir = projectConfig.root

  generateFiles(tree, templateDir, targetDir, substitutions)

  console.log(`Generated Vite config in: ${targetDir}`)
}
