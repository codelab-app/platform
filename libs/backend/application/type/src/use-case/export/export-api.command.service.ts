import type { IApiOutputDto } from '@codelab/backend/abstract/core'
import {
  FieldRepository,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import type { IApiEntity } from '@codelab/shared/abstract/core'
import { IInterfaceTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { Span } from '@codelab/shared/infra/otel'
import { Typebox } from '@codelab/shared/infra/validation'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportApiCommand {
  constructor(public api: IApiEntity) {}
}

/**
 * Export top level types and all nested types. The dependency of the types should be ordered
 */
@CommandHandler(ExportApiCommand)
export class ExportApiHandler
  implements ICommandHandler<ExportApiCommand, IApiOutputDto>
{
  constructor(
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly fieldRepository: FieldRepository,
  ) {}

  @Span()
  async execute(command: ExportApiCommand): Promise<IApiOutputDto> {
    const { api } = command

    /**
     * (1) Get itself
     */
    const interfaceType = await this.interfaceTypeRepository.findOne(
      {
        id: api.id,
      },
      Typebox.OmitOwner(IInterfaceTypeDTO),
    )

    if (!interfaceType) {
      throw new Error('InterfaceType not found')
    }

    /**
     * (2) Get all dependent types first
     */
    const nestedTypes = await this.interfaceTypeRepository.getDependentTypes(
      api,
    )

    const interfaceTypes = nestedTypes.filter(
      (type): type is IInterfaceTypeDTO =>
        type.__typename === `${ITypeKind.InterfaceType}`,
    )

    const fieldIds = interfaceTypes.reduce(
      (accFieldIds, { id }) => ({
        ...accFieldIds,
        id,
      }),
      [] as Array<string>,
    )

    const fields = await this.fieldRepository.find({
      where: { id_IN: fieldIds },
    })

    return {
      ...interfaceType,
      fields,
      types: [interfaceType, ...nestedTypes],
    }
  }
}
