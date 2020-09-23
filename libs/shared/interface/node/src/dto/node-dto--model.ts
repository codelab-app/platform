import { ModelType } from '../enums'
import { NodeA, NodeI } from './node-dto'
import { PropsModel, PropsSchema } from '@codelab/shared/interface/props'

export type ModelI = NodeI<ModelType.Model, PropsModel>

export type ModelA = NodeA<ModelType.Model, PropsModel>

export type SchemaI = NodeI<ModelType.Schema, PropsSchema>

export type SchemaA = NodeA<ModelType.Schema, PropsSchema>
