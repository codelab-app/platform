import { SortDirection } from '@codelab/backend/abstract/codegen'
import type { ITypesExport } from '@codelab/backend/abstract/core'
import {
  exportArrayTypeSelectionSet,
  exportEnumTypeSelectionSet,
  exportFieldSelectionSet,
  exportInterfaceTypeSelectionSet,
  exportUnionTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IFieldDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { sortInterfaceTypesFields } from '../../mapper/sort'

/**
 * Allows us to get only types for an api
 */
interface ExportAdminTypesProps {
  apiFields?: Array<IFieldDTO>
  apiId?: string
}

/**
 * These are types created by the admin, mostly types related to an atom.
 *
 * We export api separately since those can be it's own file
 */
export const exportAdminTypes = async (
  props: ExportAdminTypesProps = {},
): Promise<ITypesExport> => {
  const EnumType = await Repository.instance.EnumType
  const InterfaceType = await Repository.instance.InterfaceType
  const Field = await Repository.instance.Field
  const Array = await Repository.instance.ArrayType
  const UnionType = await Repository.instance.UnionType

  /**
   * UnionTypes
   */
  const unionTypes = await UnionType.find({
    options: {
      sort: [{ name: SortDirection.Asc }],
    },
    selectionSet: exportUnionTypeSelectionSet,
    where: {
      id_IN: props.apiFields?.map((field) => field.fieldType.id),
    },
  })

  /**
   * Array
   */
  const arrayTypes = await Array.find({
    options: {
      sort: [{ name: SortDirection.Asc }],
    },
    selectionSet: exportArrayTypeSelectionSet,
    where: {
      fieldConnection: {
        node: {
          apiConnection: {
            node: {
              id: props.apiId,
            },
          },
        },
      },
    },
  })

  /**
   * Find interface types of the array types' items
   */
  const arrayInterfaceItemTypes = await InterfaceType.find({
    options: {
      sort: [{ name: SortDirection.Asc }],
    },
    selectionSet: exportInterfaceTypeSelectionSet,
    where: {
      id_IN: arrayTypes
        .filter(
          (arrayType) => arrayType.itemType.kind === ITypeKind.InterfaceType,
        )
        .map((arrayType) => arrayType.itemType.id),
    },
  })

  /**
   * Enum
   */
  const enumTypes = (
    await EnumType.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      selectionSet: exportEnumTypeSelectionSet,
      where: props.apiId
        ? {
            fieldConnection: {
              node: {
                apiConnection: {
                  node: {
                    id: props.apiId,
                  },
                },
              },
            },
          }
        : undefined,
    })
  ).map((type) => ({
    ...type,
    allowedValues: type.allowedValues.sort((a, b) =>
      a.key.toString().localeCompare(b.key),
    ),
  }))

  /**
   * Get dependent types of top level atom API
   */
  const firstLevelInterfaceTypes = sortInterfaceTypesFields(
    await InterfaceType.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      selectionSet: exportInterfaceTypeSelectionSet,
      where: {
        OR: [
          // Find api 1 level deep
          {
            fieldConnection: {
              node: { apiConnection: { node: { id: props.apiId } } },
            },
          },
          // Find api 2 levels deep
          // This is too slow
          // {
          //   fieldConnection: {
          //     node: {
          //       apiConnection: {
          //         node: {
          //           fieldConnection: {
          //             node: { apiConnection: { node: { id: props.apiId } } },
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
        ],
      },
    }),
  )

  const secondLevelInterfaceTypes = sortInterfaceTypesFields(
    await InterfaceType.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      selectionSet: exportInterfaceTypeSelectionSet,
      where: {
        fieldConnection: {
          node: {
            apiConnection: {
              node: {
                id_IN: firstLevelInterfaceTypes.map((api) => api.id),
              },
            },
          },
        },
      },
    }),
  )

  /**
   * Get all fields related to interface type
   */
  const fields = await Field.find({
    options: {
      sort: [{ key: SortDirection.Asc }],
    },
    selectionSet: exportFieldSelectionSet,
    where: {
      api: {
        id_IN: [
          ...firstLevelInterfaceTypes,
          ...secondLevelInterfaceTypes,
          ...arrayInterfaceItemTypes,
        ].map((api) => api.id),
      },
    },
  })

  const types = [
    ...enumTypes,
    ...firstLevelInterfaceTypes,
    ...secondLevelInterfaceTypes,
    ...arrayInterfaceItemTypes,
    ...arrayTypes,
    ...unionTypes,
  ]

  const withSubTypes = types.filter(
    (type) =>
      type.kind === ITypeKind.InterfaceType ||
      type.kind === ITypeKind.ArrayType,
  )

  if (!withSubTypes.length) {
    return {
      fields,
      types: types.flat(),
    }
  }

  /**
   * Get all subtypes of interface types and array types
   */
  const subTypes = await Promise.all(
    withSubTypes.map(async (subType) => {
      return await exportAdminTypes({
        apiFields: fields.filter((field) => field.fieldType.id === subType.id),
        apiId: subType.id,
      })
    }),
  )

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   *
   * Subtypes are included first so that they can be referenced in the parent type
   */
  return {
    fields: [...subTypes.map((value) => value.fields).flat(), ...fields],
    types: [...subTypes.map((subType) => subType.types).flat(), ...types],
  }
}
