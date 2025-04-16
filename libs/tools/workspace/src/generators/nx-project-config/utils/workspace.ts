import type { ProjectConfiguration, Tree } from '@nx/devkit'

import { formatFiles, getProjects } from '@nx/devkit'
import { join } from 'path'

import { getPackageJsonNameFromProjectName } from '../migrate-project-reference/utils'

type ProjectName = string

export type ProjectMapping = Record<
  ProjectName,
  {
    // This is the typescript alias or package.json name
    alias: string
    // This is the path to the project
    path: string
  }
>

/**
 * Converts project name to a package.json compatible name with the @codelab prefix
 * @param projectName The Nx project name
 * @returns A formatted package name with @codelab/ prefix
 */
export const projectNameToPackageName = (projectName: string): string => {
  return `@codelab/${projectName}`
}

/**
 * Loops through all projects in the workspace and performs the specified operation on each
 * @param tree The file system tree
 * @param callback Function to execute for each project
 */
export const forEachProject = (
  tree: Tree,
  callback: (projectName: string, projectConfig: ProjectConfiguration) => void,
) => {
  const projects = getProjects(tree)

  projects.forEach((projectConfig, projectName) => {
    callback(projectName, projectConfig)
  })
}

/**
 * Creates a mapping of project names to their paths and aliases
 * @param tree The file system tree
 * @returns An object mapping project names to their paths and aliases
 */

// Cache for project mapping
let projectMappingCache: ProjectMapping | null = null

export const createAliasMapping = (tree: Tree): ProjectMapping => {
  // Return cached mapping if available
  if (projectMappingCache) {
    return projectMappingCache
  }

  const projects = getProjects(tree)
  const projectMapping: ProjectMapping = {}

  for (const [projectName, projectConfig] of projects) {
    projectMapping[projectName] = {
      alias: getPackageJsonNameFromProjectName(projectName),
      path: projectConfig.root,
    }
  }

  // projects.forEach((projectConfig, projectName) => {
  //   // Use the project name directly as the alias
  // })

  // Cache the result
  projectMappingCache = projectMapping

  return projectMapping
}

/**
 * Saves the project mapping to a file in the workspace
 * @param tree The file system tree
 * @param mapping The project mapping to save
 * @param outputPath The relative path where to save the file (defaults to 'tools/project-mapping.json')
 */
export const saveAliasMappingToFile = (
  tree: Tree,
  mapping: ProjectMapping,
  outputPath = 'tools/project-mapping.json',
): void => {
  const content = JSON.stringify(mapping, null, 2)
  // Check if file exists and create directory if needed
  const dir = outputPath.substring(0, outputPath.lastIndexOf('/'))

  if (dir && !tree.exists(dir)) {
    tree.write(dir + '/.gitkeep', '')
  }

  // Write the mapping to file
  tree.write(outputPath, content)

  console.log(`Project mapping saved to ${outputPath}`)
}
