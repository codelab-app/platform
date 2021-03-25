import { Vertex as IVertex } from '@codelab/alpha/shared/interface/graph'
import { NodeA } from '@codelab/frontend'

export class Vertex implements IVertex {
  id: string

  constructor(props: Vertex) {
    const { id } = props

    this.id = id
  }

  static fromNode(node: NodeA): Vertex {
    const { id } = node

    return new Vertex({ id })
  }
}
