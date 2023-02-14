import type { IResolvers } from '@graphql-tools/utils'

export const appResolver: IResolvers = {
  App: {
    slug: ({ name }: { name: string }) => name.replace(/\s/g, '-'),
  },
}
