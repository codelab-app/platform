import { FunctionComponent, ReactNode } from 'react'
import { NodeTypeEnum } from './enums/node-enum'
import { Props } from '@codelab/shared/interface/props'

export interface HasID {
  id: string
}

export interface NodeInterface<P extends Props = {}> {
  Component: FunctionComponent<any>
  id: string
  readonly key: React.Key
  type: NodeTypeEnum
  props: P
  parent?: NodeInterface<P>
  children: Array<NodeInterface<P>>
  addChild(child: NodeInterface<P>): void
  addParent(parent: NodeInterface<P>): void
  hasChildren(): boolean
  Children(rootChildren: ReactNode): ReactNode | Array<ReactNode>
}

export interface HasChildren<N> {
  children?: Array<HasChildren<N>>
  [children: string]: any
}

export interface HasParent<N> {
  parent?: N
}

export const hasChildren = <T extends HasChildren<T>>(
  node: T,
  childrenKey = 'children',
) =>
  typeof node === 'object' &&
  typeof node[childrenKey] !== 'undefined' &&
  node[childrenKey]?.length > 0

export type Mapper<T1, T2 = T1> = (node: T1) => T2
