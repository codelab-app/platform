import type {
  IAdminDataExport,
  IAtomExport,
  IComponentExport,
  ITypesExport,
} from '@codelab/backend/abstract/core'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { AuthService } from '@codelab/backend/application/service'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { IAuth0User, ITagDTO } from '@codelab/shared/abstract/core'
import { withTracing } from '@codelab/shared/infra/otel'
import { Inject, Injectable } from '@nestjs/common'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import fs from 'fs'
import pick from 'lodash/pick'
import path from 'path'
import { MIGRATION_DATA_PROVIDER } from '../migration-data.constant'
import { MigrationDataService } from '../migration-data.service'

@Injectable()
export class ImportAdminDataCommand extends AuthService {}

/**
 * During `save`, we'll want to replace the owner with the current
 */
@CommandHandler(ImportAdminDataCommand)
export class ImportAdminDataHandler
  implements ICommandHandler<ImportAdminDataCommand, void>
{
  adminData: IAdminDataExport

  constructor(
    private readonly tagRepository: TagRepository,
    private readonly atomRepository: AtomRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly elementRepository: ElementRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly commandBus: CommandBus,
    private readonly typeFactory: TypeFactory,
    private readonly migrationDataService: MigrationDataService,
  ) {
    this.adminData = this.getMergedData
  }

  async execute(command: ImportAdminDataCommand) {
    const { owner } = command

    /**
     * System types must be seeded first, so other types can reference it
     */
    await this.importSystemTypes(owner)

    await this.importTags(owner)

    await this.importAtoms(owner)

    await this.importComponents(owner)
  }

  private async importComponents(owner: IAuth0User) {
    return this.commandBus.execute(
      new ImportComponentsCommand(this.adminData.components, owner),
    )
  }

  private async importTags(owner: IAuth0User) {
    return this.tagRepository.seedTags(this.adminData.tags, owner)
  }

  private async importSystemTypes(owner: IAuth0User) {
    const { types } = JSON.parse(
      fs.readFileSync(this.migrationDataService.systemTypesFilePath, 'utf8'),
    ) as ITypesExport

    /**
     * Must do sequentially due to type dependency
     */
    for await (const type of types) {
      await this.typeFactory.save({ ...type, owner })
    }
  }

  private async importAtoms(owner: IAuth0User) {
    const importPromises = this.adminData.atoms.map((atomData) =>
      withTracing(
        'import-atom',
        () => this.importAtom(atomData, owner),
        (span) => {
          const attributes = pick(atomData.atom, ['name'])
          span.setAttributes(attributes)
        },
      )(),
    )

    await Promise.all(importPromises)
  }

  private async importAtom(
    { api, atom, fields, types }: IAtomExport,
    owner: IAuth0User,
  ) {
    // Create types first so they can be referenced
    for await (const type of types) {
      await this.typeFactory.save({ ...type, owner })
    }

    // Then api's
    await this.typeFactory.save({ ...api, owner })

    // Finally fields
    await Promise.all(fields.map((field) => this.fieldRepository.save(field)))

    await this.atomRepository.save({ ...atom, owner })
  }

  /**
   * Extract all the api's from atom file
   */
  get getMergedData(): IAdminDataExport {
    const atomFilenames = fs
      .readdirSync(this.migrationDataService.atomsPath)
      .filter((filename) => path.extname(filename) === '.json')

    const componentFilenames = fs.existsSync(
      this.migrationDataService.componentsPath,
    )
      ? fs
          .readdirSync(this.migrationDataService.componentsPath)
          .filter((filename) => path.extname(filename) === '.json')
      : []

    // Tag data is all in single file
    const tags = JSON.parse(
      fs.readFileSync(this.migrationDataService.tagsFilePath, 'utf8'),
    ) as Array<ITagDTO>

    const systemTypes = JSON.parse(
      fs.readFileSync(this.migrationDataService.systemTypesFilePath, 'utf8'),
    ) as ITypesExport

    const components = componentFilenames.map((filename) => {
      const content = fs.readFileSync(
        path.resolve(this.migrationDataService.componentsPath, filename),
        'utf8',
      )

      return JSON.parse(content) as IComponentExport
    })

    return atomFilenames.reduce(
      (adminData, filename) => {
        const content = fs.readFileSync(
          `${this.migrationDataService.atomsPath}/${filename}`,
          'utf8',
        )

        const atomExport = JSON.parse(content.toString()) as IAtomExport

        adminData.atoms.push(atomExport)

        return adminData
      },
      { atoms: [] as Array<IAtomExport>, components, systemTypes, tags },
    )
  }
}
