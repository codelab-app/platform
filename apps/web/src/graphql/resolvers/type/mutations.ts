import { IResolvers } from '@graphql-tools/utils'
import deleteFieldEdge from './field/deleteFieldEdgeResolver'
import upsertFieldEdge from './field/upsertFieldEdge/upsertFieldEdgeResolver'
import importTypeGraph from './type/importTypeGraphResolver'

export const typeMutationResolvers: IResolvers = {
  importTypeGraph,
  deleteFieldEdge,
  upsertFieldEdge,
}

export default typeMutationResolvers
