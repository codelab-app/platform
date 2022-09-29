import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IBaseTypeExportFields } from '../domain/type'

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
  IBaseTypeExportFields | 'fields' | 'fieldsConnection' | 'ownerConnection'
> &
  Required<Pick<OGM_TYPES.InterfaceType, '__typename'>>

export type IEnumTypeExport = Pick<
  OGM_TYPES.EnumType,
  IBaseTypeExportFields | 'allowedValues'
> &
  Required<Pick<OGM_TYPES.EnumType, '__typename'>>

export type IPrimitiveTypeExport = Pick<
  OGM_TYPES.PrimitiveType,
  IBaseTypeExportFields | 'primitiveKind'
> &
  Required<Pick<OGM_TYPES.PrimitiveType, '__typename'>>

// Uses OGM types
export type ITypeExport =
  | IPrimitiveTypeExport
  | IEnumTypeExport
  | IInterfaceTypeExport
  | IReactNodeTypeExport
  | IRenderPropsTypeExport
