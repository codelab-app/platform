import { Tree } from '@nx/devkit'
import { ProjectConfiguration } from '@nx/devkit'
import {
  ProjectCondition,
  ProjectGenerator,
} from '../../utils/process-projects'
import { eslintLibGenerator } from '../eslint-lib/generator'
import { generateEslintFiles } from '../eslint-lib/eslint'
import { join } from 'path'

const nodeAppCondition: ProjectCondition = (
  projectConfig: ProjectConfiguration,
): boolean => {
  return Boolean(['api', 'cli'].some((app) => projectConfig.name === app))
}

const processNodeApp = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const templateDir = join(__dirname, 'files')

  await generateEslintFiles(tree, projectConfig, templateDir)
}

export const nodeAppGenerator: ProjectGenerator = [
  nodeAppCondition,
  processNodeApp,
]
