import type {
  IApiExport,
  IEnumTypeDto,
  IInterfaceType,
  IInterfaceTypeRef,
  ITypeDto,
  ITypeRef,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { SortDirection } from '@codelab/backend/abstract/codegen'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import {
  FieldDtoSchema,
  InterfaceTypeDtoSchema,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportApiCommand {
  constructor(public api: IInterfaceTypeRef) {}
}

/**
 * Export top level types and all nested types. The dependency of the types should be ordered
 */
@CommandHandler(ExportApiCommand)
export class ExportApiHandler
  implements ICommandHandler<ExportApiCommand, IApiExport>
{
  constructor(
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

  async execute({ api }: ExportApiCommand): Promise<IApiExport> {
    /**
     * (1) Get itself
     */
    const interfaceType = await this.interfaceTypeRepository.findOneOrFail({
      schema: InterfaceTypeDtoSchema,
      where: {
        id: api.id,
      },
    })

    const fields = await this.fieldRepository.find({
      options: {
        sort: [{ key: SortDirection.Asc }],
      },
      schema: FieldDtoSchema,
      where: { id_IN: interfaceType.fields?.map(({ id }) => id) },
    })

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

    const apiInterfaceForExport = {
      ...interfaceType,
      fields: [],
    } as IInterfaceType

    return {
      ...interfaceType,
      fields: [...fields, ...dependentFields],
      types: [apiInterfaceForExport, ...dependentTypes],
    }
  }

  private async getTypeItemsFromIds(dependentTypesIds: Array<ITypeRef>) {
    const dependentTypes: Array<ITypeDto> = []

    for (const dependentType of dependentTypesIds) {
      if (
        Object.values(ITypeKind).includes(dependentType.__typename as ITypeKind)
      ) {
        const type = await this.typeFactory.findOne(dependentType)

        if (!type) {
          continue
        }

        if (type.__typename === ITypeKind.InterfaceType) {
          dependentTypes.push({
            ...type,
            fields: type.fields,
          })
        } else {
          dependentTypes.push(type)
        }
      }
    }

    return this.sortTypesBeforeExport(dependentTypes)
  }

  private sortEnumValuesBeforeExport(dependentTypes: Array<ITypeDto>) {
    dependentTypes
      .filter((type) => type.__typename === ITypeKind.EnumType)
      .forEach((unionType) =>
        (unionType as IEnumTypeDto).allowedValues.sort((a, b) =>
          a.key.localeCompare(b.key),
        ),
      )
  }

  private sortTypesBeforeExport(dependentTypes: Array<ITypeDto>) {
    dependentTypes.sort((a, b) => a.name.localeCompare(b.name))

    const interfaces: Array<ITypeDto> = []
    const unions: Array<ITypeDto> = []
    const remainingTypes: Array<ITypeDto> = []

    dependentTypes.forEach((type) => {
      switch (type.__typename) {
        case ITypeKind.InterfaceType:
          interfaces.push(type)
          break
        case ITypeKind.UnionType:
          unions.push(type)
          break
        default:
          remainingTypes.push(type)
      }
    })

    return [...interfaces, ...unions, ...remainingTypes]
  }

  private sortUnionTypesBeforeExport(dependentTypes: Array<ITypeDto>) {
    dependentTypes
      .filter((type) => type.__typename === ITypeKind.UnionType)
      .forEach((unionType) =>
        (unionType as IUnionTypeDto).typesOfUnionType.sort((a, b) =>
          a.id.localeCompare(b.id),
        ),
      )
  }
}
