import { IResolvers } from '@graphql-tools/utils'
import { executeCommand } from './admin.resolver'

export const adminResolver: IResolvers = {
  Mutation: {
    executeCommand,
  },
  Query: {},
}
