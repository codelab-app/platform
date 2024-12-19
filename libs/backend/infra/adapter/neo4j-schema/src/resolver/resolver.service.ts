import type { IResolvers } from '@graphql-tools/utils'
import { Injectable } from '@nestjs/common'
import { mergeResolvers } from '@graphql-tools/merge'

import { actionResolver } from './action'
import { appResolver } from './app'
import { atomResolver } from './atom/atom.resolver'
import { componentResolver } from './component'
import { domainResolver } from './domain'

@Injectable()
export class ResolverService {
  getResolvers(): IResolvers {
    const pureResolvers: IResolvers = mergeResolvers([
      appResolver,
      componentResolver,
      atomResolver,
      actionResolver,
      domainResolver,
    ])

    return pureResolvers
  }
}
