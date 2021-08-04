import { ComponentFragment, ElementFragment } from '@codelab/codegen/graphql'
import { DataNode } from 'antd/lib/tree'

export interface ElementTree {
  /** Calculates the shortest path from the root element to a given target element  */
  getPathFromRoot: (elementId: string) => {
    found: boolean
    path: Array<string>
  }

  /** Returns an Antd Tree parsable DataNode */
  getAntdTree: () => DataNode

  /** Returns an element by its id or null if not found */
  getElementById: (elementId: string) => ElementFragment | null

  /** Returns the root element */
  getRoot: () => ElementFragment

  /** Returns the parent of the given element or null if not found */
  getParent: (elementId: string) => ElementFragment | null

  /** Returns the order of the given element */
  getOrderInParent: (elementId: string) => number

  /** Returns all elements in the tree */
  getAllElements: () => Array<ElementFragment>

  /** Returns all children of the element */
  getChildren: (elementId: string) => Array<ElementFragment>

  /** Returns the component referenced by the specified element, or null if there isn't one */
  getComponentOfElement: (elementId: string) => ComponentFragment | null

  /** Returns the root element of a component */
  getComponentRootElement: (componentId: string) => ElementFragment | null
}
