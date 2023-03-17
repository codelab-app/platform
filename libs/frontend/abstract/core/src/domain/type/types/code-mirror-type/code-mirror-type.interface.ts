import type {
  CodeMirrorLanguage,
  CodeMirrorTypeCreateInput,
  UpdateCodeMirrorTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { ICodeMirrorTypeDTO } from './code-mirror-type.dto.interface'

export interface ICodeMirrorType
  extends IBaseType<
    ICodeMirrorTypeDTO,
    CodeMirrorTypeCreateInput,
    UpdateCodeMirrorTypesMutationVariables
  > {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
