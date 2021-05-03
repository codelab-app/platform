import {
  __AtomFragment,
  __ComponentFragment,
  PropCollectionFragment,
} from '@codelab/hasura'
import { AtomType } from './Hasura'

export enum NodeType {
  PageRoot = 'PageRoot',
  PageElement = 'PageElement',
  ComponentRoot = 'ComponentRoot',
  ComponentElement = 'ComponentElement',
}

export interface NodeBase {
  id: string
  label?: string | null
  nodeType: NodeType
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

export interface PageRootNode extends NodeBase {
  nodeType: NodeType.PageRoot
  children?: Array<PageElementNode>
}

export interface ComponentRootNode extends NodeBase {
  nodeType: NodeType.ComponentRoot
  children?: Array<ComponentElementNode>
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
  | PageRootNode
  | ComponentRootNode
