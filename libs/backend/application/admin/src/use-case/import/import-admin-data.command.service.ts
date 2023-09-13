import { type IAtomOutputDto } from '@codelab/backend/abstract/core'
import { ImportAtomCommand } from '@codelab/backend/application/atom'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { ImportTagsCommand } from '@codelab/backend/application/tag'
import { ImportSystemTypesCommand } from '@codelab/backend/application/type'
import {
  Span,
  TraceService,
  withActiveSpan,
} from '@codelab/backend/infra/adapter/otel'
import { flattenWithPrefix } from '@codelab/shared/infra/otel'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import type { IBaseDataPaths } from '../../services/migration-data.service'
import { ReadAdminDataService } from './read-admin-data.service'

export class ImportAdminDataCommand implements IBaseDataPaths {
  constructor(public baseDataPaths?: string) {}
}

/**
 * During `save`, we'll want to replace the owner with the current
 */
@CommandHandler(ImportAdminDataCommand)
export class ImportAdminDataHandler
  implements ICommandHandler<ImportAdminDataCommand, void>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly traceService: TraceService,
    private readonly readAdminDataService: ReadAdminDataService,
  ) {}

  @Span()
  async execute({ baseDataPaths }: ImportAdminDataCommand) {
    if (baseDataPaths) {
      this.readAdminDataService.migrationDataService.basePaths = baseDataPaths
    }

    /**
     * System types must be seeded first, so other types can reference it
     */
    await this.importSystemTypes()

    await this.importTags()

    await this.importAtoms()

    // await this.importComponents(owner)
  }

  private async importComponents() {
    for (const component of this.readAdminDataService.components) {
      await this.commandBus.execute(new ImportComponentsCommand(component))
    }
  }

  @Span()
  private async importTags() {
    const { tags } = this.readAdminDataService

    return this.commandBus.execute<ImportTagsCommand, void>(
      new ImportTagsCommand(tags),
    )
  }

  @Span()
  private async importSystemTypes() {
    const types = this.readAdminDataService.systemTypes

    return this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(types),
    )
  }

  private async importAtoms() {
    for (const atomData of this.readAdminDataService.atoms) {
      // const attributes = pick(atomData.atom, ['name'])
      // this.traceService.getSpan()?.setAttributes(attributes)
      await withActiveSpan(`${atomData.atom.name}`, () =>
        this.importAtom(atomData),
      )
    }
  }

  @Span()
  private async importAtom(atomOutput: IAtomOutputDto) {
    const span = this.traceService.getSpan()
    span?.setAttributes(flattenWithPrefix(atomOutput))

    await this.commandBus.execute<ImportAtomCommand>(
      new ImportAtomCommand(atomOutput),
    )
  }
}
