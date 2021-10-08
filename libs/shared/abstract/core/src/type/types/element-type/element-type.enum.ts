export enum ElementTypeKind {
  AllElements = 'AllElements',
  DescendantsOnly = 'DescendantsOnly',
  ChildrenOnly = 'ChildrenOnly',
}

export const elementTypeMap = (elementType: string): ElementTypeKind =>
  ElementTypeKind[elementType as keyof typeof ElementTypeKind]
