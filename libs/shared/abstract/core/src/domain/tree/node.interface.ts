export interface IBaseNode<TChild extends IBaseNode<TChild>> {
  children: Array<TChild>
  [properties: string]: any
}

/**
 * A generic interface for all Node's
 */
export interface INode<TData> {
  /** Returns the root element */
  getRoot: () => TData

  /** Returns all children of the node */
  getChildren: (nodeId: string) => Array<TData>

  /** Returns all descendants of an node */
  getDescendants: (nodeId: string) => Array<TData>
}
