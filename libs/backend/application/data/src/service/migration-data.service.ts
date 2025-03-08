import { resolveWorkspaceRoot } from '@codelab/backend/shared/util'
import { Injectable, Scope } from '@nestjs/common'
import path from 'path'

import { BASE_DATA_PROD_PATH } from './admin-data.config'

export interface IBaseDataPaths {
  baseDataPath?: string | undefined
}

/**
 * This service holds all the paths for our migration data
 */
@Injectable({
  scope: Scope.TRANSIENT,
})
export class MigrationDataService implements IBaseDataPaths {
  get atomsPath() {
    return path.resolve(this.baseDataPath, './admin/atoms')
  }

  get componentsPath() {
    return path.resolve(this.baseDataPath, './admin/components')
  }

  /**
   * File paths
   */
  get systemTypesFilePath() {
    return path.resolve(this.baseDataPath, './system/types/system-types.json')
  }

  get tagsFilePath() {
    return path.resolve(this.baseDataPath, './admin/tags/tags.json')
  }

  /**
   * process.cwd() doesn't work since run-commands may set app dir as cwd
   */
  baseDataPath = BASE_DATA_PROD_PATH

  /**
   * Allows override by setting at runtime, base path relative to workspace root
   */
  set basePaths(basePath: string) {
    this.baseDataPath = resolveWorkspaceRoot(basePath)
  }
}
