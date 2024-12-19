import type { IResolvers } from '@graphql-tools/utils'
import { Inject, Injectable } from '@nestjs/common'
import { mergeResolvers } from '@graphql-tools/merge'

import { actionResolver } from './action'
import { appResolver } from './app'
import { atomResolver } from './atom/atom.resolver'
import { componentResolver } from './component'
import { domainResolver } from './domain'
import { ELEMENT_RESOLVER_PROVIDER } from './element'
import { PAGE_RESOLVER_PROVIDER } from './page'
import { TAG_RESOLVER_PROVIDER } from './tag'
import { TYPE_RESOLVER_PROVIDER } from './type'

@Injectable()
export class ResolverService {
  constructor(
    @Inject(TYPE_RESOLVER_PROVIDER)
    private readonly typeResolverProvider: IResolvers,
    @Inject(ELEMENT_RESOLVER_PROVIDER)
    private readonly elementResolverProvider: IResolvers,
    @Inject(TAG_RESOLVER_PROVIDER)
    private readonly tagResolverProvider: IResolvers,
    @Inject(PAGE_RESOLVER_PROVIDER)
    private readonly pageResolverProvider: IResolvers,
  ) {}

  getResolvers(): IResolvers {
    const pureResolvers: IResolvers = mergeResolvers([
      appResolver,
      componentResolver,
      atomResolver,
      actionResolver,
      domainResolver,
      this.typeResolverProvider,
      this.elementResolverProvider,
      this.tagResolverProvider,
      this.pageResolverProvider,
    ])

    return pureResolvers
  }
}
