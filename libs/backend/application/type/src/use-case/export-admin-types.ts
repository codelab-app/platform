import type { ITypeExport } from '@codelab/backend/abstract/core'
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
): Promise<ITypeExport> => {
  /**
   * Enum
   */
  const EnumType = await Repository.instance.EnumType

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
  const InterfaceType = await Repository.instance.InterfaceType

  const interfaceTypes = sortInterfaceTypesFields(
    await InterfaceType.find({
      options: {
        sort: [{ name: OGM_TYPES.SortDirection.Asc }],
      },
      selectionSet: exportInterfaceTypeSelectionSet,
      // Where it is assigned to atom API
      // search for nested apis three levels deep
      where: {
        fieldConnection: {
          node: {
            api: {
              id: props.apiId,
            },
          },
        },
      },
    }),
  )

  /**
   * Get all fields related to interface type
   */
  const Field = await Repository.instance.Field

  const fields = await Field.find({
    options: {
      sort: [{ key: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportFieldSelectionSet,
    where: {
      api: {
        id_IN: interfaceTypes.map((api) => api.id),
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
    types: [...enumTypes, ...interfaceTypes],
  }
}
