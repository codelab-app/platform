import type { IResolvers } from '@graphql-tools/utils'

import { mergeResolvers } from '@graphql-tools/merge'
import { Inject, Injectable } from '@nestjs/common'

import { ELEMENT_RESOLVER_PROVIDER } from './element'
import { PAGE_RESOLVER_PROVIDER } from './page'
import { TAG_RESOLVER_PROVIDER } from './tag'
import { TYPE_RESOLVER_PROVIDER } from './type'

export const RESOLVER_PROVIDER = Symbol('RESOLVER_PROVIDER')

@Injectable()
export class ResolverProvider {
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

  provide(): IResolvers {
    return {
      ...mergeResolvers([
        this.typeResolverProvider,
        this.elementResolverProvider,
        this.tagResolverProvider,
        this.pageResolverProvider,
      ]),
    }
  }
}
