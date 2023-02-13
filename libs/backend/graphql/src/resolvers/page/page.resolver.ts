import type { IResolvers } from '@graphql-tools/utils'

export const pageResolver: IResolvers = {
  Mutation: {},
  Query: {},
  Page: {
    slug: ({ name }: { name: string }) => name.replace(/\s/g, '-'),
  },
}
