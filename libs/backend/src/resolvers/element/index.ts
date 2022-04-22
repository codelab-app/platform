import { IResolvers } from '@graphql-tools/utils'
import { elementGraph } from './element.resolvers'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {
    elementGraph,
  },
}
