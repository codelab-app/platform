import { Edge } from './edge'
import { Vertex } from './vertex'
import { D3GraphProps } from '@codelab/components/d3'
import { NodeDtoA } from '@codelab/shared/interface/node'

export type GraphProps = {
  vertices: Array<Vertex>
  edges: Array<Edge>
}

export interface Graph {
  vertices: Array<Vertex>
  edges: Array<Edge>
  parent?: NodeDtoA
  readonly D3Graph: D3GraphProps
  addVertexFromNode(node: NodeDtoA): void
  addEdgeFromNodes(start: NodeDtoA, end: NodeDtoA): void
}
