import type { IResolvers } from '@graphql-tools/utils'

export const typeResolver: IResolvers = {
  Mutation: {},
  Query: {
    baseTypes: withReadTransactionResolver(baseTypes),
  },
}
