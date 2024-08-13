import type { ProjectConfiguration, Tree } from '@nx/devkit'
import path from 'path'
import { aliasMap } from './alias-map'
import { appendTsconfigPath, getModuleAlias, removeTsconfigPath } from './utils'

/**
 * For each library, go through the regex patterns and see if any callbacks shoudl be applied
 */
export const handleProjectNamePatterns = (
  project: ProjectConfiguration,
  callback: (patterns: Array<string>) => void,
) => {
  const projectName = project.name

  if (!projectName) {
    return
  }

  Object.entries(aliasMap).forEach(
    ([projectNamePattern, projectFolderPatterns]) => {
      if (new RegExp(projectNamePattern).test(projectName)) {
        console.log('Match with pattern:', projectNamePattern)

        callback(projectFolderPatterns)
      }
    },
  )
}

/**
 * Given a lib & folder patterns, we want to create tsconfig path references
 */
export const generateReferencePathsForLib = (
  tree: Tree,
  project: ProjectConfiguration,
  folderPattern: string,
) => {
  const sourceRoot = project.sourceRoot

  if (!sourceRoot) {
    return
  }

  console.log('Generating for folderPattern:', folderPattern)

  // This is `libs/frontend/application/application/src/store`
  // This is a minimatch pattern, could be `.../uses-cases/*
  let folderRelativeToWorkspace = path.join(sourceRoot, folderPattern)
  // Handle if folder has minimatch pattern
  const hasWildcard = folderPattern.includes('/*')
  const folderPatternPrefix = folderPattern.replace('/*', '')

  if (hasWildcard) {
    folderRelativeToWorkspace = path.join(sourceRoot, folderPatternPrefix)

    tree.children(folderRelativeToWorkspace).forEach((subDir) => {
      const subDirPath = path.join(folderRelativeToWorkspace, subDir)

      if (tree.isFile(subDirPath)) {
        return
      }

      const moduleAlias = getModuleAlias(
        project,
        `${folderPatternPrefix}/${subDir}`,
      )

      const targetPath = `${subDirPath}/index.ts`
      const folderHasFiles = tree.children(subDirPath).length > 0

      handleTsconfigPath(tree, project, moduleAlias, targetPath, folderHasFiles)
    })

    return
  }

  const folderHasFiles = tree.children(folderRelativeToWorkspace).length > 0
  const moduleAlias = getModuleAlias(project, folderPattern)
  const targetPath = `${sourceRoot}/${folderPattern}/index.ts`

  handleTsconfigPath(tree, project, moduleAlias, targetPath, folderHasFiles)
}

/**
 * Common logic to check folder and index file, then append or remove tsconfig path
 */
const handleTsconfigPath = (
  tree: Tree,
  project: ProjectConfiguration,
  moduleAlias: string,
  targetPath: string,
  folderHasFiles: boolean,
) => {
  const folderHasIndexFile = tree.exists(targetPath)
  const folderHasIndexFileContent = folderHasIndexFile && tree.read(targetPath)

  if (folderHasFiles && folderHasIndexFile && folderHasIndexFileContent) {
    appendTsconfigPath(tree, project, moduleAlias, targetPath)
  } else {
    removeTsconfigPath(tree, moduleAlias)
  }
}
