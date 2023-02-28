import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { appResolver } from './app'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { pageResolver } from './page'

export const resolvers: IResolvers = mergeResolvers([
  elementResolver,
  pageResolver,
  domainResolver,
  appResolver,
])
