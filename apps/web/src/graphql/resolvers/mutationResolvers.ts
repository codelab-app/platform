import { IResolvers } from '@graphql-tools/utils'
import { atomResolvers } from './mutation/atomResolvers'
import { elementResolvers } from './mutation/elementResolvers'
import { fieldResolvers } from './mutation/field/fieldResolvers'

export const mutationResolvers: IResolvers = {
  ...atomResolvers,
  ...fieldResolvers,
  ...elementResolvers,
}
