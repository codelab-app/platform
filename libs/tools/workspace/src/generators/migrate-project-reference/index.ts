import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { createNonbuildablePackageJson } from '../nx-project-config/workspace/package-json/create-nonbuildable-package-json'
import { updatePackageJson } from '../nx-project-config/workspace/package-json/update-package-json'
// Import the functions from the separate files
import { updateProjectTsconfig } from './update-project-tsconfig'

// Re-export the functions
export { getProjectDependencies } from './get-project-dependencies'
export { updateProjectTsconfig } from './update-project-tsconfig'

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
  createNonbuildablePackageJson(tree, projectConfig)

  // Step 2: Update package.json
  updatePackageJson(tree, projectConfig)

  // Step 3: Update TypeScript configuration
  updateProjectTsconfig(tree, projectConfig)

  console.log(`Completed migration for ${projectConfig.name}`)
}
