import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { generateFiles, joinPathFragments, offsetFromRoot } from '@nx/devkit'
import { join } from 'path'

import { processLibrary } from '../../utils/process-library'
import { generateSwcFiles } from './swc/swc'
import { generateTsconfigFiles } from './tsconfig/tsconfig'

/**
 * Use `swc` instead of `vite` since we don't need bundling or dev server
 */
const tsLibGenerator = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  generateTsconfigFiles(tree, projectConfig)
  generateSwcFiles(tree, projectConfig)
}

// Combine the filter logic directly into the HOC call
export const processTsLib = processLibrary(
  (projectConfig: ProjectConfiguration): boolean => {
    return Boolean(projectConfig.sourceRoot?.startsWith('libs/shared'))
  },
  [tsLibGenerator],
)
