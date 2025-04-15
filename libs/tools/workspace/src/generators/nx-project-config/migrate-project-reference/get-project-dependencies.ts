import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { getProjects } from '@nx/devkit'

/**
 * Helper function to get a project's dependencies
 */
export const getProjectDependencies = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
): Promise<Array<string>> => {
  // Use a simpler approach to find dependencies - just check all projects
  // and add them to the dependencies list if they might be used
  const dependencies: Array<string> = []
  const projects = getProjects(tree)

  // We'll assume for now that all libraries could be dependencies
  // In a real implementation, you would use the project graph to get actual dependencies
  for (const [projectName, project] of projects.entries()) {
    // Skip applications and the current project
    if (
      project.projectType === 'application' ||
      projectName === projectConfig.name
    ) {
      continue
    }

    dependencies.push(project.root)
  }

  return dependencies
}
