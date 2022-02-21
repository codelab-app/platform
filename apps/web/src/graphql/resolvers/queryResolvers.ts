import { IResolvers } from '@graphql-tools/utils'
import { typeQueryResolvers } from './type/queries'

export const queryResolvers: IResolvers = {
  ...typeQueryResolvers,
}

export default queryResolvers
