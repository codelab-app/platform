import { SerializedEdgeDto } from '../edge/dto/SerializedEdgeDto'
import { ValueObject } from '@codelab/backend'

export interface IGraphEdges {
  value: Array<SerializedEdgeDto>
}

export class GraphEdges extends ValueObject<IGraphEdges> {
  declare value: Array<SerializedEdgeDto>
}
