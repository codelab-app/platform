import { IResolvers } from '@graphql-tools/utils'
import { withRxTransaction } from '../abstract'
import { deleteStoresSubgraph, storesGraphs } from './store.resolvers'

export const storeResolver: IResolvers = {
  Mutation: {
    deleteStoresSubgraph: withRxTransaction(deleteStoresSubgraph),
  },
  Query: {
    storesGraphs: withRxTransaction(storesGraphs),
  },
}
