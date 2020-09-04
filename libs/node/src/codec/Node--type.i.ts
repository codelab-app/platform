export enum NodeTypeEnum {
  React = 'React',
  Tree = 'Tree',
  Ref = 'Ref',
}

export type NodeType =
  /**
   * A React, requires a type
   */
  | 'React'
  /**
   * Non-react tree, requires ID
   */
  | 'Tree'
  /**
   * Flat array, uses ref to build tree, requires parentRef, childrenRef
   */
  | 'Ref'

export interface WithNodeType {
  nodeType: NodeType
}

export type NodeID = string
