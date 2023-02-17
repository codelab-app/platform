import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { atomResolver } from './atom'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { tagResolver } from './tag'
import { typeResolver } from './type'

export const repoResolvers: IResolvers = mergeResolvers([
  elementResolver,
  domainResolver,
  atomResolver,
  tagResolver,
  typeResolver,
])
