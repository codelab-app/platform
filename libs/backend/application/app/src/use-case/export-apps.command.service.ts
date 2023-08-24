import type { AppWhere } from '@codelab/backend/abstract/codegen'
import type { IAppOutputDto } from '@codelab/backend/abstract/core'
import { ExportPageCommand } from '@codelab/backend/application/page'
import { AppRepository } from '@codelab/backend/domain/app'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportAppsCommand {
  constructor(public where: AppWhere) {}
}

@CommandHandler(ExportAppsCommand)
export class ExportAppsHandler
  implements ICommandHandler<ExportAppsCommand, Array<IAppOutputDto>>
{
  constructor(
    private readonly appRepository: AppRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ExportAppsCommand) {
    const { where } = command
    const apps = await this.appRepository.find({ where })

    return apps.reduce(async (appsData, app) => {
      const pages = await this.commandBus.execute<ExportPageCommand>(
        new ExportPageCommand(where),
      )

      const appExport: IAppOutputDto = {
        app,
        components: [],
        domains: app.domains,
        pages,
      }

      return [...(await appsData), appExport]
    }, Promise.resolve<Array<IAppOutputDto>>([]))
  }
}
