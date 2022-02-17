import { IResolvers } from '@graphql-tools/utils'
import { elementResolvers } from './query/elementResolvers'

export const queryResolvers: IResolvers = {
  ...elementResolvers,
}
