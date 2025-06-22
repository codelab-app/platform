import type { Tree } from '@nx/devkit'

import { getProjects } from '@nx/devkit'

import { getPackageJsonNameFromProjectName } from '../migrate-project-reference/utils'

export interface ProjectMapping {
  [projectName: string]: {
    alias: string
    path: string
  }
}

export const createAliasMapping = (tree: Tree): ProjectMapping => {
  const projects = getProjects(tree)
  const projectMapping: ProjectMapping = {}

  for (const [projectName, projectConfig] of projects) {
    projectMapping[projectName] = {
      alias: getPackageJsonNameFromProjectName(projectName),
      path: projectConfig.root,
    }
  }

  return projectMapping
}
