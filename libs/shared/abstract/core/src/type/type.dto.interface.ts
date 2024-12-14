import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { ActionTypeDtoSchema } from './action-type'
import { AppTypeDtoSchema } from './app-type/app-type.dto.interface'
import { ArrayTypeDtoSchema } from './array-type'
import { CodeMirrorTypeDtoSchema } from './code-mirror-type/code-mirror-type.dto.interface'
import { ElementTypeDtoSchema } from './element-type'
import { EnumTypeDtoSchema } from './enum-type'
import { InterfaceTypeDtoSchema } from './interface-type/interface-type.dto.interface'
import { LambdaTypeDtoSchema } from './lambda-type/lambda-type.dto.interface'
import { PageTypeDtoSchema } from './page-type'
import { PrimitiveTypeDtoSchema } from './primitive-type/primitive-type.dto.interface'
import { ReactNodeTypeDtoSchema } from './react-node-type'
import { RenderPropTypeDtoSchema } from './render-prop-type/render-prop-type.dto.interface'
import { RichTextTypeDtoSchema } from './rich-text-type'
import { UnionTypeDtoSchema } from './union-type'

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
