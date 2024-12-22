import type {
  IApiImport,
  IAtomExport,
  IAtomImport,
  IComponentAggregateExport,
  IComponentAggregateImport,
  ITagDto,
  ITagExport,
  ITypeDto,
  ITypeExport,
} from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import {
  AtomImportSchema,
  ComponentAggregateExportSchema,
  TagExportSchema,
  TypeDtoSchema,
} from '@codelab/shared/abstract/core'
import { Injectable, Scope } from '@nestjs/common'
import fs from 'fs'
import path from 'path'

import { MigrationDataService } from './migration-data.service'

interface IReadAdminDataService {
  atoms: Array<IAtomImport>
  components: Array<IComponentAggregateImport>
  systemTypes: Array<ITypeDto>
  tags: Array<ITagDto>
}

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ReadAdminDataService implements IReadAdminDataService {
  constructor(
    public migrationDataService: MigrationDataService,
    private validationService: ValidationService,
    private authService: AuthDomainService,
  ) {}

  get atomNames() {
    const atomFileNames = fs
      .readdirSync(this.migrationDataService.atomsPath)
      .filter((filename) => path.extname(filename) === '.json')

    return atomFileNames
  }

  get atoms() {
    return this.atomNames.map((filename) => {
      const { api, atom } = JSON.parse(
        fs.readFileSync(
          `${this.migrationDataService.atomsPath}/${filename}`,
          'utf8',
        ),
      ) as IAtomExport

      const owner = this.authService.currentUser

      const data: IAtomImport = this.validationService.validateAndClean(
        AtomImportSchema,
        {
          api: {
            ...api,
            owner,
            types: api.types.map((type) => ({ ...type, owner })),
          },
          atom: { ...atom, owner },
        },
      )

      return data
    })
  }

  get components() {
    const owner = this.authService.currentUser

    const componentFilenames = fs.existsSync(
      this.migrationDataService.componentsPath,
    )
      ? fs
          .readdirSync(this.migrationDataService.componentsPath)
          .filter((filename) => path.extname(filename) === '.json')
      : []

    return componentFilenames.map((filename) => {
      const componentExport: IComponentAggregateExport = JSON.parse(
        fs.readFileSync(
          path.resolve(this.migrationDataService.componentsPath, filename),
          'utf8',
        ),
      )

      const { api, component, elements, store } = componentExport

      const apiImport: IApiImport = {
        ...api,
        owner,
        types: api.types.map((type) => ({ ...type, owner })),
      }

      // const parsePropsData = (props: IPropExport)

      const componentImport: IComponentAggregateImport = {
        api: apiImport,
        component: { ...component, owner },
        elements,
        store: {
          actions: store.actions,
          api: {
            ...store.api,
            owner,
            types: store.api.types.map((type) => ({
              ...type,
              owner,
            })),
          },
          store: store.store,
        },
      }

      return componentImport
    })
  }

  /**
   * Data
   */
  get systemTypes() {
    const owner = this.authService.currentUser

    const types = JSON.parse(
      fs.readFileSync(this.migrationDataService.systemTypesFilePath, 'utf8'),
    ) as Array<ITypeExport>

    return types.map((type: ITypeExport) => {
      return this.validationService.validateAndClean(TypeDtoSchema, {
        ...type,
        owner,
      })
    })
  }

  /**
   * Extract all the api's from atom file
   */
  get tags() {
    const owner = this.authService.currentUser

    // Tag data is all in single file
    const tags = JSON.parse(
      fs.readFileSync(this.migrationDataService.tagsFilePath, 'utf8'),
    ) as Array<ITagExport>

    return tags.map((tag: ITagExport) => {
      const tagExport: ITagExport = this.validationService.validateAndClean(
        TagExportSchema,
        tag,
      )

      return { ...tagExport, owner }
    })
  }
}
