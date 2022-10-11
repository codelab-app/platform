import { Nullish } from '@codelab/shared/abstract/types'
import { COMPONENT_NODE_TYPE, ELEMENT_NODE_TYPE } from '../../base'
import { IComponent } from '../component'
import { IElement } from '../element'

/**
 * These are the polymorphic node type of an view tree
 */
export type INode = IElement | IComponent

export const isElement = (node: Nullish<INode>): node is IElement => {
  return node?.__nodeType === ELEMENT_NODE_TYPE
}

export const isComponent = (node: Nullish<INode>): node is IComponent => {
  return node?.__nodeType === COMPONENT_NODE_TYPE
}
