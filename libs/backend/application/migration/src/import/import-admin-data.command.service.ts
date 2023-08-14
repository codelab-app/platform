import {
  type IAdminDataExport,
  type IAtomExport,
  type IComponentExport,
  type ITypesExport,
} from '@codelab/backend/abstract/core'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { type IAuth0User, type ITagDTO } from '@codelab/shared/abstract/core'
import {
  flattenWithPrefix,
  Span,
  withActiveSpan,
  withBoundContext,
} from '@codelab/shared/infra/otel'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { context } from '@opentelemetry/api'
import { getSpan } from '@opentelemetry/api/build/src/trace/context-utils'
import { AsyncLocalStorage } from 'async_hooks'
import fs from 'fs'
import pick from 'lodash/pick'
import path from 'path'
import type { IBaseDataPaths } from '../migration-data.service'
import { MigrationDataService } from '../migration-data.service'

export class ImportAdminDataCommand implements IBaseDataPaths {
  constructor(public owner: IAuth0User, public baseDataPaths?: string) {}
}

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
    private readonly commandBus: CommandBus,
    private readonly typeFactory: TypeFactory,
    private readonly migrationDataService: MigrationDataService,
    private readonly traceService: TraceService,
    private readonly als: AsyncLocalStorage<unknown>,
  ) {
    this.adminData = this.getMergedData
  }

  @Span()
  async execute(command: ImportAdminDataCommand) {
    const { owner } = command
    /**
     * System types must be seeded first, so other types can reference it
     */

    await this.importSystemTypes(owner)

    await this.importTags(owner)

    await this.importAtoms(owner)

    await this.importAtoms(owner)

    await this.importAtoms(owner)

    // await this.importComponents(owner)
  }

  private async importComponents(owner: IAuth0User) {
    return this.commandBus.execute(
      new ImportComponentsCommand(this.adminData.components, owner),
    )
  }

  @Span()
  private async importTags(owner: IAuth0User) {
    return this.tagRepository.seedTags(this.adminData.tags, owner)
  }

  @Span()
  private async importSystemTypes(owner: IAuth0User) {
    const { types } = JSON.parse(
      fs.readFileSync(this.migrationDataService.systemTypesFilePath, 'utf8'),
    ) as ITypesExport

    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.save({ ...type, owner })
    }
  }

  @Span()
  private async importAtoms(owner: IAuth0User) {
    for (const atomData of this.adminData.atoms) {
      // const attributes = pick(atomData.atom, ['name'])
      // this.traceService.getSpan()?.setAttributes(attributes)
      await this.importAtom(atomData, owner)
    }
  }

  /**
   * Maybe issue is too many spans.
   *
   * 3915: okay
   * 4886: not good
   *
   */
  @Span()
  private async importAtom(
    { api, atom, fields, types }: IAtomExport,
    owner: IAuth0User,
  ) {
    const span = this.traceService.getSpan()
    span?.setAttributes(flattenWithPrefix(atom))

    // Create types first so they can be referenced
    for (const type of types) {
      await this.typeFactory.save({ ...type, owner })
    }

    // Then api's
    await this.typeFactory.save({ ...api, owner })

    // Finally fields
    for (const field of fields) {
      await this.fieldRepository.save(field)
    }

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
