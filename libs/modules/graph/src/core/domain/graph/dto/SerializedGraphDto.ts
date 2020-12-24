import { Edge } from '../../edge/edge'
import { Vertex } from '../../vertex/vertex'

export class SerializedGraphDto {
  declare id?: string

  declare label?: string

  declare edges?: Array<Edge>

  declare vertices?: Array<Vertex>
}
