import type { IResolvers } from '@graphql-tools/utils'

import { mergeResolvers } from '@graphql-tools/merge'
import { Inject, Injectable } from '@nestjs/common'

import { actionResolver } from './action'
import { appResolver } from './app'
import { atomResolver } from './atom/atom.resolver'
import { COMPONENT_RESOLVER_PROVIDER } from './component/component.resolver'
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
    @Inject(COMPONENT_RESOLVER_PROVIDER)
    private readonly componentResolverProvider: IResolvers,
  ) {}

  getMergedResolvers(): IResolvers {
    const resolvers: IResolvers = mergeResolvers([
      appResolver,
      atomResolver,
      actionResolver,
      domainResolver,
      this.typeResolverProvider,
      this.elementResolverProvider,
      this.tagResolverProvider,
      this.pageResolverProvider,
      this.componentResolverProvider,
    ])

    return resolvers
  }
}
