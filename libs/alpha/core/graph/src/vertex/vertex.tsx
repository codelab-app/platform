import {
  Vertex as IVertex,
  VertexProps,
} from '@codelab/alpha/shared/interface/graph'
import { NodeA } from '@codelab/alpha/shared/interface/node'

export class Vertex implements IVertex {
  id: string

  constructor(props: VertexProps) {
    const { id } = props

    this.id = id
  }

  static fromNode(node: NodeA): Vertex {
    const { id } = node

    return new Vertex({ id })
  }
}
