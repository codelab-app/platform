import path from 'path'

export const resolveWorkspaceRoot = (basePath: string) => {
  if (process.env['NX_CYPRESS_TARGET_CONFIGURATION']) {
    return path.resolve(process.cwd(), '../..', basePath)
  }

  return path.resolve(process.cwd(), basePath)
}
