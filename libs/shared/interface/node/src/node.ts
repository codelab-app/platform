import { Attributes, ComponentClass, FunctionComponent } from 'react'
import { NodeA, NodeI } from './dto'
import { NodeTypeLiteral } from './enums'
import { PropsFilter } from '@codelab/core/props'
import { Props } from '@codelab/shared/interface/props'

export interface HasChildren<N> {
  children?: Array<HasChildren<N>>
  [children: string]: any
}

export interface HasParent<T extends NodeI = NodeI> {
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
  P extends Props = Props
> extends NodeA<T, P> {
  id: string
  addChild(node: NodeA): void
  removeChild(node: NodeA): void
  move(newParent: NodeA): void
  getRoot(): NodeA
  addParent(node: NodeA): void
  Component: any
  render: any
  Children: any
  // Building props
  evalProps(renderProps: Props): Props
  nextRenderProps(renderProps: Props): Props
}

export type ElementParameters<P extends Props> = [
  FunctionComponent<P> | ComponentClass<P> | string,
  Attributes & P,
  PropsFilter<P>?,
]
