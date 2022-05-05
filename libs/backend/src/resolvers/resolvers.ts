import { mergeResolvers } from '@graphql-tools/merge'
import { IResolvers } from '@graphql-tools/utils'
import { elementResolver } from './element'
import { storeResolver } from './store'
import { tagResolver } from './tag'
import { typeResolver } from './type'

export const resolvers: IResolvers = mergeResolvers([
  elementResolver,
  tagResolver,
  storeResolver,
  typeResolver,
])
