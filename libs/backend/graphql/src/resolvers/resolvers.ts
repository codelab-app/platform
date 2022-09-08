import { mergeResolvers } from '@graphql-tools/merge'
import { IResolvers } from '@graphql-tools/utils'
import { adminResolver } from './admin'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { pageResolver } from './page'
import { tagResolver } from './tag'
import { typeResolver } from './type'

export const resolvers: IResolvers = mergeResolvers([
  elementResolver,
  pageResolver,
  adminResolver,
  tagResolver,
  typeResolver,
  domainResolver,
])
