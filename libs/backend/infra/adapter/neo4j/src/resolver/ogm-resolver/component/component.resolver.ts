import type { IResolvers } from '@graphql-tools/utils'
import { pageComponentsFieldResolver } from './field/page-components'

export const componentResolver: IResolvers = {
  Query: {
    pageComponents: pageComponentsFieldResolver,
  },
}
