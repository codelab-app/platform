import type { IBaseDataPaths } from '@codelab/backend-application-data'

import { IImportOptions } from '@codelab/backend-abstract-types'
import { AtomApplicationService } from '@codelab/backend-application-atom'
import { ComponentApplicationService } from '@codelab/backend-application-component'
import { ReadAdminDataService } from '@codelab/backend-application-data'
import { ImportTagsCommand } from '@codelab/backend-application-tag'
import { ImportSystemTypesCommand } from '@codelab/backend-application-type'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { LogClassMethod } from '@codelab/backend-infra-core'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportAdminDataCommand implements IBaseDataPaths {
  constructor(public baseDataPath: string, public options: IImportOptions) {}
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
    // Required by `LogClassMethod`
    private readonly logger: PinoLoggerService,
    private readonly readAdminDataService: ReadAdminDataService,
    private readonly atomApplicationService: AtomApplicationService,
    private readonly componentApplicationService: ComponentApplicationService,
  ) {}

  async execute({ baseDataPath, options }: ImportAdminDataCommand) {
    if (baseDataPath) {
      this.readAdminDataService.migrationDataService.basePaths = baseDataPath
    }

    /**
     * System types must be seeded first, so other types can reference it
     */

    await this.importSystemTypes()

    await this.importTags()

    await this.importAtoms(options)

    await this.importComponents(options)
  }

  @LogClassMethod()
  private async importAtoms({ upsert }: IImportOptions) {
    const atoms = this.readAdminDataService.atoms

    if (!upsert) {
      return await this.atomApplicationService.addAtoms(atoms)
    }

    return await this.atomApplicationService.saveAtoms(atoms)
  }

  @LogClassMethod()
  private async importComponents({ upsert }: IImportOptions) {
    const components = this.readAdminDataService.components

    if (upsert) {
      return await this.componentApplicationService.saveComponents(components)
    }

    return await this.componentApplicationService.addComponents(components)
  }

  @LogClassMethod()
  private async importSystemTypes() {
    return this.commandBus.execute<ImportSystemTypesCommand>(
      new ImportSystemTypesCommand(),
    )
  }

  @LogClassMethod()
  private async importTags() {
    const { tags } = this.readAdminDataService

    return this.commandBus.execute<ImportTagsCommand>(
      new ImportTagsCommand(tags),
    )
  }
}
