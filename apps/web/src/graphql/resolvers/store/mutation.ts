import { IResolvers } from '@graphql-tools/utils'
import { deleteStoresSubgraph } from './deleteStoresSubgraph'

export const storeMutationsResolvers: IResolvers = {
  deleteStoresSubgraph,
}
