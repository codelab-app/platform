import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { generateFiles, joinPathFragments, offsetFromRoot } from '@nx/devkit'
import { join } from 'path'

import {
  ProjectCondition,
  ProjectGenerator,
} from '../../utils/process-projects'
import { generateSwcFiles } from './swc/swc'
import { generateTsconfigFiles } from './tsconfig/tsconfig'
import { removeViteFiles } from './vite/remove-vite'
import { generateViteFiles } from './vite/vite'
import { eslintLibGenerator } from '../eslint-lib/generator'

const reactLibCondition: ProjectCondition = (
  projectConfig: ProjectConfiguration,
): boolean => {
  return Boolean(projectConfig.sourceRoot?.startsWith('libs/frontend'))
}

/**
 * Use `swc` instead of `vite` since we don't need bundling or dev server
 */
const processReactLib = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  generateTsconfigFiles(tree, projectConfig)
  generateSwcFiles(tree, projectConfig)

  // generateViteFiles(tree, projectConfig)
  await removeViteFiles(tree, projectConfig)

  await eslintLibGenerator(tree, projectConfig)
}

// NOTE: The original processProjects had a third argument [notReactLibGenerator].
// This refactor only includes the logic for when the condition is TRUE.
// The logic for notReactLibGenerator (removeViteFiles) might need to be handled elsewhere
// or integrated differently if processProjects is removed entirely.
export const reactLibGenerator: ProjectGenerator = [
  reactLibCondition,
  processReactLib,
]

// // We want to remove vite files if the project is not a react lib
// const notReactLibGenerator = async (
//   tree: Tree,
//   projectConfig: ProjectConfiguration,
// ) => {
//   await removeViteFiles(tree, projectConfig)
// }

// // Combine the filter logic directly into the HOC call
// export const processReactLib = processProjects(
//   (projectConfig: ProjectConfiguration): boolean => {
//     return Boolean(projectConfig.sourceRoot?.startsWith('libs/frontend'))
//   },
//   [reactLibGenerator, eslintLibGenerator],
//   [notReactLibGenerator],
// )
