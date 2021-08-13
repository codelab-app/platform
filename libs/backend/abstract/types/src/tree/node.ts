export interface NodeLike<TChild extends NodeLike<TChild>> {
  children: Array<TChild>
}

/**
 * A generic interface for all Node's
 */
export interface Node<TData> {
  // id: string
  //
  // children: Array<Node<TData>>

  // data: TData

  /** Returns the root element */
  getRoot: () => TData

  /** Returns all children of the node */
  getChildren: (nodeId: string) => Array<TData>

  /** Returns all descendants of an node */
  getDescendants: (nodeId: string) => Array<TData>
}
