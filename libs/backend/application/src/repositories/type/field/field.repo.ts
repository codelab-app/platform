import {
  connectField,
  getDriver,
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
} from '@codelab/backend/adapter/neo4j'
import {
  MutationUpsertFieldArgs,
  OGM_TYPES,
} from '@codelab/shared/abstract/codegen'
import { merge } from 'lodash'

export const fieldRepository = {
  upsertField: async (
    args: MutationUpsertFieldArgs,
  ): Promise<OGM_TYPES.InterfaceType> => {
    const session = getDriver().session()
    const InterfaceType = await InterfaceTypeOGM()

    try {
      /**
       * To implement upsert, we disconnect field first, then re-connect them each time.
       *
       * Save us from having to create additional cypher queries
       *
       * Maybe have issue in the future if we're connecting the fields to something else, but this is good for now.
       */
      await InterfaceType.update({
        where: {
          id: args.interfaceTypeId,
        },
        disconnect: {
          fields: [
            {
              where: {
                edge: {
                  id: args.field.id,
                },
              },
            },
          ],
        },
      })

      await session.writeTransaction((tx) => tx.run(connectField, args))

      const [interfaceType] = await InterfaceType.find({
        selectionSet: interfaceTypeSelectionSet,
        where: {
          id: args.interfaceTypeId,
        },
      })

      return merge(interfaceType, {
        fieldsConnection: {
          edges: interfaceType.fieldsConnection.edges.map((edge) => ({
            node: {
              __resolveType: edge.node.kind,
            },
          })),
        },
      })
    } finally {
      await session.close()
    }
  },
}
