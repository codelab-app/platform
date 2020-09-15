import { NodeTypeEnum } from '../enums/node-enum'
import { NodeDtoA } from './node-dto'

export type NodeRefDtoA = NodeDtoA<NodeTypeEnum.Ref>
export type NodeReactDtoA = NodeDtoA<NodeTypeEnum.React>
export type NodeTreeDtoA = NodeDtoA<NodeTypeEnum.Tree>
export type NodeModelDtoA = NodeDtoA<NodeTypeEnum.Model>
export type NodeSchemaDtoA = NodeDtoA<NodeTypeEnum.Schema>
