import { D3GraphProps } from '@codelab/d3'
import { Vertex } from './Vertex.i'
import { Edge } from './Edge.i'
import { HasID } from '../../../node/src/Node.i'

export type GraphProps = {
  vertices: Array<Vertex>
  edges: Array<Edge>
}

export interface Graph {
  vertices: Array<Vertex>
  edges: Array<Edge>
  parent?: HasID
  readonly D3Graph: D3GraphProps
  addVertexFromNode(node: HasID): void
  addEdgeFromNodes(start: HasID | undefined | null, end: HasID): void
}
