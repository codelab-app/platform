import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { generateFiles, offsetFromRoot } from '@nx/devkit'
import { join } from 'path'

export const generateTsconfigFiles = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const substitutions = {
    offsetFromRoot: offsetFromRoot(projectConfig.root),
    // Replaces __tmpl__ portion of file
    tmpl: '',
  }

  // Path to the template files directory
  const templateDir = join(__dirname, 'files')
  // Target directory (project root)
  const targetDir = projectConfig.root

  generateFiles(tree, templateDir, targetDir, substitutions)
}
