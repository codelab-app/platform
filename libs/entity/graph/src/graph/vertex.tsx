import { Vertex as IVertex, VertexProps } from '@codelab/shared/interface/graph'
import { HasID } from '@codelab/shared/interface/node'

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
