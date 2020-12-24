import { Vertex } from '../vertex/vertex'
import { ValueObject } from '@codelab/backend'

export interface IGraphVertices {
  value: Array<Vertex>
}

export class GraphVertices extends ValueObject<IGraphVertices> {
  declare value: Array<Vertex>
}
