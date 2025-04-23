import type { Tree } from '@nx/devkit'

import {
  formatFiles,
  getProjects,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'

import type { ProjectConfigGeneratorSchema } from './schema'

import { processProjects } from '../utils/process-projects'
import { updateTestTargets } from './jest/remove-test-targets'
import { migrateProjectReference } from './migrate-project-reference'
import { migrateToInferred } from './migrate-to-inferred/migrate-to-inferred'
import { addProjectTags } from './project-tags/add-project-tags'
import { updateBaseTsconfig } from './tsconfig/base/tsconfig.base'
import { copyLibTsconfigToTsconfig } from './tsconfig/copy-options'
import { updateLibraryTsconfig } from './tsconfig/lib/tsconfig.lib'
import { createAliasMapping, saveAliasMappingToFile } from './utils/workspace'
import { updatePackageJson } from './workspace/package-json/update-package-json'

/**
 * Factory function to generate a list of available projects for the x-prompt
 * @returns An array of project choices for the dropdown
 * //
 */
export const nxProjectConfigGenerator = async (
  tree: Tree,
  options: ProjectConfigGeneratorSchema,
) => {
  await processProjects(tree, options, async (projectConfig) => {
    // Migrate project to use TypeScript project references
    if (options.migrateToProjectReferences) {
      await migrateProjectReference(tree, projectConfig)
    } else if (options.migrateToInferred) {
      await migrateToInferred(tree, projectConfig)
    } else {
      addProjectTags(tree, projectConfig)
      updateTestTargets(tree, projectConfig)

      // updateBaseTsconfig(tree, projectConfig)
      // updateLibraryTsconfig(tree, projectConfig)
      if (projectConfig.projectType !== 'application') {
        copyLibTsconfigToTsconfig(tree, projectConfig)
      }
    }

    updatePackageJson(tree, projectConfig)

    // updateProjectConfiguration(tree, projectName, projectConfig)
  })
}

export default nxProjectConfigGenerator
