import type {
  IApiExport,
  IEnumTypeDto,
  IInterfaceTypeRef,
  ITypeExport,
  ITypeRef,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  FieldExportSchema,
  InterfaceTypeSchema,
  ITypeKind,
  TypeExportSchema,
} from '@codelab/shared/abstract/core'
import { SortDirection } from '@codelab/shared/infra/gqlgen'
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
  implements ICommandHandler<ExportApiCommand, IApiExport>
{
  constructor(
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
    private readonly logger: PinoLoggerService,
  ) {}

  async execute({ api }: ExportApiCommand): Promise<IApiExport> {
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
      data: { dependentTypes },
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
      fields: [...fields, ...dependentFields],
      /**
       * This holds the full types from fields
       */
      types: [apiInterfaceForExport, ...dependentTypes],
    }
  }

  private async getTypeItems(dependentTypesIds: Array<ITypeRef>) {
    const dependentTypes: Array<ITypeExport> = []

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
          TypeExportSchema,
        )

        dependentTypes.push(type as ITypeExport)
      }
    }

    return this.sortTypesBeforeExport(dependentTypes)
  }

  private sortEnumValuesBeforeExport(dependentTypes: Array<ITypeExport>) {
    dependentTypes
      .filter((type) => type.__typename === ITypeKind.EnumType)
      .forEach((unionType) =>
        (unionType as IEnumTypeDto).allowedValues.sort((a, b) =>
          a.key.localeCompare(b.key),
        ),
      )
  }

  private sortTypesBeforeExport(dependentTypes: Array<ITypeExport>) {
    dependentTypes.sort((a, b) => a.name.localeCompare(b.name))

    const interfaces: Array<ITypeExport> = []
    const unions: Array<ITypeExport> = []
    const remainingTypes: Array<ITypeExport> = []

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

  private sortUnionTypesBeforeExport(dependentTypes: Array<ITypeExport>) {
    dependentTypes
      .filter((type) => type.__typename === ITypeKind.UnionType)
      .forEach((unionType) =>
        (unionType as IUnionTypeDto)['typesOfUnionType'].sort((a, b) =>
          a.id.localeCompare(b.id),
        ),
      )
  }
}
