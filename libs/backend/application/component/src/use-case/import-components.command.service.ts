import { ImportStoreCommand } from '@codelab/backend/application/store'
import { ImportApiCommand } from '@codelab/backend/application/type'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropRepository } from '@codelab/backend/domain/prop'
import type { IComponentExport } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportComponentsCommand {
  constructor(public readonly component: IComponentExport) {}
}

@CommandHandler(ImportComponentsCommand)
export class ImportComponentsHandler
  implements ICommandHandler<ImportComponentsCommand, void>
{
  constructor(
    private readonly elementRepository: ElementRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly propRepository: PropRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ImportComponentsCommand) {
    const { component } = command

    await this.propRepository.save(component.props)

    await this.commandBus.execute<ImportApiCommand>(
      new ImportApiCommand(component.api),
    )

    await this.commandBus.execute<ImportStoreCommand>(
      new ImportStoreCommand(component.store),
    )

    for (const element of component.elements) {
      await this.propRepository.save(element.props)
      await this.elementRepository.save(element)
    }

    await this.componentRepository.save(component)
  }
}
