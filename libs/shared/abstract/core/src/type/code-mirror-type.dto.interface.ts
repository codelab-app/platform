import type { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface ICodeMirrorTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.CodeMirrorType}`
  language: CodeMirrorLanguage
}
