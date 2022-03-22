import { IResolvers } from '@graphql-tools/utils'
import { withRxTransaction } from '../abstract/withRxTransaction'
import { exportAdminData, importAdminData } from './admin.resolvers'

export const adminResolver: IResolvers = {
  Mutation: {
    importAdminData,
  },
  Query: {
    exportAdminData: withRxTransaction(exportAdminData),
  },
}
