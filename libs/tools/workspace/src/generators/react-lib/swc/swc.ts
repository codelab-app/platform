import { generateFiles, type ProjectConfiguration, type Tree } from '@nx/devkit'
import { join } from 'path'

export const generateSwcFiles = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const substitutions = {
    tmpl: '',
  }

  const templateDir = join(__dirname, 'files')
  // Target directory (project root)
  const targetDir = projectConfig.root

  generateFiles(tree, templateDir, targetDir, substitutions)
}
