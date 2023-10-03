import type { IAtomModel, IField } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IAtomsTreeDataNode = ITreeDataNode<
  | {
      node: IAtomModel
      type: 'atom'
    }
  | {
      node: IField
      type: 'field'
    }
>
