import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDto } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const ICodeMirrorTypeDto = Type.Composite([
  IBaseTypeDto(Type.Literal(`${ITypeKind.CodeMirrorType}`)),
  Type.Object({
    language: Type.Enum(CodeMirrorLanguage),
  }),
])

export type ICodeMirrorTypeDto = Static<typeof ICodeMirrorTypeDto>

export const ICodeMirrorType = ICodeMirrorTypeDto

export type ICodeMirrorType = Static<typeof ICodeMirrorType>
