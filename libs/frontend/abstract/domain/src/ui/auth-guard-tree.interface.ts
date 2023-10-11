import type { IAuthGuardModel } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IAuthGuardsTreeDataNode = ITreeDataNode<{
  node: IAuthGuardModel
  type: 'authGuard'
}>
