import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { ICodeMirrorLanguage } from '../code-mirror-language.enum'
import type { IElementTypeKind } from '../element'
import { IActionType, IActionTypeDto } from './action-type.dto.interface'
import { IAppType, IAppTypeDto } from './app-type.dto.interface'
import { IArrayType, IArrayTypeDto } from './array-type.dto.interface'
import {
  ICodeMirrorType,
  ICodeMirrorTypeDto,
} from './code-mirror-type.dto.interface'
import { IElementType, IElementTypeDto } from './element-type.dto.interface'
import {
  IEnumType,
  IEnumTypeDto,
  type IEnumTypeValueDto,
} from './enum-type.dto.interface'
import {
  IInterfaceType,
  IInterfaceTypeDto,
} from './interface-type.dto.interface'
import { ILambdaType, ILambdaTypeDto } from './lambda-type.dto.interface'
import { IPageType, IPageTypeDto } from './page-type.dto.interface'
import {
  IPrimitiveType,
  IPrimitiveTypeDto,
} from './primitive-type.dto.interface'
import type { IPrimitiveTypeKind } from './primitive-type.enum'
import {
  IReactNodeType,
  IReactNodeTypeDto,
} from './react-node-type.dto.interface'
import {
  IRenderPropType,
  IRenderPropTypeDto,
} from './render-prop-type.dto.interface'
import type { ITypeKind } from './type-kind.enum'
import { IUnionType, IUnionTypeDto } from './union-type.dto.interface'

export const ITypeDto = Type.Union(
  [
    IActionTypeDto,
    IAppTypeDto,
    IArrayTypeDto,
    ICodeMirrorTypeDto,
    IElementTypeDto,
    IEnumTypeDto,
    IInterfaceTypeDto,
    ILambdaTypeDto,
    IPageTypeDto,
    IPrimitiveTypeDto,
    IReactNodeTypeDto,
    IRenderPropTypeDto,
    IUnionTypeDto,
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type ITypeDto = Static<typeof ITypeDto>

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
  allowedValues?: Array<IEnumTypeValueDto>
  arrayTypeId?: string
  elementKind?: IElementTypeKind
  id: string
  kind: ITypeKind
  language?: ICodeMirrorLanguage
  name: string
  primitiveKind?: IPrimitiveTypeKind
  unionTypeIds?: Array<string>
}
