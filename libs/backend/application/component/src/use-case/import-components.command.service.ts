import type { IComponentExport } from '@codelab/backend/abstract/core'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { FieldRepository, TypeFactory } from '@codelab/backend/domain/type'
import type { IAuth0User } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ImportComponentsCommand {
  constructor(
    public readonly components: Array<IComponentExport>,
    public readonly owner: IAuth0User,
  ) {}
}

@CommandHandler(ImportComponentsCommand)
export class ImportComponentsHandler
  implements ICommandHandler<ImportComponentsCommand, void>
{
  constructor(
    private readonly fieldRepository: FieldRepository,
    private readonly elementRepository: ElementRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

  async execute(command: ImportComponentsCommand) {
    const { components, owner } = command

    for await (const {
      component,
      descendantElements,
      fields,
      types,
    } of components) {
      for await (const type of types) {
        await this.typeFactory.save({ ...type, owner })
      }

      for await (const field of fields) {
        await this.fieldRepository.save(field)
      }

      for await (const element of descendantElements) {
        await this.elementRepository.save(element)
      }

      await this.componentRepository.save({ ...component, owner })
    }
  }
}
