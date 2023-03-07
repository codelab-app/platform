import type { IResolvers } from '@graphql-tools/utils'
import { name } from './field/page-name'
import { slug } from './field/page-slug'

export const pageResolver: IResolvers = {
  Mutation: {},
  Page: {
    name,
    slug,
  },
  Query: {},
}
