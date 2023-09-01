import type {
  IAdminOutputDto,
  IAtomOutputDto,
} from '@codelab/backend/abstract/core'
import {
  IAtomInputDto,
  IComponentOutputDto,
  ITagOutputDto,
  ITypeOutputDto,
} from '@codelab/backend/abstract/core'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { Typebox } from '@codelab/shared/abstract/types'
import { Injectable, Scope } from '@nestjs/common'
import { findUpSync } from 'find-up'
import fs from 'fs'
import path, { dirname } from 'path'
import type { IBaseDataPaths } from '../migration-data.service'
import { MigrationDataService } from '../migration-data.service'

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ReadAdminDataService implements IBaseDataPaths, IAdminOutputDto {
  constructor(
    private traceService: TraceService,
    private migrationDataService: MigrationDataService,
  ) {}

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
   * Data
   */
  get systemTypes() {
    const { types } = JSON.parse(
      fs.readFileSync(this.migrationDataService.systemTypesFilePath, 'utf8'),
    )

    return types.map((type: unknown) => Typebox.Validate(ITypeOutputDto, type))
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
      const atom = Typebox.Validate(IAtomInputDto, atomExport)

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

      return Typebox.Validate(IComponentOutputDto, component)
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

    return tags.map((tag: unknown) => Typebox.Validate(ITagOutputDto, tag))
  }
}
