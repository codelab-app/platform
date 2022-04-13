import { IResolvers } from '@graphql-tools/utils'
import { deleteElementsSubgraph, elementGraph } from './element.resolvers'

export const elementResolver: IResolvers = {
  Mutation: {
    deleteElementsSubgraph,
  },
  Query: {
    elementGraph,
  },
}
