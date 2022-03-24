import { IResolvers } from '@graphql-tools/utils'
import { deleteStoresSubgraph } from './deleteStores'

export const storeMutationsResolvers: IResolvers = {
  deleteStoresSubgraph,
}
