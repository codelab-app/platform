import type { Tree } from '@nx/devkit'
import {
  formatFiles,
  getProjects,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'
import { removeGraphqlEslintConfig } from './eslint/remove-graphql-eslint-config'
import { addProjectTags } from './project-tags/add-project-tags'
import type { EslintGeneratorSchema } from './schema'
import { migrateToConfigBasedTest } from './test/remove-test-targets'
import { updateBaseTsconfig } from './tsconfig-base/tsconfig.base'
import { updateLibraryTsconfig } from './tsconfig-lib/tsconfig.lib'

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

    // updateTestConfig(tree, projectConfig)
    addProjectTags(tree, projectConfig)

    // updateBaseTsconfig(tree, projectConfig)
    // updateLibraryTsconfig(tree, projectConfig)

    updateProjectConfiguration(tree, projectName, projectConfig)
  }

  await formatFiles(tree)
}

export default nxProjectConfigGenerator
