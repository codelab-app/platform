import { ElementTypeKind } from '@codelab/shared/abstract/codegen'

/**
 * Used to import to schema, we create in ts context so we can get type checking
 *
 * @deprecated
 */
export enum __ElementTypeKind {
  /**
   * Pick any element in the current tree
   */
  AllElements = 'AllElements',
  /**
   * Pick any element from the children of the current element
   */
  ChildrenOnly = 'ChildrenOnly',
  /**
   * Pick any element from the descendants of the current element
   */
  DescendantsOnly = 'DescendantsOnly',
  /**
   * Pick parents and siblings of parents of elements (used to move element)
   */
  ExcludeDescendantsElements = 'ExcludeDescendantsElements',
}

export { ElementTypeKind as IElementTypeKind }

export const elementTypeMap = (elementType: string): ElementTypeKind =>
  ElementTypeKind[elementType as keyof typeof ElementTypeKind]
