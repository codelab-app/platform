import type { IFieldModel, ITypeModel } from '../../type'
import type { ITreeDataNode } from './tree-data-node.interface'

export type ITypesTreeDataNode = ITreeDataNode<
  | {
      node: IFieldModel
      type: 'field'
    }
  | {
      node: ITypeModel
      type: 'type'
    }
>

// export type ITypesTreeFieldDataNode = ITreeDataNode<{
//   node: IFieldModel
//   type: 'field'
// }>

// export type ITypesTreeTypeDataNode = ITreeDataNode<{
//   node: ITypeModel
//   type: 'type'
// }>
