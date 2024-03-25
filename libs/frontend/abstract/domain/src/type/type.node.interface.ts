import type { IFieldNodeData } from '../field'
import type { INodeData } from '../shared/ui/node.interface'
import type { ITypeModel } from './types'

export type ITypeTreeNodeData = IFieldNodeData | ITypeNodeData
export type ITypeNodeData = INodeData<ITypeModel, 'type'>
