import { withRxReadTransactionResolver } from '@codelab/backend/adapter/neo4j'
import { IResolvers } from '@graphql-tools/utils'
import { tagGraphs } from './tag.resolvers'

export const tagResolver: IResolvers = {
  Mutation: {},
  Query: {
    tagGraphs: withRxReadTransactionResolver(tagGraphs),
  },
}
