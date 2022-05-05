import {
  MutationUpsertFieldArgs,
  OGM_TYPES,
} from '@codelab/shared/abstract/codegen'
import { getDriver, InterfaceTypeOGM } from '../../../infra'
import { interfaceTypeSelectionSet } from '../../../selectionSets'
import connectField from './connectField.cypher'

export const fieldRepository = {
  upsertField: async (
    args: MutationUpsertFieldArgs,
  ): Promise<OGM_TYPES.InterfaceType> => {
    const session = getDriver().session()
    const InterfaceType = await InterfaceTypeOGM()

    try {
      await session.writeTransaction((tx) => tx.run(connectField, args))

      const [interfaceType] = await InterfaceType.find({
        selectionSet: interfaceTypeSelectionSet,
        where: {
          id: args.interfaceTypeId,
        },
      })

      return {
        ...interfaceType,
        fieldsConnection: {
          ...interfaceType.fieldsConnection,
          edges: interfaceType.fieldsConnection.edges.map((edge) => ({
            ...edge,
            node: {
              __resolveType: edge.node.kind,
              ...edge.node,
            },
          })),
        },
      }

      // return {
      //   ...interfaceType,
      //   fieldsConnection: {
      //     ...interfaceType.fieldsConnection,
      //     edges: interfaceType.fieldsConnection.edges.map((edge) => ({
      //       ...edge,
      //       node: {
      //         __resolveType: edge.node.kind,
      //         ...edge.node,
      //       },
      //     })),
      //   },
      // }
    } finally {
      await session.close()
    }
  },
}
