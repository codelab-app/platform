import type {
  IApiOutputDto,
  IComponentOutputDto,
  IElementOutputDto,
} from '@codelab/backend/abstract/core'
import { ExportStoreCommand } from '@codelab/backend/application/store'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import {
  FieldRepository,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
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
    private interfaceTypeRepository: InterfaceTypeRepository,
    private fieldRepository: FieldRepository,
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
        id: element.id,
      },
    }))

    const api = await this.commandBus.execute<ExportApiCommand, IApiOutputDto>(
      new ExportApiCommand(component.api),
    )

    const store = await this.commandBus.execute<ExportStoreCommand>(
      new ExportStoreCommand({ id: component.store.id }),
    )

    return {
      api,
      component,
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
