import type { Static, TSchema } from '@sinclair/typebox'

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
import { TypeDtoSchema, typeDtoSchemas } from './type.dto.interface'
import { UnionTypeDtoSchema } from './union-type'

export const omitOwner = <T extends TSchema>(schema: T) =>
  Type.Omit(schema, ['owner'])

export const TypeDtoWithoutOwnerSchema = Type.Union(
  typeDtoSchemas.map(omitOwner),
  {
    discriminantKey: '__typename',
    errorMessage: 'Unknown type',
  },
)

export type ITypeDtoWithoutOwner = Static<typeof TypeDtoWithoutOwnerSchema>
