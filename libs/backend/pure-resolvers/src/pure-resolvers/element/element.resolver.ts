import type { IResolvers } from '@graphql-tools/utils'

export const elementSlug = ({ name }: { name: string }) =>
  name.replace(/\s/g, '-')

export const elementPureResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Element: {
    slug: elementSlug,
  },
}
