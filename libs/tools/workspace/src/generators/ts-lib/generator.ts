import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { generateFiles, joinPathFragments, offsetFromRoot } from '@nx/devkit'
import { join } from 'path'

import {
  ProjectCondition,
  ProjectGenerator,
} from '../../utils/process-projects'
import { generateSwcFiles } from './swc/swc'
import { generateTsconfigFiles } from './tsconfig/tsconfig'
import { eslintLibGenerator } from '../eslint-lib/generator'

const tsLibCondition: ProjectCondition = (
  projectConfig: ProjectConfiguration,
): boolean => {
  return Boolean(projectConfig.sourceRoot?.startsWith('libs/shared'))
}

/**
 * Use `swc` instead of `vite` since we don't need bundling or dev server
 */
const processTsLib = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  generateTsconfigFiles(tree, projectConfig)
  generateSwcFiles(tree, projectConfig)

  await eslintLibGenerator(tree, projectConfig)
}

export const tsLibGenerator: ProjectGenerator = [tsLibCondition, processTsLib]
