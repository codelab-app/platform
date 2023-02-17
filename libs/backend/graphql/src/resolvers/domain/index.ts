import type { IResolvers } from '@graphql-tools/utils'
import { domainConfig, projectDomain } from './query'

export const domainResolver: IResolvers = {
  Domain: {
    domainConfig,
    projectDomain,
  },
}
