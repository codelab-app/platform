import type { ITypesExport } from '@codelab/backend/abstract/core'
import {
  exportEnumTypeSelectionSet,
  exportFieldSelectionSet,
  exportInterfaceTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { sortInterfaceTypesFields } from '../mapper/sort'

/**
 * Allows us to get only types for an api
 */
interface ExportAdminTypesProps {
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

  /**
   * Enum
   */
  const enumTypes = (
    await EnumType.find({
      options: {
        sort: [{ name: OGM_TYPES.SortDirection.Asc }],
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
        sort: [{ name: OGM_TYPES.SortDirection.Asc }],
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
        sort: [{ name: OGM_TYPES.SortDirection.Asc }],
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
      sort: [{ key: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportFieldSelectionSet,
    where: {
      api: {
        id_IN: [...firstLevelInterfaceTypes, ...secondLevelInterfaceTypes].map(
          (api) => api.id,
        ),
      },
    },
  })

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   */
  return {
    fields,
    types: [
      ...enumTypes,
      ...firstLevelInterfaceTypes,
      ...secondLevelInterfaceTypes,
    ],
  }
}
