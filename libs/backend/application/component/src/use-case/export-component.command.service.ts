import type {
  IApiOutputDto,
  IComponentOutputDto,
  IElementOutputDto,
} from '@codelab/backend/abstract/core'
import { ExportStoreCommand } from '@codelab/backend/application/store'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { throwIfUndefined } from '@codelab/shared/utils'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'

export class ExportComponentCommand {
  constructor(public componentId: string) {}
}

@CommandHandler(ExportComponentCommand)
export class ExportComponentHandler
  implements ICommandHandler<ExportComponentCommand, IComponentOutputDto>
{
  constructor(
    private componentRepository: ComponentRepository,
    private elementRepository: ElementRepository,
    private commandBus: CommandBus,
  ) {}

  @Span()
  async execute({ componentId }: ExportComponentCommand) {
    const component = throwIfUndefined(
      await this.componentRepository.findOne({
        id: componentId,
      }),
    )

    const descendantElements: Array<IElementOutputDto> = (
      await this.elementRepository.getElementWithDescendants(
        component.rootElement.id,
      )
    ).map((element) => ({
      ...element,
      renderType: {
        __typename: throwIfUndefined(element.renderType.__typename),
        id: element.renderType.id,
      },
    }))

    const api = await this.commandBus.execute<ExportApiCommand, IApiOutputDto>(
      new ExportApiCommand(component.api),
    )

    const store = await this.commandBus.execute<ExportStoreCommand>(
      new ExportStoreCommand({ id: component.store.id }),
    )

    // complex data types are exported separately, no need to include them in component as well
    const componentToExport = {
      ...component,
      api: {
        __typename: api.__typename,
        id: api.id,
      },
      rootElement: {
        id: component.rootElement.id,
      },
      store: {
        id: component.store.id,
      },
    }

    return {
      api,
      component: componentToExport,
      descendantElements,
      store,
    }
  }

  // async getAtomApis() {
  //   const interfaceTypes = await this.interfaceTypeRepository.find({
  //     options: {
  //       sort: [{ name: SortDirection.Asc }],
  //     },
  //     where: {
  //       apiOfAtomsAggregate: {
  //         count_GTE: 0,
  //       },
  //     },
  //   })

  //   const fields = await this.fieldRepository.find({
  //     options: {
  //       sort: [{ key: SortDirection.Asc }],
  //     },
  //     where: {
  //       api: {
  //         id_IN: interfaceTypes.map((api) => api.id),
  //       },
  //     },
  //   })
  // }
}
