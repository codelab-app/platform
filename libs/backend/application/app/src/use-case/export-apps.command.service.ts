import type { AppWhere } from '@codelab/backend/abstract/codegen'
import { ExportPageCommand } from '@codelab/backend/application/page'
import { AppRepository } from '@codelab/backend/domain/app'
import type { IApp } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportAppsCommand {
  constructor(public where: AppWhere) {}
}

@CommandHandler(ExportAppsCommand)
export class ExportAppsHandler
  implements ICommandHandler<ExportAppsCommand, Array<IApp>>
{
  constructor(
    private readonly appRepository: AppRepository,
    private commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportAppsCommand) {
    const apps = await this.appRepository.find({ where })

    return apps.reduce(async (appsData, app) => {
      const pages = await this.commandBus.execute<ExportPageCommand>(
        new ExportPageCommand(where),
      )

      const appExport: IApp = {
        ...app,
        domains: [],
        pages,
      }

      return [...(await appsData), appExport]
    }, Promise.resolve<Array<IApp>>([]))
  }
}
