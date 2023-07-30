import type { IAtom, IField } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type IAtomsTreeDataNode = ITreeDataNode<
  | {
      node: IAtom
      type: 'atom'
    }
  | {
      node: IField
      type: 'field'
    }
>
