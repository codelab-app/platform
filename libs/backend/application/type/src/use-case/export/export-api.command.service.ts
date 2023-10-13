import { SortDirection } from '@codelab/backend/abstract/codegen'
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
import type {
  IEnumTypeDTO,
  IInterfaceTypeEntity,
  ITypeEntity,
  IUnionTypeDTO,
} from '@codelab/shared/abstract/core'
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
        options: {
          sort: [{ key: SortDirection.Asc }],
        },
        where: { id_IN: interfaceType.fields.map(({ id }) => id) },
      },
      IFieldDTO,
    )

    /**
     * (2) Get all dependent types first
     */
    const dependentTypesIds =
      await this.interfaceTypeRepository.getDependentTypes(api)

    const dependentTypes = await this.getTypeItemsFromIds(dependentTypesIds)
    this.sortUnionTypesBeforeExport(dependentTypes)
    this.sortEnumValuesBeforeExport(dependentTypes)

    const dependentInterfaceTypes = dependentTypes.filter(
      (type) => type.__typename === `${ITypeKind.InterfaceType}`,
    )

    const interfacesIds = dependentInterfaceTypes.map(({ id }) => id)

    const dependentFields = await this.fieldRepository.find({
      where: {
        api: {
          id_IN: interfacesIds,
        },
      },
    })

    return {
      ...interfaceType,
      fields: [...fields, ...dependentFields],
      types: dependentTypes,
    }
  }

  private async getTypeItemsFromIds(dependentTypesIds: Array<ITypeEntity>) {
    const dependentTypes: Array<ITypeOutputDto> = []

    for (const dependentType of dependentTypesIds) {
      if (
        Object.values(ITypeKind).includes(dependentType.__typename as ITypeKind)
      ) {
        const type = await this.typeFactory.findOne(dependentType)

        if (type?.__typename === `${ITypeKind.InterfaceType}`) {
          dependentTypes.push({
            ...type,
            fields: (type as IInterfaceTypeDTO).fields.map((field) => ({
              id: field.id,
            })),
          } as ITypeOutputDto)
        } else if (type) {
          dependentTypes.push(type as ITypeOutputDto)
        }
      }
    }

    return this.sortTypesBeforeExport(dependentTypes)
  }

  private sortUnionTypesBeforeExport(dependentTypes: Array<ITypeOutputDto>) {
    dependentTypes
      .filter((type) => type.__typename === `${ITypeKind.UnionType}`)
      .forEach((unionType) =>
        (unionType as IUnionTypeDTO).typesOfUnionType.sort((a, b) =>
          a.id.localeCompare(b.id),
        ),
      )
  }

  private sortEnumValuesBeforeExport(dependentTypes: Array<ITypeOutputDto>) {
    dependentTypes
      .filter((type) => type.__typename === `${ITypeKind.EnumType}`)
      .forEach((unionType) =>
        (unionType as IEnumTypeDTO).allowedValues.sort((a, b) =>
          a.key.localeCompare(b.key),
        ),
      )
  }

  private sortTypesBeforeExport(dependentTypes: Array<ITypeOutputDto>) {
    dependentTypes.sort((a, b) => a.name.localeCompare(b.name))

    const interfaces: Array<ITypeOutputDto> = []
    const unions: Array<ITypeOutputDto> = []
    const remainingTypes: Array<ITypeOutputDto> = []

    dependentTypes.forEach((type) => {
      switch (type.__typename) {
        case `${ITypeKind.InterfaceType}`:
          interfaces.push(type)
          break
        case `${ITypeKind.UnionType}`:
          unions.push(type)
          break
        default:
          remainingTypes.push(type)
      }
    })

    return [...interfaces, ...unions, ...remainingTypes]
  }
}
