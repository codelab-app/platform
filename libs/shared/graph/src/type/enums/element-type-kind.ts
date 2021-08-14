import { z } from 'zod'

export enum ElementTypeKind {
  AllElements = 'AllElements',
  DescendantsOnly = 'DescendantsOnly',
  ChildrenOnly = 'ChildrenOnly',
}

export const elementTypeKindSchema = z.nativeEnum(ElementTypeKind)
