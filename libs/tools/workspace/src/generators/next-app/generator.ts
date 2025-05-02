import { Tree } from '@nx/devkit'

import { ProjectConfiguration } from '@nx/devkit'
import {
  processProjects,
  ProjectCondition,
  ProjectGenerator,
} from '../../utils/process-projects'
import { eslintLibGenerator } from '../eslint-lib/generator'
import { generateEslintFiles } from './eslint'

const nextAppCondition: ProjectCondition = (
  projectConfig: ProjectConfiguration,
): boolean => {
  return Boolean(
    ['web', 'sites', 'landing'].some((app) => projectConfig.name === app),
  )
}

const processNextApp = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  generateEslintFiles(tree, projectConfig)
}

export const nextAppGenerator: ProjectGenerator = [
  nextAppCondition,
  processNextApp,
]
