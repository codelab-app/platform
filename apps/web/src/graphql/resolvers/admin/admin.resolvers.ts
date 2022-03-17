import { IResolvers } from '@graphql-tools/utils'
import { importAdminData } from './admin.import.resolvers'

export const adminResolvers: IResolvers = {
  resetDatabase: (_source) => {
    console.log('reset database')
  },
  importAdminData,
}
