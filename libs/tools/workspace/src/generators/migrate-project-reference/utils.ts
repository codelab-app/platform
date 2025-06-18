import type { Tree } from '@nx/devkit'

import { readJson } from '@nx/devkit'

import type { ProjectMapping } from '../utils/workspace'

import { createAliasMapping } from '../utils/workspace'

/**
 * Interface for the project information in the mapping
 */
export interface ProjectInfo {
  path: string
  projectName: string
}

/**
 * Interface for the project path mapping file structure
 */
export interface ProjectPathMapping {
  aliasToProject: Record<string, ProjectInfo>
  mappedAliases: number
  missingProjects: Array<{ alias: string; path: string; reason: string }>
  projectToAliases: Record<string, Array<string>>
  timestamp: string
  totalAliases: number
}

/**
 * Gets npm package name from the project mapping
 * Throws an error if the mapping file doesn't exist or if the project is not found in the mapping
 */
export const getPackageJsonNameFromProjectName = (projectName: string) => {
  const slashCount = (projectName.match(/\//g) || []).length

  if (slashCount > 1) {
    throw new Error(
      `Project name "${projectName}" contains multiple slashes. Only one slash is allowed.`,
    )
  }

  return `@codelab/${projectName}`
}

/**
 * Gets npm package name from the project mapping
 * Throws an error if the mapping file doesn't exist or if the project is not found in the mapping
 */
export const getPackageJsonNameFromMapping = (
  tree: Tree,
  projectName: string,
) => {
  // Get project mapping
  const aliasMap = createAliasMapping(tree)

  // Find the entry where the project name matches
  for (const [key, value] of Object.entries(aliasMap)) {
    if (key === projectName) {
      return value.alias
    }
  }

  throw new Error(`Project ${projectName} not found in mapping`)
}
