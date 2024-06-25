import type { AnyModel } from 'mobx-keystone'
import type React from 'react'

/**
 * This is used to represent the data type for some node
 */
export interface INodeData<Node extends AnyModel, Type extends string> {
  node: Node
  type: Type
}

export interface ITreeNode<NodeData extends INodeData<AnyModel, string>> {
  children?: Array<ITreeNode<NodeData>>
  extraData: NodeData
  highlight?: {
    primaryTitle: string
    secondaryTitle: string
  }
  isLeaf?: boolean
  key: number | string
  primaryTitle?: string
  secondaryTitle?: string
  selectable?: boolean
  tags?: React.ReactNode
  title?: string
  toolbar?: React.ReactNode
}
