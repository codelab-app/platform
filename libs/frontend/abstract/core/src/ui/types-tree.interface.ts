import type { IField, IType } from '../domain'
import type { ITreeDataNode } from './tree-data-node.interface'

export type ITypesTreeDataNode = ITreeDataNode<
  | {
      node: IField
      type: 'field'
    }
  | {
      node: IType
      type: 'type'
    }
>
