import type { IAppOutputDto } from '@codelab/backend/abstract/core'
import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { ImportPageCommand } from '@codelab/backend/application/page'
import { AppRepository } from '@codelab/backend/domain/app'
import { DomainRepository } from '@codelab/backend/domain/domain'
import type { IAuth0User } from '@codelab/shared/abstract/core'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportAppCommand {
  constructor(
    public readonly appExport: IAppOutputDto,
    public readonly owner: IAuth0User,
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
      appExport: { app, components, domains, pages },
      owner,
    } = command

    for (const page of pages) {
      await this.commandBus.execute<ImportPageCommand>(
        new ImportPageCommand(page, owner),
      )
    }

    for (const component of components) {
      await this.commandBus.execute<ImportComponentsCommand>(
        new ImportComponentsCommand(component, owner),
      )
    }

    for (const domain of domains) {
      await this.domainRepository.save(domain)
    }

    await this.appRepository.add([{ ...app, owner }])

    return app
  }
}
