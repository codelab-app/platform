import { IResolvers } from '@graphql-tools/utils'
import { atomMutationResolvers } from './atom/mutations'
import typeMutationResolvers from './type/mutations'

export const mutationResolvers: IResolvers = {
  ...atomMutationResolvers,
  ...typeMutationResolvers,
}

export default mutationResolvers
