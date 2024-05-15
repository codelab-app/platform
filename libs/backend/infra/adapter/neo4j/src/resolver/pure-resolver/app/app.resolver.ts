import type { IResolvers } from '@graphql-tools/utils'
import { appName } from './field/app-name'
import { appSlug } from './field/app-slug'

export const appResolver: IResolvers = {
  App: {
    name: appName,
    slug: appSlug,
  },
}
