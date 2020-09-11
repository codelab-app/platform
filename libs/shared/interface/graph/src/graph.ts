import { D3GraphProps } from '@codelab/components/d3'
import { HasID } from '@codelab/shared/interface/node'
import { Vertex } from './vertex'
import { Edge } from './edge'

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
