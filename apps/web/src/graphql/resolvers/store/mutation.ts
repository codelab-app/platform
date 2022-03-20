import { IResolvers } from '@graphql-tools/utils'
import { deleteStores } from './deleteStores'

export const storeMutationsResolvers: IResolvers = {
  deleteStores,
}
