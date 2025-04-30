import type { ProjectConfiguration, Tree } from '@nx/devkit'

import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
} from '@nx/devkit'

import type { AllLibsGeneratorSchema } from './schema'

import { processEsLibrary } from '../../utils/process-es-lib'
import { setPackageJsonExports } from '../nx-project-config/workspace/package-json/exports/set-exports'
import { processReactLib } from '../react-lib/generator'
import { migrateToViteLibs } from './migrate-to-vite-libs'
import { moveFilesInTsConfig } from './tsconfig/tsconfig.lib'

/**
 * Process all projects in the workspace
 */
export const allLibGenerator = async (
  tree: Tree,
  options: AllLibsGeneratorSchema,
) => {
  await processReactLib(tree, options)

  // await processEsLibrary(
  //   tree,
  //   options,
  //   async (projectConfig: ProjectConfiguration) => {
  //     /**
  //      * The dependency graph for a lib need to all be buildable, we we might as well make everything in libs buildable.
  //      */
  //     if (projectConfig.sourceRoot?.startsWith('libs')) {
  //       await migrateToViteLibs(tree, projectConfig)

  //       await moveFilesInTsConfig(tree, projectConfig)

  //       // Updates the path to use `es.js`
  //       await setPackageJsonExports(tree, projectConfig)
  //     }
  //   },
  // )
}

export default allLibGenerator
