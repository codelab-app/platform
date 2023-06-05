import type { Tree } from '@nx/devkit'
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getProjects,
  updateProjectConfiguration,
} from '@nx/devkit'
import * as path from 'path'
import type { EslintGeneratorSchema } from './schema'
import { addCiLintConfig } from './update-project-config'

/**
 * Go through all projects and update the `lint` setting of `project.json`
 */
export const eslintGenerator = async (
  tree: Tree,
  options: EslintGeneratorSchema,
) => {
  const projects = getProjects(tree)
  const projectNames = projects.keys()

  for (const projectName of projectNames) {
    addCiLintConfig(tree, projectName)
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

export default eslintGenerator
