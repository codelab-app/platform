import { withReadTransaction } from '@codelab/backend/adapter/neo4j'
import { IResolvers } from '@graphql-tools/utils'
import { elementDescendants } from './element.resolver'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Element: {
    descendantElements: withReadTransaction(elementDescendants),
  },
}

export * from './element.resolver'
