export enum ElementTypeKind {
  AllElements = 'AllElements',
  DescendantsOnly = 'DescendantsOnly',
  ChildrenOnly = 'ChildrenOnly',
}

export const elementTypeKindMap = (elementTypeKind: string): ElementTypeKind =>
  ElementTypeKind[elementTypeKind as keyof typeof ElementTypeKind]
