import type { IFieldDTO, ITypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export type TypeRef = {
  existingId: string
} | null

export type ITypeWhere =
  | OGM_TYPES.ActionTypeWhere
  | OGM_TYPES.ArrayTypeWhere
  | OGM_TYPES.EnumTypeWhere
  | OGM_TYPES.InterfaceTypeWhere
  | OGM_TYPES.PrimitiveTypeWhere
  | OGM_TYPES.ReactNodeTypeWhere
  | OGM_TYPES.RenderPropsTypeWhere
  | OGM_TYPES.UnionTypeWhere

export type IType =
  | OGM_TYPES.ActionType
  | OGM_TYPES.ArrayType
  | OGM_TYPES.EnumType
  | OGM_TYPES.InterfaceType
  | OGM_TYPES.PrimitiveType
  | OGM_TYPES.ReactNodeType
  | OGM_TYPES.RenderPropsType
  | OGM_TYPES.UnionType

export interface ITypeExport {
  fields?: Array<IFieldDTO>
  types: Array<ITypeDTO>
}
