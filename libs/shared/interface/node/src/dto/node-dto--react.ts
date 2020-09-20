// React
import { NodeTypeReactLiteral } from '../enums/node-enum--react'
import { NodeDtoA, NodeDtoI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

export type NodeDtoReactI<P extends Props = {}> = NodeDtoI<
  NodeTypeReactLiteral,
  P
>
export type NodeDtoReactA<P extends Props = {}> = NodeDtoA<
  NodeTypeReactLiteral,
  P
>
