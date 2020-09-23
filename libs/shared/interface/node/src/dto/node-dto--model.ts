import { NodeTypeModelEnum } from '../enums/node-enum--model'
import { NodeDtoA, NodeDtoI } from './node-dto'
import { ModelProps, SchemaProps } from '@codelab/shared/interface/model'
import { Props } from '@codelab/shared/interface/props'

export type NodeDtoModelI = NodeDtoI<NodeTypeModelEnum.Model, ModelProps>

export type NodeDtoModelA = NodeDtoA<NodeTypeModelEnum.Model, ModelProps>

export type NodeDtoSchemaI<P extends Props = {}> = NodeDtoI<
  NodeTypeModelEnum.Schema,
  P
>

export type NodeDtoSchemaA = NodeDtoA<NodeTypeModelEnum.Schema, SchemaProps>
