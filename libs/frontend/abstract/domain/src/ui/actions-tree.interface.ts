import type { IActionModel } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IActionsTreeDataNode = ITreeDataNode<{
  node: IActionModel
  type: 'action'
}>
