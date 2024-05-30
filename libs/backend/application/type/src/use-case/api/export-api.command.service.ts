import { SortDirection } from '@codelab/backend/abstract/codegen'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type {
  IApi,
  IEnumTypeDto,
  IInterfaceType,
  IInterfaceTypeRef,
  IType,
  ITypeRef,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import {
  FieldDtoSchema,
  IFieldDto,
  InterfaceTypeDtoSchema,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import omit from 'lodash/omit'

export class ExportApiCommand {
  constructor(public api: IInterfaceTypeRef) {}
}

/**
 * Export top level types and all nested types. The dependency of the types should be ordered
 */
@CommandHandler(ExportApiCommand)
export class ExportApiHandler
  implements ICommandHandler<ExportApiCommand, IApi>
{
  constructor(
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

  async execute({ api }: ExportApiCommand): Promise<IApi> {
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
      where: { id_IN: interfaceType.fields.map(({ id }) => id) },
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
    const dependentTypes: Array<IType> = []

    for (const dependentType of dependentTypesIds) {
      if (
        Object.values(ITypeKind).includes(dependentType.__typename as ITypeKind)
      ) {
        const type = await this.typeFactory.findOne(dependentType)

        if (type?.__typename === ITypeKind.InterfaceType) {
          dependentTypes.push({
            ...omit(type, 'owner'),
            fields: (type as IInterfaceType).fields,
          } as IType)
        } else if (type) {
          dependentTypes.push(omit(type, 'owner') as IType)
        }
      }
    }

    return this.sortTypesBeforeExport(dependentTypes)
  }

  private sortEnumValuesBeforeExport(dependentTypes: Array<IType>) {
    dependentTypes
      .filter((type) => type.__typename === ITypeKind.EnumType)
      .forEach((unionType) =>
        (unionType as IEnumTypeDto).allowedValues.sort((a, b) =>
          a.key.localeCompare(b.key),
        ),
      )
  }

  private sortTypesBeforeExport(dependentTypes: Array<IType>) {
    dependentTypes.sort((a, b) => a.name.localeCompare(b.name))

    const interfaces: Array<IType> = []
    const unions: Array<IType> = []
    const remainingTypes: Array<IType> = []

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

  private sortUnionTypesBeforeExport(dependentTypes: Array<IType>) {
    dependentTypes
      .filter((type) => type.__typename === ITypeKind.UnionType)
      .forEach((unionType) =>
        (unionType as IUnionTypeDto).typesOfUnionType.sort((a, b) =>
          a.id.localeCompare(b.id),
        ),
      )
  }
}
