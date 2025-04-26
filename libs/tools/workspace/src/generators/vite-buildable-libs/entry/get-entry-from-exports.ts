import type { Tree } from '@nx/devkit'
import type { PackageJson } from 'type-fest'

import { joinPathFragments } from '@nx/devkit'

/**
 * Processes package.json exports field to generate Vite entry points
 */
export const getEntryFromExports = (
  packageJson: PackageJson,
): Record<string, string> => {
  const entry: Record<string, string> = {}

  // If no exports field exists, or it's not an object, return empty object
  if (
    !packageJson.exports ||
    typeof packageJson.exports !== 'object' ||
    Array.isArray(packageJson.exports)
  ) {
    return entry
  }

  // We've confirmed exports is an object, so cast it
  const exportsConditions = packageJson.exports

  // Process subpath exports
  for (const exportPath in exportsConditions) {
    if (Object.prototype.hasOwnProperty.call(exportsConditions, exportPath)) {
      // Skip the root/default export
      if (exportPath === './' || exportPath === '.') {
        continue
      }

      // Skip export paths that don't represent subpaths (those with hyphen but not path separator)
      // Examples: ".-server", ".-utils", etc. which refer to separate libraries
      if (exportPath.includes('-') && !exportPath.includes('/')) {
        continue
      }

      // Remove './' prefix if present
      const normalizedPath = exportPath.startsWith('./')
        ? exportPath.substring(2)
        : exportPath

      // If it's a subpath export with an object value (typical pattern)
      const exportValue = exportsConditions[exportPath]

      if (
        normalizedPath &&
        typeof exportValue === 'object' &&
        exportValue !== null
      ) {
        // Convert dist path to source path
        // e.g., "./dist/components/index.js" → "src/components/index.ts"
        entry[normalizedPath] = `src/${normalizedPath}/index.ts`
      }
    }
  }

  return entry
}

/**
 * Converts package.json exports field into Vite entry points configuration
 */
export const getEntryFromProject = (
  tree: Tree,
  projectRoot: string,
  packageJson: PackageJson,
): Record<string, string> => {
  const entry: Record<string, string> = {}
  const indexPath = joinPathFragments(projectRoot, 'src/index.ts')

  //
  // Check if src/index.ts exists and is not empty before adding it as the default entry
  if (tree.exists(indexPath)) {
    const indexContent = tree.read(indexPath, 'utf-8')?.trim()

    if (indexContent && indexContent !== '') {
      entry['index'] = 'src/index.ts'
    }
  }

  // Get entries from exports field
  const entriesFromExports = getEntryFromExports(packageJson)

  // Merge entries
  return { ...entry, ...entriesFromExports }
}
