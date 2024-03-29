import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 * Difficult to type this function, we just let it infer
 */
export const systemTypesData = () => ({
  /**
   * PrimitiveTypes
   */
  [IPrimitiveTypeKind.String]: {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.String,
    primitiveKind: IPrimitiveTypeKind.String,
  } as const,
  [IPrimitiveTypeKind.Boolean]: {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Boolean,
    primitiveKind: IPrimitiveTypeKind.Boolean,
  } as const,
  [IPrimitiveTypeKind.Number]: {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Number,
    primitiveKind: IPrimitiveTypeKind.Number,
  } as const,
  [IPrimitiveTypeKind.Integer]: {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Integer,
    primitiveKind: IPrimitiveTypeKind.Integer,
  } as const,
  /**
   * Other types
   */
  [ITypeKind.ReactNodeType]: {
    __typename: `${ITypeKind.ReactNodeType}`,
    id: v4(),
    kind: ITypeKind.ReactNodeType,
    name: ITypeKind.ReactNodeType,
  } as const,
  [ITypeKind.RenderPropType]: {
    __typename: `${ITypeKind.RenderPropType}`,
    id: v4(),
    kind: ITypeKind.RenderPropType,
    name: ITypeKind.RenderPropType,
  } as const,
  [ITypeKind.ActionType]: {
    __typename: `${ITypeKind.ActionType}`,
    id: v4(),
    kind: ITypeKind.ActionType,
    name: ITypeKind.ActionType,
  } as const,
})
