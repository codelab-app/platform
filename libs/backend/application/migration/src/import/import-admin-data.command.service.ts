import { type IAtomOutputDto } from '@codelab/backend/abstract/core'
import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { type IAuth0User } from '@codelab/shared/abstract/core'
import {
  flattenWithPrefix,
  Span,
  withActiveSpan,
} from '@codelab/shared/infra/otel'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import type { IBaseDataPaths } from '../migration-data.service'
import { MigrationDataService } from '../migration-data.service'
import { ReadAdminDataService } from './read-admin-data.service'

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
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly atomRepository: AtomRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly commandBus: CommandBus,
    private readonly typeFactory: TypeFactory,
    private readonly migrationDataService: MigrationDataService,
    private readonly traceService: TraceService,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  @Span()
  async execute(command: ImportAdminDataCommand) {
    const { owner } = command
    /**
     * System types must be seeded first, so other types can reference it
     */
    await this.importSystemTypes(owner)

    await this.importTags(owner)

    await this.importAtoms(owner)

    // await this.importComponents(owner)
  }

  private async importComponents(owner: IAuth0User) {
    for (const component of this.readAdminDataService.components) {
      await this.commandBus.execute(
        new ImportComponentsCommand(component, owner),
      )
    }
  }

  @Span()
  private async importTags(owner: IAuth0User) {
    return this.tagRepository.seedTags(this.readAdminDataService.tags, owner)
  }

  @Span()
  private async importSystemTypes(owner: IAuth0User) {
    const { types } = this.readAdminDataService.systemTypes

    /**
     * Must do sequentially due to type dependency
     */
    for (const type of types) {
      await this.typeFactory.save({ ...type, owner })
    }
  }

  private async importAtoms(owner: IAuth0User) {
    for (const atomData of this.readAdminDataService.atoms) {
      // const attributes = pick(atomData.atom, ['name'])
      // this.traceService.getSpan()?.setAttributes(attributes)
      await withActiveSpan(`${atomData.atom.name}`, () =>
        this.importAtom(atomData, owner),
      )
    }
  }

  @Span()
  private async importAtom(atomOutput: IAtomOutputDto, owner: IAuth0User) {
    const span = this.traceService.getSpan()
    span?.setAttributes(flattenWithPrefix(atomOutput))

    await this.commandBus.execute<ImportAtomCommand>(
      new ImportAtomCommand(atomOutput, owner),
    )
  }
}
