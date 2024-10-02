import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'

import { mergeResolvers } from '@graphql-tools/merge'

import { COMPONENT_RESOLVER_PROVIDER } from './component'
import { ELEMENT_RESOLVER_PROVIDER } from './element'
import { OGM_RESOLVER_PROVIDER } from './ogm-resolver.constant'
import { PAGE_RESOLVER_PROVIDER } from './page'
import { TAG_RESOLVER_PROVIDER } from './tag'

/**
 * These resolvers depend on OGM provider
 */
export const OgmResolverProvider: FactoryProvider<Promise<IResolvers>> = {
  inject: [
    COMPONENT_RESOLVER_PROVIDER,
    ELEMENT_RESOLVER_PROVIDER,
    PAGE_RESOLVER_PROVIDER,
    TAG_RESOLVER_PROVIDER,
  ],
  provide: OGM_RESOLVER_PROVIDER,
  useFactory: async (
    componentResolver: IResolvers,
    elementResolver: IResolvers,
    pageResolver: IResolvers,
    tagResolver: IResolvers,
  ) => {
    return mergeResolvers([
      componentResolver,
      elementResolver,
      pageResolver,
      tagResolver,
    ])
  },
}
