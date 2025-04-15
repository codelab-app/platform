import { Tree, ProjectConfiguration } from '@nx/devkit'

// Import the functions from the separate files
import { createNonbuildableProjectPackageJson } from './create-nonbuildable-project-package-json'
import { updateProjectTsconfig } from './update-project-tsconfig'
import { updateAppDependencies } from './update-app-dependencies'

// Re-export the functions
export { createNonbuildableProjectPackageJson } from './create-nonbuildable-project-package-json'
export { updateProjectTsconfig } from './update-project-tsconfig'
export { getProjectDependencies } from './get-project-dependencies'
export { updateAppDependencies } from './update-app-dependencies'

/**
 * Migrates a project to use TypeScript project references
 */
export const migrateProjectReference = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log(
    `Migrating ${projectConfig.name} to use TypeScript project references`,
  )

  // Step 1: Create package.json for the project (non-buildable only)
  createNonbuildableProjectPackageJson(tree, projectConfig)

  // Step 2: Update TypeScript configuration
  await updateProjectTsconfig(tree, projectConfig)

  // Step 3: Update app dependencies
  updateAppDependencies(tree, projectConfig)

  console.log(`Completed migration for ${projectConfig.name}`)
}
