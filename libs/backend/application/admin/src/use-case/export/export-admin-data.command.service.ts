import { SortDirection } from '@codelab/backend/abstract/codegen'
import type {
  IAdminOutputDto,
  IAtomOutputDto,
  IComponentOutputDto,
  ITagOutputDto,
  ITypeOutputDto,
} from '@codelab/backend/abstract/core'
import {
  AtomApplicationService,
  ExportAtomCommand,
} from '@codelab/backend/application/atom'
import {
  ComponentApplicationService,
  ExportComponentCommand,
} from '@codelab/backend/application/component'
import { ExportTagsCommand } from '@codelab/backend/application/tag'
import { ExportSystemTypesCommand } from '@codelab/backend/application/type'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { IRole } from '@codelab/shared/abstract/core'
import { flattenWithPrefix, Span } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import type { IBaseDataPaths } from '../../services/migration-data.service'
import { MigrationDataService } from '../../services/migration-data.service'
import { WriteAdminDataService } from './write-admin-data.service'

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
    private writeAdminDataService: WriteAdminDataService,
    private commandBus: CommandBus,
    private traceService: TraceService,
    private atomApplicationService: AtomApplicationService,
    private componentApplicationService: ComponentApplicationService,
  ) {}

  @Span()
  async execute({ baseDataPaths }: ExportAdminDataCommand) {
    const span = this.traceService.getSpan()!

    span.setAttributes(flattenWithPrefix({ baseDataPaths }))

    if (baseDataPaths) {
      span.addEvent('Add baseDataPath')
      this.writeAdminDataService.migrationDataService.basePaths = baseDataPaths
    }

    const systemTypes = await this.commandBus.execute<
      ExportSystemTypesCommand,
      Array<ITypeOutputDto>
    >(new ExportSystemTypesCommand())

    span.addEvent('SystemTypes', flattenWithPrefix(systemTypes))

    const atoms = await this.atomApplicationService.exportAtomsForAdmin()

    const tags = await this.commandBus.execute<
      ExportTagsCommand,
      Array<ITagOutputDto>
    >(new ExportTagsCommand())

    const components =
      await this.componentApplicationService.exportComponentsForAdmin()

    const data = {
      atoms,
      components,
      systemTypes,
      tags,
    }

    return this.writeAdminDataService.saveData(data)
  }
}
