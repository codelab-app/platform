import { Edge } from './edge'
import { Vertex } from './vertex'
import { NodeA, NodeI } from '@codelab/shared/interface/node'
import { D3GraphProps } from '@codelab/ui/d3'

export type GraphProps = {
  vertices: Array<Vertex>
  edges: Array<Edge>
}

export interface Graph {
  vertices: Array<Vertex>
  edges: Array<Edge>
  parent?: NodeA
  readonly D3Graph: D3GraphProps
  addVertexFromNode(node: NodeA): void
  addEdgeFromNodes(start: NodeI | undefined, end: NodeI): void
}
