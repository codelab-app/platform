import type { IApiOutputDto } from '@codelab/backend/abstract/core'
import { ITypeOutputDto } from '@codelab/backend/abstract/core'
import {
  FieldRepository,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import type { IInterfaceTypeEntity } from '@codelab/shared/abstract/core'
import {
  IFieldDTO,
  IInterfaceTypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Span } from '@codelab/shared/infra/otel'
import { Typebox } from '@codelab/shared/infra/validation'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportApiCommand {
  constructor(public api: IInterfaceTypeEntity) {}
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
  async execute({ api }: ExportApiCommand): Promise<IApiOutputDto> {
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

    const fields = await this.fieldRepository.find(
      {
        where: { id_IN: interfaceType.fields.map(({ id }) => id) },
      },
      IFieldDTO,
    )

    /**
     * (2) Get all dependent types first
     */
    const dependentTypes = await this.interfaceTypeRepository.getDependentTypes(
      api,
      ITypeOutputDto,
    )

    const dependentInterfaceTypes = dependentTypes.filter(
      (type) => type.__typename === `${ITypeKind.InterfaceType}`,
    )

    const dependentFields = await this.fieldRepository.find({
      where: {
        id_IN: dependentInterfaceTypes.map(
          (dependentInterfaceType) => dependentInterfaceType.id,
        ),
      },
    })

    return {
      ...interfaceType,
      fields: [...fields, ...dependentFields],
      types: dependentTypes,
    }
  }
}
