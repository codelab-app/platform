import { withReadTransactionResolver } from '@codelab/backend/infra/adapter/neo4j'
import { IResolvers } from '@graphql-tools/utils'
import { upsertField } from './mutation'
import { baseTypes } from './query'

export const typeResolver: IResolvers = {
  Mutation: {
    upsertField,
  },
  Query: {
    baseTypes: withReadTransactionResolver(baseTypes),
  },
}
