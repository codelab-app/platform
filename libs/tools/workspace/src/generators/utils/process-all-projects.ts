import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { formatFiles, getProjects } from '@nx/devkit'

/**
 * Helper function to process all projects in the workspace
 * @param tree - The file system tree
 * @param processProject - Function to process each project
 */
export const processAllProjects = async (
  tree: Tree,
  processProject: (
    tree: Tree,
    projectName: string,
    projectConfig: ProjectConfiguration,
  ) => Promise<void> | void,
) => {
  // Get all projects in the workspace
  const projects = getProjects(tree)
  const projectNames = Array.from(projects.keys())

  console.log(`Found ${projectNames.length} projects to process`)

  // Process each project
  for (const projectName of projectNames) {
    const projectConfig = projects.get(projectName)

    if (projectConfig) {
      console.log(`\nProcessing project: ${projectName}`)
      await processProject(tree, projectName, projectConfig)
    }
  }

  // Format files after all changes
  await formatFiles(tree)
}