import type { PathAlias, PathAliasMap } from './path-alias.type'

import pathAliasMap from './path-alias.json'

/**
 * Returns the previous alias format
 */
export const getPathAliasPackageNames = () => {
  return Object.keys(pathAliasMap)
}

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

export const getPackageNameFromOldAlias = (oldAlias: string): string => {
  for (const [alias, details] of Object.entries(pathAliasMap)) {
    if (alias === oldAlias) {
      // Return the expected alias
      return details.expected
    }
  }

  // If the loop completes without finding a match, throw an error
  // console.log(`Project name "${oldAlias}" not found in path alias map`)

  return oldAlias
}
