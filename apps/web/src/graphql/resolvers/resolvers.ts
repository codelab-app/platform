import { mergeResolvers } from '@graphql-tools/merge'
import { IResolvers } from '@graphql-tools/utils'
import { adminResolver } from './admin'
import { elementResolver } from './element'
import { tagResolver } from './tag'
import { typeResolver } from './type'

export const resolvers: IResolvers = mergeResolvers([
  adminResolver,
  typeResolver,
  elementResolver,
  tagResolver,
])
