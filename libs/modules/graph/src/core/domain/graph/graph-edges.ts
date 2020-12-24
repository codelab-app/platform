import { Edge } from '../edge/edge'
import { ValueObject } from '@codelab/backend'

export interface IGraphEdges {
  value: Array<Edge>
}

export class GraphEdges extends ValueObject<IGraphEdges> {
  declare value: Array<Edge>
}
