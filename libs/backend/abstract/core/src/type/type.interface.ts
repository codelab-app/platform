import { ITypeKind } from '@codelab/shared/abstract/core'
import { EntitySchema } from '@codelab/shared/abstract/types'
import { z } from 'zod'
import { OwnerSchema } from '../user.interface'
import type {
  IActionType,
  IActionTypeExport,
  ICreateActionType,
} from './action-type.interface'
import type {
  IArrayType,
  IArrayTypeExport,
  ICreateArrayType,
} from './array-type.interface'
import type {
  ICreateEnumType,
  IEnumType,
  IEnumTypeExport,
} from './enum-type.interface'
import type {
  ICreateInterfaceType,
  IInterfaceType,
  IInterfaceTypeExport,
} from './interface-type.interface'
import type {
  ICreatePrimitiveType,
  IPrimitiveType,
  IPrimitiveTypeExport,
} from './primitive-type.interface'
import type {
  ICreateReactNodeType,
  IReactNodeType,
  IReactNodeTypeExport,
} from './react-node-type.interface'
import type {
  ICreateRenderPropsType,
  IRenderPropsType,
  IRenderPropsTypeExport,
} from './render-props-type.interface'
import type {
  ICreateUnionType,
  IUnionType,
  IUnionTypeExport,
} from './union-type.interface'

export type TypeRef = {
  existingId: string
} | null

const TypeKindSchema = z.union([
  z.literal(`${ITypeKind.ActionType}`),
  z.literal(`${ITypeKind.AppType}`),
  z.literal(`${ITypeKind.ArrayType}`),
  z.literal(`${ITypeKind.CodeMirrorType}`),
  z.literal(`${ITypeKind.ElementType}`),
  z.literal(`${ITypeKind.EnumType}`),
  z.literal(`${ITypeKind.InterfaceType}`),
  z.literal(`${ITypeKind.LambdaType}`),
  z.literal(`${ITypeKind.PageType}`),
  z.literal(`${ITypeKind.PrimitiveType}`),
  z.literal(`${ITypeKind.ReactNodeType}`),
  z.literal(`${ITypeKind.RenderPropsType}`),
  z.literal(`${ITypeKind.UnionType}`),
])

export type ITypeKindLiteral = z.infer<typeof TypeKindSchema>

// export type ITypeKindPickedLiteral = Extract<
//   ITypeKindLiteral,
//   | `${ITypeKind.ArrayType}`
//   | `${ITypeKind.EnumType}`
//   | `${ITypeKind.InterfaceType}`
//   | `${ITypeKind.PrimitiveType}`
//   | `${ITypeKind.ReactNodeType}`
//   | `${ITypeKind.RenderPropsType}`
//   | `${ITypeKind.UnionType}`
// >

export const BaseTypeSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    // Changed this to literal so we have a required field for discriminated union
    kind: z.nativeEnum(ITypeKind),
    __typename:
      // Make optional to match OGM types
      TypeKindSchema.optional(),
  })
  .merge(EntitySchema)
  .merge(OwnerSchema)

export type IBaseType = z.infer<typeof BaseTypeSchema>

// Uses OGM types
export type ITypeExport =
  | IPrimitiveTypeExport
  | IEnumTypeExport
  | IInterfaceTypeExport
  | IReactNodeTypeExport
  | IRenderPropsTypeExport
  | IActionTypeExport
  | IUnionTypeExport
  | IArrayTypeExport

export type IType =
  | IPrimitiveType
  | IEnumType
  | IInterfaceType
  | IReactNodeType
  | IRenderPropsType
  | IActionType
  | IUnionType
  | IArrayType

/**
 * `__typename` is optional in OGM models, we initially require `__typename` in create type, but this disables an `IType` model from becoming create data itself.
 *
 * Eventually we make create data `__typename` optional, but the factory function will throw an error if the `__typename` is missing.
 *
 * Create data is a subset of `IType`, some arguments are always the same in the input, so we hardcode those in the model itself.
 */
export type ICreateType =
  | ICreatePrimitiveType
  | ICreateEnumType
  | ICreateInterfaceType
  | ICreateReactNodeType
  | ICreateRenderPropsType
  | ICreateActionType
  | ICreateUnionType
  | ICreateArrayType
