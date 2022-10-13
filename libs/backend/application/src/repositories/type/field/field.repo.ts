import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import {
  connectField,
  getDriver,
  interfaceTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { MutationUpsertFieldArgs } from '@codelab/shared/abstract/codegen'

export const fieldRepository = {
  upsertField: async (
    args: MutationUpsertFieldArgs,
  ): Promise<OGM_TYPES.Field> => {
    console.log('Upsert Field', args)

    const session = getDriver().session()
    const InterfaceType = await Repository.instance.InterfaceType

    /**
     * To implement upsert, we disconnect field first, then re-connect them each time.
     *
     * Save us from having to create additional cypher queries
     *
     * Maybe have issue in the future if we're connecting the fields to something else, but this is good for now.
     */
    // try {
    //   await InterfaceType.update({
    //     where: {
    //       id: args.interfaceTypeId,
    //     },
    //     disconnect: {
    //       fields: [
    //         {
    //           where: {
    //             edge: {
    //               id: args.field.id,
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   })
    // } catch (e) {
    //   console.error(e)
    //   throw new Error('Upsert field failed')
    // }

    try {
      await session.writeTransaction((tx) => tx.run(connectField, args))

      const [updatedInterfaceType] = await InterfaceType.find({
        selectionSet: interfaceTypeSelectionSet,
        where: {
          id: args.interfaceTypeId,
        },
      })

      console.log('Updated', updatedInterfaceType)

      const updatedField = updatedInterfaceType?.fieldsConnection.edges.find(
        (field) => field.id === args.field.id,
      )

      if (!updatedField) {
        throw new Error('Updated field not found')
      }

      return updatedField
    } finally {
      await session.close()
    }
  },
}
