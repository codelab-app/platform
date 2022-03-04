import { IResolvers } from '@graphql-tools/utils'
import { exportAllTypesGraph } from '../admin/admin.export.resolvers'
import exportGraph from './type/exportTypeGraphResolver'

export const typeQueryResolvers: IResolvers = {
  exportGraph,
  exportAllTypesGraph,
}
