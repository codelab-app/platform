import { NodeType } from '../enums'
import { NodeA, NodeI } from './node-dto'
import { PropsModel, PropsSchema } from '@codelab/alpha/shared/interface/props'

export type ModelI = NodeI<NodeType.Model, PropsModel>

export type ModelA = NodeA<NodeType.Model, PropsModel>

export type SchemaI = NodeI<NodeType.Schema, PropsSchema>

export type SchemaA = NodeA<NodeType.Schema, PropsSchema>
