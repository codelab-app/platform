import { AtomType } from '../interfaces/Hasura'
import { NodeA } from '../interfaces/NodeA'

export class TreeNode implements NodeA {
  public id: string

  public type: AtomType

  public props: object

  public children: Array<TreeNode> = []

  constructor({ id, type, props }: NodeA) {
    this.id = id
    this.type = type
    this.props = props
  }

  public addChild(node: NodeA) {
    this.children = [...this.children, new TreeNode(node)]
  }
}
