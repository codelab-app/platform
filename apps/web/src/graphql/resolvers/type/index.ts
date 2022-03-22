import { withRxTransaction } from '../abstract/withRxTransaction'
import { deleteFieldEdge } from './field/deleteFieldEdge.resolvers'
import { upsertFieldEdge } from './field/upsertFieldEdge/upsertFieldEdge.resolvers'

export const typeResolver = {
  Mutation: {
    deleteFieldEdge: withRxTransaction(deleteFieldEdge),
    upsertFieldEdge: withRxTransaction(upsertFieldEdge),
  },
  Query: {},
}
