import type { IBaseDataPaths } from '@codelab/backend/application/data'
import type {
  IAdminExport,
  ITag,
  ITypeDtoWithoutOwner,
} from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { AtomApplicationService } from '@codelab/backend/application/atom'
import { ComponentApplicationService } from '@codelab/backend/application/component'
import { WriteAdminDataService } from '@codelab/backend/application/data'
import { ExportTagsCommand } from '@codelab/backend/application/tag'
import { ExportSystemTypesCommand } from '@codelab/backend/application/type'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportAdminDataCommand implements IBaseDataPaths {
  constructor(public baseDataPath?: string) {}
}

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
@CommandHandler(ExportAdminDataCommand)
export class ExportAdminDataHandler
  implements ICommandHandler<ExportAdminDataCommand, IAdminExport>
{
  constructor(
    private writeAdminDataService: WriteAdminDataService,
    private commandBus: CommandBus,
    private atomApplicationService: AtomApplicationService,
    private componentApplicationService: ComponentApplicationService,
  ) {}

  async execute({ baseDataPath }: ExportAdminDataCommand) {
    if (baseDataPath) {
      this.writeAdminDataService.migrationDataService.basePaths = baseDataPath
    }

    const systemTypes = await this.commandBus.execute<
      ExportSystemTypesCommand,
      Array<ITypeDtoWithoutOwner>
    >(new ExportSystemTypesCommand())

    const atoms = await this.atomApplicationService.exportAtomsForAdmin()

    const tags = await this.commandBus.execute<ExportTagsCommand, Array<ITag>>(
      new ExportTagsCommand(),
    )

    const components =
      await this.componentApplicationService.exportComponentsForAdmin()

    const data: IAdminExport = {
      atoms,
      components,
      systemTypes,
      tags,
    }

    return await this.writeAdminDataService.saveData(data)
  }
}
