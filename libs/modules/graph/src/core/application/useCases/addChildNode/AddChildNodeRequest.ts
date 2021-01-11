import { AddChildNodeVertexType } from '../inputTypes/AddChildNodeVertexType'

export class AddChildNodeRequest {
  declare graphId: string

  declare parentVertexId: string

  declare vertex: AddChildNodeVertexType

  declare order?: number
}
