import type { IPageModel } from '../../page'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IPagesTreeDataNode = ITreeDataNode<{
  node: IPageModel
  type: 'page'
}>
