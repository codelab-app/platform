import type {
  IAtomAggregate,
  IAtomType,
  IComponentAggregate,
  IComponentType,
  ITagDto,
  ITagExport,
  ITypeDto,
  ITypeDtoWithoutOwner,
} from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  AtomAggregateSchema,
  IAtomCategory,
  TagExportSchema,
  TypeDtoSchema,
} from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
import { titleCase } from '@codelab/shared/utils'
import { Injectable, Scope } from '@nestjs/common'
import fs from 'fs'
import path from 'path'

import { MigrationDataService } from './migration-data.service'

interface IReadAdminDataService {
  atoms: Array<IAtomAggregate>
  components: Array<IComponentAggregate>
  systemTypes: Array<ITypeDto>
  tags: Array<ITagDto>
}

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ReadAdminDataService implements IReadAdminDataService {
  constructor(
    public migrationDataService: MigrationDataService,
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
      ) as IAtomAggregate

      const owner = this.authService.currentUser

      const data: IAtomAggregate = Validator.parse(AtomAggregateSchema, {
        api: {
          ...api,
          owner,
          types: api.types.map((type) => ({ ...type, owner })),
        },
        atom: { ...atom, owner },
      })

      return data
    })
  }

  get components() {
    const componentFilenames = fs.existsSync(
      this.migrationDataService.componentsPath,
    )
      ? fs
          .readdirSync(this.migrationDataService.componentsPath)
          .filter((filename) => path.extname(filename) === '.json')
      : []

    return componentFilenames.map((filename) => {
      const componentExport: IComponentAggregate = JSON.parse(
        fs.readFileSync(
          path.resolve(this.migrationDataService.componentsPath, filename),
          'utf8',
        ),
      )

      return componentExport
    })
  }

  /**
   * Data
   */
  get systemTypes() {
    const owner = this.authService.currentUser

    const types = JSON.parse(
      fs.readFileSync(this.migrationDataService.systemTypesFilePath, 'utf8'),
    ) as Array<ITypeDtoWithoutOwner>

    return types.map((type: ITypeDtoWithoutOwner) => {
      return Validator.parse(TypeDtoSchema, {
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
      const tagExport: ITagExport = Validator.parse(TagExportSchema, tag)

      return { ...tagExport, owner }
    })
  }

  getAtomsByTypes(types: Array<IAtomType>) {
    return this.atoms.filter(({ atom }) => types.includes(atom.type))
  }

  getComponentsByNames(names: Array<IComponentType>) {
    return this.components.filter(({ component }) =>
      names.map((name) => titleCase(name)).includes(component.name),
    )
  }
}
