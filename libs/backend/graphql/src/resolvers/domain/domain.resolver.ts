import type { IResolvers } from '@graphql-tools/utils'
import { domainConfig } from './domain-config'
import { projectDomain } from './project-domain'

export const domainResolver: IResolvers = {
  Domain: {
    domainConfig,
    projectDomain,
  },
}
