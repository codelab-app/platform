import {
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
  upsertField,
  withWriteTransaction,
} from '@codelab/backend/adapter/neo4j'
import {
  MutationUpsertFieldArgs,
  OGM_TYPES,
} from '@codelab/shared/abstract/codegen'
import { FieldUniqueWhere } from '@codelab/shared/abstract/core'
import { merge } from 'lodash'

export const fieldRepository = {
  /**
   * @param {Object} args
   * @param {string} args.interfaceTypeId The parent interface
   * @param {string} args.fieldTypeId The type of the field
   * @param {Field} args.field The field model
   *
   * @param whereField
   */
  upsertField: async (
    args: MutationUpsertFieldArgs,
    whereField: FieldUniqueWhere,
  ): Promise<OGM_TYPES.InterfaceType> => {
    await withWriteTransaction((txn) =>
      txn.run(upsertField, {
        interfaceTypeId: args.interfaceTypeId,
        fieldTypeId: args.fieldTypeId,
        field: args.field,
        where: whereField,
      }),
    )

    const InterfaceType = await InterfaceTypeOGM()

    const [interfaceType] = await InterfaceType.find({
      selectionSet: interfaceTypeSelectionSet,
      where: {
        id: args.interfaceTypeId,
      },
    })

    return merge(interfaceType, {
      fieldsConnection: {
        // Resolve for GraphQL
        edges: interfaceType.fieldsConnection.edges.map((edge) => ({
          node: {
            __resolveType: edge.node.kind,
          },
        })),
      },
    })
  },
}
