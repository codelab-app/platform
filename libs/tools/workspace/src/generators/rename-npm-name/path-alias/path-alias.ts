import type { PathAlias, PathAliasMap } from './path-alias.type'

import pathAliasMap from './path-alias.json'

/**
 * Returns the refactored paths
 */
export const getProjectReferencePaths = () => {
  return Object.values(pathAliasMap).map((details) => details.expected)
}

/**
 * Gets the package path alias when given a project name
 * @param projectName The name of the project
 * @returns The corresponding package path alias
 * @throws Error if project name is not found in the path alias map
 */
export const getPackageNameFromProjectName = (
  projectName: string,
): PathAlias => {
  for (const [alias, details] of Object.entries(pathAliasMap)) {
    if (details.name === projectName) {
      // Return the expected alias
      return details.expected
    }
  }

  // If the loop completes without finding a match, throw an error
  console.log(`Project name "${projectName}" not found in path alias map`)

  return projectName
}

/**
 * The old alias could contain nested subpaths, so we want to be able to remove that before testing for the base package name
 *
 * @param oldAlias Could have subpath included
 */
export const getPackageNameFromOldAlias = (oldAlias: string): string => {
  // First check if it's in the map
  for (const [alias, details] of Object.entries(pathAliasMap)) {
    if (oldAlias.startsWith(alias)) {
      // Extract the subpath (everything after the base alias)
      const subpath = oldAlias.slice(alias.length)
      // Return the expected alias + any subpath
      return details.expected + subpath
    }
  }

  // If no match found and it starts with @codelab, throw error
  if (oldAlias.startsWith('@codelab')) {
    throw new Error(`Alias "${oldAlias}" not found in path alias map`)
  }

  return oldAlias
}
