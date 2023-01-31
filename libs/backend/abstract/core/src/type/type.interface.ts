import { ITypeKind } from '@codelab/shared/abstract/core'
import { EntitySchema } from '@codelab/shared/abstract/types'
import { ObjectTyped } from 'object-typed'
import { z } from 'zod'
import { OwnerSchema, UserRefSchema } from '../user.interface'
import type { IActionType, IActionTypeExport } from './action-type.interface'
import type { IEnumType, IEnumTypeExport } from './enum-type.interface'
import type {
  IInterfaceType,
  IInterfaceTypeExport,
} from './interface-type.interface'
import type {
  IPrimitiveType,
  IPrimitiveTypeExport,
} from './primitive-type.interface'
import type {
  IReactNodeType,
  IReactNodeTypeExport,
} from './react-node-type.interface'
import type {
  IRenderPropsType,
  IRenderPropsTypeExport,
} from './render-props-type.interface'

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

export const BaseTypeSchema = z
  .object({
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

export type IType =
  | IPrimitiveType
  | IEnumType
  | IInterfaceType
  | IReactNodeType
  | IRenderPropsType
  | IActionType
