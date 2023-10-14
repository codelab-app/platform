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

  const possibleAppsRoot = path.resolve(process.cwd(), '..')
  const possibleAppsRootName = path.basename(possibleAppsRoot)

  if (possibleAppsRootName === 'apps') {
    return path.resolve(process.cwd(), '../..', basePath)
  }

  // in integration tests we run from root
  return path.resolve(process.cwd(), basePath)
}
