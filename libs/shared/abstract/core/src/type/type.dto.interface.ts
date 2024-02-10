import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { ICodeMirrorLanguage } from '../code-mirror-language.enum'
import type { IElementTypeKind } from '../element'
import { IActionType, IActionTypeDTO } from './action-type.dto.interface'
import { IAppType, IAppTypeDTO } from './app-type.dto.interface'
import { IArrayType, IArrayTypeDTO } from './array-type.dto.interface'
import {
  ICodeMirrorType,
  ICodeMirrorTypeDTO,
} from './code-mirror-type.dto.interface'
import { IElementType, IElementTypeDTO } from './element-type.dto.interface'
import {
  IEnumType,
  IEnumTypeDTO,
  type IEnumTypeValueDTO,
} from './enum-type.dto.interface'
import {
  IInterfaceType,
  IInterfaceTypeDTO,
} from './interface-type.dto.interface'
import { ILambdaType, ILambdaTypeDTO } from './lambda-type.dto.interface'
import { IPageType, IPageTypeDTO } from './page-type.dto.interface'
import {
  IPrimitiveType,
  IPrimitiveTypeDTO,
} from './primitive-type.dto.interface'
import type { IPrimitiveTypeKind } from './primitive-type.enum'
import {
  IReactNodeType,
  IReactNodeTypeDTO,
} from './react-node-type.dto.interface'
import {
  IRenderPropType,
  IRenderPropTypeDTO,
} from './render-prop-type.dto.interface'
import type { ITypeKind } from './type-kind.enum'
import { IUnionType, IUnionTypeDTO } from './union-type.dto.interface'

export const ITypeDTO = Type.Union(
  [
    IActionTypeDTO,
    IAppTypeDTO,
    IArrayTypeDTO,
    ICodeMirrorTypeDTO,
    IElementTypeDTO,
    IEnumTypeDTO,
    IInterfaceTypeDTO,
    ILambdaTypeDTO,
    IPageTypeDTO,
    IPrimitiveTypeDTO,
    IReactNodeTypeDTO,
    IRenderPropTypeDTO,
    IUnionTypeDTO,
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type ITypeDTO = Static<typeof ITypeDTO>

export const IType = Type.Union(
  [
    IActionType,
    IAppType,
    IArrayType,
    ICodeMirrorType,
    IElementType,
    IEnumType,
    IInterfaceType,
    ILambdaType,
    IPageType,
    IPrimitiveType,
    IReactNodeType,
    IRenderPropType,
    IUnionType,
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type IType = Static<typeof IType>

/**
 * This keeps the form easier, and reduce the number of type services. However we get less fine-grained data validation with Zod in the backend during import/export.
 *
 * For the backend, we'll create a type for each sub-type.
 */
export interface ICreateTypeDto {
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
