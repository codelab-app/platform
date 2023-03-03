import type { IResolvers } from '@graphql-tools/utils'
import { domainConfig } from './field/domain-config'
import { projectDomain } from './field/project-domain'

export const domainResolver: IResolvers = {
  Domain: {
    domainConfig,
    projectDomain,
  },
}
