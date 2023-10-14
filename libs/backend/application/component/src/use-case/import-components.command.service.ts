import type { IComponentOutputDto } from '@codelab/backend/abstract/core'
import { ImportStoreCommand } from '@codelab/backend/application/store'
import { ImportApiCommand } from '@codelab/backend/application/type'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropRepository } from '@codelab/backend/domain/prop'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportComponentsCommand {
  constructor(public readonly componentExport: IComponentOutputDto) {}
}

@CommandHandler(ImportComponentsCommand)
export class ImportComponentsHandler
  implements ICommandHandler<ImportComponentsCommand, void>
{
  constructor(
    private readonly elementRepository: ElementRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly propRepository: PropRepository,
    private readonly authDomainService: AuthDomainService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ImportComponentsCommand) {
    const {
      componentExport: { api, component, descendantElements, store },
    } = command

    await this.propRepository.save(component.props)

    await this.commandBus.execute<ImportApiCommand>(new ImportApiCommand(api))

    await this.commandBus.execute<ImportStoreCommand>(
      new ImportStoreCommand(store),
    )

    for await (const element of descendantElements) {
      await this.propRepository.save(element.props)
      await this.elementRepository.save(element)
    }

    await this.componentRepository.save({
      ...component,
      owner: this.authDomainService.currentUser,
    })
  }
}
