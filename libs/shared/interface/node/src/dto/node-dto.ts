import { NodeTypeLiteral } from '../enums'
import { Props } from '@codelab/shared/interface/props'

export interface NodeDtoI<
  T extends NodeTypeLiteral = NodeTypeLiteral,
  P extends Props = {}
> {
  id?: string
  type: T
  props?: P
  children?: Array<NodeDtoI<T, P>>
}

export interface NodeDtoA<
  T extends NodeTypeLiteral = NodeTypeLiteral,
  P extends Props = {}
> {
  id: string
  type: T
  props: P
  children: Array<NodeDtoA<T, P>>
}
