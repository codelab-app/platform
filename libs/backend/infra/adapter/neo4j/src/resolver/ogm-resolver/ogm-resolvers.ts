import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { tagResolver } from './tag'

/**
 * These can't be used by OGM itself, since they can cause circular dependencies.
 */
export const ogmResolvers: IResolvers = mergeResolvers([
  domainResolver,
  elementResolver,
  tagResolver,
])
