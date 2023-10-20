import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { ImportPageCommand } from '@codelab/backend/application/page'
import { AppRepository } from '@codelab/backend/domain/app'
import { DomainRepository } from '@codelab/backend/domain/domain'
import type { IAppBoundedContext, IOwner } from '@codelab/shared/abstract/core'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportAppCommand {
  constructor(
    public readonly app: IAppBoundedContext,
    public readonly owner: IOwner,
  ) {}
}

@CommandHandler(ImportAppCommand)
export class ImportAppHandler implements ICommandHandler<ImportAppCommand> {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly commandBus: CommandBus,
    private domainRepository: DomainRepository,
  ) {}

  async execute(command: ImportAppCommand) {
    const {
      app: { app, components, pages },
    } = command

    const { domains } = app

    for (const page of pages) {
      await this.commandBus.execute<ImportPageCommand>(
        new ImportPageCommand(page),
      )
    }

    for (const component of components) {
      await this.commandBus.execute<ImportComponentsCommand>(
        new ImportComponentsCommand(component),
      )
    }

    for (const domain of domains) {
      await this.domainRepository.save(domain)
    }

    await this.appRepository.add([app])

    return app
  }
}
