import { IResolvers } from '@graphql-tools/utils'
import { elementQueryResolvers } from './element/query'
import { typeQueryResolvers } from './type/queries'

export const queryResolvers: IResolvers = {
  ...typeQueryResolvers,
  ...elementQueryResolvers,
}

export default queryResolvers
