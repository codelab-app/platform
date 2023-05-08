import type {
  CodeMirrorLanguage,
  CodeMirrorTypeCreateInput,
  UpdateCodeMirrorTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  ICodeMirrorTypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IBaseType } from './base-type.interface'

export interface ICodeMirrorType
  extends IBaseType<
    ICodeMirrorTypeDTO,
    CodeMirrorTypeCreateInput,
    UpdateCodeMirrorTypesMutationVariables
  > {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
