import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { minimatch } from 'minimatch'
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
      // Ensure it's a directory
      const subDirPath = path.join(folderRelativeToWorkspace, subDir)

      if (tree.isFile(subDirPath)) {
        return
      }

      const moduleAlias = getModuleAlias(
        project,
        `${folderPatternPrefix}/${subDir}`,
      )

      const targetPath = `${subDirPath}/index.ts`

      appendTsconfigPath(tree, project, moduleAlias, targetPath)
    })

    return
  }

  console.log(sourceRoot, folderRelativeToWorkspace)

  const exists = tree.children(folderRelativeToWorkspace).length

  console.log(folderRelativeToWorkspace, exists)

  const moduleAlias = getModuleAlias(project, folderPattern)

  if (exists) {
    const targetPath = `${sourceRoot}/${folderPattern}/index.ts`

    appendTsconfigPath(tree, project, moduleAlias, targetPath)

    return
  }

  removeTsconfigPath(tree, moduleAlias)
}
