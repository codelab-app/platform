import type { IActionModel } from '../../action'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IActionsTreeDataNode = ITreeDataNode<{
  node: IActionModel
  type: 'action'
}>
