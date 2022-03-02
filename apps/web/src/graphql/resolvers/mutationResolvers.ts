import { IResolvers } from '@graphql-tools/utils'
import { adminImportResolvers } from './mutation/adminImportResolvers'
import { atomResolvers } from './mutation/atom.resolvers'
import { fieldResolvers } from './mutation/field/field.resolvers'

export const mutationResolvers: IResolvers = {
  ...atomResolvers,
  ...fieldResolvers,
  ...adminImportResolvers,
}
