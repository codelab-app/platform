import type { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'

export interface ICodeMirrorType extends IBaseType {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
