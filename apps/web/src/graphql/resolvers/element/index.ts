import { IResolvers } from '@graphql-tools/utils'
import {
  deleteElementsSubgraph,
  duplicateElement,
  elementGraph,
} from './element.resolvers'

export const elementResolver: IResolvers = {
  Mutation: {
    duplicateElement,
    deleteElementsSubgraph,
  },
  Query: {
    elementGraph,
  },
}
