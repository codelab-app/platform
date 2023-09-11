import { findUpSync } from 'find-up'
import path, { dirname } from 'path'

export const resolveWorkspaceRoot = (basePath: string) =>
  path.resolve(dirname(findUpSync('package.json')!), basePath)
