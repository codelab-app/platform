/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Tree } from '@nx/devkit'
import { getProjects } from '@nx/devkit'

export const update = (host: Tree) => {
  const projects = getProjects(host)
  const libNames = []

  for (const [name, project] of projects) {
    // if (project.projectType === 'library') {
    // }
    libNames.push(name)
  }

  return libNames
}
