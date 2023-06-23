import type { IAction } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IActionsTreeDataNode = ITreeDataNode<{
  node: IAction
  type: 'action'
}>
