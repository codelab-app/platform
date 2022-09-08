import {
  withReadTransaction,
  withRxReadTransaction,
} from '@codelab/backend/adapter/neo4j'
import { IResolvers } from '@graphql-tools/utils'
import { elementDescendants, elementGraph } from './element.resolver'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {
    elementGraph: withRxReadTransaction(elementGraph),
  },
  Element: {
    descendantElements: withReadTransaction(elementDescendants),
  },
}

export * from './element.resolver'
