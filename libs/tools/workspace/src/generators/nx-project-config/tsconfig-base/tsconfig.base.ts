import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { updateJson } from '@nx/devkit'
import { minimatch } from 'minimatch'
import path from 'path'
import {
  clearPaths,
  handleNestedDirectory,
  type Paths,
  sortKeys,
  updatePathEntry,
} from './utils'

const directoryMappings: Paths = {
  '^frontend-application-(?!shared)$': [
    'graphql',
    'services',
    'views',
    'use-cases/*',
  ],
  '^frontend-application-builder$': ['dnd', 'hooks', 'sections', 'utils'],
  '^frontend-application-dnd$': ['components', 'collision-detection'],
  '^frontend-application-renderer$': ['atoms', 'components', 'hooks'],
  '^frontend-application-resource$': ['components'],
  '^frontend-application-type$': ['interface-form', 'props-form'],
  '^frontend-domain-': ['services', 'store', 'test', 'views', 'use-cases/*'],
  '^frontend-domain-prop$': ['utils'],
}

export const updateBaseTsconfig = (
  tree: Tree,
  project: ProjectConfiguration,
): void => {
  const baseTsConfigFile = 'tsconfig.base.json'

  if (!tree.exists(baseTsConfigFile)) {
    console.error(
      'tsconfig.base.json does not exist at the root of your workspace.',
    )

    return
  }

  const projectName = project.name
  const sourceRoot = project.sourceRoot

  if (!projectName || !sourceRoot) {
    console.log('Missing projectName and sourceRoot')

    return
  }

  const projectPrefix = `@codelab/${projectName}`

  updateJson(tree, baseTsConfigFile, (json) => {
    const paths: Paths = json.compilerOptions.paths || {}

    Object.entries(directoryMappings).forEach(
      ([projectNamePattern, projectFolderPatterns]) => {
        if (new RegExp(projectNamePattern).test(projectName)) {
          updatePaths(
            paths,
            sourceRoot,
            projectFolderPatterns,
            projectPrefix,
            tree,
          )
        }
      },
    )

    json.compilerOptions.paths = sortKeys(paths)

    return json
  })
}

const updatePaths = (
  paths: Paths,
  projectSourceRoot: string,
  projectFolderPatterns: Array<string>,
  prefix: string,
  tree: Tree,
): void => {
  projectFolderPatterns.forEach((projectFolderPattern) => {
    const hasNestedDirectory = projectFolderPattern.includes('/*')
    const baseDir = projectFolderPattern.split('/*')[0] ?? projectFolderPattern
    const fullDirPath = `${projectSourceRoot}/${baseDir}`

    if (!tree.exists(fullDirPath)) {
      clearPaths(paths, prefix, baseDir)

      return
    }

    if (hasNestedDirectory) {
      handleNestedDirectory(
        tree,
        paths,
        projectSourceRoot,
        prefix,
        baseDir,
        fullDirPath,
        projectFolderPattern,
      )
    } else {
      const relativePath = path.relative(projectSourceRoot, fullDirPath)

      if (minimatch(relativePath, projectFolderPattern)) {
        updatePathEntry(paths, prefix, baseDir, '', fullDirPath)
      }
    }
  })
}
