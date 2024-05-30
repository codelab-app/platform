import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { ICodeMirrorLanguage } from '../code-mirror-language.enum'
import type { IElementTypeKind } from '../element'
import {
  ActionTypeDtoSchema,
  ActionTypeSchema,
  IActionType,
  IActionTypeDto,
} from './action-type.dto.interface'
import {
  AppTypeDtoSchema,
  AppTypeSchema,
  IAppType,
  IAppTypeDto,
} from './app-type.dto.interface'
import {
  ArrayTypeDtoSchema,
  ArrayTypeSchema,
  IArrayType,
  IArrayTypeDto,
} from './array-type.dto.interface'
import {
  CodeMirrorTypeDtoSchema,
  CodeMirrorTypeSchema,
  ICodeMirrorType,
  ICodeMirrorTypeDto,
} from './code-mirror-type.dto.interface'
import {
  ElementTypeDtoSchema,
  ElementTypeSchema,
  IElementType,
  IElementTypeDto,
} from './element-type.dto.interface'
import {
  EnumTypeDtoSchema,
  EnumTypeSchema,
  IEnumType,
  IEnumTypeDto,
  type IEnumTypeValueDto,
} from './enum-type.dto.interface'
import {
  IInterfaceType,
  InterfaceTypeDtoSchema,
  InterfaceTypeSchema,
} from './interface-type.dto.interface'
import {
  ILambdaType,
  ILambdaTypeDto,
  LambdaTypeDtoSchema,
  LambdaTypeSchema,
} from './lambda-type.dto.interface'
import {
  IPageType,
  IPageTypeDto,
  PageTypeDtoSchema,
  PageTypeSchema,
} from './page-type.dto.interface'
import {
  IPrimitiveType,
  IPrimitiveTypeDto,
  PrimitiveTypeDtoSchema,
  PrimitiveTypeSchema,
} from './primitive-type.dto.interface'
import type { IPrimitiveTypeKind } from './primitive-type.enum'
import {
  IReactNodeType,
  IReactNodeTypeDto,
  ReactNodeTypeDtoSchema,
  ReactNodeTypeSchema,
} from './react-node-type.dto.interface'
import {
  IRenderPropType,
  IRenderPropTypeDto,
  RenderPropTypeDtoSchema,
  RenderPropTypeSchema,
} from './render-prop-type.dto.interface'
import {
  IRichTextType,
  IRichTextTypeDto,
  RichTextTypeDtoSchema,
  RichTextTypeSchema,
} from './rich-text-type.dto.interface'
import type { ITypeKind } from './type-kind.enum'
import {
  IUnionType,
  IUnionTypeDto,
  UnionTypeDtoSchema,
  UnionTypeSchema,
} from './union-type.dto.interface'

export const TypeDtoSchema = Type.Union(
  [
    ActionTypeDtoSchema,
    AppTypeDtoSchema,
    ArrayTypeDtoSchema,
    CodeMirrorTypeDtoSchema,
    ElementTypeDtoSchema,
    EnumTypeDtoSchema,
    InterfaceTypeDtoSchema,
    LambdaTypeDtoSchema,
    PageTypeDtoSchema,
    PrimitiveTypeDtoSchema,
    ReactNodeTypeDtoSchema,
    RenderPropTypeDtoSchema,
    RichTextTypeDtoSchema,
    UnionTypeDtoSchema,
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type ITypeDto = Static<typeof TypeDtoSchema>

export const TypeSchema = Type.Union(
  [
    ActionTypeSchema,
    AppTypeSchema,
    ArrayTypeSchema,
    CodeMirrorTypeSchema,
    ElementTypeSchema,
    EnumTypeSchema,
    InterfaceTypeSchema,
    LambdaTypeSchema,
    PageTypeSchema,
    PrimitiveTypeSchema,
    ReactNodeTypeSchema,
    RenderPropTypeSchema,
    RichTextTypeSchema,
    UnionTypeSchema,
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type IType = Static<typeof TypeSchema>

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
