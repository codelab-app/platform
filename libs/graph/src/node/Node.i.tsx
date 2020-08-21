import { Props } from '@codelab/props'
import { FunctionComponent, ReactNode } from 'react'
import * as _ from 'ts-toolbelt'
import { NodeTypeEnum } from './codec/Node--type.i'

export interface HasID {
  id: string
}

export interface NodeInterface<P extends Props> {
  Component: FunctionComponent<any>
  id: string
  readonly key: React.Key
  type: string
  nodeType: NodeTypeEnum
  props: P
  parent?: NodeInterface<P>
  children: Array<NodeInterface<P>>
  readonly renderProps: Props
  addChild(child: NodeInterface<P>): void
  addParent(parent: NodeInterface<P>): void
  hasChildren(): boolean
  Children(rootChildren: ReactNode): ReactNode | Array<ReactNode>
}

export interface HasChildren<T> {
  children?: Array<T>
}

export interface HasParent<SubTree> {
  parent?: SubTree
}

export type Curry<F extends (...args: any) => any> = _.F.Curry<F>

export const hasChildren = <T extends any>(
  node: HasChildren<T>,
  childrenKey = 'children',
) =>
  typeof node === 'object' &&
  typeof node[childrenKey] !== 'undefined' &&
  node[childrenKey]?.length > 0

export type Mapper<T1, T2 = T1> = (node: T1) => T2

export type CurryReduce<T, R> = (reducerFn: Function, init: R, node: T) => R

export type CurryMap<T1, T2> = (mapFn: Mapper<T1, T2>, node: T1) => T2

export interface NodeFinderAcc<P extends Props> extends HasParent<any> {
  node: NodeInterface<P>
  found: NodeInterface<P> | null // found node
  id: string // id we want to search for
}
