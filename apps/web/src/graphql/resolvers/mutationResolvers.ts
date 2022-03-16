import { IResolvers } from '@graphql-tools/utils'
import { adminResolvers } from './admin/admin.resolvers'
import { atomMutationResolvers } from './atom/mutations'
import typeMutationResolvers from './type/mutations'

export const mutationResolvers: IResolvers = {
  ...adminResolvers,
  ...atomMutationResolvers,
  ...typeMutationResolvers,
}

export default mutationResolvers
