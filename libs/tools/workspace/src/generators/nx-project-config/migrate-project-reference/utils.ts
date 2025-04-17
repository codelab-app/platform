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

export const convertToNpmPackageName = (projectName: string) => {
  // If the path already starts with @codelab-codegen, return it as is
  if (projectName.startsWith('@codelab-codegen/')) {
    return projectName
  }

  // For paths that match the pattern @codelab/frontend-application-*/... with segments after /src/
  // These are paths that point to directories under src/ and should maintain their slash structure
  if (projectName.match(/@codelab\/frontend-application-[^/]+\/[^/]+/)) {
    return projectName
  }

  // For paths in the format @codelab/backend-infra-adapter/something
  // These should be transformed to @codelab/backend-infra-adapter-something
  if (projectName.match(/@codelab\/[^/]+-[^/]+-[^/]+\/[^/]+/)) {
    const parts = projectName.split('/')
    const prefix = parts[0] + '/' + parts[1]
    const suffix = parts.slice(2).join('-')

    return `${prefix}-${suffix}`
  }

  // Standard @codelab/ paths with multiple slashes should convert all slashes to hyphens
  if (projectName.startsWith('@codelab/') && projectName.includes('/')) {
    const withoutPrefix = projectName.replace('@codelab/', '')

    return `@codelab/${withoutPrefix.replace(/\//g, '-')}`
  }

  // For simple paths that include a single slash but don't match above patterns
  if (projectName.includes('/') && !projectName.startsWith('@')) {
    return projectName.replace('/', '-')
  }

  // Return the original name for anything else
  return projectName
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
