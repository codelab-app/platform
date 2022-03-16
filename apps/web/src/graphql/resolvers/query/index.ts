import { IResolvers } from '@graphql-tools/utils'
import { typeQueryResolvers } from '../type/queries'
import { elementResolvers } from './element.resolvers'

export const queryResolvers: IResolvers = {
  ...elementResolvers,
  ...typeQueryResolvers,
}
