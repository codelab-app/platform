import { IResolvers } from '@graphql-tools/utils'
import { storeGraph } from './store.resolvers'

export const storeResolver: IResolvers = {
  Mutation: {},
  Query: { storeGraph },
}
