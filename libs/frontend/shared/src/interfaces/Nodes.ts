import { __AtomFragment } from '@codelab/graphql'
import { PropCollectionFragment } from '@codelab/hasura'
import { AtomType } from './Hasura'

export enum NodeType {
  PageElement = 'PageElement',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
}

export interface NodeBase {
  id: string
  name?: string | null
  nodeType: NodeType
}

export interface ComponentNode extends NodeBase {
  nodeType: NodeType.Component
  children?: Array<ComponentElementNode>
}

export interface ComponentElementNode extends NodeBase {
  atom: __AtomFragment
  pageElementId?: string
  // nodeType: NodeType.ComponentElement
  nodeType: NodeType.ComponentElement
  children?: Array<ComponentElementNode>
  props?: Record<string, any>
}

export interface PageElementNode extends NodeBase {
  nodeType: NodeType.PageElement
  props?: PropCollectionFragment | null
  atom?: __AtomFragment | null
  children?: Array<PageElementNode>
}

export interface NodeI {
  id?: string
  type: AtomType
  props?: Record<string, unknown>
  children?: Array<NodeI>
}

export type CytoscapeNode =
  | PageElementNode
  | ComponentElementNode
  | ComponentNode
