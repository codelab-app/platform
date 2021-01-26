import { VertexType } from '../../../domain/vertex/vertex-type.codec'

export class UpdateNodeRequest {
  declare vertexId: string

  declare graphId: string

  declare type: VertexType
}
