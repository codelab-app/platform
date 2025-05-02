import {
  generateFiles,
  offsetFromRoot,
  ProjectConfiguration,
  Tree,
} from '@nx/devkit'
import { join } from 'path'

export const generateEslintFiles = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const substitutions = {
    offsetFromRoot: offsetFromRoot(projectConfig.root),
    tmpl: '',
  }

  const templateDir = join(__dirname, 'files')
  // Target directory (project root)
  const targetDir = projectConfig.root

  generateFiles(tree, templateDir, targetDir, substitutions)
}

export const removeEslintFiles = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const projectRoot = projectConfig.root
  tree.delete(join(projectRoot, '.eslintrc.json'))
}
