import { Props } from '@codelab/props'
import { FunctionComponent, ReactNode } from 'react'
import * as _ from 'ts-toolbelt'

export interface HasID {
  id: string
}

export interface Node<P extends Props> {
  Component: FunctionComponent<any>
  id: string
  readonly key: React.Key
  type: string
  props: P
  parent?: Node<P>
  children: Array<Node<P>>
  readonly renderProps: Props
  addChild(child: Node<P>): void
  addParent(parent: Node<P>): void
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

export interface NodeFinderAcc<P extends Props> extends HasParent<any> {
  node: Node<P>
  found: Node<P> | null // found node
  id: string // id we want to search for
}

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
