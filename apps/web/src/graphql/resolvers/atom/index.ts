import { IResolvers } from '@graphql-tools/utils'
import { componentMutationsResolvers } from '../component/mutations'
import { elementMutationsResolvers } from '../element/mutation'
import { pageMutationResolvers } from '../page/mutation'
import { atomResolvers } from './atom.resolvers'

export const mutationResolvers: IResolvers = {
  ...atomResolvers,
  ...elementMutationsResolvers,
  ...pageMutationResolvers,
  ...componentMutationsResolvers,
}
