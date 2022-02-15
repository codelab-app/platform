import { IResolvers } from '@graphql-tools/utils'
import { atomResolvers } from './mutation/atomResolvers'
import { fieldResolvers } from './mutation/field/fieldResolvers'

export const mutationResolvers: IResolvers = {
  ...atomResolvers,
  ...fieldResolvers,
}
