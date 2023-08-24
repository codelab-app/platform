import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

export const ICodeMirrorTypeDTO = Type.Composite([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.CodeMirrorType}`)),
  Type.Object({
    language: Type.Enum(CodeMirrorLanguage),
  }),
])

export type ICodeMirrorTypeDTO = Static<typeof ICodeMirrorTypeDTO>
