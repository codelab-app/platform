import { Tree } from '@nx/devkit'
import { ProjectConfiguration } from '@nx/devkit'
import {
  ProjectCondition,
  ProjectGenerator,
} from '../../utils/process-projects'
import { eslintLibGenerator } from '../eslint-lib/generator'

const nodeLibCondition: ProjectCondition = (
  projectConfig: ProjectConfiguration,
): boolean => {
  return Boolean(projectConfig.sourceRoot?.startsWith('libs/backend'))
}

const processNodeLib = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  // TODO: Add node-lib specific generation logic here if needed
  await eslintLibGenerator(tree, projectConfig)
}

export const nodeLibGenerator: ProjectGenerator = [
  nodeLibCondition,
  processNodeLib,
]
