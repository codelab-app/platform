import { __AtomFragment } from '@codelab/codegen/graphql'
import { AtomType } from './Hasura'

export enum NodeType {
  Element = 'Element',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
}

export interface NodeLink {
  id: string
  source: string
  target: string
  order: number
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

export interface ElementNode extends NodeBase {
  nodeType: NodeType.Element
  atom?: __AtomFragment | null
  css?: string | null
  children?: Array<ElementNode>
  props: Record<string, any>
}

export interface NodeI {
  id?: string
  type: AtomType
  props?: Record<string, unknown>
  children?: Array<NodeI>
}

export type CytoscapeNode = NodeBase &
  (ElementNode | ComponentElementNode | ComponentNode)
