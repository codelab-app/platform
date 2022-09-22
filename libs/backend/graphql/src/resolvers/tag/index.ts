import { withReadTransactionResolver } from '@codelab/backend/adapter/neo4j'
import { IResolvers } from '@graphql-tools/utils'
import { tagDescendants } from './tag.resolvers'

export const tagResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Tag: {
    descendants: withReadTransactionResolver(tagDescendants),
  },
}
