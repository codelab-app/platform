import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import path from 'path'
import { migrationConfig } from './migration.config'

@Injectable()
export class MigrationDataService {
  constructor(
    @Inject(migrationConfig.KEY)
    private config: ConfigType<typeof migrationConfig>,
  ) {}

  get SYSTEM_TYPES_FILE_PATH() {
    return path.resolve(
      this.config.dataPaths,
      './system/types/system-types.json',
    )
  }

  get ATOMS_PATH() {
    return path.resolve(this.config.dataPaths, './admin/atoms')
  }

  get TAGS_FILE_PATH() {
    return path.resolve(this.config.dataPaths, './admin/tags/tags.json')
  }

  get COMPONENTS_PATH() {
    return path.resolve(this.config.dataPaths, './admin/components')
  }
}
