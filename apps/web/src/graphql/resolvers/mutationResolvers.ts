import { IResolvers } from '@graphql-tools/utils'
import { adminResolvers } from './admin/admin.resolvers'
import { atomMutationResolvers } from './atom/mutations'
import { componentMutationsResolvers } from './component/mutations'
import { elementMutationsResolvers } from './element/mutation'
import { pageMutationResolvers } from './page/mutation'
import { typeMutationResolvers } from './type/mutations'

export const mutationResolvers: IResolvers = {
  ...adminResolvers,
  ...atomMutationResolvers,
  ...typeMutationResolvers,
  ...elementMutationsResolvers,
  ...componentMutationsResolvers,
  ...pageMutationResolvers,
}

export default mutationResolvers
