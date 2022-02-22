import { IResolvers } from '@graphql-tools/utils'
import { atomResolvers } from './mutation/atomResolvers'
import { elementResolvers } from './mutation/elementResolvers'
import { fieldResolvers } from './mutation/field/fieldResolvers'
import { pageResolvers } from './mutation/pageResolvers'

export const mutationResolvers: IResolvers = {
  ...atomResolvers,
  ...fieldResolvers,
  ...elementResolvers,
  ...pageResolvers,
}
