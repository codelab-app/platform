import type { IActionModel } from '@codelab/frontend/abstract/domain'
import type { ITreeNode } from '../../../domain/src/shared/ui/node.interface'

export type IActionsTreeDataNode = ITreeNode<{
  node: IActionModel
  type: 'action'
}>
