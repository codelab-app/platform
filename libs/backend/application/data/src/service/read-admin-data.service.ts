import type {
  IAtomAggregate,
  IComponentAggregate,
} from '@codelab/shared/abstract/core'

import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import {
  AtomAggregateSchema,
  TagSchema,
  TypeSchema,
} from '@codelab/shared/abstract/core'
import { Injectable, Scope } from '@nestjs/common'
import fs from 'fs'
import path from 'path'

import { MigrationDataService } from './migration-data.service'

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ReadAdminDataService {
  constructor(
    public migrationDataService: MigrationDataService,
    private validationService: ValidationService,
  ) {}

  get atomNames() {
    const atomFileNames = fs
      .readdirSync(this.migrationDataService.atomsPath)
      .filter((filename) => path.extname(filename) === '.json')

    return atomFileNames
  }

  get atoms() {
    return this.atomNames.map((filename) => {
      const content = fs.readFileSync(
        `${this.migrationDataService.atomsPath}/${filename}`,
        'utf8',
      )

      const atomExport = JSON.parse(content.toString())

      const data: IAtomAggregate = this.validationService.validateAndClean(
        AtomAggregateSchema,
        atomExport,
      )

      return data
    })
  }

  get components(): Array<IComponentAggregate> {
    const componentFilenames = fs.existsSync(
      this.migrationDataService.componentsPath,
    )
      ? fs
          .readdirSync(this.migrationDataService.componentsPath)
          .filter((filename) => path.extname(filename) === '.json')
      : []

    return componentFilenames.map((filename) => {
      const content = fs.readFileSync(
        path.resolve(this.migrationDataService.componentsPath, filename),
        'utf8',
      )

      return JSON.parse(content)
    })
  }

  /**
   * Data
   */
  get systemTypes() {
    const types = JSON.parse(
      fs.readFileSync(this.migrationDataService.systemTypesFilePath, 'utf8'),
    )

    return types.map((type: unknown) =>
      this.validationService.validateAndClean(TypeSchema, type),
    )
  }

  /**
   * Extract all the api's from atom file
   */
  get tags() {
    // Tag data is all in single file
    const tags = JSON.parse(
      fs.readFileSync(this.migrationDataService.tagsFilePath, 'utf8'),
    )

    return tags.map((tag: unknown) =>
      this.validationService.validateAndClean(TagSchema, tag),
    )
  }
}
