import type {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IOwnerSchema } from '../user'
import type {
  IActionTypeDTO,
  IAppTypeDTO,
  IArrayTypeDTO,
  ICodeMirrorTypeDTO,
  ICreateEnumTypeData,
  IElementTypeDTO,
  IEnumTypeDTO,
  IInterfaceTypeDTO,
  ILambdaTypeDTO,
  IPageTypeDTO,
  IPrimitiveTypeDTO,
  IReactNodeTypeDTO,
  IRenderPropsTypeDTO,
  IUnionTypeDTO,
} from './types'

/**
 * This keeps the form easier, and reduce the number of type services. However we get less fine-grained data validation with Zod in the backend during import/export.
 *
 * For the backend, we'll create a type for each sub-type.
 */
export interface ICreateTypeData extends IOwnerSchema {
  allowedValues?: Array<ICreateEnumTypeData>
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

export type ITypeDTO =
  | IActionTypeDTO
  | IAppTypeDTO
  | IArrayTypeDTO
  | ICodeMirrorTypeDTO
  | IElementTypeDTO
  | IEnumTypeDTO
  | IInterfaceTypeDTO
  | ILambdaTypeDTO
  | IPageTypeDTO
  | IPrimitiveTypeDTO
  | IReactNodeTypeDTO
  | IRenderPropsTypeDTO
  | IUnionTypeDTO
