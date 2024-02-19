import type {
  CodeMirrorLanguage,
  CodeMirrorTypeCreateInput,
  UpdateCodeMirrorTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  ICodeMirrorTypeDto,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { IBaseTypeModel } from './base-type.model.interface'

export interface ICodeMirrorTypeModel
  extends IBaseTypeModel<
    ICodeMirrorTypeDto,
    CodeMirrorTypeCreateInput,
    UpdateCodeMirrorTypesMutationVariables
  > {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
