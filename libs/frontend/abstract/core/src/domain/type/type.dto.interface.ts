import type {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { TypeFragment } from './fragments'
import type { IEnumTypeValue } from './types'

/**
 * This keeps the form easier, and reduce the number of type services. However we get less fine-grained data validation with Zod in the backend during import/export.
 *
 * For the backend, we'll create a type for each sub-type.
 */
export interface IAllTypeDTO {
  id: string
  name: string
  kind: ITypeKind
  primitiveKind?: IPrimitiveTypeKind
  elementKind?: IElementTypeKind
  language?: ICodeMirrorLanguage
  allowedValues?: Array<IEnumTypeValue>
  unionTypeIds?: Array<string>
  arrayTypeId?: string
}

/**
 * Create
 */
export interface ICreateTypeDTO extends IAllTypeDTO {
  auth0Id: string
}

/**
 * Update
 */
export type IUpdateTypeDTO = IAllTypeDTO

export type ITypeDTO = TypeFragment
