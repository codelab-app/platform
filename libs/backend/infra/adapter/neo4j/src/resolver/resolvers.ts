import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { appResolver } from './app'
import { atomResolver } from './atom'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { pageResolver } from './page'

export const resolvers: IResolvers = mergeResolvers([
  appResolver,
  pageResolver,
  elementResolver,
  atomResolver,
  pageResolver,
  domainResolver,
])
