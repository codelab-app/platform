import type {
  ICodeMirrorTypeDto,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { CodeMirrorLanguage } from '@codelab/shared/infra/gqlgen'

import type { IBaseTypeModel } from './base-type.model.interface'

export interface ICodeMirrorTypeModel
  extends IBaseTypeModel<ICodeMirrorTypeDto> {
  kind: ITypeKind.CodeMirrorType
  language: CodeMirrorLanguage
}
