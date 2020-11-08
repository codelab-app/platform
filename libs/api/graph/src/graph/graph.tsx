import cytoscape, { Core } from 'cytoscape'
import { Edge } from '../edge'
import { Vertex } from '../vertex'
import {
  EdgeA,
  GraphA,
  IGraph,
  VertexA,
  VertexI,
  isVertexI,
} from '@codelab/shared/interface/graph'
import { D3GraphProps } from '@codelab/ui/d3'

export class Graph implements IGraph {
  id: string

  vertices: Array<VertexA> = []

  edges: Array<EdgeA> = []

  /**
   * We make constructor validation agnostic & forgiving, defer validation to each use case.
   *
   * Allows easier testing
   *
   * @param param
   */
  constructor({ id, vertices = [], edges = [] }: GraphA) {
    this.id = id
    this.vertices = vertices
    this.edges = edges
  }

  /**
   *
   * Add a child with vertex input
   *
   * @param parent Must be an existing vertex
   * @param child Could either be input data or already created
   */
  async addChild(parent: VertexA, child: VertexI | VertexA): Promise<Vertex> {
    let childVertex = child

    if (isVertexI(child)) {
      childVertex = await Vertex.fromCreateForm(child)
    }

    const edge = await Edge.fromCreateForm({
      start: parent.id,
      end: childVertex.id,
    })

    this.vertices = [...this.vertices, vertex]
    this.edges = [...this.edges, edge]

    return vertex
  }

  // public addVertexFromNode(node: any): void {
  //   this.vertices.push(Vertex.fromNode(node))
  // }

  // public addEdgeFromNodes(start: string, end: string): void {
  //   if (!start) {
  //     throw new Error('Missing start Node')
  //   }

  //   const startVertex = Vertex.fromNode(start)
  //   const endVertex = Vertex.fromNode(end)
  //   const edge = new Edge({ start: startVertex, end: endVertex })

  //   this.edges.push(edge)
  // }

  get cy(): Core {
    return cytoscape({
      headless: true,
      // elements: {},
    })
  }

  get d3Graph(): D3GraphProps {
    const nodes = this.vertices
    const links = this.edges.map((edge) => {
      return {
        id: edge.id,
        source: edge.start,
        target: edge.end,
      }
    })

    return {
      nodes,
      links,
    }
  }
}
