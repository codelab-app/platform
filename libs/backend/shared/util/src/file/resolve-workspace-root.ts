import path from 'path'

/**
 * Could either run from dist or normal folder, if dist folder then root is 1 more level up
 */
export const resolveWorkspaceRoot = (basePath: string) => {
  const possibleWorkspaceRoot = path.resolve(process.cwd(), '../..')
  const possibleWorkspaceRootName = path.basename(possibleWorkspaceRoot)

  if (possibleWorkspaceRootName === 'dist') {
    return path.resolve(process.cwd(), '../../..', basePath)
  }

  return path.resolve(process.cwd(), '../..', basePath)
}
