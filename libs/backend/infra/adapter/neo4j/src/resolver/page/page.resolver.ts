import type { IResolvers } from '@graphql-tools/utils'

import { pageName } from './field/page-name'
import { pageSlug } from './field/page-slug'

export const pageResolver: IResolvers = {
  Mutation: {},
  Page: {
    name: pageName,
    slug: pageSlug,
  },
  Query: {},
}
