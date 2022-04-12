import {
  ElementTypeKind,
  MonacoLanguage,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/codegen'
import { TypeFragment } from './fragments'
import { TypeKind } from './types/base-type/type-kind.enum'
import { IEnumTypeValue } from './types/enum-type/enum-type.interface'

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
