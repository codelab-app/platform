import {
  ElementTypeKind,
  MonacoLanguage,
  OGM_TYPES,
} from '@codelab/shared/abstract/codegen'
import { TypeFragment } from './fragments'
import { IEnumTypeValue, IPrimitiveTypeKind, ITypeKind } from './types'

export interface IBaseTypeDTO {
  id: string
  name: string
  kind: ITypeKind
  primitiveKind?: IPrimitiveTypeKind
  elementKind?: ElementTypeKind
  language?: MonacoLanguage
  allowedValues?: Array<IEnumTypeValue>
  unionTypeIds?: Array<string>
  arrayTypeId?: string
}

/**
 * Create
 */
export interface ICreateTypeDTO extends IBaseTypeDTO {
  auth0Id: string
}

/**
 * Update
 */
export type IUpdateTypeDTO = IBaseTypeDTO

export type ITypeDTO = TypeFragment

// Uses OGM types
export type ITypeExport =
  | OGM_TYPES.PrimitiveType
  | OGM_TYPES.EnumType
  | OGM_TYPES.InterfaceType
