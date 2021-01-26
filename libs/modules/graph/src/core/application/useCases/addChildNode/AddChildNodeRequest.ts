import { AddChildNodeVertexInput } from '../../../../presentation/AddChildNodeVertexInput'

export class AddChildNodeRequest {
  declare graphId: string

  declare parentVertexId: string

  declare vertex: AddChildNodeVertexInput

  declare order?: number
}
