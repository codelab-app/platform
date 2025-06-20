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
  // First check if it's an exact match in the map
  for (const [alias, details] of Object.entries(pathAliasMap)) {
    if (alias === oldAlias) {
      // Return the expected alias
      return details.expected
    }
  }

  // Check if it's a subpath of a mapped base path
  // For example: @codelab/shared-infra-auth0/client where @codelab/shared-infra-auth0 is the base
  // We need to find the longest matching base path to handle nested packages correctly
  let longestMatch = ''
  let matchedDetails: typeof pathAliasMap[string] | null = null
  
  for (const [alias, details] of Object.entries(pathAliasMap)) {
    // Skip the root workspace entry "@codelab" when checking for subpaths
    // We only want to match actual package paths like "@codelab/shared-infra-auth0"
    if (alias === '@codelab') {
      continue
    }
    
    if (oldAlias.startsWith(alias + '/') && alias.length > longestMatch.length) {
      longestMatch = alias
      matchedDetails = details
    }
  }
  
  if (matchedDetails && longestMatch) {
    // It's a subpath of a known base path, preserve the subpath part
    const subpath = oldAlias.substring(longestMatch.length)
    return matchedDetails.expected + subpath
  }

  // If not in map or a subpath of a mapped path, check if it matches the pattern @codelab/xxx/yyy/zzz
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
