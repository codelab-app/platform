import { resolveWorkspaceRoot } from '@codelab/backend/shared/util'
import { Injectable, Scope } from '@nestjs/common'
import path from 'path'

export interface IBaseDataPaths {
  baseDataPaths?: string | undefined
}

/**
 * This service holds all the paths for our migration data
 */
@Injectable({
  scope: Scope.TRANSIENT,
})
export class MigrationDataService implements IBaseDataPaths {
  /**
   * process.cwd() doesn't work since run-commands may set app dir as cwd
   */
  baseDataPaths = resolveWorkspaceRoot('./data/export')

  /**
   * Allows override by setting at runtime, base path relative to workspace root
   */
  set basePaths(basePath: string) {
    this.baseDataPaths = resolveWorkspaceRoot(basePath)
  }

  /**
   * File paths
   */
  get systemTypesFilePath() {
    return path.resolve(this.baseDataPaths, './system/types/system-types.json')
  }

  get atomsPath() {
    return path.resolve(this.baseDataPaths, './admin/atoms')
  }

  get tagsFilePath() {
    return path.resolve(this.baseDataPaths, './admin/tags/tags.json')
  }

  get componentsPath() {
    return path.resolve(this.baseDataPaths, './admin/components')
  }
}
