import {
  Tree,
  ProjectConfiguration,
  getProjects,
  readJson,
  writeJson,
  joinPathFragments,
} from '@nx/devkit'

/**
 * Updates the app to include dependencies to libraries
 */
export const updateAppDependencies = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  // Only update for app projects (not libraries)
  if (projectConfig.projectType !== 'application') {
    return
  }

  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json')
  if (!tree.exists(packageJsonPath)) {
    return
  }

  console.log(`Updating dependencies in ${packageJsonPath}`)

  const packageJson = readJson(tree, packageJsonPath)

  // Ensure devDependencies exists
  packageJson.devDependencies = packageJson.devDependencies || {}

  // Add workspace libraries as devDependencies with * version
  const projects = getProjects(tree)

  for (const [projectName, project] of projects.entries()) {
    // Skip applications and the current project
    if (
      project.projectType === 'application' ||
      projectName === projectConfig.name
    ) {
      continue
    }

    // Add the library to devDependencies
    packageJson.devDependencies[projectName] = '*'
  }

  writeJson(tree, packageJsonPath, packageJson)
  console.log(`Updated dependencies in ${packageJsonPath}`)
}
