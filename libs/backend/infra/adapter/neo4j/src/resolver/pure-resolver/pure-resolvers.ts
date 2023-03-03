import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { appResolver } from './app'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { pageResolver } from './page'
import { typeResolver } from './type'

export const pureResolvers: IResolvers = mergeResolvers([
  appResolver,
  domainResolver,
  elementResolver,
  pageResolver,
  typeResolver,
])
