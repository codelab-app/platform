import type {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IEnumTypeValueDTO,
  IOwner,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
/**
 * This keeps the form easier, and reduce the number of type services. However we get less fine-grained data validation with Zod in the backend during import/export.
 *
 * For the backend, we'll create a type for each sub-type.
 */
export interface ICreateTypeData extends IOwner {
  allowedValues?: Array<IEnumTypeValueDTO>
  arrayTypeId?: string
  elementKind?: IElementTypeKind
  id: string
  kind: ITypeKind
  language?: ICodeMirrorLanguage
  name: string
  primitiveKind?: IPrimitiveTypeKind
  unionTypeIds?: Array<string>
}

export type IUpdateTypeData = ICreateTypeData
