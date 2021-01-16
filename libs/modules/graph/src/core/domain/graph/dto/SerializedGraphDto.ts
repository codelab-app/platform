import { SerializedEdgeDto } from '../../dto/SerializedEdgeDto'
import { SerializedVertexDto } from '../../dto/SerializedVertexDto'

export class SerializedGraphDto {
  declare id?: string

  declare label?: string

  // declare edges?: Array<Edge>
  declare edges?: Array<SerializedEdgeDto>

  // declare vertices?: Array<Vertex>
  declare vertices?: Array<SerializedVertexDto>
}
