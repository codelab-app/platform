import type { ProjectConfiguration, Tree } from '@nx/devkit'

import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
} from '@nx/devkit'

import type { ViteBuildableLibsGeneratorSchema } from './schema'

import { processProjects } from '../../utils/process-projects'
import { setPackageJsonExports } from '../nx-project-config/workspace/package-json/exports/set-exports'
import { migrateToViteLibs } from './migrate-to-vite-libs'
import { updateLibraryTsconfig } from './tsconfig/tsconfig.lib'

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

        await updateLibraryTsconfig(tree, projectConfig)

        // Updates the path to use `es.js`
        await setPackageJsonExports(tree, projectConfig)
      }
    },
  )

  // const filesProjectRoot = joinPathFragments(__dirname, 'files')
  // generateFiles(tree, filesProjectRoot, options.projectRoot, options)
}

export default viteBuildableLibsGenerator
