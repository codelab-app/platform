import { IResolvers } from '@graphql-tools/utils'
import { createDomain, deleteDomain, updateDomain } from './mutation'
import { domainConfig, projectDomain } from './query'

export const domainResolver: IResolvers = {
  Mutation: {
    createDomain,
    deleteDomain,
    updateDomain,
  },
  Domain: {
    domainConfig,
    projectDomain,
  },
}
