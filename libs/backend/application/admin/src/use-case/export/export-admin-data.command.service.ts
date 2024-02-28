import { AtomApplicationService } from '@codelab/backend/application/atom'
import { ComponentApplicationService } from '@codelab/backend/application/component'
import type { IBaseDataPaths } from '@codelab/backend/application/data'
import { WriteAdminDataService } from '@codelab/backend/application/data'
import { ExportTagsCommand } from '@codelab/backend/application/tag'
import { ExportSystemTypesCommand } from '@codelab/backend/application/type'
import { Span, TraceService } from '@codelab/backend/infra/adapter/otel'
import type {
  IAdminAggregate,
  ITag,
  IType,
} from '@codelab/shared/abstract/core'
import { flattenWithPrefix } from '@codelab/shared/infra/otel'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportAdminDataCommand implements IBaseDataPaths {
  constructor(public baseDataPaths?: string) {}
}

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
@CommandHandler(ExportAdminDataCommand)
export class ExportAdminDataHandler
  implements ICommandHandler<ExportAdminDataCommand, IAdminAggregate>
{
  constructor(
    private writeAdminDataService: WriteAdminDataService,
    private commandBus: CommandBus,
    private traceService: TraceService,
    private atomApplicationService: AtomApplicationService,
    private componentApplicationService: ComponentApplicationService,
  ) {}

  @Span()
  async execute({ baseDataPaths }: ExportAdminDataCommand) {
    const span = this.traceService.getSpan()

    span?.setAttributes(flattenWithPrefix({ baseDataPaths }))

    if (baseDataPaths) {
      span?.addEvent('Add baseDataPath')
      this.writeAdminDataService.migrationDataService.basePaths = baseDataPaths
    }

    const systemTypes = await this.commandBus.execute<
      ExportSystemTypesCommand,
      Array<IType>
    >(new ExportSystemTypesCommand())

    span?.addEvent('SystemTypes', flattenWithPrefix(systemTypes))

    const atoms = await this.atomApplicationService.exportAtomsForAdmin()

    const tags = await this.commandBus.execute<ExportTagsCommand, Array<ITag>>(
      new ExportTagsCommand(),
    )

    const components =
      await this.componentApplicationService.exportComponentsForAdmin()

    const data: IAdminAggregate = {
      atoms,
      components,
      systemTypes,
      tags,
    }

    return await this.writeAdminDataService.saveData(data)
  }
}
