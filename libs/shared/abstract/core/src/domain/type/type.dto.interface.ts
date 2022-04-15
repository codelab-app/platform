import {
  ElementTypeKind,
  MonacoLanguage,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/codegen'
import { TypeFragment } from './fragments'
import { IEnumTypeValue, TypeKind } from './types'

export interface IBaseTypeDTO {
  name: string
  primitiveKind?: PrimitiveTypeKind
  elementKind?: ElementTypeKind
  language?: MonacoLanguage
  allowedValues?: Array<IEnumTypeValue>
  typeIdsOfUnionType?: Array<string>
}

/**
 * Create
 */
export interface ICreateTypeDTO extends IBaseTypeDTO {
  id: string
  kind: TypeKind
  typeIdsOfUnionType?: Array<string>
  arrayItemTypeId?: string
  typesOfUnionType?: string
}

/**
 * Update
 */
export type IUpdateTypeDTO = IBaseTypeDTO

export type ITypeDTO = TypeFragment
