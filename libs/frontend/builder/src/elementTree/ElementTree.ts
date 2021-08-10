import { ComponentFragment, ElementFragment } from '@codelab/codegen/graphql'
import { DataNode } from 'antd/lib/tree'

/**
 * A generic interface for all Tree's
 */
export interface NodeTree<TNode> {
  /** Returns an Antd Tree parsable DataNode */
  getAntdTree: () => DataNode

  /** Returns the parent of the given element or null if not found */
  getParent: (elementId: string) => TNode | null

  /** Returns an element by its id or null if not found */
  getElementById: (elementId: string) => TNode | null

  /** Returns the root element */
  getRoot: () => TNode

  /** Returns all elements in the tree */
  getAllElements: () => Array<TNode>

  /** Returns all children of the element */
  getChildren: (elementId: string) => Array<TNode>
}

export interface ElementTree extends NodeTree<ElementFragment> {
  /** Calculates the shortest path from the root element to a given target element  */
  getPathFromRoot: (elementId: string) => {
    found: boolean
    path: Array<string>
  }

  /** Returns the order of the given element */
  getOrderInParent: (elementId: string) => number

  /** Returns the component referenced by the specified element, or null if there isn't one */
  getComponentOfElement: (elementId: string) => ComponentFragment | null

  /** Returns the root element of a component */
  getComponentRootElement: (componentId: string) => ElementFragment | null
}
