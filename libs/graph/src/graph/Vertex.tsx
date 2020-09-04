import { Vertex as IVertex, VertexProps } from './Vertex.i'
import { HasID } from '../../../node/src/Node.i'

export class Vertex implements IVertex {
  id: string

  constructor(props: VertexProps) {
    const { id } = props

    this.id = id
  }

  static fromNode(node: HasID): Vertex {
    const { id } = node

    return new Vertex({ id })
  }
}
