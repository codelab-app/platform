export interface BaseNode<TChild extends BaseNode<TChild>> {
  children: Array<TChild>
}

// export interface BaseNode<TData> {
//   // id: string
//
//   children: Array<TData>
//
//   // data: TData
// }

/**
 * A generic interface for all Node's
 */
export interface Node<TData> {
  /** Returns the root element */
  getRoot: () => TData

  /** Returns all children of the node */
  getChildren: (nodeId: string) => Array<TData>

  /** Returns all descendants of an node */
  getDescendants: (nodeId: string) => Array<TData>
}
