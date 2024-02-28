import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import type { IComponentAggregate } from '@codelab/shared/abstract/core'
import { IAtomAggregate, ITag, IType } from '@codelab/shared/abstract/core'
import { Injectable, Scope } from '@nestjs/common'
import fs from 'fs'
import path from 'path'
import { MigrationDataService } from './migration-data.service'

const RANDOM_ATOMS_COUNT = 25

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

    if (!this.partiallySeed) {
      return atomFileNames
    }

    const randomAtomNames = atomFileNames
      .sort(() => Math.random() - 0.5)
      .slice(0, RANDOM_ATOMS_COUNT)

    // always include HtmlLink atom, since components import depends on it
    return [...randomAtomNames, 'HtmlLink.json']
  }

  get atoms() {
    return this.atomNames.map((filename) => {
      const content = fs.readFileSync(
        `${this.migrationDataService.atomsPath}/${filename}`,
        'utf8',
      )

      const atomExport = JSON.parse(content.toString())

      return this.validationService.validateAndClean(IAtomAggregate, atomExport)
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
      this.validationService.validateAndClean(IType, type),
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
      this.validationService.validateAndClean(ITag, tag),
    )
  }

  partiallySeed = false
}
