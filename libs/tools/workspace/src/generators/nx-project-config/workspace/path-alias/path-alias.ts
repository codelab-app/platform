import type { PathAlias } from './path-alias.type'

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
  const entry = Object.entries(pathAliasMap).find(
    ([_, value]) => value.name === projectName,
  )

  if (!entry) {
    throw new Error(`Project name "${projectName}" not found in path alias map`)
  }

  return entry[0]
}
