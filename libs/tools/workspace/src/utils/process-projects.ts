import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { formatFiles, getProjects, readProjectConfiguration } from '@nx/devkit'

// Define the type for a single callback function that operates on a project
type ProjectProcessor = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => Promise<void> | void

// Define the type for a condition function that determines if a project should be processed
export type ProjectCondition = (projectConfig: ProjectConfiguration) => boolean

// Define the type for a pair of condition and its associated callbacks
export type ProjectGenerator = [ProjectCondition, ProjectProcessor]

/**
 * Processes projects based on conditional logic.
 * It iterates through projects and applies the first set of callbacks whose condition is met.
 *
 * @param tree - The file system tree.
 * @param options - Options object, potentially containing projectName and skipFormatting.
 * @param conditionCallback - An array of tuples, each containing a condition function
 *                            and a callback function to execute if the condition is true.
 */
export const processProjects = async <
  T extends { projectName?: string; skipFormatting?: boolean },
>(
  tree: Tree,
  options: T,
  conditionCallback: Array<ProjectGenerator>,
): Promise<void> => {
  const projects = getProjects(tree)

  // Determine which projects to process: specific one or all
  const projectNames = options.projectName
    ? [options.projectName]
    : [...projects.keys()]

  for (const projectName of projectNames) {
    const projectConfig = readProjectConfiguration(tree, projectName)

    console.log(`Processing ${projectName}...`)
    console.log('-----------------')

    // Iterate through the provided condition-callback pairs
    for (const [condition, callback] of conditionCallback) {
      // Check if the current project meets the condition
      if (condition(projectConfig)) {
        console.log(
          `Condition matched for project: ${projectName}. Executing callback...`,
        )

        // Execute the associated callback
        await callback(tree, projectConfig)
      }
    }
  }

  // Format all modified files unless formatting is explicitly skipped
  if (options.skipFormatting !== true) {
    await formatFiles(tree)
  }
}
