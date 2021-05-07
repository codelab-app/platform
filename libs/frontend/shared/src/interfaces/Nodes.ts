import {
  __AtomFragment,
  __ComponentFragment,
  PropCollectionFragment,
} from '@codelab/hasura'
import { AtomType } from './Hasura'

export enum NodeType {
  Page = 'Page',
  PageElement = 'PageElement',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
}

export interface NodeBase {
  id: string
  label?: string | null
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
  component: __ComponentFragment
  children?: Array<PageElementNode>
}

export interface PageNode extends NodeBase {
  nodeType: NodeType.Page
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
  | PageNode
  | ComponentNode
