import { IResolvers } from '@graphql-tools/utils'
import { withRxTransaction } from '../abstract/withRxTransaction'
import { deleteFieldEdge } from './field/deleteFieldEdge.resolvers'
import { upsertFieldEdge } from './field/upsertFieldEdge/upsertFieldEdge.resolvers'

export const typeResolver: IResolvers = {
  Mutation: {
    deleteFieldEdge: withRxTransaction(deleteFieldEdge),
    upsertFieldEdge: withRxTransaction(upsertFieldEdge),
  },
}
