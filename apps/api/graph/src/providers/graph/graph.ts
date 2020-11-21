import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape'
import { merge } from 'lodash'
import objectMapper from 'object-mapper'
import { v4 as uuidv4 } from 'uuid'
import { EdgeA, VertexA } from '@codelab/shared/interface/graph-v2'

export class Graph {
  declare vertices: Array<VertexA>

  declare edges: Array<EdgeA>

  constructor(vertices: Array<VertexA> = [], edges: Array<EdgeA> = []) {
    this.vertices = vertices
    this.edges = edges
  }

  moveVertex(source: VertexA, target: VertexA) {
    const sourceIndexE = this.edges.findIndex((e: EdgeA) => {
      return e.end === source.id
    })

    const targetIndexE = this.edges.findIndex((e: EdgeA) => {
      return e.end === target.id
    })

    this.arrayMove(this.edges, sourceIndexE, targetIndexE)
  }

  private arrayMove(arr: Array<any>, oldIndex: number, newIndex: number) {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1

      while (k--) {
        arr.push(undefined)
      }
    }

    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  }

  addVertex(v: VertexA): void {
    if (!this.hasVertex(v.id)) {
      this.vertices.push(v)
    }
  }

  addVertices(vertices: Array<VertexA>): void {
    vertices.forEach((v: VertexA) => {
      if (!this.hasVertex(v.id)) {
        this.vertices.push(v)
      }
    })
  }

  addEdge(source: VertexA, target: VertexA): void {
    if (!this.hasVertex(source.id)) {
      throw new Error(`Vertex with source id ${source.id} does not exist`)
    }

    if (!this.hasVertex(target.id)) {
      throw new Error(`Vertex with target id ${target.id} does not exist`)
    }

    if (!this.hasEdge(source.id, target.id)) {
      target.parent = source.id
      const edge: EdgeA = {
        id: uuidv4(),
        start: source.id,
        end: target.id,
      }

      this.edges.push(edge)
    }
  }

  hasVertex(vertexId: string): boolean {
    const index = this.vertices.findIndex((v: VertexA) => {
      return v.id === vertexId
    })

    return index !== -1
  }

  hasEdge(sourceId: string, targetId: string): boolean {
    const index = this.edges.findIndex((e: EdgeA) => {
      return e.start === sourceId && e.end === targetId
    })

    return index !== -1
  }

  public makeCytoscape(graph: Graph): cytoscape.Core {
    return cytoscape({
      headless: true,
      elements: {
        nodes: this.cyMapVertices(graph.vertices),
        edges: this.cyMapEdges(graph.edges),
      },
    })
  }

  private cyMapEdges(edges: Array<EdgeA>): Array<EdgeDefinition> {
    const mapper = {
      id: 'data.id',
      start: 'data.source',
      end: 'data.target',
    }

    return edges.map((edge) => {
      return objectMapper<EdgeDefinition>(edge, mapper)
    })
  }

  private cyMapVertices(
    vertices: Array<Partial<VertexA>>,
  ): Array<NodeDefinition> {
    const mapper = {
      id: 'data.id',
      parent: 'data.parent',
    }

    return vertices.map((vertex) => {
      // Spread rest of vertex props
      return merge(objectMapper<NodeDefinition>(vertex, mapper), {
        data: { ...vertex },
      })
    })
  }
}
