import {
  type ComponentWhere,
  SortDirection,
} from '@codelab/backend/abstract/codegen'
import type {
  IApiOutputDto,
  IComponentOutputDto,
  IElementOutputDto,
} from '@codelab/backend/abstract/core'
import { ExportStoreCommand } from '@codelab/backend/application/store'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { StoreRepository } from '@codelab/backend/domain/store'
import {
  FieldRepository,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ExportComponentsCommand {
  constructor(public where: ComponentWhere) {}
}

@CommandHandler(ExportComponentsCommand)
export class ExportComponentsHandler
  implements
    ICommandHandler<ExportComponentsCommand, Array<IComponentOutputDto>>
{
  constructor(
    private componentRepository: ComponentRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private fieldRepository: FieldRepository,
    private elementRepository: ElementRepository,
    private storeRepository: StoreRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ExportComponentsCommand) {
    const { where } = command

    const components = await this.componentRepository.find({
      where,
    })

    return Promise.all(
      components.map(async (component) => {
        const descendantElements: Array<IElementOutputDto> =
          await this.elementRepository.getElementWithDescendants(
            component.rootElement.id,
          )

        const api = await this.commandBus.execute<
          ExportApiCommand,
          IApiOutputDto
        >(new ExportApiCommand(component.api))

        const store = await this.commandBus.execute<ExportStoreCommand>(
          new ExportStoreCommand({ id: component.store.id }),
        )

        return {
          api,
          component,
          descendantElements,
          store,
        }
      }),
    )
  }

  async getAtomApis() {
    const interfaceTypes = await this.interfaceTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      where: {
        apiOfAtomsAggregate: {
          count_GTE: 0,
        },
      },
    })

    const fields = await this.fieldRepository.find({
      options: {
        sort: [{ key: SortDirection.Asc }],
      },
      where: {
        api: {
          id_IN: interfaceTypes.map((api) => api.id),
        },
      },
    })
  }
}
