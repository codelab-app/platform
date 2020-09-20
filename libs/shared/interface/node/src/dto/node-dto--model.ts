import { NodeTypeModelEnum } from '../enums/node-enum--model'
import { NodeDtoA, NodeDtoI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

export type NodeDtoModelI<P extends Props = {}> = NodeDtoI<
  NodeTypeModelEnum.Model,
  P
>
export type NodeDtoModelA<P extends Props = {}> = NodeDtoA<
  NodeTypeModelEnum.Model,
  P
>
export type NodeDtoSchemaI<P extends Props = {}> = NodeDtoI<
  NodeTypeModelEnum.Schema,
  P
>
export type NodeDtoSchemaA<P extends Props = {}> = NodeDtoA<
  NodeTypeModelEnum.Schema,
  P
>
