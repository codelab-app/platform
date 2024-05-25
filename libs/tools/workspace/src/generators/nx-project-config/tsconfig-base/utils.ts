import type { Tree } from '@nx/devkit'
import { minimatch } from 'minimatch'
import path from 'path'

export interface Paths {
  [key: string]: Array<string>
}

export const sortKeys = (object: object): object =>
  Object.fromEntries(Object.entries(object).sort())

export const clearPaths = (paths: Paths, prefix: string, baseDir: string) => {
  Object.keys(paths).forEach((key) => {
    if (key.startsWith(`${prefix}/${baseDir}`)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete paths[key]
    }
  })
}

export const updatePathEntry = (
  paths: Paths,
  prefix: string,
  baseDir: string,
  subDir: string,
  fullPath: string,
) => {
  const pathKey = `${prefix}/${baseDir}/${subDir}`
  const pathValue = [`${fullPath}/index.ts`]

  paths[pathKey] = pathValue
}

export const handleNestedDirectory = (
  tree: Tree,
  paths: Paths,
  projectSourceRoot: string,
  prefix: string,
  baseDir: string,
  fullDirPath: string,
  projectFolderPattern: string,
) => {
  tree.children(fullDirPath).forEach((subDir) => {
    const fullPath = path.join(fullDirPath, subDir)
    const relativePath = path.relative(projectSourceRoot, fullPath)

    if (
      !tree.isFile(fullPath) &&
      minimatch(relativePath, projectFolderPattern)
    ) {
      updatePathEntry(paths, prefix, baseDir, subDir, fullPath)
    }
  })
}
