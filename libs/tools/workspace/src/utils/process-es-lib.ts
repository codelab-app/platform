import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { formatFiles, getProjects, readProjectConfiguration } from '@nx/devkit'

import { processLibrary } from './process-library'

const shouldProcessEsProject = (
  projectConfig: ProjectConfiguration,
): boolean => {
  return (
    projectConfig.name !== 'codelab' &&
    !projectConfig.sourceRoot?.startsWith('libs/tools') &&
    !projectConfig.sourceRoot?.startsWith('libs/external')
  )
}

/**
 * Process all ES library projects or a specific project if projectName is provided
 * Executes the callback for each valid project
 * @param tree The file system tree
 * @param options Object containing optional projectName and skipFormatting flag
 * @param callback Function to execute for each project with projectConfig parameter
 * @returns Promise that resolves when all projects are processed
 */
export const processEsLibrary = processLibrary(shouldProcessEsProject, [
  async (tree, projectConfig) => {
    //
  },
])
