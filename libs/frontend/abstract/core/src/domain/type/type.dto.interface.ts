import type {
  ICodeMirrorLanguage,
  IElementTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IAuth0Owner, IOwnerSchema } from '../user'
import type { TypeFragment } from './fragments'
import type {
  IActionTypeDTO,
  IAppTypeDTO,
  IArrayTypeDTO,
  ICodeMirrorTypeDTO,
  IElementTypeDTO,
  IEnumTypeDTO,
  IEnumTypeValue,
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

export interface ICreateTypeData extends IAllTypeDTO, IOwnerSchema {}

export type IUpdateTypeData = IAllTypeDTO

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
