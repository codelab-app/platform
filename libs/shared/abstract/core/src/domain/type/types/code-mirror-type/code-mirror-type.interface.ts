import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { IBaseType } from '../base-type/base-type.interface'
import { ITypeKind } from '../base-type/type-kind.enum'

export interface ICodeMirrorType extends IBaseType {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
