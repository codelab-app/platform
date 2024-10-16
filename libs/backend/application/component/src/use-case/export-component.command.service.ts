import type { Element } from '@codelab/backend/abstract/codegen'
import type {
  IApi,
  IComponentAggregate,
  IStoreAggregate,
} from '@codelab/shared/abstract/core'

import { ExportStoreCommand } from '@codelab/backend/application/store'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ExportComponentCommand {
  constructor(public componentId: string) {}
}

@CommandHandler(ExportComponentCommand)
export class ExportComponentHandler
  implements ICommandHandler<ExportComponentCommand, IComponentAggregate>
{
  constructor(
    private componentRepository: ComponentRepository,
    private elementRepository: ElementRepository,
    private commandBus: CommandBus,
  ) {}

  async execute({ componentId }: ExportComponentCommand) {
    const component = await this.componentRepository.findOneOrFail({
      where: {
        id: componentId,
      },
    })

    const elements = (
      await this.elementRepository.getElementWithDescendants(
        component.rootElement.id,
      )
    ).map((element: Element) => ({
      ...element,
      renderType: {
        __typename: element.renderType.__typename,
        id: element.renderType.id,
      },
    }))

    const store = await this.commandBus.execute<
      ExportStoreCommand,
      IStoreAggregate
    >(new ExportStoreCommand({ id: component.store.id }))

    const api = await this.commandBus.execute<ExportApiCommand, IApi>(
      new ExportApiCommand(component.api),
    )

    return {
      api,
      component,
      elements,
      store,
    }
  }
}
