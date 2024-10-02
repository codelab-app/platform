import type { IResolvers } from '@graphql-tools/utils'

import { domainConfig } from './field/domain-config'

export const domainResolver: IResolvers = {
  Domain: {
    domainConfig,
  },
}
