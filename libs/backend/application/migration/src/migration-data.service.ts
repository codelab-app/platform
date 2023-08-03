import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import path from 'path'

console.log(path.resolve(process.cwd(), './data/export'))

@Injectable()
export class MigrationDataService {
  private _basePath = path.resolve(process.cwd(), './data/export')

  /**
   * Allows override by setting at runtime
   */
  set basePaths(basePath: string) {
    this._basePath = basePath
  }

  get systemTypesFilePath() {
    return path.resolve(this._basePath, './system/types/system-types.json')
  }

  get atomsPath() {
    return path.resolve(this._basePath, './admin/atoms')
  }

  get tagsFilePath() {
    return path.resolve(this._basePath, './admin/tags/tags.json')
  }

  get componentsPath() {
    return path.resolve(this._basePath, './admin/components')
  }
}
