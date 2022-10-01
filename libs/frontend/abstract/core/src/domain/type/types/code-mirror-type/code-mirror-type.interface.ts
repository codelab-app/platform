import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { IBaseType } from '../base-type'

export interface ICodeMirrorType extends IBaseType {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
