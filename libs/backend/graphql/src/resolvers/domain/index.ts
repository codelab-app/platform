import { IResolvers } from '@graphql-tools/utils'
import { createDomains, deleteDomains, updateDomains } from './mutation'
import { domainConfig, projectDomain } from './query'

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
