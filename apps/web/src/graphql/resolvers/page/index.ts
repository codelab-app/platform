import { IResolvers } from '@graphql-tools/utils'
import { deletePages } from './page.resolvers'

export const pageResolver: IResolvers = {
  Mutation: {
    deletePages,
  },
  Query: {},
}
