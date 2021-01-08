import { SerializedVertexDto } from '../vertex/dto/SerializedVertexDto'
import { ValueObject } from '@codelab/backend'

export interface IGraphVertices {
  value: Array<SerializedVertexDto>
}

export class GraphVertices extends ValueObject<IGraphVertices> {
  declare value: Array<SerializedVertexDto>
}
