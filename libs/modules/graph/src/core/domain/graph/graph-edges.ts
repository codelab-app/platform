import { ValueObject } from '@codelab/backend'
import { Edge } from '@codelab/modules/edge'

export interface IGraphEdges {
  value: Array<Edge>
}

export class GraphEdges extends ValueObject<IGraphEdges> {
  declare value: Array<Edge>
}
