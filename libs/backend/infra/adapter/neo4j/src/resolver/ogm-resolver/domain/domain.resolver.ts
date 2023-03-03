import type { IResolvers } from '@graphql-tools/utils'
import { createDomains, deleteDomains, updateDomains } from './mutation'

export const domainResolver: IResolvers = {
  Mutation: {
    createDomains,
    deleteDomains,
    updateDomains,
  },
}
