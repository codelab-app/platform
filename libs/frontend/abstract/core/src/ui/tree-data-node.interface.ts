interface IExtraData<Node, Type> {
  node: Node
  type: Type
}

export interface ITreeDataNode<extraData extends IExtraData<unknown, unknown>> {
  children?: Array<ITreeDataNode<extraData>>
  extraData: extraData
  isLeaf?: boolean
  key: number | string
  primaryTitle?: string
  secondaryTitle?: string
  selectable?: boolean
  tags?: React.ReactNode
  title?: string
  toolbar?: React.ReactNode
}
