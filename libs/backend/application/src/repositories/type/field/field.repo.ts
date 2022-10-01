import {
  connectField,
  getDriver,
  interfaceTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import {
  MutationUpsertFieldArgs,
  OGM_TYPES,
} from '@codelab/shared/abstract/codegen'
import merge from 'lodash/merge'

export const fieldRepository = {
  upsertField: async (
    args: MutationUpsertFieldArgs,
  ): Promise<OGM_TYPES.InterfaceType> => {
    // console.log('Upsert Field', args)

    const session = getDriver().session()
    const InterfaceType = await Repository.instance.InterfaceType

    /**
     * To implement upsert, we disconnect field first, then re-connect them each time.
     *
     * Save us from having to create additional cypher queries
     *
     * Maybe have issue in the future if we're connecting the fields to something else, but this is good for now.
     */
    try {
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
    } catch (e) {
      console.error(e)
      throw new Error('Upsert field failed')
    }

    try {
      await session.writeTransaction((tx) => tx.run(connectField, args))

      const [updatedInterfaceType] = await InterfaceType.find({
        selectionSet: interfaceTypeSelectionSet,
        where: {
          id: args.interfaceTypeId,
        },
      })

      return merge(updatedInterfaceType, {
        fieldsConnection: {
          edges: updatedInterfaceType.fieldsConnection.edges.map((edge) => ({
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
