import type {
  IApiAggregate,
  IEnumTypeDto,
  IInterfaceTypeRef,
  ITypeDtoWithoutOwner,
  ITypeRef,
} from '@codelab/shared-abstract-core'
import type { ICommandHandler } from '@nestjs/cqrs'

import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend-domain-type'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import {
  FieldExportSchema,
  InterfaceTypeSchema,
  ITypeKind,
  TypeDtoWithoutOwnerSchema,
} from '@codelab/shared-abstract-core'
import { SortDirection } from '@codelab/shared-infra-gqlgen'
import { CommandHandler } from '@nestjs/cqrs'
import { Type } from '@sinclair/typebox'

export class ExportApiCommand {
  constructor(public api: IInterfaceTypeRef) {}
}

/**
 * Export top level types and all nested types. The dependency of the types should be ordered
 */
@CommandHandler(ExportApiCommand)
export class ExportApiHandler
  implements ICommandHandler<ExportApiCommand, IApiAggregate>
{
  constructor(
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
    private readonly logger: PinoLoggerService,
  ) {}

  async execute({ api }: ExportApiCommand): Promise<IApiAggregate> {
    /**
     * (1) Get itself
     */
    const interfaceType = await this.interfaceTypeRepository.findOneOrFail({
      schema: Type.Omit(InterfaceTypeSchema, ['owner']),
      where: {
        id: api.id,
      },
    })

    const fields = await this.fieldRepository.find({
      options: {
        sort: [{ key: SortDirection.Asc }],
      },
      schema: FieldExportSchema,
      where: { id_IN: interfaceType.fields.map(({ id }) => id) },
    })

    /**
     * (2) Get all dependent types first
     */
    const dependentTypesIds =
      await this.interfaceTypeRepository.getDependentTypes(api)

    this.logger.log('Exporting', {
      context: 'ExportApiHandler',
      data: { api, dependentTypesIds },
    })

    const dependentTypes = await this.getTypeItems(dependentTypesIds)

    this.logger.log('Dependent types', {
      context: 'ExportApiHandler',
      dependentTypes,
      // data: { dependentTypes },
    })

    this.sortUnionTypesBeforeExport(dependentTypes)
    this.sortEnumValuesBeforeExport(dependentTypes)

    const dependentInterfaceTypes = dependentTypes.filter(
      (type) => type.__typename === `${ITypeKind.InterfaceType}`,
    )

    const interfacesIds = dependentInterfaceTypes.map(({ id }) => id)

    const dependentFields = await this.fieldRepository.find({
      schema: FieldExportSchema,
      where: {
        api: {
          id_IN: interfacesIds,
        },
      },
    })

    const apiInterfaceForExport = {
      ...interfaceType,
      fields: [],
    }

    return {
      ...interfaceType,
      /**
       * These holds the refs of types only
       */
      // fields: [...dependentFields, ...fields],
      fields: [...fields, ...dependentFields],
      /**
       * This holds the full types from fields
       */
      // types: [...dependentTypes, apiInterfaceForExport],
      types: [apiInterfaceForExport, ...dependentTypes],
    }
  }

  private async getTypeItems(dependentTypesIds: Array<ITypeRef>) {
    const dependentTypes: Array<ITypeDtoWithoutOwner> = []

    for (const dependentType of dependentTypesIds) {
      this.logger.log('Processing dependent type', {
        context: 'ExportApiHandler',
        data: { dependentType },
      })

      if (
        Object.values(ITypeKind).includes(ITypeKind[dependentType.__typename])
      ) {
        const type = await this.typeFactory.findOne(
          dependentType,
          TypeDtoWithoutOwnerSchema,
        )

        dependentTypes.push(type as ITypeDtoWithoutOwner)
      }
    }

    return this.sortTypesBeforeExport(dependentTypes)
  }

  private sortEnumValuesBeforeExport(
    dependentTypes: Array<ITypeDtoWithoutOwner>,
  ) {
    dependentTypes
      .filter((type) => type.__typename === ITypeKind.EnumType)
      .forEach((unionType) =>
        (unionType as IEnumTypeDto).allowedValues.sort((a, b) =>
          a.key.localeCompare(b.key),
        ),
      )
  }

  private sortTypesBeforeExport(dependentTypes: Array<ITypeDtoWithoutOwner>) {
    dependentTypes.sort((a, b) => a.name.localeCompare(b.name))

    const enums: Array<ITypeDtoWithoutOwner> = []
    const interfaces: Array<ITypeDtoWithoutOwner> = []
    const unions: Array<ITypeDtoWithoutOwner> = []
    const remainingTypes: Array<ITypeDtoWithoutOwner> = []

    dependentTypes.forEach((type) => {
      switch (type.__typename) {
        case ITypeKind.InterfaceType:
          interfaces.push(type)
          break
        case ITypeKind.UnionType:
          unions.push(type)
          break
        case ITypeKind.EnumType:
          enums.push(type)
          break
        default:
          remainingTypes.push(type)
      }
    })

    return [...enums, ...interfaces, ...unions, ...remainingTypes]
  }

  private sortUnionTypesBeforeExport(
    dependentTypes: Array<ITypeDtoWithoutOwner>,
  ) {
    dependentTypes
      .filter((type) => type.__typename === ITypeKind.UnionType)
      .forEach((unionType) =>
        unionType['typesOfUnionType'].sort((a, b) => {
          if (!a.name || !b.name) {
            throw new Error('Union type has no name')
          }

          return a.name.localeCompare(b.name)
        }),
      )
  }
}
