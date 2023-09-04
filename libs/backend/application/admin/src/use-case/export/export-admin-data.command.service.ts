import type {
  IAdminOutputDto,
  IAtomOutputDto,
  IComponentOutputDto,
  ITagOutputDto,
  ITypeOutputDto,
} from '@codelab/backend/abstract/core'
import { ExportAtomsCommand } from '@codelab/backend/application/atom'
import { ExportComponentsCommand } from '@codelab/backend/application/component'
import { ExportTagsCommand } from '@codelab/backend/application/tag'
import { ExportSystemTypesCommand } from '@codelab/backend/application/type'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { IRole } from '@codelab/shared/abstract/core'
import { flattenWithPrefix, Span } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import type { IBaseDataPaths } from '../../services/migration-data.service'
import { MigrationDataService } from '../../services/migration-data.service'
import { WriteAdminDataService } from './write-admin-data.service'

@Injectable()
export class ExportAdminDataCommand implements IBaseDataPaths {
  constructor(public baseDataPaths?: string) {}
}

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
@CommandHandler(ExportAdminDataCommand)
export class ExportAdminDataHandler
  implements ICommandHandler<ExportAdminDataCommand, IAdminOutputDto>
{
  constructor(
    private readonly migrationDataService: MigrationDataService,
    private writeAdminDataService: WriteAdminDataService,
    private commandBus: CommandBus,
    private traceService: TraceService,
  ) {}

  @Span()
  async execute(command: ExportAdminDataCommand) {
    const span = this.traceService.getSpan()!

    span.setAttributes(flattenWithPrefix(command))

    const { baseDataPaths } = command

    if (baseDataPaths) {
      span.addEvent('Add baseDataPath')
      this.migrationDataService.basePaths = baseDataPaths
    }

    const systemTypes = await this.commandBus.execute<
      ExportSystemTypesCommand,
      Array<ITypeOutputDto>
    >(new ExportSystemTypesCommand())

    span.addEvent('SystemTypes', flattenWithPrefix(systemTypes))

    const atoms = await this.commandBus.execute<
      ExportAtomsCommand,
      Array<IAtomOutputDto>
    >(new ExportAtomsCommand())

    const tags = await this.commandBus.execute<
      ExportTagsCommand,
      Array<ITagOutputDto>
    >(new ExportTagsCommand())

    const components = await this.commandBus.execute<
      ExportComponentsCommand,
      Array<IComponentOutputDto>
    >(
      new ExportComponentsCommand({
        owner: {
          roles_INCLUDES: IRole.Admin,
        },
      }),
    )

    const data = {
      atoms,
      components,
      systemTypes,
      tags,
    }

    return this.writeAdminDataService.saveData(data)
  }
}
