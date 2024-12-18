import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'

import { mergeResolvers } from '@graphql-tools/merge'

import { actionResolver } from './action'
import { appResolver } from './app'
import { atomResolver } from './atom/atom.resolver'
import { componentResolver } from './component'
import { domainResolver } from './domain'
import { ELEMENT_RESOLVER_PROVIDER } from './element'
import { pageResolver } from './page'
import { TAG_RESOLVER_PROVIDER } from './tag/tag.resolver'
import { TYPE_RESOLVER_PROVIDER } from './type'

export const RESOLVER_PROVIDER = 'RESOLVER_PROVIDER'

export const ResolverProvider: FactoryProvider<Promise<IResolvers>> = {
  inject: [
    TYPE_RESOLVER_PROVIDER,
    ELEMENT_RESOLVER_PROVIDER,
    TAG_RESOLVER_PROVIDER,
  ],
  provide: RESOLVER_PROVIDER,
  useFactory: async (
    typeResolver: IResolvers,
    elementResolver: IResolvers,
    tagResolver: IResolvers,
  ) => {
    const pureResolvers: IResolvers = mergeResolvers([
      appResolver,
      componentResolver,
      atomResolver,
      actionResolver,
      domainResolver,
      elementResolver,
      pageResolver,
      typeResolver,
      tagResolver,
    ])

    return pureResolvers
  },
}
