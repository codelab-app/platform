import { IResolvers } from '@graphql-tools/utils'
import {
  deleteElementsSubgraph,
  elementGraph,
  elementGraphV2,
} from './element.resolvers'

export const elementResolver: IResolvers = {
  Mutation: {
    deleteElementsSubgraph,
  },
  Query: {
    elementGraph,
    elementGraphV2,
  },
}
