import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { generateFiles, joinPathFragments, offsetFromRoot } from '@nx/devkit'
import { join } from 'path'

import { processLibrary } from '../../utils/process-library'
import { generateTsconfigFiles } from './tsconfig/tsconfig'
import { generateViteFiles } from './vite/vite'

const reactLibGenerator = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  generateTsconfigFiles(tree, projectConfig)
  generateViteFiles(tree, projectConfig)
}

// Combine the filter logic directly into the HOC call
export const processReactLib = processLibrary(
  (projectConfig: ProjectConfiguration): boolean => {
    return Boolean(projectConfig.sourceRoot?.startsWith('libs/frontend'))
  },
  reactLibGenerator,
)
