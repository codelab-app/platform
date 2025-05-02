import { Tree } from '@nx/devkit'
import { ProjectConfiguration } from '@nx/devkit'
import {
  ProjectCondition,
  ProjectGenerator,
} from '../../utils/process-projects'
import { generateEslintFiles } from '../eslint-lib/eslint'

const tsAppCondition: ProjectCondition = (
  projectConfig: ProjectConfiguration,
): boolean => {
  return Boolean(['design-system'].some((app) => projectConfig.name === app))
}

const processTsApp = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  // TODO: Add ts-app specific generation logic here if needed
  await generateEslintFiles(tree, projectConfig)
}

export const tsAppGenerator: ProjectGenerator = [tsAppCondition, processTsApp]
