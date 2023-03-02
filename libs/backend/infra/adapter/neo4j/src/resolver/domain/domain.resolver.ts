import type { IResolvers } from '@graphql-tools/utils'
import { domainConfig } from './field/domain-config'
import { projectDomain } from './field/project-domain'
import { createDomains, deleteDomains, updateDomains } from './mutation'

export const domainResolver: IResolvers = {
  Mutation: {
    createDomains,
    deleteDomains,
    updateDomains,
  },
  Domain: {
    domainConfig,
    projectDomain,
  },
}
