import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { generateFiles, joinPathFragments, offsetFromRoot } from '@nx/devkit'
import { join } from 'path'

import { processLibrary } from '../../utils/process-library'
import { generateSwcFiles } from './swc/swc'
import { generateTsconfigFiles } from './tsconfig/tsconfig'
import { removeViteFiles } from './vite/remove-vite'
import { generateViteFiles } from './vite/vite'

/**
 * Use `swc` instead of `vite` since we don't need bundling or dev server
 */
const reactLibGenerator = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  generateTsconfigFiles(tree, projectConfig)
  generateSwcFiles(tree, projectConfig)

  // generateViteFiles(tree, projectConfig)
  await removeViteFiles(tree, projectConfig)
}

// We want to remove vite files if the project is not a react lib
const notReactLibGenerator = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  await removeViteFiles(tree, projectConfig)
}

// Combine the filter logic directly into the HOC call
export const processReactLib = processLibrary(
  (projectConfig: ProjectConfiguration): boolean => {
    return Boolean(projectConfig.sourceRoot?.startsWith('libs/frontend'))
  },
  reactLibGenerator,
  notReactLibGenerator,
)
