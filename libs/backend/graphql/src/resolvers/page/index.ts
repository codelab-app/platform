import type { IResolvers } from '@graphql-tools/utils'
import { pageSlug } from './page.resolver'

export * from './page.resolver'

export const pageResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Page: {
    slug: pageSlug,
  },
}
