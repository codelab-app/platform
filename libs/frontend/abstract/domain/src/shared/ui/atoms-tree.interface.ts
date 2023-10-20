import type { IAtomModel } from '../../atom'
import type { IFieldModel } from '../../type'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IAtomsTreeDataNode = ITreeDataNode<
  | {
      node: IAtomModel
      type: 'atom'
    }
  | {
      node: IFieldModel
      type: 'field'
    }
>
