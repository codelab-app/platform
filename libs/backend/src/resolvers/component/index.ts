import { IResolvers } from '@graphql-tools/utils'
import { deleteComponents } from './component.resolvers'

export const componentResolver: IResolvers = {
  Mutation: {
    deleteComponents,
  },
  Query: {},
}
