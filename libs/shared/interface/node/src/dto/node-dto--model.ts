import { NodeTypeModelEnum } from '../enums/node-enum--model'
import { NodeDtoA, NodeDtoI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

export type NodeModelDtoI<P extends Props = {}> = NodeDtoI<
  NodeTypeModelEnum.Model,
  P
>
export type NodeModelDtoA<P extends Props = {}> = NodeDtoA<
  NodeTypeModelEnum.Model,
  P
>
export type NodeSchemaDtoI<P extends Props = {}> = NodeDtoI<
  NodeTypeModelEnum.Schema,
  P
>
export type NodeSchemaDtoA<P extends Props = {}> = NodeDtoA<
  NodeTypeModelEnum.Schema,
  P
>
