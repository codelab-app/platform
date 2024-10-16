import type { Static } from '@sinclair/typebox'

import { CodeMirrorLanguage } from '@codelab/shared/infra/gql'
import { Type } from '@sinclair/typebox'

import { BaseTypeDtoSchema } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const CodeMirrorTypeDtoSchema = Type.Composite([
  BaseTypeDtoSchema(`${ITypeKind.CodeMirrorType}`),
  Type.Object({
    language: Type.Enum(CodeMirrorLanguage),
  }),
])

export type ICodeMirrorTypeDto = Static<typeof CodeMirrorTypeDtoSchema>

export const CodeMirrorTypeSchema = CodeMirrorTypeDtoSchema

export type ICodeMirrorType = Static<typeof CodeMirrorTypeSchema>
