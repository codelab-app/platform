import type { IPage } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IPagesTreeDataNode = ITreeDataNode<{
  node: IPage
  type: 'page'
}>
