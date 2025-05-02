import type { ProjectConfiguration, Tree } from '@nx/devkit'

import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
} from '@nx/devkit'

import type { AllLibsGeneratorSchema } from './schema'

import { setPackageJsonExports } from '../nx-project-config/workspace/package-json/exports/set-exports'
import { reactLibGenerator } from '../react-lib/generator'
import { tsLibGenerator } from '../ts-lib/generator'
import { migrateToViteLibs } from './migrate-to-vite-libs'
import { moveFilesInTsConfig } from './tsconfig/tsconfig.lib'
import { nodeLibGenerator } from '../node-lib/generator'
import { processProjects } from '../../utils/process-projects'
import { nextAppGenerator } from '../next-app/generator'
import { nodeAppGenerator } from '../node-app/generator'
import { tsAppGenerator } from '../ts-app/generator'

/**
 * Process all projects in the workspace
 */
export const allLibGenerator = async (
  tree: Tree,
  options: AllLibsGeneratorSchema,
) => {
  await processProjects(tree, options, [
    // Apps
    nextAppGenerator,
    nodeAppGenerator,
    tsAppGenerator,
    // Library
    reactLibGenerator,
    tsLibGenerator,
    nodeLibGenerator,
  ])
}

export default allLibGenerator
