import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { formatFiles, getProjects, readProjectConfiguration } from '@nx/devkit'

/**
 * Process all projects or a specific project if projectName is provided
 * Executes the callback for each valid project
 * @param tree The file system tree
 * @param options Object containing optional projectName and skipFormatting flag
 * @param callback Function to execute for each project with projectConfig parameter
 * @returns Promise that resolves when all projects are processed
 */
export const processEsLibrary = async <
  T extends { projectName?: string; skipFormatting?: boolean },
>(
  tree: Tree,
  options: T,
  callback: (projectConfig: ProjectConfiguration) => Promise<void> | void,
): Promise<void> => {
  const projects = getProjects(tree)

  // If projectName is specified, only process that project
  const projectNames = options.projectName
    ? [options.projectName]
    : [...projects.keys()]

  for (const projectName of projectNames) {
    const projectConfig = readProjectConfiguration(tree, projectName)

    console.log(`Processing ${projectConfig.name}...`)
    console.log('-----------------')

    // Skip special projects
    if (
      projectConfig.name === 'codelab' ||
      projectConfig.sourceRoot?.startsWith('libs/tools') ||
      projectConfig.sourceRoot?.startsWith('libs/external')
    ) {
      console.log('Skipping project:', projectConfig.name)
      continue
    }

    // Execute the callback with the project configuration
    await Promise.resolve(callback(projectConfig))
  }

  // Format files unless explicitly skipped
  if (options.skipFormatting !== true) {
    await formatFiles(tree)
  }
}
