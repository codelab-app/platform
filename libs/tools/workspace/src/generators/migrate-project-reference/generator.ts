import type { Tree } from '@nx/devkit'

import { formatFiles, getProjects } from '@nx/devkit'

import { migrateProjectReference } from './index'
import type { MigrateProjectReferenceGeneratorSchema } from './schema'

/**
 * Generator to migrate all projects to use TypeScript project references
 */
export const migrateProjectReferenceGenerator = async (
  tree: Tree,
  options: MigrateProjectReferenceGeneratorSchema,
) => {
  console.log('Starting migration for all projects in the workspace...')

  // Get all projects in the workspace
  const projects = getProjects(tree)
  const projectNames = Array.from(projects.keys())

  console.log(`Found ${projectNames.length} projects to migrate`)

  // Migrate each project to use TypeScript project references
  for (const projectName of projectNames) {
    const projectConfig = projects.get(projectName)

    if (projectConfig) {
      console.log(`\nMigrating project: ${projectName}`)
      await migrateProjectReference(tree, projectConfig)
    }
  }

  // Format files after all changes
  await formatFiles(tree)

  console.log('\nMigration completed for all projects in the workspace!')
}

export default migrateProjectReferenceGenerator
