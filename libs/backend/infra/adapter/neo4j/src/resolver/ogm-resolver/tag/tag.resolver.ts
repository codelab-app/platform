import type { IResolvers } from '@graphql-tools/utils'
import { descendants } from './field/tag-descendants'

export const tagResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Tag: {
    descendants,
  },
}
