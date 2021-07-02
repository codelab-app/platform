import { __AtomFragment } from '@codelab/codegen/graphql'
import { AtomType } from './Hasura'

export enum NodeType {
  PageElement = 'PageElement',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
}

export interface NodeBase {
  id: string
  name: string
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
  atom?: __AtomFragment | null
  css?: string | null
  children?: Array<PageElementNode>
  props: Record<string, any>
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
