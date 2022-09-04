import { IResolvers } from '@graphql-tools/utils'
import { upsertField } from './upsert-field.resolver'

export const typeResolver: IResolvers = {
  Mutation: {
    upsertField,
  },
  Query: {},
}
