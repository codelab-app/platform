import { withReadTransactionResolver } from '@codelab/backend/adapter/neo4j'
import { AnyType } from '@codelab/shared/abstract/codegen'
import { IResolvers } from '@graphql-tools/utils'
import { upsertField } from './mutation'
import { typesOfTypesPage } from './query'

export const typeResolver: IResolvers = {
  Mutation: {
    upsertField,
  },
  Query: {
    typesOfTypesPage: withReadTransactionResolver(typesOfTypesPage),
  },
  // TypesPageAnyType: {
  //   __resolveType(obj: AnyType) {
  //     return obj.__typename
  //   },
  // },
}
