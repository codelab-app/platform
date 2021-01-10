import { UpdateNodeVertexType } from '../inputTypes/UpdateNodeVertexType'

export class UpdateNodeRequest {
  declare graphId: string

  declare type: UpdateNodeVertexType
}
