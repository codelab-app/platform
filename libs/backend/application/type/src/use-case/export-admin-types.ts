import type { ITypeExport } from '@codelab/backend/abstract/core'
import {
  exportActionTypeSelectionSet,
  exportEnumTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

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
): Promise<Array<ITypeExport>> => {
  /**
   * ActionType
   */
  const ActionType = await Repository.instance.ActionType

  const actionTypes = await ActionType.find({
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: exportActionTypeSelectionSet,
  })

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
      // where: props.apiId
      //   ? {
      //       fieldConnection: {
      //         node: {
      //           apiConnection: {
      //             node: {
      //               id: props.apiId,
      //             },
      //           },
      //         },
      //       },
      //     }
      //   : undefined,
    })
  ).map((type) => ({
    ...type,
    allowedValues: type.allowedValues.sort((a, b) =>
      a.key.toString().localeCompare(b.key),
    ),
  }))

  /**
   * Here we create the interface dependency tree order
   *
   * Further to the front are closer to the leaf.
   */
  return [...actionTypes, ...enumTypes] as Array<ITypeExport>
}
