export enum NodeTypeEnum {
  // Tree
  React = 'React',
  Tree = 'Tree',
  Ref = 'Ref',
  // Model
  Schema = 'Schema',
  Model = 'Model',
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
  /**
   * Mongoose Model
   */
  | 'Model'
  /**
   * Mongoose Schema
   */
  | 'Schema'

export interface WithNodeType {
  nodeType: NodeType
}

export type NodeID = string
