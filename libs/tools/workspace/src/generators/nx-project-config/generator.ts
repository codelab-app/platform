import type { Tree } from '@nx/devkit'

import {
  formatFiles,
  getProjects,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'

import type { ProjectConfigGeneratorSchema } from './schema'

import { updateTestTargets } from './jest/remove-test-targets'
import { migrateProjectReference } from './migrate-project-reference'
import { migrateToInferred } from './migrate-to-inferred/migrate-to-inferred'
import { addProjectTags } from './project-tags/add-project-tags'
import { updateBaseTsconfig } from './tsconfig/base/tsconfig.base'
import { copyLibTsconfigToTsconfig } from './tsconfig/copy-options'
import { updateLibraryTsconfig } from './tsconfig/lib/tsconfig.lib'
import { createAliasMapping, saveAliasMappingToFile } from './utils/workspace'
import { migrateToViteLibs } from './vite-libs/migrate-to-vite-libs'

/**
 * Factory function to generate a list of available projects for the x-prompt
 * @returns An array of project choices for the dropdown
 * //
 */
export const nxProjectConfigGenerator = async (
  tree: Tree,
  options: ProjectConfigGeneratorSchema,
) => {
  const projects = getProjects(tree)

  // If projectName is specified, only process that project
  const projectNames = options.projectName
    ? [options.projectName]
    : [...projects.keys()]

  for (const projectName of projectNames) {
    const projectConfig = readProjectConfiguration(tree, projectName)

    console.log(`Checking for ${projectConfig.name}...`)
    console.log('-----------------')

    if (
      projectConfig.name === 'codelab' ||
      projectConfig.sourceRoot?.startsWith('libs/tools')
    ) {
      console.log('Skipping project:', projectConfig.name)
      continue
    }

    if (projectConfig.sourceRoot?.startsWith('libs/shared/infra')) {
      await migrateToViteLibs(tree, projectConfig)
    }

    /**
     * Modifies projectConfig here
     */
    // addCiLintConfig(tree, projectConfig)
    // removeCiLintConfig(tree, projectConfig)

    /**
     * Migrate use different configuration for `test` target, as opposed to creating separate targets, for better extensibility
     *
     * Downside is creating extra `*.env` files
     */
    // migrateToConfigBasedTest(tree, projectConfig)

    /**
     * Add the lint pattern to nx.json instead
     */
    // addGraphqlEslintConfig(tree, projectConfig)
    // addGraphqlExtension(tree, projectConfig)
    // removeGraphqlEslintConfig(tree, projectConfig)
    // checkLintConfig(tree, projectConfig)

    // updateJestConfig(tree, projectConfig)

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

    // updateProjectConfiguration(tree, projectName, projectConfig)
  }

  await formatFiles(tree)
}

export default nxProjectConfigGenerator
