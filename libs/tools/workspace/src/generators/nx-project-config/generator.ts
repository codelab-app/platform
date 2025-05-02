import type { Tree } from '@nx/devkit'

import {
  formatFiles,
  getProjects,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'

import type { ProjectConfigGeneratorSchema } from './schema'

/**
 * We want to create
 */
export const nxProjectConfigGenerator = async (
  tree: Tree,
  options: ProjectConfigGeneratorSchema,
) => {
  // await processEsLibrary(tree, options, async (projectConfig) => {
  //   // Migrate project to use TypeScript project references
  //   if (options.migrateToProjectReferences) {
  //     await migrateProjectReference(tree, projectConfig)
  //   } else if (options.migrateToInferred) {
  //     await migrateToInferred(tree, projectConfig)
  //   } else {
  //     addProjectTags(tree, projectConfig)
  //     updateTestTargets(tree, projectConfig)
  //     // updateBaseTsconfig(tree, projectConfig)
  //     // updateLibraryTsconfig(tree, projectConfig)
  //     if (projectConfig.projectType !== 'application') {
  //       copyLibTsconfigToTsconfig(tree, projectConfig)
  //     }
  //   }
  //   updatePackageJson(tree, projectConfig)
  //   // updateProjectConfiguration(tree, projectName, projectConfig)
  // })
}

export default nxProjectConfigGenerator
