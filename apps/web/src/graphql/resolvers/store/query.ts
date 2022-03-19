import { IResolvers } from '@graphql-tools/utils'
import { storeGraph } from './storeGraph'

export const storeQueryResolvers: IResolvers = {
  storeGraph,
}
