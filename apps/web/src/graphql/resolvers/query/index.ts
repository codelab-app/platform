import { IResolvers } from '@graphql-tools/utils'
import { elementResolvers } from './element.resolvers'

export const queryResolvers: IResolvers = {
  ...elementResolvers,
}
