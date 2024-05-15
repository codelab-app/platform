import { DigitaloceanService } from '@codelab/backend/infra/adapter/digitalocean'
import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import type { FactoryProvider } from '@nestjs/common'
import { actionResolver } from './action'
import { appResolver } from './app'
import { atomResolver } from './atom/atom.resolver'
import { domainResolver } from './domain'
import { elementResolver } from './element'
import { pageResolver } from './page'
import { TYPE_RESOLVER_PROVIDER } from './type'

export const PURE_RESOLVER_PROVIDER = 'PURE_RESOLVER_PROVIDER'

export const PureResolverProvider: FactoryProvider<Promise<IResolvers>> = {
  inject: [TYPE_RESOLVER_PROVIDER],
  provide: PURE_RESOLVER_PROVIDER,
  useFactory: async (typeResolver: IResolvers) => {
    const pureResolvers: IResolvers = mergeResolvers([
      appResolver,
      atomResolver,
      actionResolver,
      domainResolver,
      elementResolver,
      pageResolver,
      typeResolver,
    ])

    return pureResolvers
  },
}
