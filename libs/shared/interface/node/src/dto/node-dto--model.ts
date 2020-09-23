import { ModelType } from '../enums'
import { NodeA, NodeI } from './node-dto'
import { ModelProps, SchemaProps } from '@codelab/shared/interface/model'

export type ModelI = NodeI<ModelType.Model, ModelProps>

export type ModelA = NodeA<ModelType.Model, ModelProps>

export type SchemaI = NodeI<ModelType.Schema, SchemaProps>

export type SchemaA = NodeA<ModelType.Schema, SchemaProps>
