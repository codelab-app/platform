import type { PackageJson } from 'type-fest'

/**
 * Converts package.json exports field into Vite entry points configuration
 */
export const getEntryFromExports = (
  packageJson: PackageJson,
): Record<string, string> => {
  const entry: Record<string, string> = {
    index: 'src/index.ts',
  }

  // If no exports field exists, or it's not an object, return just the default entry
  if (
    !packageJson.exports ||
    typeof packageJson.exports !== 'object' ||
    Array.isArray(packageJson.exports)
  ) {
    return entry
  }

  // We've confirmed exports is an object, so cast it
  const exportsConditions = packageJson.exports

  // Handle root export if it exists (typically "./")
  if (exportsConditions['./'] && typeof exportsConditions['./'] === 'object') {
    // Root export already covered by index entry, no need to add it again
  } else if (
    exportsConditions['.'] &&
    typeof exportsConditions['.'] === 'object'
  ) {
    // Alternative root export format, also covered by index
  }

  // Process subpath exports
  for (const exportPath in exportsConditions) {
    if (Object.prototype.hasOwnProperty.call(exportsConditions, exportPath)) {
      // Skip the root/default export as we've already handled it
      if (exportPath === './' || exportPath === '.') {
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
