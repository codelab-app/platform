import type { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { ICodeMirrorTypeDTO } from './code-mirror-type.dto.interface'

export interface ICodeMirrorType extends IBaseType<ICodeMirrorTypeDTO> {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
