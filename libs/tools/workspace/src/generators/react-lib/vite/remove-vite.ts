import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { joinPathFragments } from '@nx/devkit'

export const removeViteFiles = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const viteConfigPath = joinPathFragments(projectConfig.root, 'vite.config.ts')

  // Check if the file exists before attempting to delete
  if (tree.exists(viteConfigPath)) {
    tree.delete(viteConfigPath)
  }
}
