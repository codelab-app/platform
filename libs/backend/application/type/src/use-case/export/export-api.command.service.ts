import type {
  IApiOutputDto,
  ITypeOutputDto,
} from '@codelab/backend/abstract/core'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import type { IInterfaceTypeEntity } from '@codelab/shared/abstract/core'
import {
  IFieldDTO,
  IInterfaceTypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
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
    private readonly typeFactory: TypeFactory,
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
      IInterfaceTypeDTO,
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
    const dependentTypesIds =
      await this.interfaceTypeRepository.getDependentTypes(api)

    const dependentTypes: Array<ITypeOutputDto> = []

    for (const dependentType of dependentTypesIds) {
      if (Object.values(ITypeKind).includes(dependentType.__typename)) {
        const type = await this.typeFactory.findOne(dependentType)
        type && dependentTypes.push(type as ITypeOutputDto)
      }
    }

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
