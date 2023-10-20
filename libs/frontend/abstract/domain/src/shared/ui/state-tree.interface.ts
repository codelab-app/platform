import type { IFieldModel } from '../../type'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IStateTreeDataNode = ITreeDataNode<{
  node: IFieldModel
  type: 'field'
}>
