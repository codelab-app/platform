import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const ICodeMirrorTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.CodeMirrorType}`)),
  Type.Object({
    language: Type.Enum(CodeMirrorLanguage),
  }),
])

export type ICodeMirrorTypeDTO = Static<typeof ICodeMirrorTypeDTO>

export const ICodeMirrorType = ICodeMirrorTypeDTO

export type ICodeMirrorType = Static<typeof ICodeMirrorType>
