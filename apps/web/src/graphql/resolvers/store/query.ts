import { IResolvers } from '@graphql-tools/utils'
import { storesGraphs } from './storesGraphs'

export const storeQueryResolvers: IResolvers = {
  storesGraphs,
}
