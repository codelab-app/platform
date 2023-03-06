import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { tagResolver } from './tag'

export const ogmResolvers: IResolvers = mergeResolvers([
  domainResolver,
  elementResolver,
  tagResolver,
])
