import type { OGM_TYPES } from '@codelab/backend/abstract/codegen'

export type IBaseTypeExportFields = 'id' | 'name' | 'kind'

export type TypeRef = {
  existingId: string
} | null

export type IRenderPropsTypeExport = Pick<
  OGM_TYPES.RenderPropsType,
  IBaseTypeExportFields
> &
  Required<Pick<OGM_TYPES.RenderPropsType, '__typename'>>

export type IReactNodeTypeExport = Pick<
  OGM_TYPES.ReactNodeType,
  IBaseTypeExportFields
> &
  Required<Pick<OGM_TYPES.ReactNodeType, '__typename'>>

export type IInterfaceTypeExport = Pick<
  OGM_TYPES.InterfaceType,
  IBaseTypeExportFields
> &
  Required<Pick<OGM_TYPES.InterfaceType, '__typename'>> & {
    // We don't want meta data here
    fields: Array<OGM_TYPES.Field>
  }

export type IEnumTypeExport = Pick<OGM_TYPES.EnumType, IBaseTypeExportFields> &
  Required<Pick<OGM_TYPES.EnumType, '__typename'>> & {
    // Need to remove enumTypeConnection
    allowedValues: Array<Omit<OGM_TYPES.EnumTypeValue, 'enumTypeConnection'>>
  }

export type IPrimitiveTypeExport = Pick<
  OGM_TYPES.PrimitiveType,
  IBaseTypeExportFields | 'primitiveKind'
> &
  Required<Pick<OGM_TYPES.PrimitiveType, '__typename'>>

export type IActionTypeExport = Pick<
  OGM_TYPES.ActionType,
  IBaseTypeExportFields
> &
  Required<Pick<OGM_TYPES.ActionType, '__typename'>>

// Uses OGM types
export type ITypeExport =
  | IPrimitiveTypeExport
  | IEnumTypeExport
  | IInterfaceTypeExport
  | IReactNodeTypeExport
  | IRenderPropsTypeExport
  | IActionTypeExport
