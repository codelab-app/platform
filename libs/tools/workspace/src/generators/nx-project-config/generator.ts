import type { Tree } from '@nx/devkit'
import {
  formatFiles,
  getProjects,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'
import { addProjectTags } from './project-tags/add-project-tags'
import type { EslintGeneratorSchema } from './schema'
import { updateTestConfig } from './test/project-json'
import { updateBaseTsconfig } from './tsconfig/tsconfig.base'
import { updateLibraryTsconfig } from './tsconfig/tsconfig.lib'

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

    /**
     * Modifies projectConfig here
     */
    // addCiLintConfig(tree, projectConfig)
    // removeCiLintConfig(tree, projectConfig)

    /**
     * Add the lint pattern to nx.json instead
     */
    // addGraphqlEslintConfig(tree, projectConfig)
    // addGraphqlExtension(tree, projectConfig)

    updateTestConfig(tree, projectConfig)
    addProjectTags(tree, projectConfig)

    updateBaseTsconfig(tree, projectConfig)
    updateLibraryTsconfig(tree, projectConfig)

    updateProjectConfiguration(tree, projectName, projectConfig)
  }

  // const projectRoot = `libs/${options.name}`
  // addProjectConfiguration(tree, options.name, {
  //   projectType: 'library',
  //   root: projectRoot,
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {},
  // })
  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options)

  await formatFiles(tree)
}

export default nxProjectConfigGenerator
