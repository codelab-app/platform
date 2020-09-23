import { NodeTypeLiteral } from '../enums/node-enum'
import { Props } from '@codelab/shared/interface/props'

export interface NodeI<
  T extends NodeTypeLiteral = NodeTypeLiteral,
  P extends Props = {}
> {
  id?: string
  type: T
  props?: P
  children?: Array<NodeI<T, P>>
}

export interface NodeA<
  T extends NodeTypeLiteral = NodeTypeLiteral,
  P extends Props = {}
> {
  id: string
  type: T
  props: P
  children: Array<NodeA<T, P>>
}
