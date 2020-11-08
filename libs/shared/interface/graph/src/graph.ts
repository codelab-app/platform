import { EdgeA } from './edge'
import { VertexA } from './vertex'
import { NodeA } from '@codelab/shared/interface/node'
import { D3GraphProps } from '@codelab/ui/d3'

export interface GraphI {
  vertices: Array<VertexA>
  edges: Array<EdgeA>
}

export interface GraphA extends GraphI {
  id: string
}

export interface IGraph {
  vertices: Array<VertexA>
  edges: Array<EdgeA>
  parent?: NodeA
  readonly d3Graph: D3GraphProps
  // addVertexFromNode(node: NodeA): void
  // addEdgeFromNodes(start: string, end: string): void
}
