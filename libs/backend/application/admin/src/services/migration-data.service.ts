import { Injectable } from '@nestjs/common'
import { findUpSync } from 'find-up'
import path, { dirname } from 'path'

export interface IBaseDataPaths {
  baseDataPaths?: string | undefined
}

/**
 * This service holds all the paths for our migration data
 */
@Injectable()
export class MigrationDataService implements IBaseDataPaths {
  /**
   * process.cwd() doesn't work since run-commands may set app dir as cwd
   */
  baseDataPaths = path.resolve(
    dirname(findUpSync('package.json')!),
    './data/export',
  )

  /**
   * Allows override by setting at runtime
   */
  set basePaths(basePath: string) {
    this.baseDataPaths = basePath
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
