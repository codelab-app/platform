import type { Tree } from '@nx/devkit'

import type { MigrateProjectReferenceGeneratorSchema } from './schema'

import { processAllProjects } from '../utils/process-all-projects'
import { migrateProjectReference } from './index'

/**
 * Generator to migrate all projects to use TypeScript project references
 */
export const migrateProjectReferenceGenerator = async (
  tree: Tree,
  _options: MigrateProjectReferenceGeneratorSchema,
) => {
  console.log('Starting migration for all projects in the workspace...')

  await processAllProjects(tree, async (_, _projectName, projectConfig) => {
    await migrateProjectReference(tree, projectConfig)
  })

  console.log('\nMigration completed for all projects in the workspace!')
}

export default migrateProjectReferenceGenerator
