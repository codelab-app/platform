import type {
  IAdminDataExport,
  IAtomExport,
  ITypesExport,
} from '@codelab/backend/abstract/core'
import { ExportAtomsCommand } from '@codelab/backend/application/atom'
// import { exportTags } from '@codelab/backend/application/tag'
import {
  // exportAtomApis,
  ExportSystemTypesCommand,
} from '@codelab/backend/application/type'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { flattenWithPrefix } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import type { IBaseDataPaths } from '../migration-data.service'
import { MigrationDataService } from '../migration-data.service'

@Injectable()
export class ExportAdminDataCommand implements IBaseDataPaths {
  constructor(public baseDataPaths?: string) {}
}

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
@CommandHandler(ExportAdminDataCommand)
export class ExportAdminDataHandler
  implements ICommandHandler<ExportAdminDataCommand, IAdminDataExport>
{
  constructor(
    private readonly migrationDataService: MigrationDataService,
    private commandBus: CommandBus,
    private traceService: TraceService,
  ) {}

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
      ITypesExport
    >(new ExportSystemTypesCommand())

    span.addEvent('SystemTypes', flattenWithPrefix(systemTypes))

    const atoms = await this.commandBus.execute<
      ExportAtomsCommand,
      Array<IAtomExport>
    >(new ExportAtomsCommand())

    // const tags = await this.commandBus.execute<
    //   ExportTagsCommand,
    //   Array<ITagDTO>
    // >(new ExportTagsCommand())

    // const components = await this.commandBus.execute<
    //   ExportComponentsCommand,
    //   Array<IComponentExport>
    // >(new ExportComponentsCommand())

    const data = {
      atoms,
      components: [],
      systemTypes,
      tags: [],
    }

    return this.migrationDataService.saveData(data)
  }
}
