import { AtomType } from '../interfaces/Hasura'
import { Nodes } from '../interfaces/ComponentElementNode'

export class TreeNode implements Nodes {
  public id: string

  public type: AtomType

  public props: Record<string, unknown>

  public children: Array<TreeNode> = []

  constructor({ id, type, props }: Nodes) {
    this.id = id
    this.type = type
    this.props = props
  }

  public addChild(node: Nodes) {
    this.children = [...this.children, new TreeNode(node)]
  }
}
