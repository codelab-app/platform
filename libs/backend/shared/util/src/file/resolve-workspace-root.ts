import { sync } from 'find-up'
import path, { dirname } from 'path'

export const resolveWorkspaceRoot = (basePath: string) =>
  path.resolve(dirname(sync('package.json')!), basePath)
