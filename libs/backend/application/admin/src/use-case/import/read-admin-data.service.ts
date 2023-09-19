import type { IAdminOutputDto } from '@codelab/backend/abstract/core'
import {
  IAtomOutputDto,
  IComponentOutputDto,
  ITagOutputDto,
  ITypeOutputDto,
} from '@codelab/backend/abstract/core'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { Injectable, Scope } from '@nestjs/common'
import fs from 'fs'
import path from 'path'
import { MigrationDataService } from '../../services/migration-data.service'

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ReadAdminDataService implements IAdminOutputDto {
  constructor(
    public migrationDataService: MigrationDataService,
    private validationService: ValidationService,
  ) {}

  /**
   * Data
   */
  get systemTypes() {
    const types = JSON.parse(
      fs.readFileSync(this.migrationDataService.systemTypesFilePath, 'utf8'),
    )

    return types.map((type: unknown) =>
      this.validationService.validateAndClean(ITypeOutputDto, type),
    )
  }

  get atoms() {
    const atomFilenames = fs
      .readdirSync(this.migrationDataService.atomsPath)
      .filter((filename) => path.extname(filename) === '.json')

    return atomFilenames.reduce((atoms, filename) => {
      const content = fs.readFileSync(
        `${this.migrationDataService.atomsPath}/${filename}`,
        'utf8',
      )

      const atomExport = JSON.parse(content.toString())

      const atom = this.validationService.validateAndClean(
        IAtomOutputDto,
        atomExport,
      )

      atoms.push(atom)

      return atoms
    }, [] as Array<IAtomOutputDto>)
  }

  get components(): Array<IComponentOutputDto> {
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

      const component = JSON.parse(content)

      return this.validationService.validateAndClean(
        IComponentOutputDto,
        component,
      )
    })
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
      this.validationService.validateAndClean(ITagOutputDto, tag),
    )
  }
}
