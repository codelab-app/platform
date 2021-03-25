import { Edge } from './edge'
import { Vertex } from './vertex'
import { D3GraphProps } from '@codelab/alpha/ui/d3'
import { NodeI } from '@codelab/frontend'

export type GraphProps = {
  vertices: Array<Vertex>
  edges: Array<Edge>
}

export interface Graph {
  vertices: Array<Vertex>
  edges: Array<Edge>
  parent?: NodeI
  readonly D3Graph: D3GraphProps
  addVertexFromNode(node: NodeI): void
  addEdgeFromNodes(start: NodeI | undefined, end: NodeI): void
}
