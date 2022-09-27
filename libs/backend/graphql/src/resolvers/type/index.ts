import { withReadTransactionResolver } from '@codelab/backend/adapter/neo4j'
import { AnyType } from '@codelab/shared/abstract/codegen'
import { IResolvers } from '@graphql-tools/utils'
import { upsertField } from './mutation'
import { types } from './query'

export const typeResolver: IResolvers = {
  Mutation: {
    upsertField,
  },
  Query: {
    types: withReadTransactionResolver(types),
  },
  TypeBase: {
    __resolveType(obj: AnyType) {
      return obj.kind
    },
  },
}
