import type { IAuthGuardModel } from '../../auth-guard'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IAuthGuardsTreeDataNode = ITreeDataNode<{
  node: IAuthGuardModel
  type: 'authGuard'
}>
