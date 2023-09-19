import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import { ELEMENT_RESOLVER_PROVIDER } from './element'
import { OGM_RESOLVER_PROVIDER } from './ogm-resolver.constant'
import { TAG_RESOLVER_PROVIDER } from './tag'

export const OgmResolverProvider: FactoryProvider<Promise<IResolvers>> = {
  inject: [ELEMENT_RESOLVER_PROVIDER, TAG_RESOLVER_PROVIDER],
  provide: OGM_RESOLVER_PROVIDER,
  useFactory: async (elementResolver: IResolvers, tagResolver: IResolvers) => {
    return mergeResolvers([elementResolver, tagResolver])
  },
}
