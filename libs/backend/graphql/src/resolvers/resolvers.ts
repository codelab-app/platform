import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { adminResolver } from './admin'
import { appResolver } from './app'
import { atomResolver } from './atom'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { pageResolver } from './page'
import { tagResolver } from './tag'
import { typeResolver } from './type'

export const resolvers: IResolvers = mergeResolvers([
  atomResolver,
  elementResolver,
  pageResolver,
  adminResolver,
  tagResolver,
  typeResolver,
  domainResolver,
  appResolver,
])
