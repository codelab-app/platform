import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { formatFiles, getProjects, readProjectConfiguration } from '@nx/devkit'

/**
 * Higher-order function to create project processing functions.
 *
 * @param shouldProcessProject - A callback function that determines if a project should be processed.
 * @returns An async function that processes projects based on the provided logic.
 */
export const processLibrary = <
  T extends { projectName?: string; skipFormatting?: boolean },
>(
  shouldProcessProject: (projectConfig: ProjectConfiguration) => boolean,
  callback: Array<
    (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void> | void
  >,
  // Optional callback to execute if the project should not be processed
  elseCallback?: Array<
    (tree: Tree, projectConfig: ProjectConfiguration) => Promise<void> | void
  >,
) => {
  return async (tree: Tree, options: T): Promise<void> => {
    const projects = getProjects(tree)

    // If projectName is specified, only process that project
    const projectNames = options.projectName
      ? [options.projectName]
      : [...projects.keys()]

    for (const projectName of projectNames) {
      const projectConfig = readProjectConfiguration(tree, projectName)

      console.log(`Processing ${projectConfig.name}...`)
      console.log('-----------------')

      // Check if the project should be processed based on the provided logic
      if (!shouldProcessProject(projectConfig)) {
        console.log('Skipping project:', projectConfig.name)

        if (elseCallback) {
          for (const cb of elseCallback) {
            await Promise.resolve(cb(tree, projectConfig))
          }
        }

        continue
      }

      // Execute the callback(s) with the project configuration
      for (const cb of callback) {
        await Promise.resolve(cb(tree, projectConfig))
      }
    }

    // Format files unless explicitly skipped
    if (options.skipFormatting !== true) {
      await formatFiles(tree)
    }
  }
}
