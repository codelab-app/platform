import { EdgeDto } from '../../../presentation/EdgeDto'
import { ValueObject } from '@codelab/backend'

export interface IGraphEdges {
  value: Array<EdgeDto>
}

export class GraphEdges extends ValueObject<IGraphEdges> {
  declare value: Array<EdgeDto>
}
