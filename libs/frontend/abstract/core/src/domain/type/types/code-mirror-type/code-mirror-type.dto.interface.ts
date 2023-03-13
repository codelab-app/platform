import type { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface ICodeMirrorTypeDTO extends IBaseTypeDTO {
  __typename: `${ITypeKind.CodeMirrorType}`
  language: CodeMirrorLanguage
}
