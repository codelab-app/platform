export interface ITreeDataNode<Node = undefined> {
  children?: Array<ITreeDataNode<Node>>
  isLeaf?: boolean
  key: number | string
  node: Node
  primaryTitle?: string
  secondaryTitle?: string
  selectable?: boolean
  tags?: React.ReactNode
  title?: string
  toolbar?: React.ReactNode
}
