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
  const reactLibTemplateDir = join(__dirname, 'files')
  // Target directory (project root)
  const targetDir = projectConfig.root

  /**
   * Generate all these first, then override one of the files
   */
  const tsLibTemplateDir = join(
    __dirname,
    '../../ts-lib/tsconfig/files',
    'files',
  )
  generateFiles(tree, tsLibTemplateDir, targetDir, substitutions)

  generateFiles(tree, reactLibTemplateDir, targetDir, substitutions)
}
