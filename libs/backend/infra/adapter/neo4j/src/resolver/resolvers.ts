import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { ogmResolvers } from './ogm-resolver/ogm-resolvers'
import { pureResolvers } from './pure-resolver/pure-resolvers'

export const resolvers: IResolvers = mergeResolvers([
  pureResolvers,
  ogmResolvers,
])
