import { SerializedEdgeDto } from './SerializedEdgeDto'
import { SerializedVertexDto } from './SerializedVertexDto'

export class SerializedGraphDto {
  declare id?: string

  declare label?: string

  declare edges?: Array<SerializedEdgeDto>

  declare vertices?: Array<SerializedVertexDto>
}
