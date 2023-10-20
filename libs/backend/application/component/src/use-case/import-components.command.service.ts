import { ImportStoreCommand } from '@codelab/backend/application/store'
import { ImportApiCommand } from '@codelab/backend/application/type'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropRepository } from '@codelab/backend/domain/prop'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import type { IComponentBoundedContext } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportComponentsCommand {
  constructor(public readonly componentAggregate: IComponentBoundedContext) {}
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
      componentAggregate: { api, component },
    } = command

    const { descendantElements, rootElement, store } = component

    await this.propRepository.save(component.props)

    await this.commandBus.execute<ImportApiCommand>(new ImportApiCommand(api))

    await this.commandBus.execute<ImportStoreCommand>(
      new ImportStoreCommand(store),
    )

    for await (const element of [...descendantElements, rootElement]) {
      await this.propRepository.save(element.props)
      await this.elementRepository.save(element)
    }

    await this.componentRepository.save({
      ...component,
      owner: this.authDomainService.currentUser,
    })
  }
}
