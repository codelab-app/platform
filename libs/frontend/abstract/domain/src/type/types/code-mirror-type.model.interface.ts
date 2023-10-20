import type {
  CodeMirrorLanguage,
  CodeMirrorTypeCreateInput,
  UpdateCodeMirrorTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  ICodeMirrorTypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IBaseTypeModel } from './base-type.model.interface'

export interface ICodeMirrorTypeModel
  extends IBaseTypeModel<
    ICodeMirrorTypeDTO,
    CodeMirrorTypeCreateInput,
    UpdateCodeMirrorTypesMutationVariables
  > {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
