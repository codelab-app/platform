import { withReadTransactionResolver } from '@codelab/backend/adapter/neo4j'
import { IResolvers } from '@graphql-tools/utils'
import { elementDescendants } from './element.resolver'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Element: {
    descendantElements: withReadTransactionResolver(elementDescendants),
  },
}

export * from './element.resolver'
