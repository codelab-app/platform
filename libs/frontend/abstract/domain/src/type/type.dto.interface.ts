import type {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IEnumTypeValueDto,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared-abstract-core'

/**
 * This keeps the form easier, and reduce the number of type services. However we get less fine-grained data validation with Zod in the backend during import/export.
 *
 * For the backend, we'll create a type for each sub-type.
 */
export interface ITypeCreateFormData {
  allowedValues?: Array<IEnumTypeValueDto>
  arrayItemTypeId?: string
  elementKind?: IElementTypeKind
  id: string
  kind: ITypeKind
  language?: ICodeMirrorLanguage
  name: string
  primitiveKind?: IPrimitiveTypeKind
  unionTypeIds?: Array<string>
}

export type ITypeCreateDto = ITypeCreateFormData
export type ITypeUpdateDto = ITypeCreateFormData
