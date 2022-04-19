import { IResolvers } from '@graphql-tools/utils'

export const typeResolver: IResolvers = {
  Mutation: {
    // deleteFieldEdge: withRxTransaction(deleteFieldEdge),
    // upsertFieldEdge: withRxTransaction(upsertFieldEdge),
  },
}
