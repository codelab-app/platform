import {
  generateFiles,
  offsetFromRoot,
  ProjectConfiguration,
  Tree,
} from '@nx/devkit'
import { join } from 'path'
import { generateEslintFiles, removeEslintFiles } from './eslint'

export const eslintLibGenerator = async (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  generateEslintFiles(tree, projectConfig)
  removeEslintFiles(tree, projectConfig)
}
