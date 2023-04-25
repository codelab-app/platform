import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type WithRequiredKey<T, K extends keyof T> = T extends object
//   ? Overwrite<T, Required<Pick<T, K>>>
//   : never

// type SystemTypes = Record<
//   | Exclude<
//       ITypeKind,
//       | ITypeKind.AppType
//       | ITypeKind.ArrayType
//       | ITypeKind.CodeMirrorType
//       | ITypeKind.ElementType
//       | ITypeKind.EnumType
//       | ITypeKind.InterfaceType
//       | ITypeKind.LambdaType
//       | ITypeKind.PageType
//       | ITypeKind.PrimitiveType
//       | ITypeKind.UnionType
//     >
//   | IPrimitiveTypeKind,
//   WithRequiredKey<ITypeDTO, '__typename'>
// >

/**
 * Difficult to type this function, we just let it infer
 */
export const systemTypesData = (owner: IAuth0Owner) => ({
  /**
   * PrimitiveTypes
   */
  [IPrimitiveTypeKind.String]: {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.String,
    owner,
    primitiveKind: IPrimitiveTypeKind.String,
  } as const,
  [IPrimitiveTypeKind.Boolean]: {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Boolean,
    owner,
    primitiveKind: IPrimitiveTypeKind.Boolean,
  } as const,
  [IPrimitiveTypeKind.Number]: {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Number,
    owner,
    primitiveKind: IPrimitiveTypeKind.Number,
  } as const,
  [IPrimitiveTypeKind.Integer]: {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Integer,
    owner,
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
    owner,
  } as const,
  [ITypeKind.RenderPropsType]: {
    __typename: `${ITypeKind.RenderPropsType}`,
    id: v4(),
    kind: ITypeKind.RenderPropsType,
    name: ITypeKind.RenderPropsType,
    owner,
  } as const,
  [ITypeKind.ActionType]: {
    __typename: `${ITypeKind.ActionType}`,
    id: v4(),
    kind: ITypeKind.ActionType,
    name: ITypeKind.ActionType,
    owner,
  } as const,
})
