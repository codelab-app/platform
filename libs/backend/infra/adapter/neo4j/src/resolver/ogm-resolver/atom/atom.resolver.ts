import type { IResolvers } from '@graphql-tools/utils'
import { atoms } from './field/atoms'

export const atomResolver: IResolvers = {
  Mutation: {},
  Query: {
    atoms,
  },
}
