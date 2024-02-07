import { ImportComponentsCommand } from '@codelab/backend/application/component'
import { ImportPageCommand } from '@codelab/backend/application/page'
import { AppRepository } from '@codelab/backend/domain/app'
import { DomainRepository } from '@codelab/backend/domain/domain'
import { PropRepository } from '@codelab/backend/domain/prop'
import { ResourceRepository } from '@codelab/backend/domain/resource'
import type { IAppExport, IOwner } from '@codelab/shared/abstract/core'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ImportAppCommand {
  constructor(public readonly app: IAppExport, public readonly owner: IOwner) {}
}

@CommandHandler(ImportAppCommand)
export class ImportAppHandler implements ICommandHandler<ImportAppCommand> {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly resourceRepository: ResourceRepository,
    private readonly propRepository: PropRepository,
    private readonly commandBus: CommandBus,
    private domainRepository: DomainRepository,
  ) {}

  async execute(command: ImportAppCommand) {
    const {
      components = [],
      domains,
      pages,
      resources = [],
      ...app
    } = command.app

    await this.appRepository.add([app])

    for (const resource of resources) {
      await this.propRepository.save(resource.config)
      await this.resourceRepository.save(resource)
    }

    for (const component of components) {
      await this.commandBus.execute<ImportComponentsCommand>(
        new ImportComponentsCommand(component),
      )
    }

    for (const domain of domains) {
      await this.domainRepository.save(domain)
    }

    for (const page of pages) {
      await this.commandBus.execute<ImportPageCommand>(
        new ImportPageCommand(page),
      )
    }

    return app
  }
}
