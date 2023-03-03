import type { IResolvers } from '@graphql-tools/utils'
import { name } from './field/app-name'
import { slug } from './field/app-slug'

export const appResolver: IResolvers = {
  App: {
    name,
    slug,
  },
}
