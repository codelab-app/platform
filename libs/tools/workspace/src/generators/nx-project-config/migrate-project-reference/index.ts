import type { ProjectConfiguration, Tree } from '@nx/devkit'

// Import the functions from the separate files
import { createNonbuildablePackageJson } from '../workspace/package-json/create-nonbuildable-package-json'
import { updatePackageDependencies } from '../workspace/package-json/update-package-dependencies'
import { updateProjectTsconfig } from './update-project-tsconfig'

// Re-export the functions
export { createNonbuildablePackageJson } from '../workspace/package-json/create-nonbuildable-package-json'
export { getProjectDependencies } from './get-project-dependencies'
export { updatePackageDependencies } from '../workspace/package-json/update-package-dependencies'
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

  // Step 2: Update app dependencies
  updatePackageDependencies(tree, projectConfig)

  // Step 3: Update TypeScript configuration
  await updateProjectTsconfig(tree, projectConfig)

  console.log(`Completed migration for ${projectConfig.name}`)
}
