import { IResolvers } from '@graphql-tools/utils'
import { upsertFieldEdgeResolver } from './createFieldEdge/upsertFieldEdge'
import { deleteFieldEdgeResolver } from './deleteFieldEdge'

export const fieldResolvers: IResolvers = {
  upsertFieldEdge: upsertFieldEdgeResolver,
  deleteFieldEdge: deleteFieldEdgeResolver,
}
