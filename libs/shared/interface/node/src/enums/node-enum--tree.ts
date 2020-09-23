/**
 * These enum node types are related to a Tree
 */
export enum TreeType {
  /**
   * Non-react tree, requires ID
   */
  Tree = 'Tree',
  /**
   * Flat array, uses ref to build tree, requires parentRef, childrenRef
   */
  Ref = 'Ref',
}

export type TreeTypeLiteral = keyof typeof TreeType
