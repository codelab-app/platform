import { IResolvers } from '@graphql-tools/utils'
import exportGraph from './type/exportTypeGraphResolver'

export const typeQueryResolvers: IResolvers = {
  exportGraph,
}
