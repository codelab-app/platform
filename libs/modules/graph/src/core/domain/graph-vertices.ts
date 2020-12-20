import { ValueObject } from '@codelab/backend'
import { Vertex } from '@codelab/modules/vertex'

export interface IGraphVertices {
  value: Array<Vertex>
}

export class GraphVertices extends ValueObject<IGraphVertices> {
  declare value: Array<Vertex>
}
