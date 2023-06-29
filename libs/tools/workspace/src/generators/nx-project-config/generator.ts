import type { Tree } from '@nx/devkit'
import { formatFiles, getProjects } from '@nx/devkit'
import type { EslintGeneratorSchema } from './schema'
import { updateProjectConfig } from './update-project-config'

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
    updateProjectConfig(tree, projectName)
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
