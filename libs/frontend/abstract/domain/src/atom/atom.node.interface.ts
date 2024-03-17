import type { IFieldNodeData } from '../field'
import type { INodeData } from '../shared'
import type { IAtomModel } from './atom.model.interface'

/**
 * The tree node consists of composite node types
 */
export type IAtomTreeNodeData = IAtomNodeData | IFieldNodeData

export type IAtomNodeData = INodeData<IAtomModel, 'atom'>
