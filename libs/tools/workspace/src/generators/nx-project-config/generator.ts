import type { Tree } from '@nx/devkit'

import {
  formatFiles,
  getProjects,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'

import type { EslintGeneratorSchema } from './schema'

import { updateTestTargets } from './jest/remove-test-targets'
import { addProjectTags } from './project-tags/add-project-tags'

/**
 * Go through all projects and update the `lint` setting of `project.json`
 */
export const nxProjectConfigGenerator = async (
  tree: Tree,
  options: EslintGeneratorSchema,
) => {
  const projects = getProjects(tree)
  const projectNames = projects.keys()

  for (const projectName of projectNames) {
    const projectConfig = readProjectConfiguration(tree, projectName)

    console.log(`Checking for ${projectConfig.name}...`)
    console.log('-----------------')

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
    addProjectTags(tree, projectConfig)
    updateTestTargets(tree, projectConfig)

    // updateBaseTsconfig(tree, projectConfig)
    // updateLibraryTsconfig(tree, projectConfig)

    updateProjectConfiguration(tree, projectName, projectConfig)
  }

  await formatFiles(tree)
}

export default nxProjectConfigGenerator
