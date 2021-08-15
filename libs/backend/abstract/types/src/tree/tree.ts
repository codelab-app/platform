import { DataNode } from 'antd/lib/tree'
import { Node } from './node'

export interface BaseTree<TData> {
  root: TData
}

/**
 * Current we return TData instead of Node<TData> because it's easier. All the chaining could be done in Cytoscape context, then the final method call could be called using these
 */
export interface Tree<TData> extends BaseTree<TData>, Node<TData> {
  /** Calculates the shortest path from the root element to a given target element  */
  getPathFromRoot: (nodeId: string) => {
    found: boolean
    path: Array<string>
  }

  /** Returns the parent of the given element or null if not found */
  getParent: (nodeId: string) => TData | undefined

  /** Returns the order of the given element */
  getOrderInParent: (nodeId: string) => number

  /** Returns all elements in the tree */
  getAllNodes: () => Array<TData>

  /** Returns an Antd Tree parsable DataNode */
  getAntdTree: () => DataNode

  /** Returns an element by its id or null if not found */
  getNodeById: (nodeId: string) => TData | undefined
}
