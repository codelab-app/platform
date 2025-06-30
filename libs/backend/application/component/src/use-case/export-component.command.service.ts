import type {
  IApiAggregate,
  IComponentAggregate,
  IStoreAggregate,
} from '@codelab/shared-abstract-core'

import { ExportStoreCommand } from '@codelab/backend-application-store'
import { ExportApisCommand } from '@codelab/backend-application-type'
import {
  ComponentElementsService,
  ComponentRepository,
} from '@codelab/backend-domain-component'
import {
  ComponentDtoSchema,
  ElementExportSchema,
  ITypeKind,
} from '@codelab/shared-abstract-core'
import { ComponentFragment } from '@codelab/shared-infra-gqlgen'
import { Validator } from '@codelab/shared-infra-typebox'
import { CommandBus, CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { Type } from '@sinclair/typebox'

export class ExportComponentCommand {
  constructor(public componentId: string) {}
}

@CommandHandler(ExportComponentCommand)
export class ExportComponentHandler
  implements ICommandHandler<ExportComponentCommand, IComponentAggregate>
{
  constructor(
    private componentRepository: ComponentRepository,
    private componentElementsService: ComponentElementsService,
    private commandBus: CommandBus,
  ) {}

  async execute({
    componentId,
  }: ExportComponentCommand): Promise<IComponentAggregate> {
    const component = await this.componentRepository.findOneOrFail({
      schema: Type.Omit(ComponentDtoSchema, ['owner']),
      where: { id: componentId },
    })

    const elements = (
      await this.componentElementsService.getElements(
        component as ComponentFragment,
      )
    ).map((element) =>
      Validator.parse(ElementExportSchema, {
        ...element,
        closestContainerNode: { id: componentId },
        renderType: {
          __typename: element.renderType.__typename,
          id: element.renderType.id,
        },
      }),
    )

    const store = await this.commandBus.execute<
      ExportStoreCommand,
      IStoreAggregate
    >(new ExportStoreCommand({ id: component.store.id }))

    const apis = await this.commandBus.execute<
      ExportApisCommand,
      Array<IApiAggregate>
    >(
      new ExportApisCommand([
        {
          __typename: ITypeKind.InterfaceType,
          id: component.api.id,
        },
      ]),
    )

    const api = apis[0]

    if (!api) {
      throw new Error(`API not found for component ${componentId}`)
    }

    return {
      api,
      component,
      elements,
      store,
    }
  }
}
