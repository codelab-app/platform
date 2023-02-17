import type { IResolvers } from '@graphql-tools/utils'
import { elementSlug } from './element.resolver'

export * from './element.resolver'

export const elementResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Element: {
    slug: elementSlug,
  },
}
