import { Attributes, ComponentClass, FunctionComponent } from 'react'
import { PropsFilter, Props } from '@codelab/props'
import { Node } from '@codelab/node'

export interface Factory<P extends Props = any, T = any> {
  (node: Node<P>): T
}

export interface ElementFactory<P extends Props = any> {
  (node: Node<P>): ElementParameters<Props>
}

export type ElementParameters<P extends Props> = [
  FunctionComponent<P> | ComponentClass<P> | string,
  Attributes & P,
  PropsFilter<P>?,
]
