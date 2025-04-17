import type { PathAlias, PathAliasMap } from './path-alias.type'

import pathAliasMap from './path-alias.json'

/**
 * Gets the package path alias when given a project name
 * @param projectName The name of the project
 * @returns The corresponding package path alias
 * @throws Error if project name is not found in the path alias map
 */
export const getPackageNameFromProjectName = (
  projectName: string,
): PathAlias => {
  const pathAliasMapData: PathAliasMap = pathAliasMap

  for (const [alias, details] of Object.entries(pathAliasMapData)) {
    if (details.name === projectName) {
      // Return the expected alias
      return details.expected
    }
  }

  // If the loop completes without finding a match, throw an error
  throw new Error(`Project name "${projectName}" not found in path alias map`)
}
