import type { IResolvers } from '@graphql-tools/utils'
import { createDomains, updateDomains } from './mutation'

export const domainResolver: IResolvers = {
  Mutation: {
    createDomains,
    updateDomains,
  },
}
