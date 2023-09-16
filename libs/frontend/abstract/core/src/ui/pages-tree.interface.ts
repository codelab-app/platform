import type { IPageModel } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IPagesTreeDataNode = ITreeDataNode<{
  node: IPageModel
  type: 'page'
}>
