import { VertexType } from '@prisma/client'
import { NodeA } from 'libs/modules/graph/src/core/domain/node/Node'

export class TreeNode implements NodeA {
  public id: string

  public type: VertexType

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
