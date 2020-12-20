import { Edge } from '@codelab/modules/edge'
import { Vertex } from '@codelab/modules/vertex'

export class SerializedGraphDto {
  declare id?: string

  declare label?: string

  declare edges?: Array<Edge>

  declare vertices?: Array<Vertex>
}
