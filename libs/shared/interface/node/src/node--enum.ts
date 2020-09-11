export enum NodeTypeEnum {
  /**
   * React, requires additional `type` key
   */
  React = 'React',
  /**
   * Non-react tree, requires ID
   */
  Tree = 'Tree',
  /**
   * Flat array, uses ref to build tree, requires parentRef, childrenRef
   */
  Ref = 'Ref',
  /**
   * Mongoose Model
   */
  Model = 'Model',
  /**
   * Mongoose Schema
   */
  Schema = 'Schema',
}

export type NodeType = keyof typeof NodeTypeEnum

export interface WithNodeType {
  nodeType: NodeType
}

export type NodeID = string
