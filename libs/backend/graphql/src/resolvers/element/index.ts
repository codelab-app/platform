import { withRxReadTransaction } from '@codelab/backend/adapter/neo4j'
import { IResolvers } from '@graphql-tools/utils'
import { elementGraph } from './element.resolver'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {
    elementGraph: withRxReadTransaction(elementGraph),
  },
}

export * from './element.resolver'
