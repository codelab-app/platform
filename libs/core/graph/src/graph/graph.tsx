import { D3GraphProps } from '@codelab/d3'
import { HasID } from '@codelab/shared/interface/node'
import {
  Graph as GraphInterface,
  GraphProps,
} from '@codelab/shared/interface/graph'
import { Vertex } from '../vertex'
import { Edge } from '../edge'

export class Graph implements GraphInterface {
  vertices: Array<Vertex> = []

  edges: Array<Edge> = []

  // used for graphAppender to keep track of previous node for creating edges
  parent?: HasID

  constructor(props: GraphProps = { vertices: [], edges: [] }) {
    const { vertices, edges } = props

    this.vertices = vertices
    this.edges = edges
  }

  public addVertexFromNode(node: HasID): void {
    this.vertices.push(Vertex.fromNode(node))
  }

  public addEdgeFromNodes(start: HasID | undefined | null, end: HasID): void {
    if (!start) {
      throw new Error('Missing start Node')
    }

    const startVertex = Vertex.fromNode(start)
    const endVertex = Vertex.fromNode(end)
    const edge = new Edge(startVertex, endVertex)

    this.edges.push(edge)
  }

  get D3Graph(): D3GraphProps {
    const nodes = this.vertices
    const links = this.edges.map((edge) => {
      return {
        id: edge.id,
        source: edge.start.id,
        target: edge.end.id,
      }
    })

    return {
      nodes,
      links,
    }
  }
}
