import { IResolvers } from '@graphql-tools/utils'
import { deleteElementsSubgraph, elementGraphV2 } from './element.resolvers'

export const elementResolver: IResolvers = {
  Mutation: {
    deleteElementsSubgraph,
  },
  Query: {
    elementGraphV2,
  },
}
