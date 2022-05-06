import { IResolvers } from '@graphql-tools/utils'
import { upsertField } from './field.resolver'

export const typeResolver: IResolvers = {
  Mutation: {
    upsertField,
  },
  Query: {},
}
