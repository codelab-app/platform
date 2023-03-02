import type { IResolvers } from '@graphql-tools/utils'
import type { Transaction } from 'neo4j-driver'
import { descendants } from './field/tag-descendants'

export const tagResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Tag: {
    descendants,
  },
}
