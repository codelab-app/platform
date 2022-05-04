import {
  ElementTypeKind,
  MonacoLanguage,
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

export type ITypeExport = {
  id: string
  name: string
  kind: ITypeKind
  primitiveKind?: IPrimitiveTypeKind
  allowedValues?: Array<IEnumTypeValue>
}
