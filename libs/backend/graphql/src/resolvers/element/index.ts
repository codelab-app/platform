import { IResolvers } from '@graphql-tools/utils'
import { elementGraph } from './element.resolver'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {
    elementGraph,
  },
}

export * from './element.resolver'
