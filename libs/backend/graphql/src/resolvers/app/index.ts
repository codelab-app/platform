import type { IResolvers } from '@graphql-tools/utils'
import { appSlug } from './app.resolver'

export const appResolver: IResolvers = {
  App: {
    slug: appSlug,
  },
}
