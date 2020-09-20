import { Edge } from '../edge'
import { Vertex } from '../vertex'
import { D3GraphProps } from '@codelab/components/d3'
import {
  Graph as GraphInterface,
  GraphProps,
} from '@codelab/shared/interface/graph'
import { NodeDtoA } from '@codelab/shared/interface/node'

export class Graph implements GraphInterface {
  vertices: Array<Vertex> = []

  edges: Array<Edge> = []

  // used for graphAppender to keep track of previous node for creating edges
  parent?: NodeDtoA

  constructor(props: GraphProps = { vertices: [], edges: [] }) {
    const { vertices, edges } = props

    this.vertices = vertices
    this.edges = edges
  }

  public addVertexFromNode(node: NodeDtoA): void {
    this.vertices.push(Vertex.fromNode(node))
  }

  public addEdgeFromNodes(start: NodeDtoA | undefined, end: NodeDtoA): void {
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
