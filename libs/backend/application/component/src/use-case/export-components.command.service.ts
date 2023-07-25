import {
  type ComponentWhere,
  SortDirection,
} from '@codelab/backend/abstract/codegen'
import type { IComponentExport } from '@codelab/backend/abstract/core'
import { ExportTypesCommand } from '@codelab/backend/application/type'
import type { ComponentRepository } from '@codelab/backend/domain/component'
import { getElementWithDescendants } from '@codelab/backend/domain/element'
import type {
  FieldRepository,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import type { CommandBus, ICommandHandler } from '@nestjs/cqrs'

export class ExportComponentsCommand {
  constructor(public where?: ComponentWhere) {}
}

export class ExportComponentsHandler
  implements ICommandHandler<ExportComponentsCommand, Array<IComponentExport>>
{
  constructor(
    private componentRepository: ComponentRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private fieldRepository: FieldRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ExportComponentsCommand) {
    const { where } = command

    const components = await this.componentRepository.find({
      where,
    })

    return Promise.all(
      components.map(async (component) => {
        const descendantElements = await getElementWithDescendants(
          component.rootElement.id,
        )

        const apis = await this.commandBus.execute(
          new ExportTypesCommand({
            typeIds: [],
          }),
        )
        // const apis = await exportAtomApis()

        const { fields = [], types } = await this.commandBus.execute(
          new ExportTypesCommand({
            typeIds: [component.api],
          }),
        )

        return {
          component,
          descendantElements,
          fields,
          types,
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
