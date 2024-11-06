import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import type { IElementTypeKind } from '../element'
import type { ICodeMirrorLanguage } from './code-mirror-type/code-mirror-language.enum'
import type { IPrimitiveTypeKind } from './primitive-type/primitive-type.enum'
import type { ITypeKind } from './type-kind.enum'

import { ActionTypeDtoSchema, ActionTypeSchema } from './action-type'
import {
  AppTypeDtoSchema,
  AppTypeSchema,
} from './app-type/app-type.dto.interface'
import { ArrayTypeDtoSchema, ArrayTypeSchema } from './array-type'
import {
  CodeMirrorTypeDtoSchema,
  CodeMirrorTypeSchema,
} from './code-mirror-type/code-mirror-type.dto.interface'
import { ElementTypeDtoSchema, ElementTypeSchema } from './element-type'
import {
  EnumTypeDtoSchema,
  EnumTypeSchema,
  type IEnumTypeValueDto,
} from './enum-type'
import { InterfaceTypeDtoSchema } from './interface-type/interface-type.dto.interface'
import {
  LambdaTypeDtoSchema,
  LambdaTypeSchema,
} from './lambda-type/lambda-type.dto.interface'
import { PageTypeDtoSchema, PageTypeSchema } from './page-type'
import {
  PrimitiveTypeDtoSchema,
  PrimitiveTypeSchema,
} from './primitive-type/primitive-type.dto.interface'
import { ReactNodeTypeDtoSchema, ReactNodeTypeSchema } from './react-node-type'
import {
  RenderPropTypeDtoSchema,
  RenderPropTypeSchema,
} from './render-prop-type/render-prop-type.dto.interface'
import { RichTextTypeDtoSchema, RichTextTypeSchema } from './rich-text-type'
import { UnionTypeDtoSchema, UnionTypeSchema } from './union-type'

export const TypeExportSchema = Type.Union(
  [
    Type.Omit(ActionTypeDtoSchema, ['owner']),
    Type.Omit(AppTypeDtoSchema, ['owner']),
    Type.Omit(ArrayTypeDtoSchema, ['owner']),
    Type.Omit(CodeMirrorTypeDtoSchema, ['owner']),
    Type.Omit(ElementTypeDtoSchema, ['owner']),
    Type.Omit(EnumTypeDtoSchema, ['owner']),
    Type.Omit(InterfaceTypeDtoSchema, ['owner']),
    Type.Omit(LambdaTypeDtoSchema, ['owner']),
    Type.Omit(PageTypeDtoSchema, ['owner']),
    Type.Omit(PrimitiveTypeDtoSchema, ['owner']),
    Type.Omit(ReactNodeTypeDtoSchema, ['owner']),
    Type.Omit(RenderPropTypeDtoSchema, ['owner']),
    Type.Omit(RichTextTypeDtoSchema, ['owner']),
    Type.Omit(UnionTypeDtoSchema, ['owner']),
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type ITypeExport = Static<typeof TypeExportSchema>
