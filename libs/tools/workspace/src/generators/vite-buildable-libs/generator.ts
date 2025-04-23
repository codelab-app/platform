import type { ProjectConfiguration, Tree } from '@nx/devkit'

import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
} from '@nx/devkit'

import type { ViteBuildableLibsGeneratorSchema } from './schema'

import { processProjects } from '../utils/process-projects'
import { migrateToViteLibs } from './migrate-to-vite-libs'

export const viteBuildableLibsGenerator = async (
  tree: Tree,
  options: ViteBuildableLibsGeneratorSchema,
) => {
  await processProjects(
    tree,
    options,
    async (projectConfig: ProjectConfiguration) => {
      /**
       * The dependency graph for a lib need to all be buildable, we we might as well make everything in libs buildable.
       */
      if (projectConfig.sourceRoot?.startsWith('libs')) {
        await migrateToViteLibs(tree, projectConfig)
      }
    },
  )

  // const filesProjectRoot = joinPathFragments(__dirname, 'files')
  // generateFiles(tree, filesProjectRoot, options.projectRoot, options)
}

export default viteBuildableLibsGenerator
