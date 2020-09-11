import { Attributes, ComponentClass, FunctionComponent } from 'react'
import { PropsFilter } from '@codelab/core/props'
import { Props } from '@codelab/shared/interface/props'
import { Node } from '@codelab/core/node'

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
