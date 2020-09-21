import { NodeDtoA } from './dto/node-dto'
import { NodeTypeLiteral } from './enums'
import { Props } from '@codelab/shared/interface/props'

export interface HasChildren<N> {
  children?: Array<HasChildren<N>>
  [children: string]: any
}

export interface HasParent<T> {
  parent?: T
}

export const hasChildren = <T extends HasChildren<T>>(
  node: T,
  childrenKey = 'children',
) =>
  typeof node === 'object' &&
  typeof node[childrenKey] !== 'undefined' &&
  node[childrenKey]?.length > 0

export type Mapper<T1, T2 = T1> = (node: T1) => T2

export interface Node<
  T extends NodeTypeLiteral = NodeTypeLiteral,
  P extends Props = {}
> extends NodeDtoA<T, P> {
  id: string
  addChild(node: NodeDtoA): void
}
