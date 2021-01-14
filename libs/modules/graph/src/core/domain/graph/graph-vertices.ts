import { VertexDto } from '../../../presentation/VertexDto'
import { ValueObject } from '@codelab/backend'

export interface IGraphVertices {
  value: Array<VertexDto>
}

export class GraphVertices extends ValueObject<IGraphVertices> {
  declare value: Array<VertexDto>
}
