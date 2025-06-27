import type {
  IApiAggregate,
  IEnumTypeDto,
  IFieldExport,
  IInterfaceType,
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
import { sortFieldsForExport } from '@codelab/shared-utils'
import { CommandHandler } from '@nestjs/cqrs'
import { Type } from '@sinclair/typebox'

// Type alias for InterfaceType without owner for better readability
type IInterfaceTypeWithoutOwner = Omit<IInterfaceType, 'owner'>

export class ExportApisCommand {
  constructor(public apis: Array<IInterfaceTypeRef>) {}
}

/**
 * Batch export APIs and all their nested types using builder pattern
 */
@CommandHandler(ExportApisCommand)
export class ExportApisHandler
  implements ICommandHandler<ExportApisCommand, Array<IApiAggregate>>
{
  constructor(
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly typeFactory: TypeFactory,
    private readonly logger: PinoLoggerService,
  ) {}

  async execute(command: ExportApisCommand): Promise<Array<IApiAggregate>> {
    const { apis: apiRefs } = command

    if (!apiRefs.length) {
      return []
    }

    // Step 1: Fetch all APIs
    const apis = await this.fetchApis(apiRefs)
    // Step 2: Fetch and group fields
    const fieldsByApiId = await this.fetchAndGroupFields(apis)
    // Step 3: Collect dependent types
    const dependentTypesByApi = await this.collectDependentTypes(apis)

    // Step 4: Fetch all unique dependent types
    const { allDependentTypes, typeMap } = await this.fetchDependentTypes(
      dependentTypesByApi,
    )

    // Step 5: Fetch dependent fields
    const allDependentFields = await this.fetchDependentFields(
      allDependentTypes,
    )

    // Step 6: Assemble results
    return this.assembleResults(
      apis,
      fieldsByApiId,
      dependentTypesByApi,
      typeMap,
      allDependentFields,
    )
  }

  // Constants for consistent configuration
  private static readonly SORT_OPTIONS = {
    sort: [{ key: SortDirection.Asc }],
  }

  private static readonly TYPE_ORDER = [
    ITypeKind.EnumType,
    ITypeKind.InterfaceType,
    ITypeKind.UnionType,
  ] as const

  private applyTypeSpecificSorting(
    dependentTypes: Array<ITypeDtoWithoutOwner>,
  ): void {
    dependentTypes.forEach((type) => {
      if (this.isEnumType(type)) {
        // Sort enum allowed values
        type.allowedValues.sort((a, b) => a.key.localeCompare(b.key))
      } else if (this.isUnionType(type)) {
        // Sort union type members
        type.typesOfUnionType.sort((a, b) => {
          const aName = a.name || ''
          const bName = b.name || ''

          return aName.localeCompare(bName)
        })
      }
    })
  }

  private assembleResults(
    apis: Array<IInterfaceTypeWithoutOwner>,
    fieldsByApiId: Map<string, Array<IFieldExport>>,
    dependentTypesByApi: Map<string, Array<ITypeRef>>,
    typeMap: Map<string, ITypeDtoWithoutOwner>,
    allDependentFields: Array<IFieldExport>,
  ): Array<IApiAggregate> {
    return apis.map((api) => {
      const apiFields = fieldsByApiId.get(api.id) || []
      const apiDependentTypeRefs = dependentTypesByApi.get(api.id) || []

      // Get dependent types for this API
      const apiDependentTypes = apiDependentTypeRefs
        .map((ref) => typeMap.get(ref.id))
        .filter((type): type is ITypeDtoWithoutOwner => type !== undefined)

      // Sort types properly
      const sortedDependentTypes = this.sortAndPrepareTypes(apiDependentTypes)

      // Filter dependent fields for this API's dependent interfaces
      const apiDependentFields = allDependentFields.filter((field) =>
        sortedDependentTypes.some(
          (type) => this.isInterfaceType(type) && type.id === field.api.id,
        ),
      )

      return {
        ...api,
        fields: sortFieldsForExport([...apiFields, ...apiDependentFields]),
        types: [{ ...api, fields: [] }, ...sortedDependentTypes],
      }
    })
  }

  private async collectDependentTypes(
    apis: Array<IInterfaceTypeWithoutOwner>,
  ): Promise<Map<string, Array<ITypeRef>>> {
    const dependentTypesByApi = new Map<string, Array<ITypeRef>>()

    for (const api of apis) {
      const apiRef: IInterfaceTypeRef = {
        __typename: ITypeKind.InterfaceType,
        id: api.id,
      }

      const dependentTypes =
        await this.interfaceTypeRepository.getDependentTypes(apiRef)

      dependentTypesByApi.set(api.id, dependentTypes)
    }

    return dependentTypesByApi
  }

  private async fetchAndGroupFields(
    apis: Array<IInterfaceTypeWithoutOwner>,
  ): Promise<Map<string, Array<IFieldExport>>> {
    const allFieldIds = apis.flatMap((api) => api.fields.map(({ id }) => id))

    const allApiFields = await this.fieldRepository.find({
      schema: FieldExportSchema,
      where: { id_IN: allFieldIds },
    })

    return this.groupFieldsByApiId(apis, allApiFields)
  }

  private async fetchApis(
    apiRefs: Array<IInterfaceTypeRef>,
  ): Promise<Array<IInterfaceTypeWithoutOwner>> {
    const apiIds = apiRefs.map((api) => api.id)

    const apis = await this.interfaceTypeRepository.find({
      schema: Type.Omit(InterfaceTypeSchema, ['owner']),
      where: { id_IN: apiIds },
    })

    this.logger.log('Exporting APIs batch', {
      apiCount: apis.length,
      context: 'ExportApisHandler',
    })

    return apis
  }

  private async fetchDependentFields(
    allDependentTypes: Array<ITypeDtoWithoutOwner>,
  ): Promise<Array<IFieldExport>> {
    const dependentInterfaceIds = allDependentTypes
      .filter((type) => this.isInterfaceType(type))
      .map(({ id }) => id)

    return dependentInterfaceIds.length
      ? await this.fieldRepository.find({
          schema: FieldExportSchema,
          where: {
            api: {
              id_IN: dependentInterfaceIds,
            },
          },
        })
      : []
  }

  private async fetchDependentTypes(
    dependentTypesByApi: Map<string, Array<ITypeRef>>,
  ): Promise<{
    allDependentTypes: Array<ITypeDtoWithoutOwner>
    typeMap: Map<string, ITypeDtoWithoutOwner>
  }> {
    // Deduplicate type refs by ID
    const typeRefMap = new Map<string, ITypeRef>()

    for (const typeRefs of dependentTypesByApi.values()) {
      typeRefs.forEach((ref) => typeRefMap.set(ref.id, ref))
    }

    const uniqueTypeRefs = Array.from(typeRefMap.values())

    this.logger.log('Collecting dependent types', {
      context: 'ExportApisHandler',
      dependentTypeCount: uniqueTypeRefs.length,
    })

    const allDependentTypes = await this.getTypeItems(uniqueTypeRefs)
    const typeMap = new Map(allDependentTypes.map((type) => [type.id, type]))

    return { allDependentTypes, typeMap }
  }

  private async getTypeItems(
    dependentTypesIds: Array<ITypeRef>,
  ): Promise<Array<ITypeDtoWithoutOwner>> {
    const dependentTypes: Array<ITypeDtoWithoutOwner> = []

    // TypeFactory doesn't support batch operations, fetch one by one
    for (const typeRef of dependentTypesIds) {
      const type = await this.typeFactory.findOne(
        typeRef,
        TypeDtoWithoutOwnerSchema,
      )

      if (type) {
        dependentTypes.push(type)
      }
    }

    return this.sortAndPrepareTypes(dependentTypes)
  }

  private groupFieldsByApiId(
    apis: Array<IInterfaceTypeWithoutOwner>,
    allApiFields: Array<IFieldExport>,
  ): Map<string, Array<IFieldExport>> {
    // Create a map for O(1) field lookups
    const fieldMap = new Map(allApiFields.map((field) => [field.id, field]))

    // Build the result map by preserving the field order from each API
    return new Map(
      apis.map((api) => [
        api.id,
        api.fields
          .map(({ id }) => fieldMap.get(id))
          .filter((field): field is IFieldExport => field !== undefined),
      ]),
    )
  }

  private isEnumType(type: ITypeDtoWithoutOwner): type is IEnumTypeDto {
    return type.__typename === ITypeKind.EnumType
  }

  private isInterfaceType(
    type: ITypeDtoWithoutOwner,
  ): type is ITypeDtoWithoutOwner & { __typename: 'InterfaceType' } {
    return type.__typename === ITypeKind.InterfaceType
  }

  private isUnionType(
    type: ITypeDtoWithoutOwner,
  ): type is ITypeDtoWithoutOwner & {
    __typename: 'UnionType'
    typesOfUnionType: Array<ITypeRef>
  } {
    return type.__typename === ITypeKind.UnionType
  }

  private sortAndPrepareTypes(
    dependentTypes: Array<ITypeDtoWithoutOwner>,
  ): Array<ITypeDtoWithoutOwner> {
    // Apply type-specific sorting to internal fields
    this.applyTypeSpecificSorting(dependentTypes)

    // Then sort the types themselves
    return this.sortTypesBeforeExport(dependentTypes)
  }

  private sortTypesBeforeExport(
    dependentTypes: Array<ITypeDtoWithoutOwner>,
  ): Array<ITypeDtoWithoutOwner> {
    // Create a map for O(1) type order lookups
    const typeOrderMap = new Map<string, number>(
      ExportApisHandler.TYPE_ORDER.map((type, index) => [type, index]),
    )

    // Sort by type order first, then by name
    return [...dependentTypes].sort((a, b) => {
      const aOrder = typeOrderMap.get(a.__typename) ?? 999
      const bOrder = typeOrderMap.get(b.__typename) ?? 999

      return aOrder !== bOrder ? aOrder - bOrder : a.name.localeCompare(b.name)
    })
  }
}
