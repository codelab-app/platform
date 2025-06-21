import type { Tree } from '@nx/devkit'

import { processAllProjects } from '../utils/process-all-projects'
import { migrateProjectReference } from './index'
import type { MigrateProjectReferenceGeneratorSchema } from './schema'

/**
 * Generator to migrate all projects to use TypeScript project references
 */
export const migrateProjectReferenceGenerator = async (
  tree: Tree,
  _options: MigrateProjectReferenceGeneratorSchema,
) => {
  console.log('Starting migration for all projects in the workspace...')

  await processAllProjects(tree, async (tree, _projectName, projectConfig) => {
    await migrateProjectReference(tree, projectConfig)
  })

  console.log('\nMigration completed for all projects in the workspace!')
}

export default migrateProjectReferenceGenerator
