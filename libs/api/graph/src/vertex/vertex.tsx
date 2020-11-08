import { v4 as uuidv4 } from 'uuid'
import { Edge } from '../edge'
import { Graph } from '../graph'
import {
  GraphA,
  IGraph,
  VertexA,
  VertexI,
  VertexT,
} from '@codelab/shared/interface/graph'
import { NodeType } from '@codelab/shared/interface/node'

export class Vertex implements VertexA {
  id: string

  label: string

  parent?: string

  type: NodeType

  constructor({ id, label = '', parent, type }: VertexA) {
    this.id = id
    this.label = label
    this.parent = parent
    this.type = type
  }

  static async fromCreateForm({
    label = '',
    parent,
    type,
  }: VertexI): Promise<Vertex> {
    // Simulate remote data storage,
    const data = await Promise.resolve({
      id: uuidv4(),
      label,
      parent,
      type,
    })

    return new Vertex(data)
  }

  /**
   * Uses data fetched from repository
   *
   * @param vertices
   */
  static fromNodes(vertices: Array<VertexA>): Array<Vertex> {
    return vertices.map((vertex) => new Vertex(vertex))
  }

  /**
   * Create from a test object
   */
  static fromTestNode({ id, parent }: VertexT): VertexA {
    return new Vertex({
      id: id ?? uuidv4(),
      label: '',
      parent,
      // Set to satisfy interface, but not used for testing
      type: NodeType.React_Button,
    })
  }

  static fromTestNodes(vertices: Array<VertexT>): Array<VertexA> {
    return vertices.map((vertex) => Vertex.fromTestNode(vertex))
  }
}
