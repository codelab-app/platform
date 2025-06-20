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

export const getPackageNameFromOldAlias = (oldAlias: string): string => {
  // First check if it's in the map
  for (const [alias, details] of Object.entries(pathAliasMap)) {
    if (alias === oldAlias) {
      // Return the expected alias
      return details.expected
    }
  }

  // If not in map, check if it matches the pattern @codelab/xxx/yyy/zzz
  // and transform it to @codelab/xxx-yyy-zzz
  const pattern = /^@codelab\/(.+)$/
  const match = oldAlias.match(pattern)
  
  if (match && match[1] && match[1].includes('/')) {
    // Replace all slashes with hyphens in the package name part
    const transformedName = match[1].replace(/\//g, '-')
    return `@codelab/${transformedName}`
  }

  // Return as-is if no transformation needed
  return oldAlias
}
