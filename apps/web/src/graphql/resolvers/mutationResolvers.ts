import { IResolvers } from '@graphql-tools/utils'
import { adminImportResolvers } from './atom/adminImportResolvers'
import { atomMutationResolvers } from './atom/mutations'
import typeMutationResolvers from './type/mutations'

export const mutationResolvers: IResolvers = {
  ...atomMutationResolvers,
  ...typeMutationResolvers,
  ...adminImportResolvers,
}

export default mutationResolvers
