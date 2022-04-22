import {
  ElementTypeKind,
  MonacoLanguage,
} from '@codelab/shared/abstract/codegen'
import { TypeFragment } from './fragments'
import { IEnumTypeValue, ITypeKind, PrimitiveTypeKind } from './types'

export interface IBaseTypeDTO {
  id: string
  name: string
  kind: ITypeKind
  primitiveKind?: PrimitiveTypeKind
  elementKind?: ElementTypeKind
  language?: MonacoLanguage
  allowedValues?: Array<IEnumTypeValue>
}

/**
 * Create
 */
export interface ICreateTypeDTO extends IBaseTypeDTO {
  unionTypeIds?: Array<string>
  arrayTypeId?: string
}

/**
 * Update
 */
export type IUpdateTypeDTO = ICreateTypeDTO

export type ITypeDTO = TypeFragment
