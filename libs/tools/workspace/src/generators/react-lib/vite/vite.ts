import {
  generateFiles,
  joinPathFragments,
  offsetFromRoot,
  type ProjectConfiguration,
  type Tree,
} from '@nx/devkit'
import { join } from 'path'

import { getEntryFromProject } from '../../all-libs/entry/get-entry-from-exports'
import { updatePackageJsonForVite } from '../../all-libs/package-json/update-package-json'

export const generateViteFiles = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  // Update package.json and get package info
  const packageJson = updatePackageJsonForVite(tree, projectConfig)

  // If package.json didn't exist or couldn't be read, we might need to handle it
  if (!packageJson) {
    console.error(
      `Could not retrieve package.json for ${projectConfig.name}. Aborting Vite config generation.`,
    )

    return
  }

  // Get library entries from package.json exports
  const entry = getEntryFromProject(tree, projectConfig.root, packageJson)

  const substitutions = {
    // Calculate cacheDir relative to workspace root
    cacheDir: joinPathFragments(
      offsetFromRoot(projectConfig.root),
      'node_modules/.vite',
      projectConfig.root,
    ),
    entry: JSON.stringify(entry, null, 2),
    libName: packageJson.name,
    // Replaces __tmpl__ portion of file
    tmpl: '',
    tsconfigPath: 'tsconfig.lib.json',
  }

  // Path to the template files directory
  const templateDir = join(__dirname, 'files')
  // Target directory (project root)
  const targetDir = projectConfig.root

  generateFiles(tree, templateDir, targetDir, substitutions)
}
